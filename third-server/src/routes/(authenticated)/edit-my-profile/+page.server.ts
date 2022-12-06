import type { Actions, PageServerLoad } from "./$types";
import {posts} from '$lib/state'; 
import { database } from "$lib/database"

export const load: PageServerLoad = async ({})=>{ 
    
}

export const actions: Actions = { 
    update: async ({request, locals}) => {
        const form = await request.formData()
        const newBio = form.get("bio")?.toString()
        const newImg = form.get("img")?.toString()

        console.log(newBio)
        
        if (newBio) {
            console.log("I do things")
            await database.user.update({where: {session: locals.userid}, data: {profilebio: newBio}})
        }
        if (newImg) {
            await database.user.update({where: {session: locals.userid}, data: {profileimage: newImg}})
        }
        return
    }
}