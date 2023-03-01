import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import {database} from '$lib/database'
import * as crypto from 'crypto'
import { Session } from 'inspector';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const form = await request.formData(); 

		// TODO: Implement register
		// Check if ustername already exist etc.

		const username = form.get("username")?.toString()
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto.pbkdf2Sync(form.get("password")?.toString()??"", salt, 1000, 64, 'sha512').toString('hex')
		
		

		if(username && hash && salt) {
			if (!(await database.user.findUnique({where: {username}}))) {
				const user = await database.user.create({data: {
					username,
					hash,
					salt,
					session: crypto.randomUUID()
				},})
				
				//collection.insertOne({"username": form.get("username"), "hash": hash, "salt": salt});
			} else return error(400, { message: "Username Taken" })
		} else return error(400, { message: "invalid Credentials" })

		throw redirect(302, "/login")

	},
};
