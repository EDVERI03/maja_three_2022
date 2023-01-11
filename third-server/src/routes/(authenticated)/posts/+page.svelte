<script lang="ts">
    import { posts } from "$lib/state";
import type { PageServerData } from "./$types";

    export let data: PageServerData;

    const timesortposts = Array.from(data.posts).reverse()
    const ratesortposts = Array.from(data.posts).sort((a, b) => b.rating - a.rating)
    shuffleArray(data.posts)

    function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
    

</script>

<div class="fill">
    <h1>Postboard</h1>
    <hr>
    <div class="box">
        <a href="/posts/make-a-post">Make a Post</a>
    </div>
    <hr>
    <div class="box flex-column">
        <h1>Recommended Posts:</h1>
        <div class="flex-scroll">
            {#each data.posts as post}
                <a href="/post/{post.id}" style="scroll-snap-align: center;">
                    <div class="transbox flex-column">
                        <div class="window">
                            <img src="{post.content}" alt="{post.title}" class="previewimg">
                        </div>
                        <p>{post.title.substring(0, 20)} | {post.rating}</p>
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
                        <p>{post.title.substring(0, 20)} | {post.rating}</p>
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
                        <p>{post.title.substring(0, 20)} | {post.rating}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
    <br>
</div>