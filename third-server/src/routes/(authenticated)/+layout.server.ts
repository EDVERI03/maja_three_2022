import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {database} from "$lib/database"
import { profile } from 'console';


export const load: LayoutServerLoad = async ({ locals, cookies }) => {

  
    // const user = await collection.findOne({sessionid: locals.userid})
    
    if (locals.userid) {
        const user = await database.user.findUnique({where: {session: locals.userid}})
        return {
            displayname: user?.username,
            displayimage: user?.profileimage,
            profileURL: user?.profileURL
        }
    } else {
        throw redirect(302, '/login')
    }


}