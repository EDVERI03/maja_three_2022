import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as database from '$lib/database';

export const actions: Actions = {
	logout: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement register
		// Check if ustername already exist etc.
		cookies.delete('userid')
		throw redirect(302, '/login')

	},
	deleteaccount: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement delete account
		// Check if ustername already exist etc.

		const client = await database.connect();
    	const db = client.db("test"); 
    	const collection = db.collection("users");
		if((await collection.distinct("username")).includes(cookies.get("userid"))) {
			await collection.deleteOne({"username":cookies.get("userid")})
		} else return invalid(400, "Obama does not exist")
		cookies.delete('userid')
		throw redirect(302, '/register')

	},
};
