import type { Actions, PageServerLoad } from "./$types";
import {posts} from '$lib/state'; 
import { invalid } from "@sveltejs/kit";
import * as database from "$lib/database"
import { Db } from "mongodb";

export const load: PageServerLoad = ({})=>{
    //Here i can do stuff
}

export const actions:Actions = {
    post: async ({locals, request}) => {
        const form = await request.formData()

        const client = await database.connect();
        const db = await client.db("test")
        const collection = db.collection("posts")

        const username = (await collection.findOne({sessionid: locals.userid}))?.username
        
        if(username) {
            if (form.get("image") && form.get("title")) {
                /* posts.push({id: crypto.randomUUID(),
                     author: (cookies.get("userid")||"missing person"), 
                     image: (form.get("image")?.toString()||""), 
                     title:(form.get("title")?.toString()||"obama backflip"), 
                     replies:[]})
                console.log(posts) */
                collection.insertOne({_id:crypto.randomUUID(),
                     author: username,
                     image: (form.get("image")?.toString()||""), 
                title:(form.get("title")?.toString()||"obama backflip"), 
                replies:[]})
            } else return invalid (400, {message:"Invalid Post"})
        } else return invalid (400, {message:"user not logged in"})
    }
}