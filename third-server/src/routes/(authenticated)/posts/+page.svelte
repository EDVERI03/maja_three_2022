<script lang="ts">
import type { PageServerData } from "./$types";

    export let data: PageServerData;
    console.log(data)

</script>

<h1>Posts</h1>
<hr>
<a href="/posts/make-a-post">Make a Post</a>
<hr>
<div>
    {#each data.posts as post}
        <a href="/post/{post.id}">
            {post.title + " - " + post.author}
        </a>
        <br>
    {/each}

</div>