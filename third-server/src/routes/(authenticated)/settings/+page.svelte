<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageServerData } from "./$types";


	export let data: PageServerData
</script>

<div class="fill">
	<h1>Settings</h1>
	
	<form method="POST" action="?/logout" >
		<button class="button">LOGOUT</button>
	</form>
	
	<br>

	<form method="POST" action="?/deleteaccount">
		<button class="button">DELETE ACCOUNT</button>
	</form>

	<br>
	
	<form method="POST" action="?/deletehistory">
		<button class="button">DELETE HISTORY</button>
	</form>

	<br>

	<a href="/edit-my-profile">
		<button class="button">EDIT MY PROFILE</button>
	</a>

</div>
