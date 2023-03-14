import type { message, user } from "@prisma/client";
export type loadResult = {members: user[], messages: message[]}

export type chatLoadResult = {messages: message[], members: {username: string, profileimage: string, profileURL: string }[]} 

export interface chater {
    /**
     * Authenticates the user and returns a session token or an error object with proper HTTP code.
     * @param slug Slug for the page which data should be accessed.
     * @param session Session of the current user. 
     */
    Load (slug: string, session: string): Promise<chatLoadResult>
}