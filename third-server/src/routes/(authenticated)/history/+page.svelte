<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data:PageServerData;

    function findTitle (postid: string) {
        console.log((data?.posts?.find(o=> o.id == postid))?.title)
        return (data?.posts?.find(o=> o.id == postid))?.title
    }

</script>

<h1>History</h1>

{#each data.history as postid}
    {#if (data.posts && data.posts.some(o=> o.id == postid))}
    <a href={"post/"+postid}>{findTitle(postid)}</a>
    <br>
    {:else}
    <a href={"post/"+postid}>[DELETED]</a>
    <br>
    {/if}
{/each}
