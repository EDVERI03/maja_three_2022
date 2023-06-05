import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Quizler } from "$lib/interfaces/Quizler";
import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";

export const load: PageServerLoad = async ({ locals, params }) => {
    const quizler: Quizler = new SQLiteQuizler()
    await quizler.clearPrevious(params.slug)

    if (await quizler.isGameComplete(params.slug)) {
        throw redirect(302, `./result`)
    }

    const score = await quizler.getScore(params.slug)
    const categories = await quizler.getRandomCategories()


    return {slug: params.slug, score, categories}
}

export const actions: Actions = {
    addQuestions : async ({request}) => {
        const form = await request.formData()
        const quizler: Quizler = new SQLiteQuizler()
        if (form.has("slug") && form.has("categoryName")) {
            if (await quizler.AddQuestions(form.get("slug")!.toString() , form.get("categoryName")!.toString())) {
                throw redirect(302, `./answer`)
            }
        }
        throw fail(400, {message: "Internal Error"})
    }
};