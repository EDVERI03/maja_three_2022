<script lang="ts">
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
</script>

<nav class="navbar">
    <a href="/" class="navlink">Home</a>

    <a href="/settings" class="navlink">Settings</a>

    <a href="/posts" class="navlink">Posts</a>
    
    <a href="/history" class="navlink">History</a>
    
    <a href="/profile/{data.profileURL}">
        <div>
            <p>{data?.displayname}</p>
            <img src={data.displayimage} alt="Profile">
        </div>
    </a>
</nav>

<slot />
