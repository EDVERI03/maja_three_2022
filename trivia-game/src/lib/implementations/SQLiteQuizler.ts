import { database } from "$lib/database";
import type { Admin } from "$lib/interfaces/Admin";
import type { AnswerData, Attempt, QuestionData, Quizler, StartQuizResult } from "$lib/interfaces/Quizler";
import type { Question } from "@prisma/client";
import * as crypto from "crypto"

export class SQLiteQuizler implements Quizler{
    async StartQuiz(): Promise<StartQuizResult> {
        
        const quiz = await database.quiz.create({data: {}})

        if (quiz.id) {
            return {success: {slug: quiz.id}}
        }

        return {error: {code: 400, data: "could not create quiz"}}
    }

    async AddQuestions(slug: string, categoryName: string): Promise<boolean> {
        const category = await database.category.findUnique({where: {name: categoryName}, include: {questions: true}})

        if (category?.questions && category!.questions.length >= 10) {
            const questions: Array<Question> = category!.questions.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 10);

            const result = await database.quiz.update({where: {id: slug}, data: {questions: {connect: [{id:questions[0].id}, {id:questions[1].id}, {id:questions[2].id}, {id:questions[3].id}, {id:questions[4].id}, {id:questions[5].id}, {id:questions[6].id}, {id:questions[7].id}, {id:questions[8].id}, {id:questions[9].id} ]}}})
            return true
        }
        return false
    }

    async loadQuestions(slug: string): Promise<Attempt<QuestionData[]>> {
        const questiondata = (await database.quiz.findUnique({where: {id: slug}, include: {questions: {include: {answers: true, category: true}}}}))?.questions.map((e) => {return {category: e.category.name, id: e.id,title: e.title, answer1: e.answers[0].title, answer2: e.answers[1].title, answer3: e.answers[2].title, correct: e.answers.findIndex((f) => {return f.correct})}})
        if (questiondata) {
            return {success: questiondata}
        }
        return {error: {code: 400, data: "failed to fetch"}}
    }

    async submitAnswer(slug: string, correct: boolean, heat: number): Promise<Attempt<AnswerData>> {
        if (slug) {
            const e = await database.quiz.update({where: {id:slug}, data: {startAtIndex: {increment: 1}}})
            console.log(e.startAtIndex)
            if (correct) {
                const result = await database.quiz.update({where: {id: slug}, data: {score: {increment: 100 + 10 * heat}}})
                return {success: {correct: true, score: result.score}}
            } else {
                const result = await database.quiz.update({where: {id: slug}, data: {score: {increment: Math.round(-100/(heat+1))}}})
                return {success: {correct: false, score: result.score}}
            }
        }
        return {error: {code: 400, data: "Could not complete request"}}
    }

    async IsEndOfRound(slug:string, currentIndex: number) {
        const result = await database.quiz.findUniqueOrThrow({where: {id: slug}, include: {questions: true}})
        if (result.questions.length == currentIndex+1) {
            await database.quiz.update({where: {id: slug}, data: {currentRound: {increment: 1}}})
            return true
        } else return false
    } 

    async getScore(slug: string): Promise<number> {
        const result = await database.quiz.findUniqueOrThrow({where: {id: slug}})
        return result.score;
    }

    async getCurrentIndex(slug: string): Promise<number> {
        const result = await database.quiz.findUniqueOrThrow({where: {id: slug}})
        return result.startAtIndex;
    }

    async clearPrevious(slug: string): Promise<boolean> {
        const result = await database.quiz.update({where: {id: slug}, data: {questions: {set: []}}, include: {questions: true}})
        if (result) {
            return true;
        }
        else return false;
    }
}