import { database } from "$lib/database";
import type { chatLoadResult, chater } from "$lib/interfaces/chat";


export class SQLiteChater implements chater{
    async Load(slug: string, session: string): Promise<chatLoadResult> {
        const self = await database.user.findUniqueOrThrow({where: {session}})
    const mg = await database.messagegroup.findUniqueOrThrow({where:{id: slug}, include: {messages: {include: {author: {select: {username: true}}}}, members: {select: {username: true, profileimage: true, profileURL: true}}}})
    mg.messages.forEach((e) => {
        e.own = e.authorId == self.id})
    return {messages: mg.messages, members: mg.members}
    }

}