import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";
import { SQLiteScoreboard } from "$lib/implementations/SQLiteScoreboard";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad =async ({params}) => {
    const quizler = new SQLiteQuizler()
    const Scoreboard = new SQLiteScoreboard()
    const finalScore = await quizler.getScore(params.slug)
    const PBScore = await quizler.SRsaveHighscore(params.slug)
    const GBScore = await Scoreboard.GetHighestScoreOfType("SR")
    const compeditor = await Scoreboard.GetCloseCompeditor("SR", finalScore)

    return {finalScore, PBScore, GBScore, compeditor}
}