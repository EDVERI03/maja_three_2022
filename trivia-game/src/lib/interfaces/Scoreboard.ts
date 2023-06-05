import type { Attempt } from "./Quizler"

export type CompeditorData = {name: string, difference: number}
export type EntryData = {name: string, score: number}

export interface Scoreboard {
    /**
     * @param form function data
     */
    GetHighestScoreOfType(type: string): Promise<number>
    GetCloseCompeditor(type: string, score: number): Promise<Attempt<CompeditorData>>
    GetScoreboardOfType(type: string): Promise<Attempt<Array<EntryData>>>
}