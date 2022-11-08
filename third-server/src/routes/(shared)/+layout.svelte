<script lang="ts">
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
</script>

<nav class="navbar">
    {#if data?.userid}
        <a href="/">Home</a>
        <a href="/settings">Settings</a>
        <a href="/posts">Posts</a>
        <a href="/history">History</a>
    {:else}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {/if}

    <a href="/info">Info</a>
</nav>

<slot />
