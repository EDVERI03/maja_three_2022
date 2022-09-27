import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as database from '$lib/database'

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const form = await request.formData(); 

		// TODO: Implement register
		// Check if ustername already exist etc.

		const client = await database.connect();
    	const db = client.db("test");  
    	const collection = db.collection("users");

		if(form.get("username") && form.get("password")) {
			if (!(await collection.distinct("username")).includes(form.get("username"))) {
				collection.insertOne({"username": form.get("username"), "password": form.get("password")});
			} else return invalid(400, { message: "Username Taken" })
		} else return invalid(400, { message: "invalid Credentials" })

		throw redirect(302, "/login")

	},
};
