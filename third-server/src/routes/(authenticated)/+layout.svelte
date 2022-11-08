<script lang="ts">
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
</script>

<nav class="navbar">
    <a href="/">Home</a>

    <a href="/settings">Settings</a>

    <a href="/posts">Posts</a>
    
    <a href="/history">History</a>

    <a href="/info">Info</a>
    <div>
        <p>{data?.displayname}</p>
        <img src="https://static.wikia.nocookie.net/jerma-lore/images/e/e3/JermaSus.jpg/revision/latest/top-crop/width/360/height/360?cb=20201206225609" alt="Profile">
    </div>
</nav>

<slot />
