import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";
import { SQLiteScoreboard } from "$lib/implementations/SQLiteScoreboard";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const quizler = new SQLiteQuizler()
    const Scoreboard = new SQLiteScoreboard()
    const finalScore = await quizler.SurvivalGetScore(params.slug)
    const PBScore = await quizler.SurvivalSaveHighscore(params.slug)
    const GBScore = await Scoreboard.GetHighestScoreOfType("Survival")
    const compeditor = await Scoreboard.GetCloseCompeditor("Survival", finalScore)

    return {finalScore, PBScore, GBScore, compeditor}
}