<script lang="ts">
    import { enhance } from "$app/forms";
    import Halftone from "$lib/assets/halftone.svelte";
    import type { ActionData } from "./$types";
    
    export let form: ActionData
</script>

<div class="transparentbox">

</div>

<Halftone></Halftone>

<div class="mainbox ">
    <form use:enhance method="POST" action="?/register" class="formbox">
        <h1>Sign Up</h1>
        <input type="text" name="username" id="username" placeholder="Username" class="inputbox cyan-text">
        <input type="email" name="email" id="email" placeholder="Email" class="inputbox sky-text">
        <input type="password" name="password" id="password" placeholder="Password" class="inputbox peach-text">
        <input type="password" name="repeat" id="repeat" placeholder="Repeat Password" class="inputbox peach-text">
        <button type="submit" class="buttonbox signal-button">Create Account</button>
        {#if form?.result}
            <p class="errortext">{form.result}</p>
        {/if}
    </form>
</div>