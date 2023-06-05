import { SQLiteQuizler } from "$lib/implementations/SQLiteQuizler";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad =async ({params}) => {
    const quizler = new SQLiteQuizler()
    const finalScore = quizler.getScore(params.slug)

    return {finalScore}
}