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
import { JumpScore, type Score } from "$lib/do_not_modify/score";
import { errorMonitor } from "events";
import { MongoClient } from 'mongodb';
import type { init } from "svelte/internal";


async function connectToDatabase() {
  try {
    const database = new MongoClient("mongodb://localhost:27017")
    await database.connect()
    return database

  } catch (error) {
    throw error
  }

}

async function disconnectFromDatabase(database: MongoClient) {
  try {
    await database.close()
  } catch (error) {
    throw error
  }
}

const database = await connectToDatabase()
const db = database.db("hiscores")

const collection = db.collection<{ _id: string, save_multiple_scores_per_player: boolean, scores: Score[] }>("leaderboards")

export class MongoDBHiscores implements Hiscores {
  implementation: Implementation = Implementation.MONGODB;

  async get_leaderboards(
    request: GetLeaderboardsRequest
  ): Promise<GetLeaderboardsResponse> {
    // TODO: implement logic

    console.log("GetLeaderboardsResponse");
    console.log(request);

    const leaderboards = (await collection.find({}).toArray()).map(e => e._id)

    const response: GetLeaderboardsResponse = {
      success: leaderboards.length>0,
      leaderboards,
    };

    return response;
  }
  async create_leaderboard(
    request: CreateLeaderboardRequest
  ): Promise<CreateLeaderboardResponse> {
    // TODO: implement logic

    console.log("CreateLeaderboardRequest");
    console.log(request);

    const doc = await collection.insertOne({ _id: request.leaderboard_id, save_multiple_scores_per_player: request.save_multiple_scores_per_player, scores: [] })

    const response: CreateLeaderboardResponse = {
      success: doc.acknowledged,
    };
    return response;

  }
  async delete_leaderboard(
    request: DeleteLeaderboardRequest
  ): Promise<DeleteLeaderboardResponse> {
    // TODO: implement logic

    console.log("DeleteLeaderboardRequest");
    console.log(request);

    const doc = await collection.deleteOne({ _id: request.leaderboard_id })

    const response: DeleteLeaderboardResponse = {
      success: doc.acknowledged,
    };
    return response;
  }
  async get_scores_from_leaderboard(
    request: GetScoresRequest
  ): Promise<GetScoresResponse> {
    // TODO: implement logic

    console.log("GetScoresRequest");
    console.log(request);

    const scores = (await collection.findOne({_id:request.leaderboard_id}))!.scores.slice(request.start_index, request.end_index)
    

    const response: GetScoresResponse = {
      success: scores.length>0,
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

    let leaderboard = await collection.findOne({_id: request.leaderboard_id})
    if (leaderboard?.save_multiple_scores_per_player || leaderboard?.scores.length == 0) {
      const result = await collection.updateOne({_id: request.leaderboard_id}, {$push: {scores: request.score}})
      leaderboard = await collection.findOne({_id: request.leaderboard_id})
      const response: SubmitScoreResponse = {
        success: result.acknowledged,
        rank: new DefaultRank(
          //TODO: Make index show place in array scores in 
          Array.from(leaderboard!.scores).sort((a,b) => {return (b.value - a.value)}).findIndex((e) => {return (e.player.id == request.score.player.id && e.date == request.score.date)}),
          request.leaderboard_id,
          new JumpScore(request.score.value, new Date(), new JumpPlayer(request.score.player.id, 9002))
        ),
      };
  
      return response;
    } else {
      
      await collection.updateOne({_id: request.leaderboard_id}, {$pull: {scores: {player: {id: request.score.player.id}}}})
      const result = await collection.updateOne({_id: request.leaderboard_id}, {$push: {scores: request.score}})
      leaderboard = await collection.findOne({_id: request.leaderboard_id})
      const response: SubmitScoreResponse = {
        success: result.acknowledged,
        rank: new DefaultRank(
          //TODO: Make index show place in array scores in 
          Array.from(leaderboard!.scores).sort((a,b) => {return (b.value - a.value)}).findIndex((e) => {return (e.player.id == request.score.player.id && e.date == request.score.date)}),
          request.leaderboard_id,
          new JumpScore(request.score.value, new Date(), new JumpPlayer(request.score.player.id, 9002))
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
    await collection.find({scores: {$exists: true,$not: {$size: 0}}}).forEach((leaderboard) => {
      
      const myScores = leaderboard.scores.filter((e) => {return e.player.id == request.player_id})


      ranks.push({index: leaderboard.scores.indexOf(myScores[0]), leaderboard_id: leaderboard._id, score: myScores[0]})
    })

    const response: GetRanksForPlayerResponse = {
      success: ranks.length != 0,
      ranks,
    };

    return response;
  }
}
