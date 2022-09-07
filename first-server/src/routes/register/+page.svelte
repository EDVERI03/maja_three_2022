<script>
    /**
     * @type {import('./$types').Errors}
     */
     export let errors;
</script>

<div>
    <h1>Registration</h1>

    <form method="POST">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit">
        {#if errors?.message}
            <p>{errors.message}</p>
        {/if}
    </form>

    <h1>Delete User</h1>

    
    <button type="submit" on:click={() => {fetch("/register", {method: "DELETE"})}}> Delete User</button>
    

</div>