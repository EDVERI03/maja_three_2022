<script>
import { goto } from "$app/navigation";


    /**
     * @type any
     */
     export let errors;
</script>

<div>
    <h1>Login</h1>

    <form method="POST">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit">
        {#if errors?.message}
            <p>{errors.message}</p>
        {/if}
    </form>

    <h1>LogOut</h1>

    <button type="submit" on:click={() => {fetch("/login", {method: "DELETE"}).then(()=>goto("/",{replaceState: true}))}}> LogOut</button>

</div>