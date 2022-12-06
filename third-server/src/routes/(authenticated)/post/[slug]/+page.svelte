<script lang="ts">
    import { enhance } from "$app/forms";
import type { ActionData, PageServerData } from "./$types";


export let data:PageServerData; 
$: post = data.post;
$: user = data.user
$: replies = data.post?.replies
</script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<div class="fill">
    <img alt="{post?.title}" src="{post?.content}" class="contentimg">
    <div class="box">
        <p>{post?.title}&nbsp</p>
        <div class="verticalBreak"/>
        <a href="/profile/{user?.profileURL}">
            <div class="transbox">
                <p>{user?.username}</p>
                <img src="{user?.profileimage}" alt="Profile" class="profileimg">
            </div>
        </a>
        <div class="verticalBreak"/>
        <form action="?/rate" method="POST" use:enhance>
            <input type="hidden" name="score" value="1">
            <button type="submit" class="iconbutton">
                <i class="material-symbols-outlined">thumb_up</i>
            </button>
        </form>
        <form action="?/rate" method="POST" use:enhance>
            <input type="hidden" name="score" value="-1">
            <button type="submit" class="iconbutton">
                <i class="material-symbols-outlined">thumb_down</i>
            </button>
        </form>
        <p>{post?.rating}</p>
         
    </div>
    <hr class="break">
    <div>
        <form use:enhance={(e)=>e.form.reset()} action="?/comment" method="POST">
        <input type="text" name="comment" placeholder="comment" class="textfield">
        <button type="submit" class="button">reply</button>
        </form>
        <!-- Show comments here when that works again-->
        {#if replies}
            {#each replies as reply}
            <br>
                <div class="box"> 
                    <p>{reply.content}</p>
                    <div class="verticalBreak"/>
                        <a href="/profile/{reply.author.profileURL}">
                            <div class="transbox">
                                <p>{reply.author.username}</p>
                                <img src="{reply.author.profileimage}" alt="{reply.author.username}'s profile" class="profileimg">
                            </div>
                        </a>
                </div>
            <br>
            {/each}
        {/if}
    </div>
</div>