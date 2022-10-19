import type { Actions, PageServerLoad } from "./$types";
import { invalid } from "@sveltejs/kit";
import * as database from "$lib/database"

export const load: PageServerLoad = async ({params, locals})=>{
    //Here i can do stuff

    const client = await database.connect();
    const db =  client.db("test")
    const usercollection =  db.collection("users")

    const user = await usercollection.findOne({sessionid: locals.userid})
    
    const postcollection = db.collection("posts") 
    const posts = (await postcollection.find({}).toArray()).map((e)=> {return {title:e.title,id:e._id.toString(),author:e.author}})
    let history:string[] = []

    if (user && user["lastVisited"]) {
        history = user["lastVisited"]
        
    } else {
        history = []
    }

    
    return {posts, history}

}