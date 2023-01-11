import type { Actions, PageServerLoad } from "./$types";
import { invalid } from "@sveltejs/kit";
import { database } from "$lib/database"
import { append } from "svelte/internal";
import { connect } from "http2";

export const load: PageServerLoad = async ({ params, locals }) => {
    //Here i can do stuff
    const post = await database.post.findUnique({ where: { id: params.slug }, include: {replies: {include: {author: {select: {username: true, profileimage: true, profileURL: true}}}}} })
    const user = await database.user.findUnique({ where: { id: post?.authorId }})
    
    //let post = posts.find((e)=>e.id==params.slug)

    if (locals.userid && post?.id) {
        await database.post.update({where: {id: post.id}, data: {visitors: {connect: {session: locals.userid}}}})
    }

    return { post, user}


}

export const actions: Actions = {
    comment: async ({ request, params, locals }) => {


        const post = (await database.post.findUnique({ where: { id: params.slug } }))
        const user = (await database.user.findUnique({ where: { session: locals.userid } }))
        const form = await request.formData()
        if (form.get("comment") != null) {
            //collection.updateOne({_id: params.slug}, {$set: {replies: [form.get("comment")].concat(POST?.replies??[])}})
            //POST?.replies.push((form.get("comment")?.toString() || ""))
            try{
                await database.post.update({ where: { id: post?.id }, data: { replies: { create: { content: form.get("comment")?.toString(), authorId: user?.id! } } } })
            } catch (e) {
                return invalid(400, { error: "message creation error" });
            }
        } else return invalid(400, { messages: "reply invalid" });
        return;
    },//beans

    rate: async ({request, params}) => {
        const form = await request.formData()
        const value = Number(form.get("score")?.toString())
        if(value) {
            await database.post.update({where: {id: params.slug}, data: {rating: {increment: value}}})
        } else return invalid(400, {messages: "failed to complete task"})

        return;
        
    }
}