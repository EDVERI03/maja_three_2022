import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {database} from '$lib/database';
import { disconnect } from 'process';
const data=new Map<string,number>()

export const load: PageServerLoad = ({locals})=>{
	return {tries: data.get(locals.userid)??0}

}

export const actions: Actions = {
	logout: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement register
		// Check if ustername already exist etc.
		cookies.delete('userid')
		throw redirect(302, '/login')

	},
	deleteaccount: async ({ locals, cookies }) => {
		await database.user.delete({where: {session: locals.userid}})
		cookies.delete('userid')
		throw redirect(302, '/login')
	},
	deletehistory: async ({locals}) => {
		await database.user.update({where: {session: locals.userid}, data: {visited: {set: []}}})
	}
};
