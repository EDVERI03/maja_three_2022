import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {database} from "$lib/database"

export const load: LayoutServerLoad = async ({ locals }) => {
    
    if (locals.sessionId) {
        const user = await database.user.findUnique({where: {session: locals.sessionId}})
        return {
            displayname: user?.username,
            isAdmin: user?.admin
        }
    } else {
        throw redirect(302, '/login')
    }


}