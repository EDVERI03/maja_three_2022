import { database } from "$lib/database";
import type { Attempt } from "$lib/interfaces/Quizler";
import type { CompeditorData, Scoreboard } from "$lib/interfaces/Scoreboard";

export class SQLiteScoreboard implements Scoreboard {
    async GetHighestScoreOfType(type: string): Promise<number> {
        const highscores = await database.highScore.findMany({where: {type}})
        const scores = highscores.map((e) => {return e.score})
        const sortedScores = scores.sort((a,b) => {return b-a})
        return sortedScores[0]
    }

    async GetCloseCompeditor(type: string, score: number): Promise<Attempt<CompeditorData>> {
        const highscores = await database.highScore.findMany({where: {type, score: {gt: score}}, include: {owner: {select: {username: true}}}})
        if (highscores[0]) {
            const sortScore = highscores.sort((a,b) => {return a.score - b.score})
            return {success: {name: sortScore[0].owner.username, difference: sortScore[0].score - score}}
        }
        return {error: {code: 400, data: "could not find close compeditor"}}
    }
}