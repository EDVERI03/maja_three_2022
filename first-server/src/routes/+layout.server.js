import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {

  return {
    username: locals.username
  }

}