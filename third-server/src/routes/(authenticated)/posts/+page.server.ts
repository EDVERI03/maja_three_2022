import type { PageServerLoad } from "./$types";
import {posts} from '$lib/state'; 
import * as database from "$lib/database"

export const load: PageServerLoad = async ({})=>{
    //Here i can do stuff

    const client = await database.connect()
    const db = client.db("test")
    const collection = db.collection("posts")
    const posts = (await collection.find({}).toArray()).map((e)=> {return {title:e.title,id:e._id,author:e.author}})
    return {posts}
}
