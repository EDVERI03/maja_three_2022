import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as database from '$lib/database'
import * as crypto from 'crypto'

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const form = await request.formData(); 

		// TODO: Implement register
		// Check if ustername already exist etc.

		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto.pbkdf2Sync(form.get("password")?.toString()??"", salt, 1000, 64, 'sha512').toString('hex')
		
		const client = await database.connect();
    	const db = client.db("test");  
    	const collection = db.collection("users");

		if(form.get("username") && form.get("password")) {
			if (!(await collection.distinct("username")).includes(form.get("username"))) {
				collection.insertOne({"username": form.get("username"), "hash": hash, "salt": salt});
			} else return invalid(400, { message: "Username Taken" })
		} else return invalid(400, { message: "invalid Credentials" })

		throw redirect(302, "/login")

	},
};
