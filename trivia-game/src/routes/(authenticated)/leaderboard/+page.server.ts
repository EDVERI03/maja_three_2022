import { SQLiteScoreboard } from "$lib/implementations/SQLiteScoreboard";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const Scoreboard = new SQLiteScoreboard()
    const SRScores = await Scoreboard.GetScoreboardOfType("SR")
    const SurvivalScores = await Scoreboard.GetScoreboardOfType("Survival")
    return ({SRScores, SurvivalScores})
}