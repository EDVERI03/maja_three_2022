import { Implementation, type Hiscores } from "$lib/do_not_modify/hiscores";
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
import { PrismaClient, type Leaderboard } from "@prisma/client";
import { randomInt } from "crypto";
import { LEGAL_TCP_SOCKET_OPTIONS } from "mongodb";
import { JumpScore, type Score } from "$lib/do_not_modify/score";

const database = new PrismaClient();

export class SQLiteHiscores implements Hiscores {
  implementation: Implementation = Implementation.SQLITE;

  async get_leaderboards(
    request: GetLeaderboardsRequest
  ): Promise<GetLeaderboardsResponse> {
    // TODO: implement logic

    console.log("GetLeaderboardsResponse");
    console.log(request);

    const leaderboards = (await database.leaderboard.findMany()).map((e) => { return e.id })

    const response: GetLeaderboardsResponse = {
      success: (leaderboards != undefined),
      leaderboards
    };

    return response;
  }
  async create_leaderboard(
    request: CreateLeaderboardRequest
  ): Promise<CreateLeaderboardResponse> {
    // TODO: implement logic

    console.log("CreateLeaderboardRequest");
    console.log(request);

    const leaderboard = await database.leaderboard.create({ data: { id: request.leaderboard_id, saveMultipleScoresPerPlayer: request.save_multiple_scores_per_player} })

    const response: CreateLeaderboardResponse = {
      success: leaderboard.id != undefined,
    };
    return response;
  }
  async delete_leaderboard(
    request: DeleteLeaderboardRequest
  ): Promise<DeleteLeaderboardResponse> {
    // TODO: implement logic

    console.log("DeleteLeaderboardRequest");
    console.log(request);

    const leaderboard = await database.leaderboard.delete({ where: { id: request.leaderboard_id } })

    const response: DeleteLeaderboardResponse = {
      success: true,
    };
    return response;
  }
  async get_scores_from_leaderboard(
    request: GetScoresRequest
  ): Promise<GetScoresResponse> {
    // TODO: implement logic

    console.log("GetScoresRequest");
    console.log(request);

    const scores = (await database.score.findMany({ where: { leaderboardId: request.leaderboard_id }, include: { player: true } })).map((e) => {
      return { value: e.value, date: e.date, player: { id: e.player.id, powerlevel: e.player.powerLevel } }
    })


    const response: GetScoresResponse = {
      success: scores != undefined,
      scores,
    };

    return response;
  }
  async submit_score_to_leaderboard(
    request: SubmitScoreRequest
  ): Promise<SubmitScoreResponse> {
    // TODO: implement logic

    console.log("SubmitScoreRequest");
    console.log(request);

    let leaderboard = await database.leaderboard.findUniqueOrThrow({where: {id: request.leaderboard_id}, include: {scores: true}})

    if (leaderboard.saveMultipleScoresPerPlayer) {
      const player = await database.player.upsert({ where: { id: request.score.player.id }, update: { powerLevel: randomInt(100, 10000) }, create: { id: request.score.player.id, powerLevel: 9200 } })
      const score = await database.score.create({ data: { playerId: request.score.player.id, leaderboardId: request.leaderboard_id, value: request.score.value, date: request.score.date, } })
      
      let leaderboard = await database.leaderboard.findUniqueOrThrow({where: {id: request.leaderboard_id}, include: {scores: true}})
      const response: SubmitScoreResponse = {
        success: true,
        rank: new DefaultRank(
          Array.from(leaderboard.scores).sort((a,b) => {return b.value - a.value}).findIndex((e) => {return e.value == request.score.value}),
          score.playerId,
          new JumpScore(score.value, score.date, new JumpPlayer(score.playerId, 6002))
        ),
      };
  
      return response;
    } else {
      const player = await database.player.upsert({ where: { id: request.score.player.id }, update: { powerLevel: randomInt(100, 10000) }, create: { id: request.score.player.id, powerLevel: 9200 } })
      await database.score.deleteMany({where: {playerId: player.id}})
      const score = await database.score.create({ data: { playerId: request.score.player.id, leaderboardId: request.leaderboard_id, value: request.score.value, date: request.score.date, } })
      
      let leaderboard = await database.leaderboard.findUniqueOrThrow({where: {id: request.leaderboard_id}, include: {scores: true}})
      const response: SubmitScoreResponse = {
        success: true,
        rank: new DefaultRank(
          Array.from(leaderboard.scores).sort((a,b) => {return b.value - a.value}).findIndex((e) => {return e.value == request.score.value}),
          score.playerId,
          new JumpScore(score.value, score.date, new JumpPlayer(score.playerId, 6002))
        ),
      };
      return response;
    }

  }
  async get_all_ranks_for_player(
    request: GetRanksForPlayerRequest
  ): Promise<GetRanksForPlayerResponse> {
    // TODO: implement logic

    const ranks: Rank[] = [];

    //Open all leaderboards 
    (await database.leaderboard.findMany({ include: { scores: { include: { player: true } } } })).forEach((leaderboard) => {
      // Get scores of player
      console.log("bloa: " + leaderboard.scores.filter((f) => { return f.playerId == request.player_id }))
      const playerScores: Score[] = leaderboard.scores.filter((f) => { return f.playerId == request.player_id }).map((g) => {
        //Format array
        return { value: g.value, date: g.date, player: { id: g.playerId } }
      })
      // get scores sorted by value
      const sortedScores: Score[] = leaderboard.scores.sort((a, b) => {
        return b.value - a.value
      }).map((g) => {
        //Format Array
        return { value: g.value, date: g.date, player: { id: g.playerId } }
      })
      //Check position of those bastards DAMN RIGHT BUDDY
      playerScores.forEach((score) => {
        ranks.push({ leaderboard_id: leaderboard.id, score: score, index: sortedScores.findIndex((sorted) => { return (sorted.date == score.date) }) })
      })
    })

    console.log("GetRanksForPlayerRequest");
    console.log(request);

    const response: GetRanksForPlayerResponse = {
      success: ranks != undefined,
      ranks,
    };

    return response;
  }
}
