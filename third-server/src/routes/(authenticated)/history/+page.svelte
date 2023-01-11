<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data:PageServerData;
</script>

<div class="fill"> 
    <h1>History</h1>
    {#if data.visited[0]}
    <div class="box flex-column" >
        <div class="flex-scroll">
            {#each data.visited as post}
            <a href="/post/{post.id}" style="scroll-snap-align: center;">
                <div class="transbox flex-column">
                    <div class="window">
                        <img src="{post.content}" alt="post: {post.title}" class="previewimg">
                    </div>
                    <p>{post.title} | {post.rating}</p>
                </div>
            </a>
            {/each}
            
        </div>
    </div>
    {:else}
    <p>It's empty here...</p>
    {/if}
</div>