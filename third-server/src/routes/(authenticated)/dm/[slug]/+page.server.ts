import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { database } from "$lib/database"
import { SQLiteChater } from "$lib/implementations/SQLiteChat";

const chater = new SQLiteChater()

export const load: PageServerLoad = async ({params, locals}) => {
    const result = await chater.Load(params.slug, locals.userid) 
    console.log("i am inevitable." + result)
    return {messages: result.messages, members: result.members}
}

export const actions: Actions = {
    message: async ({request, params, locals}) => {
        const form = await request.formData() 
        await chater.Message(form, params.slug, locals.userid)
    }
}