import type { Actions, PageServerLoad } from "./$types";
import { invalid } from "@sveltejs/kit";
import * as database from "$lib/database"

export const load: PageServerLoad = async ({params, locals})=>{
    //Here i can do stuff

    
    const client = await database.connect();
    const db = client.db("test"); 
    const users = db.collection("users");
    const posts = db.collection("posts")
    const user = await users.findOne({sessionid:locals.userid})

    //let post = posts.find((e)=>e.id==params.slug)
    
    let post = (await posts.findOne({_id:params.slug}))


    

    if (user?.username && post?._id) {
        await users.updateOne({username:user.username}, {$set: {"lastVisited":[post._id].concat(user?.lastVisited)}})
    }

    return {post};
    
}

export const actions:Actions = {
    comment: async ({request, params}) => {
        const client = await database.connect();
        const db = client.db("test"); 
        const collection = db.collection("posts");

        const POST = (await collection.findOne({_id:params.slug}))
        const form = await request.formData()
        
        if (form.get("comment") != null) {
            collection.updateOne({_id: params.slug}, {$set: {replies: [form.get("comment")].concat(POST?.replies??[])}})
            //POST?.replies.push((form.get("comment")?.toString() || ""))
        } else return invalid(400, {messages: "Reply invalid"});
        return;
    }
}