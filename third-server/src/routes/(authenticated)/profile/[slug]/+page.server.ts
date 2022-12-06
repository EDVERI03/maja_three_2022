import type { Actions, PageServerLoad } from "./$types";
import { invalid } from "@sveltejs/kit";
import { database } from "$lib/database"

export const load: PageServerLoad = async ({ params, locals }) => {
    //Here i can do stuff
    const user = await database.user.findUnique({ where: { profileURL: params.slug }})
    const posts = await database.post.findMany({where: {authorId: user?.id}})
    //let post = posts.find((e)=>e.id==params.slug)

    console.log(user?.username + " " + user?.profileimage + " " + user?.profilebio)
    return {name: user?.username, img: user?.profileimage, bio: user?.profilebio, posts}
}