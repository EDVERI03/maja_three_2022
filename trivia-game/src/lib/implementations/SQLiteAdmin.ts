import { database } from "$lib/database";
import type { Admin } from "$lib/interfaces/Admin";
import * as crypto from "crypto"

export class SQLiteAdmin implements Admin{
    async CreateQuiz(form: FormData): Promise<Boolean> {
        if (form.get("prefixes") != undefined) {
            const prefixes: String[] = form.get("prefixes")!.toString().split(",")
            const name: string = form.get("title")!.toString()

            const category = await database.category.upsert({where: {name}, create: {name}, update: {}})

            prefixes.forEach(async (prefix) => {
                const title = form.get(prefix + "_question")!.toString()
                const answer1 = form.get(prefix + "_answer1")!.toString()
                const answer2 = form.get(prefix + "_answer2")!.toString()
                const answer3 = form.get(prefix + "_answer3")!.toString()
                const correct = form.get(prefix + "_isCorrect")!.toString()
                
                if (correct == "1" || correct == "2" || correct == "3") {
                    const question = await database.question.create({data:{title, categoryId: category.id}})
                    await database.answer.create({data:{title: answer1, questionId: question.id, correct: correct == "1"}})
                    await database.answer.create({data:{title: answer2, questionId: question.id, correct: correct == "2"}})
                    await database.answer.create({data:{title: answer3, questionId: question.id, correct: correct == "3"}})
                }

            })

            return true
        }
        return false
    }
}