import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async ({ cookies }) => {
        cookies.delete('sessionId')
	},
};