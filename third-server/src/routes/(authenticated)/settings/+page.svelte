<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageServerData } from "./$types";


	export let data: PageServerData
</script>

<p>{data.tries}</p>

<form use:enhance method="POST" action="?/click">
	<button>Click Me</button>
</form>

<form method="POST" action="?/logout">
	<button>LOGOUT</button>
</form>


<form method="POST" action="?/deleteaccount">
	<button>DELETE ACCOUNT</button>
</form>

<form method="POST" action="?/deletehistory">
	<button>DELETE HISTORY</button>
</form>
