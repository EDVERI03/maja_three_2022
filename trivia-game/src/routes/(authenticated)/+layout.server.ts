import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {database} from "$lib/database"

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
    
    if (locals.sessionId) {
        const user = await database.user.findUnique({where: {session: locals.sessionId}})
        return {
            displayname: user?.username,
        }
    } else {
        throw redirect(302, '/login')
    }


}