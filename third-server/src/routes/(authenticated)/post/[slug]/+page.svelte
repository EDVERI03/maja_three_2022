<script lang="ts">
    import { enhance } from "$app/forms";
import type { ActionData, PageServerData } from ".svelte-kit/types/src/routes/(authenticated)/post/[slug]/$types";


export let data:PageServerData; 
$: post = data.post;
</script>

<hr>
<div>
    <img alt="{post?.title}" src="{post?.image}">
    <p>{post?.title}</p>
    <p> posted by {post?.author}</p>
    <hr>
    <div>
        <form use:enhance={(e)=>e.form.reset()} action="?/comment" method="POST">
        <input type="text" name="comment" placeholder="comment">
        <button type="submit">reply</button>
        </form>
        {#if post?.replies}
            {#each post?.replies as reply}
                <p>{reply}</p>
            {/each}
        {/if}
    </div>
</div>