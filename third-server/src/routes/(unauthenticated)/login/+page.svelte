<script lang="ts">
    import { enhance } from "$app/forms";
	import type { ActionData, PageServerData } from "./$types";
	export let form: ActionData;

	

</script>

<div class="frame">
	<div class="spacer">
		<form use:enhance method="POST" action="?/login">
			<p>Please log in</p>
			<hr class="break">
			<input type="text" name="username" class="textfield" placeholder="Username"/>
			<input type="password" name="password" class="textfield" placeholder="Password"/>
			<button class="button">LOGIN</button>
			{#if form?.message}
				<p>{form?.message}</p>
			{/if}
		</form>
	</div>
</div>
