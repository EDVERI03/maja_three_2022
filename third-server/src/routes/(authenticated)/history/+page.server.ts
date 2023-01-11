import type { Actions, PageServerLoad } from "./$types";
import { invalid } from "@sveltejs/kit";
import {database} from "$lib/database"
import { title } from "process";

export const load: PageServerLoad = async ({params, locals})=>{
    const userhistory = await database.user.findUniqueOrThrow({where:{session: locals.userid}, include: {visited: {select: {title: true, id: true, content: true, rating: true}}}})

    return {visited: userhistory.visited};
}