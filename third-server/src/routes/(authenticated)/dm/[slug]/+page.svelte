<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { onDestroy } from "svelte";
  import type { PageServerData } from "./$types";
  import { page } from "$app/stores";
    $: messages = data.messages
  
    if (browser) {
    const ac = new AbortController();
    const signal = ac.signal;
    async function stream() {
      try {
        /* GET request to +server.ts */
        const response = await fetch("/dm/" + $page.params.slug, {
          signal,
        });
        /* get the reader for events */
        const reader = response.body
          ?.pipeThrough(new TextDecoderStream())
          .getReader();
        while (reader) {
          /* read stuff indefinitely */
          const { value, done } = await reader.read();
          if (done) break;
          console.log("javascript clearly running");
          const message = JSON.parse(value);
          /* add the new message */
          if (message) {
            console.log(message)
            messages = [...messages, message]
          }
        }
        ac.abort();
      } catch (e) {
        console.log("error stream closure");
      }
    }
    stream();
    onDestroy(() => {
      ac.abort();
    });}


    export let data: PageServerData


</script>

<div class="fill">
    <h1>direct message</h1>
    <div class="chatwindow">
      {#if messages[0]}
          {#each messages as message}
          {#if message.own}
          <div class="messagebox own">
            <div>
              <p>{message.content}</p>
            </div>
          </div>
          {:else}
          <div class="messagebox unown">
            <div>
              <p>{message.content}</p>
            </div>
          </div>
          {/if}
          {/each}
      {:else}
      <p>This chat is empty :/</p>
      {/if}
    </div>

    <form action="?/message" method="POST" class="chatbar" use:enhance>
        <input type="text" name="message" placeholder="message" >
    </form>
</div>