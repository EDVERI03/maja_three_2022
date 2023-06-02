import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";
import { database } from "$lib/database";

export const load: PageServerLoad = async ({ params }) => {
    //Get array of question objects
    const quizler = new SQLiteQuizler()
    const questiondata = await quizler.loadQuestions(params.slug)
    if (questiondata.success) {
        //Return data with array, current category and slug?
        return {questions: questiondata, score: 0, slug: params.slug}
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
        const currentIndex = form.get("CI")?.toString()

        if (slug && heat && correct && currentIndex) {
            const quizler = new SQLiteQuizler()
            const result = await quizler.submitAnswer(slug, correct=="true", parseInt(heat))
            if (await quizler.IsEndOfRound(slug, parseInt(currentIndex))) {
                throw redirect (302, "./choose-category")
            }
            return {result}
        }
    },


};