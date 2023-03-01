import { database } from "$lib/database";
import type { Auth, LoginResult } from "$lib/interfaces/auth";
import * as crypto from "crypto"

export class SQLAuth implements Auth {
    async login(form: FormData): Promise<LoginResult> {

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
				await database.user.update({where:{username: username},data:{session: sessionid}})
				return {success: {session: sessionid}}
				//collection.updateOne({username: USER.username}, {$set: {sessionid}})
		
			} else return {error: {code: 400, data: "wrong credentials"}}
			
		 } else return {error: {code: 400, data:"User does not exist"}}
    }
}