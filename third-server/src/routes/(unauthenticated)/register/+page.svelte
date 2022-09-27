<script>

    import { enhance } from "$app/forms";

</script>
<form use:enhance method="POST" action="?/register">
	<input type="text" name="username" />
	<input type="password" name="password" />
	<button>REGISTER</button>
</form>
