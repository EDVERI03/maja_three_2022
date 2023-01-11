import type { Actions, PageServerLoad } from "./$types";
import { invalid, redirect } from "@sveltejs/kit";
import { database } from "$lib/database"
import {streams} from "./+server"

export const load: PageServerLoad = async ({params, locals}) => {
    const self = await database.user.findUniqueOrThrow({where: {session: locals.userid}})
    const mg = await database.messagegroup.findUniqueOrThrow({where:{id: params.slug}, include: {messages: {include: {author: {select: {username: true}}}}, members: {select: {username: true, profileimage: true, profileURL: true}}}})
    mg.messages.forEach((e) => {
        e.own = e.authorId == self.id})
    return {messages: mg.messages, members: mg.members}
}

export const actions: Actions = {
    message: async ({request, params, locals}) => {
        
        const form = await request.formData()
        const self = await database.user.findUniqueOrThrow({where: {session: locals.userid}})
        if (form.get("message")?.toString()) {
            const message = await database.message.create({data: {content: form.get("message")?.toString()!, authorId: self.id, groupId: params.slug}, include: {author: {select: {username: true}}}})
            for (let session in streams) {
                if (streams[session].dm == params.slug) {
                    streams[session].controller.enqueue(JSON.stringify(message))
                }
            }
        }

        
    }
}