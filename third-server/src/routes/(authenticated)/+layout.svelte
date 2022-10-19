<script lang="ts">
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
</script>

<nav>
    <a href="/">Home</a>

    <a href="/settings">Settings</a>

    <a href="/posts">Posts</a>
    
    <a href="/history">History</a>

    <a href="/info">Info</a>

</nav>
<p>{data?.displayname}</p>

<slot />
