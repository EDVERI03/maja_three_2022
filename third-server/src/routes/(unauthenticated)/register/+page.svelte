<script lang="ts">

    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

	export let form: ActionData;

</script>

<div class="frame">
	<div class="spacer">
		<form use:enhance method="POST" action="?/register" >
			<p>Create an account</p>
			<hr class="break">
			<input type="text" name="username" placeholder="username" class="textfield"/>
			<input type="password" name="password" placeholder="password" class="textfield"/>
			<button class="button">REGISTER</button>
			{#if form?.body}
				<p>{form?.body}</p>
			{/if}
		</form>

	</div>

</div>
