import * as database from "$lib/database"
import * as cookie from 'cookie';



/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    
    // Check if the headers has userid cookie set
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

    // set the locals object
    event.locals.username = cookies["token"];

    console.log("local"+ event.locals)
    console.log("usernameFLocal"+event.locals.username)

    const response = await resolve(event);
    return response;
};