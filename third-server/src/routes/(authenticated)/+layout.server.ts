import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import * as database from "$lib/database"


export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    const client = await database.connect()
    const db =  client.db("test")
    const collection = db.collection("users")

    const user = await collection.findOne({sessionid: locals.userid})

    if (locals.userid) {
        return {
            displayname: user?.username,
        }
    } else {
        throw redirect(302, '/login')
    }

}