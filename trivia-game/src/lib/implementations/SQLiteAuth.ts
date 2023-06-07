import { database } from "$lib/database";
import type { Auth, LoginResult } from "$lib/interfaces/Auth";
import * as crypto from "crypto"

export class SQLiteAuth implements Auth {
    async login(form: FormData): Promise<LoginResult> {

        const username = form.get("username")!.toString()
        const password = form.get("password")!.toString()

        try {
            const user = await database.user.findUniqueOrThrow({where: {username}})
            const comphash = crypto.pbkdf2Sync(password.toString()??"", user.salt, 1000, 64, 'sha512').toString('hex')
    
            if (comphash == user.hash) {
                const session = crypto.randomUUID()
                await database.user.update({where: {username}, data:{session}})
                return {success: {session}}
            }

        } catch {
            return {error: {code: 302, data: "User not found"}}

        }

        return {error: {code: 302, data: "User not found"}}
    }

    async register(form: FormData): Promise<LoginResult> {
        console.log("help")
        const username = form.get("username")!.toString()
        const password = form.get("password")!.toString()
        const repeat = form.get("repeat")!.toString()
        if (password != repeat) {
            console.log("me")
            return {error: {code:400, data: "Password Not Repeated Correctly."}}
        }
        if ( username != undefined && password != undefined) {
            console.log("I'm")
            if (!(await database.user.findUnique({where: {username}}))) {
                console.log("Dying")
                const salt = crypto.randomBytes(16).toString('hex');
                const hash = crypto.pbkdf2Sync(password.toString()??"", salt, 1000, 64, 'sha512').toString('hex')
                const session = crypto.randomUUID()
                const user = await database.user.create({data: {
                    username, salt, hash, session
				},})

                return {success: {session}}

            } else {
                return {error: {code: 400, data: "User Already Registered for this Email Address."}}
            }
        }
        
        return {error: {code: 400, data: "Invalid Input."}}
    }
}