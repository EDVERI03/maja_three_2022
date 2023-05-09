import { database } from "$lib/database"
import { redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

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
            const prefixes: String[] = form.get("prefixes")!.toString().split(",")
            console.log(form)
            console.log(prefixes)
        }
    }
}