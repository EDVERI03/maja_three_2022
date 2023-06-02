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

        if (category?.questions && category!.questions.length >= 5) {
            const questions: Array<Question> = category!.questions.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 5);
            console.log(questions)
            const result = await database.quiz.update({where: {id: slug}, data: {questions: {connect: [{id:questions[0].id}, {id:questions[1].id}, {id:questions[2].id}, {id:questions[3].id}, {id:questions[4].id} ]}}})
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
            if (correct) {
                const result = await database.quiz.update({where: {id: slug}, data: {score: {increment: 100 + 10 * heat}}})
                return {success: {correct: true, score: result.score}}
            } else {
                const result = await database.quiz.findUniqueOrThrow({where: {id: slug}})
                return {success: {correct: false, score: result.score}}
            }
        }
        return {error: {code: 400, data: "Could not complete request"}}
    }

    async IsEndOfRound(slug:string, currentIndex: number) {
        const result = await database.quiz.findUniqueOrThrow({where: {id: slug}, include: {questions: true}})
        console.log(slug)
        console.log(result.questions.toString())
        console.log(result.questions.length)
        console.log(currentIndex)
        if (result.questions.length == currentIndex+1) {
            return true
        } else return false
    } 
}