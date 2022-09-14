import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as database from '$lib/database'

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement login
		// Check if password and username
		// exists and is correct

		const client = await database.connect();
    	const db = client.db("test"); 
    	const collection = db.collection("users");

		if ((await collection.distinct("username")).includes(form.get("username"))) {
			const USER = await collection.findOne({"username":form.get("username")})
			console.log(USER)
			if (USER && USER["password"] == form.get("password")){
				cookies.set('userid', USER["username"], {
					path: '/',
					httpOnly: true, // optional for now
					sameSite: 'strict',// optional for now
					secure: process.env.NODE_ENV === 'production',// optional for now
					maxAge: 120 //
				})
		
			} else return invalid(400, { message: "Wrong password" })
			
		 } else return invalid(400, { message: "User does not exist" })

		if (form.get('username') == "william") {
			return invalid(400, { message: "username invalid" })
		}

		
		throw redirect(302, '/')

	},
};
