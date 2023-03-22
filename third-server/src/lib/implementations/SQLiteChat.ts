import { database } from "$lib/database";
import type { chatLoadResult, chater } from "$lib/interfaces/chat";
import { _streams } from "$lib/interfaces/chat";




export class SQLiteChater implements chater {
    async Load(slug: string, session: string): Promise<chatLoadResult> {
        const self = await database.user.findUniqueOrThrow({ where: { session } })
        const mg = await database.messagegroup.findUniqueOrThrow({ where: { id: slug }, include: { messages: { include: { author: { select: { username: true } } } }, members: { select: { username: true, profileimage: true, profileURL: true } } } })
        mg.messages.forEach((e) => {
            e.own = e.authorId == self.id
        })
        return { messages: mg.messages, members: mg.members }
    }
    async Message(form: FormData, slug: string, session: string): Promise<boolean> {
        try {
            const self = await database.user.findUniqueOrThrow({where: {session: session}})
            if (form.get("message")?.toString()) {
                const message = await database.message.create({data: {content: form.get("message")?.toString()!, authorId: self.id, groupId: slug}, include: {author: {select: {username: true}}}})
                for (let session in _streams) {
                    if (_streams[session].dm == slug) {
                        _streams[session].controller.enqueue(JSON.stringify(message))
                    }
                }
                return true
            }
        } catch (e){
            console.error(e)
            return false
        }
        return false
    }
}