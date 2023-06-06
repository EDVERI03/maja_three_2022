import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";
import { database } from "$lib/database";

export const load: PageServerLoad = async ({ params }) => {
    //Get array of question objects
    const quizler = new SQLiteQuizler()
    const score = await quizler.SurvivalGetScore(params.slug)
    const questiondata = await quizler.SurvivalGetQuestionData(params.slug)
    const health = await quizler.SurvivalStepsUntilDeath(params.slug)
    if (questiondata.success) {
        //Return data with array, score and slug? (And current index)
        return {question: questiondata, score, slug: params.slug, health}
    }
    throw fail(400, {message: "could not fetch data"})
}

export const actions: Actions = {
    submitAnswer: async ({request}) => {
        // Check if provided question for provided question is correct
        const form = await request.formData()
        const heat = form.get("H")?.toString()
        const slug = form.get("S")?.toString()
        const correct = form.get("C")?.toString()

        if (slug && heat && correct) {
            const quizler = new SQLiteQuizler()
            const result = await quizler.SurvivalSubmitAnswer(slug, correct=="true", parseInt(heat))
            await quizler.SurvivalLoadNewQuestion( slug )
            const question = await quizler.SurvivalGetQuestionData(slug)
            const health = await quizler.SurvivalStepsUntilDeath(slug)
            if (health <= 0) {
                throw redirect(302, "./result")
            }
            return {result, question, health}
        }
    },


};