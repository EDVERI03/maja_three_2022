<script lang="ts">
    import { posts } from "$lib/state";
import type { PageServerData } from "./$types";

    export let data: PageServerData;
    console.log(data)

    const timesortposts = Array.from(data.posts).reverse()
    const ratesortposts = Array.from(data.posts).sort((a, b) => b.rating - a.rating)
    

</script>

<div class="fill">
    <h1>Postboard</h1>
    <hr>
    <div class="box">
        <a href="/posts/make-a-post">Make a Post</a>
    </div>
    <hr>
    <div class="box flex-column">
        <h1>Posts:</h1>
        <div class="flex-scroll">
            {#each data.posts as post}
                <a href="/post/{post.id}" style="scroll-snap-align: center;">
                    <div class="transbox flex-column">
                        <div class="window">
                            <img src="{post.content}" alt="{post.title}" class="previewimg">
                        </div>
                        <p>{post.title} | {post.rating}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
    <br>
    <div class="box flex-column">
        <h1>Recent Posts:</h1>
        <div class="flex-scroll">
            {#each timesortposts as post}
                <a href="/post/{post.id}" style="scroll-snap-align: center;">
                    <div class="transbox flex-column">
                        <div class="window">
                            <img src="{post.content}" alt="{post.title}" class="previewimg">
                        </div>
                        <p>{post.title} | {post.rating}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
    <br>
    <div class="box flex-column">
        <h1>Popular Posts:</h1>
        <div class="flex-scroll">
            {#each ratesortposts as post}
                <a href="/post/{post.id}" style="scroll-snap-align: center;">
                    <div class="transbox flex-column">
                        <div class="window">
                            <img src="{post.content}" alt="{post.title}" class="previewimg">
                        </div>
                        <p>{post.title} | {post.rating}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
    <br>
</div>