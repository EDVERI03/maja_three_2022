import type { Actions, PageServerLoad } from "./$types";
import { posts } from '$lib/state';
import { invalid } from "@sveltejs/kit";
import { database } from "$lib/database"
import { Db } from "mongodb";

export const load: PageServerLoad = ({ }) => {
    //Here i can do stuff
}

export const actions: Actions = {
    post: async ({ locals, request }) => {
        const form = await request.formData()

        const user = (await database.user.findUnique({ where: { session: locals.userid } }))

        if (user) {
            if (form.get("image") && form.get("title")) {
                /* posts.push({id: crypto.randomUUID(),
                     author: (cookies.get("userid")||"missing person"), 
                     image: (form.get("image")?.toString()||""), 
                     title:(form.get("title")?.toString()||"obama backflip"), 
                     replies:[]})
                console.log(posts) */
                /* collection.insertOne({_id:crypto.randomUUID(),
                     author: user,
                     image: (form.get("image")?.toString()||""), 
                title:(form.get("title")?.toString()||"obama backflip"), 
                replies:[]}) */
                await database.user.update({ where: { username: user.username }, data: { posts: { create: { title: form.get("title")?.toString() || "Obama Backflip", content: form.get("image")?.toString() || "", rating: 0} } } })

            } else return error(400, { message: "Invalid Post" })
        } else return error(400, { message: "user not logged in" })
    }
}