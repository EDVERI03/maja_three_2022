import { parse } from 'cookie';

import * as database from '$lib/database.js';


/** @type {import('./$types').Action} */
export async function POST({ request }) {
    const req = await request.formData();
    const client = await database.connect();
    const db = client.db("test"); 
    const collection = db.collection("users");

    

    if(req.get("username") && req.get("password")) {
        if (!(await collection.distinct("username")).includes(req.get("username"))) {
            collection.insertOne({"username": req.get("username"), "password": req.get("password")});
        } else return {errors: {message: "User already exists"}}
    } else return {errors: {message: "Not valid credentials"}}

    const body = {}

    const cookies = parse(request.headers.get('cookie') || '');

    console.log(cookies)

    return {errors: {message: "success"}}

}

/** @type {import('./$types').Action} */
export async function DELETE({ request }) {

    console.log("ABC")

    const cookies = parse(request.headers.get('cookie') || '');

    console.log("help " + cookies.token)


    const client = await database.connect();
    const db = client.db("test"); 
    const collection = db.collection("users");

    if (cookies!={}) {
        await collection.deleteOne({"username":cookies["token"]})
    }

    const body = { "register - delete": "123" }
}
