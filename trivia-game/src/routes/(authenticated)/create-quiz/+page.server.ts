import { database } from "$lib/database"
import { redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { SQLiteAdmin } from "$lib/implementations/SQLiteAdmin"

export const load: PageServerLoad = async ({ locals }) => {
    
    const user = await database.user.findUnique({where: {session: locals.sessionId}})
    if (!user!.admin) {
        throw redirect(302, '/')
    }


}

export const actions:Actions = {
    createNewCategory: async ({request, locals}) => {
        const form = await request.formData()
        if (form.get("prefixes") != undefined) {
            const admin = new SQLiteAdmin()
            if (await admin.CreateQuiz(form)) {
                throw redirect(302, "/")
            }
        }
    }
}