import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";
import type { Quizler } from "$lib/interfaces/Quizler";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { fail } from "assert";

export const load: PageServerLoad = async ({ locals }) => {
    const quizler: Quizler = new SQLiteQuizler()
    
    const result = await quizler.StartQuiz(locals.sessionId)

    if (result.success) {
        throw redirect(300, `solo-rush/${result.success.slug}/choose-category`)
    }

    return fail(result.error.data)
}