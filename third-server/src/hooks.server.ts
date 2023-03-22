import type { Handle } from '@sveltejs/kit';
import {database} from "$lib/database"



// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {

	let userid = event.cookies.get('userid');

	if (event.request.method === "OPTIONS") {
		return new Response(null, {
		headers: {
		"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
		"Access-Control-Allow-Origin": "*",
		},
		});
		}
	


	if (userid) {
		event.locals.userid = userid;
	} else {
		event.locals.tempid = crypto.randomUUID()
	}
	
	const response = await resolve(event);
	response.headers.append("Access-Control-Allow-Origin", `*`);
	return response;
};



