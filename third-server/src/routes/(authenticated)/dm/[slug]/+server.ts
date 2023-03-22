import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database } from "$lib/database";
import { _streams } from "$lib/interfaces/chat";


export const GET: RequestHandler = async ({ locals, params }) => {
  
    const stream = new ReadableStream<string>({
      start(controller) {
        /* save the controller for the stream so that we can */
        /* enqueue messages into the stream */
        _streams[locals.userid!] = { controller, dm: params.slug };
      },
      cancel() {
        /* remove the stream */
        delete _streams[locals.userid!];
      },
    });
  
    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream",
      },
    });
  };