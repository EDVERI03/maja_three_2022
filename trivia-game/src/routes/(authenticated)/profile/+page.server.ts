import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SQLiteScoreboard } from '$lib/implementations/SQLiteScoreboard';

export const load: PageServerLoad = async ({ locals }) => {
    const Scoreboard = new SQLiteScoreboard()
    const SRHighScore = await Scoreboard.GetPersonalHighscoreOfType(locals.sessionId ,"SR")
    const SurvivalHighscore = await Scoreboard.GetPersonalHighscoreOfType(locals.sessionId, "Survival")
    return ({SRHighScore, SurvivalHighscore})
}

export const actions: Actions = {
	logout: async ({ cookies }) => {
        cookies.delete('sessionId')
	},
};