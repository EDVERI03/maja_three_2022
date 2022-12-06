<script lang="ts">
        import { enhance } from "$app/forms";
import type { ActionData, PageServerData } from "./$types";

    export let data:PageServerData; 
</script>

<div class="fill"> 
    <br>
    <img src="{data.img}" alt="{data.name}" class="profileimglarge">
    <h1>{data.name}</h1>
    <br>
    {#if data.bio}
    <div class="box">
        <p>{data?.bio}</p>
            
    </div>
    {/if}
    <br>
    {#if data.posts[0]}
    <div class="box flex-column" >
        <h1>{data.name}'s posts:</h1>
        <div class="flex-scroll">
            {#each data.posts as post}
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
    {/if}
    <br>
</div>