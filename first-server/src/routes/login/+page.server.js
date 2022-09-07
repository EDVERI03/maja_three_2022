import { error, json } from '@sveltejs/kit';
import { serialize } from 'cookie';

import * as database from '$lib/database.js';

/** @type {import('@sveltejs/kit').Action} */
export async function POST({ request, setHeaders }) {
    const req = await request.formData();
    console.log(req);

    const client = await database.connect();
    const db = client.db("test"); 
    const collection = db.collection("users");

    // check if a user exists in db where username and password matches

    if ((await collection.distinct("username")).includes(req.get("username"))) {
       const USER = await collection.findOne({"username":req.get("username")})
       console.log(USER)
       if (USER && USER["password"] == req.get("password")){
        setHeaders({
            'set-cookie': serialize('token', USER["username"], {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 120 // two minutes
            })
        });
       } else return {errors: {message: "Wrong password"}}
       
    } else return {errors: {message: "User does not exist"}}

    return {errors: {message: "success"}}
}

/** @type {import('@sveltejs/kit').Action} */
export async function DELETE({ setHeaders }) {

    console.log("logging out")

    setHeaders({
        'set-cookie': serialize('token', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0 // one minute
        })
    });

    
}
