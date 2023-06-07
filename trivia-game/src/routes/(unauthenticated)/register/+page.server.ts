import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { SQLiteAuth } from '$lib/implementations/SQLiteAuth';

export const actions: Actions = {
	register: async ({ request, cookies }) => {
		const form = await request.formData(); 
        
        const auth = new SQLiteAuth()

        const result = await auth.register(form)

        if (result.success) {
            cookies.set('sessionId', result.success.session, {
				path: '/',

				httpOnly: true, // optional for now
				sameSite: 'strict',// optional for now
				secure: process.env.NODE_ENV === 'production', // optional for now
				maxAge: 12000 //
		})
			throw redirect(302, "/")
		} else if (result.error) {
            return fail(result.error.code, {result :result.error.data})
        }
	},
};
