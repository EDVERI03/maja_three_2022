import { database } from "$lib/database";
import type { Auth, LoginResult } from "$lib/interfaces/Auth";
import * as crypto from "crypto"

export class SQLiteAuth implements Auth {
    async login(form: FormData): Promise<LoginResult> {

        const email = form.get("email")!.toString()
        const password = form.get("password")!.toString()

        const user = await database.user.findUniqueOrThrow({where: {email}})
        const comphash = crypto.pbkdf2Sync(password.toString()??"", user.salt, 1000, 64, 'sha512').toString('hex')

        if (comphash == user.hash) {
            await database.user.update({where: {email}, data:{session: crypto.randomUUID()}})
            return {success: {session: user.session}}
        }

        return {error: {code: 302, data: "unimplemented function"}}
    }

    async register(form: FormData): Promise<LoginResult> {

        const username = form.get("username")!.toString()
        const email = form.get("email")!.toString()
        const password = form.get("password")!.toString()
        const repeat = form.get("repeat")!.toString()
        if (password != repeat) {
            return {error: {code:400, data: "Password Not Repeated Correctly."}}
        }
        if (email != undefined && username != undefined && password != undefined) {
            if (!(await database.user.findUnique({where: {email}}))) {
                const salt = crypto.randomBytes(16).toString('hex');
                const hash = crypto.pbkdf2Sync(password.toString()??"", salt, 1000, 64, 'sha512').toString('hex')

                const user = await database.user.create({data: {
                    username, salt, hash, email, session: crypto.randomUUID()
				},})

                return {success: {session: user.session}}

            } else {
                return {error: {code: 400, data: "User Already Registered for this Email Address."}}
            }
        }
        
        return {error: {code: 400, data: "Invalid Input."}}
    }
}