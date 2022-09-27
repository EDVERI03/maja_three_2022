import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import * as database from '$lib/database';
const data=new Map<string,number>()

export const load: PageServerLoad = ({locals})=>{
	return {tries: data.get(locals.userid)??0}

}

export const actions: Actions = {
	click: async ({ request, locals, cookies }) => {
		
		data.set(locals.userid,(data.get(locals.userid)??0) + 1)

	},
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
			const result = await collection.deleteOne({"username":cookies.get("userid")})
			if (!result.acknowledged || result.deletedCount!=1) {
				cookies.delete('userid')
			} else return invalid(400, {message:"Account could not be deleted"})
		} else return invalid(400, {message:"Obama does not exist"})

		
		throw redirect(302, '/register')

	},
};
