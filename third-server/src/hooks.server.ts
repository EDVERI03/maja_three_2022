import type { Handle } from '@sveltejs/kit';
import {database} from "$lib/database"

// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {

	let userid = event.cookies.get('userid');
	


	if (userid) {
		event.locals.userid = userid;
	} else {
		event.locals.tempid = crypto.randomUUID()
	}

	return resolve(event);
};

