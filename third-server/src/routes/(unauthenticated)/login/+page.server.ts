import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { database } from '$lib/database'
import * as crypto from "crypto"
import { SQLAuth } from '$lib/implementations/SQLiteAuth';


const data=new Map<string,number>()

export const load: PageServerLoad = ({locals})=>{
	return {tries: data.get(locals.tempid)??0}	
}

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {

		const form =  await request.formData()
		const auth = new SQLAuth
		const result = await auth.login(form)
		
		if (result.success) {
			cookies.set('userid', result.success.session, {
				path: '/',

				httpOnly: true, // optional for now
				sameSite: 'strict',// optional for now
				secure: process.env.NODE_ENV === 'production', // optional for now
				maxAge: 12000 //
		})
		throw redirect(302, "/")
		} else if (result.error) {
			return fail(result.error.code, result.error.data)
		}
		/* 
		const form = await request.formData();
		data.set(locals.userid,(data.get(locals.tempid)??0) + 1)

		const username = form.get("username")?.toString()

		// TODO: Implement login
		// Check if password and username
		// exists and is correct 
 
		if ((await database.user.findFirst({where: {username: username}}))) {
			const USER = await database.user.findFirst({where: {username: username}})
			
			const salt = USER?.salt||""
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
				//collection.updateOne({username: USER.username}, {$set: {sessionid}})
				await database.user.update({where:{username: username},data:{session: sessionid}})
		
			} else return error(400, { message: "Wrong password" })
			
		 } else return error(400, { message: "User does not exist" })

		
		throw redirect(302, '/')
 */
	},
};
