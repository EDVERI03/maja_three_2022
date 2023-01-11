import type { Actions, PageServerLoad } from "./$types";
import { invalid, redirect } from "@sveltejs/kit";
import { database } from "$lib/database"

export const load: PageServerLoad = async ({ params, locals }) => {
    //Here i can do stuff
    const user = await database.user.findUnique({ where: { profileURL: params.slug } })
    const posts = await database.post.findMany({ where: { authorId: user?.id } })
    const own = user?.session == locals.userid
    //let post = posts.find((e)=>e.id==params.slug)

    return { name: user?.username, img: user?.profileimage, bio: user?.profilebio, posts, id: user?.id, own}
}

export const actions: Actions = {
    directmessage: async ({ locals, request }) => {
        const form = await request.formData()
        const mg = await database.messagegroup.findFirst({
            where: {
                members: {
                    every: {
                        OR: [{
                            id: Number(form.get("id")?.toString()),
                        }, {
                            session: locals.userid
                        }]
                    },
                }
            }
        })


        if (mg) {
            //Open MessageGroup
            throw redirect(307, `/dm/${mg.id}`)
        } else {
            //Create new MessageGroup
            const newmg = await database.messagegroup.create({ data: {members: {connect: [{id: Number(form.get("id")?.toString())}, {session: locals.userid}]}}})
            throw redirect(307, `/dm/${newmg.id}`)
        }
    }
}