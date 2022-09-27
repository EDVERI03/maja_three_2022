import type { Handle } from '@sveltejs/kit';
import * as database from "$lib/database"

// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {

	let userid = event.cookies.get('userid');
	
	const client = await database.connect();
    const db = client.db("test"); 
    const collection = db.collection("users");

	if (userid) {
		event.locals.userid = userid;
	} else {
		event.locals.tempid = crypto.randomUUID()
	}

	return resolve(event);
};

