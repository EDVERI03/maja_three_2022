<script>
    /**
     * @type {import('./$types').LayoutData}
     */
    export let data;

</script>

<div style="background-color: gray;">
    {#if data.username != undefined}
    <p>{data.username}</p>
    {/if}
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    <a href="/">Count</a>
</div>

<slot></slot>