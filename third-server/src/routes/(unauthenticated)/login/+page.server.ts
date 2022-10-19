import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import * as database from '$lib/database'
import type Page from './+page.svelte';
import * as crypto from "crypto"

const data=new Map<string,number>()

export const load: PageServerLoad = ({locals})=>{
	return {tries: data.get(locals.tempid)??0}

}

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await request.formData();
		data.set(locals.userid,(data.get(locals.tempid)??0) + 1)

		// TODO: Implement login
		// Check if password and username
		// exists and is correct 

		const client = await database.connect();
    	const db = client.db("test"); 
    	const collection = db.collection("users");

		
		if ((await collection.distinct("username")).includes(form.get("username"))) {
			const USER = await collection.findOne({"username":form.get("username")})
			
			const salt = USER?.salt.toString()
			const hash = crypto.pbkdf2Sync(form.get("password")?.toString()??"", salt, 1000, 64, 'sha512').toString('hex')

			if (USER && USER.hash == hash){
				const sessionid = crypto.randomUUID()
				cookies.set('userid', sessionid, {
					path: '/',

					httpOnly: true, // optional for now
					sameSite: 'strict',// optional for now
					secure: process.env.NODE_ENV === 'production', // optional for now
					maxAge: 12000 //
				})
				collection.updateOne({username: USER.username}, {$set: {sessionid}})
		
			} else return invalid(400, { message: "Wrong password" })
			
		 } else return invalid(400, { message: "User does not exist" })

		
		throw redirect(302, '/')

	},
};
