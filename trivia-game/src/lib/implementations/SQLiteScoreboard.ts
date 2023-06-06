import { database } from "$lib/database";
import type { Attempt } from "$lib/interfaces/Quizler";
import type { CompeditorData, EntryData, Scoreboard } from "$lib/interfaces/Scoreboard";

export class SQLiteScoreboard implements Scoreboard {
    async GetHighestScoreOfType(type: string): Promise<number> {
        const highscores = await database.highScore.findMany({where: {type}})
        const scores = highscores.map((e) => {return e.score})
        const sortedScores = scores.sort((a,b) => {return b-a})
        return sortedScores[0]
    }

    async GetPersonalHighscoreOfType(session: string, type:string): Promise<Attempt<EntryData>> {
        const user = await database.user.findUniqueOrThrow({where: {session}})
        const result = await database.highScore.findFirst({where: {ownerId: user.id, type}})
        if (result) {
            return {success: {score: result.score, name: user.username}}
        }
        return {error: {code: 400, data: "could not locate highscore"}}
    }

    async GetCloseCompeditor(type: string, score: number): Promise<Attempt<CompeditorData>> {
        const highscores = await database.highScore.findMany({where: {type, score: {gt: score}}, include: {owner: {select: {username: true}}}})
        if (highscores[0]) {
            const sortScore = highscores.sort((a,b) => {return a.score - b.score})
            return {success: {name: sortScore[0].owner.username, difference: sortScore[0].score - score}}
        }
        return {error: {code: 400, data: "could not find close compeditor"}}
    }

    async GetScoreboardOfType(type: string): Promise<Attempt<EntryData[]>> {
        const board = (await database.highScore.findMany({where: {type}, include: {owner: {select: {username: true}}}})).map((e) => {
            return {name: e.owner.username, score: e.score}
        }).sort((a,b) => {
            return b.score - a.score
        })
        if (board[0]) {
            return {success: board}
        } 
        return {error: {code: 400, data: "could not find any entries for specified type"}}
    }
}