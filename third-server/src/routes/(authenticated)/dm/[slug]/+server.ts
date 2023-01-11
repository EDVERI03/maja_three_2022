import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database } from "$lib/database";

export const streams: Record<string, {controller: ReadableStreamDefaultController<string>, dm: string}> = {}

export const GET: RequestHandler = async ({ locals, params }) => {
  
    const stream = new ReadableStream<string>({
      start(controller) {
        /* save the controller for the stream so that we can */
        /* enqueue messages into the stream */
        streams[locals.userid!] = { controller, dm: params.slug };
      },
      cancel() {
        /* remove the stream */
        delete streams[locals.userid!];
      },
    });
  
    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream",
      },
    });
  };