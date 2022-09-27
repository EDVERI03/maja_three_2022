<script lang="ts">
    import { enhance } from "$app/forms";
	import type { ActionData, PageServerData } from "./$types";

	export let data: PageServerData;
	export let form: ActionData;
</script>

<form use:enhance method="POST" action="?/login">
	<p>{data.tries}</p>
	<input type="text" name="username" />
	<input type="password" name="password" />
	<button>LOGIN</button>
	{#if form?.message}
		<p>{form?.message}</p>
	{/if}
</form>
