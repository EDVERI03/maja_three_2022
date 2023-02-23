
import { Implementation, type Hiscores } from "$lib/do_not_modify/hiscores";
import type { Leaderboard } from "$lib/do_not_modify/leaderboard";
import { JumpPlayer } from "$lib/do_not_modify/player";
import { DefaultRank, type Rank } from "$lib/do_not_modify/rank";
import type {
  GetLeaderboardsRequest,
  GetLeaderboardsResponse,
  CreateLeaderboardRequest,
  CreateLeaderboardResponse,
  DeleteLeaderboardRequest,
  DeleteLeaderboardResponse,
  GetScoresRequest,
  GetScoresResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
  GetRanksForPlayerRequest,
  GetRanksForPlayerResponse,
} from "$lib/do_not_modify/requests";
import { JumpScore, type Score } from "$lib/do_not_modify/score";

interface LeaderboardContainer {
  leaderboard: Leaderboard,
  saveMultiple: boolean
}

let leaderboards: Map<string, LeaderboardContainer > = new Map<string, LeaderboardContainer>();

export class InMemoryHiscores implements Hiscores {
  implementation: Implementation = Implementation.INMEMORY;

  async get_leaderboards(
    request: GetLeaderboardsRequest
  ): Promise<GetLeaderboardsResponse> {
    // TODO: implement logic

    console.log("GetLeaderboardsResponse");
    console.log(request);

    const response: GetLeaderboardsResponse = {
      success: true,
      leaderboards: [...leaderboards.keys()],
    };

    return response;
  }
  async create_leaderboard(
    request: CreateLeaderboardRequest
  ): Promise<CreateLeaderboardResponse> {
    // TODO: implement logic

    console.log("CreateLeaderboardRequest");
    console.log(request);

    request.save_multiple_scores_per_player

    leaderboards.set(request.leaderboard_id, {leaderboard: {id: request.leaderboard_id, scores: []}, saveMultiple: request.save_multiple_scores_per_player})
    const response: CreateLeaderboardResponse = {
      success: leaderboards.has(request.leaderboard_id),
    };
    return response;
  }
  async delete_leaderboard(
    request: DeleteLeaderboardRequest
  ): Promise<DeleteLeaderboardResponse> {
    // TODO: implement logic

    console.log("DeleteLeaderboardRequest");
    console.log(request);

    leaderboards.delete(request.leaderboard_id)

    const response: DeleteLeaderboardResponse = {
      success: !leaderboards.has(request.leaderboard_id),
    };
    return response;
  }
  async get_scores_from_leaderboard(
    request: GetScoresRequest
  ): Promise<GetScoresResponse> {
    // TODO: implement logic

    console.log("GetScoresRequest");
    console.log(request);

    const leaderboard = leaderboards.get(request.leaderboard_id)
    
    const scores = leaderboard!.leaderboard.scores.slice(request.start_index, request.end_index) 
      
    
    const response: GetScoresResponse = {
      success: scores.length != 0,
      scores
    };

    return response;
  }
  async submit_score_to_leaderboard(
    request: SubmitScoreRequest
  ): Promise<SubmitScoreResponse> {
    // TODO: implement logic

    console.log("SubmitScoreRequest");
    console.log(request);
    
    const leaderboard = leaderboards.get(request.leaderboard_id)
    if (leaderboard?.saveMultiple) {
      leaderboard?.leaderboard.scores.push(request.score)
  
      const response: SubmitScoreResponse = {
        success: leaderboard!.leaderboard.scores.includes(request.score),
        rank: new DefaultRank(
          Array.from(leaderboard!.leaderboard.scores).sort((a,b) => {return b.value - a.value}).findIndex((e) => {return e.value == request.score.value}),
          request.leaderboard_id,
          request.score
        ),
      };
  
      return response;
    }
    else {

      //check if there is already a score from that player, remove it
      leaderboard?.leaderboard.scores.forEach((score) => {
        if (score.player.id = request.score.player.id) {
          leaderboard?.leaderboard.scores.splice(leaderboard.leaderboard.scores.indexOf(score))
        }
      })

      leaderboard?.leaderboard.scores.push(request.score)
  
      const response: SubmitScoreResponse = {
        success: leaderboard!.leaderboard.scores.includes(request.score),
        rank: new DefaultRank(
          Array.from(leaderboard!.leaderboard.scores).sort((a,b) => {return b.value - a.value}).findIndex((e) => {return e.value == request.score.value}),
          request.leaderboard_id,
          request.score
        ),
      };

      return response;
    }

  }
  async get_all_ranks_for_player(
    request: GetRanksForPlayerRequest
  ): Promise<GetRanksForPlayerResponse> {
    // TODO: implement logic

    console.log("GetRanksForPlayerRequest");
    console.log(request);
    const ranks: Rank[] = []

    //Get the damn ranks
    leaderboards.forEach((leaderboard) => {
      
      const myScores = leaderboard.leaderboard.scores.filter((e) => {return e.player.id == request.player_id})


      ranks.push({index: leaderboard.leaderboard.scores.indexOf(myScores[0]), leaderboard_id: leaderboard.leaderboard.id, score: myScores[0]})
    })
    

    const response: GetRanksForPlayerResponse = {
      success: ranks.length!= 0,
      ranks
    };

    return response;
  }
}
