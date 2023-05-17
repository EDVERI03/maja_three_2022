import { database } from "$lib/database";
import type { Admin } from "$lib/interfaces/Admin";
import type { Quizler, StartQuizResult } from "$lib/interfaces/Quizler";
import * as crypto from "crypto"

export class SQLiteQuizler implements Quizler{
    async StartQuiz(): Promise<StartQuizResult> {
        
        const quiz = await database.quiz.create({data: {}})

        if (quiz.id) {
            return {success: {slug: quiz.id}}
        }

        return {error: {code: 400, data: "could not create quiz"}}
    }
}