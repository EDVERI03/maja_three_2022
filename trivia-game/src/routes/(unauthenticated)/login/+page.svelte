<script>
    import Halftone from "$lib/assets/halftone.svelte";
    import { enhance } from "$app/forms";
</script>

<div class="transparentbox">

</div>

<Halftone></Halftone>

<div class="mainbox ">
    
    <form use:enhance method="POST" action="?/login" class="formbox">
        <h1>Sign In</h1>
        <input type="email" name="email" id="email" placeholder="Email" class="inputbox cyan-text">
        <input type="password" name="password" id="password" placeholder="Password" class="inputbox sky-text">
        <button type="submit" class="buttonbox peach-button">Sign In</button>
    </form>
    <p>  OR  </p>
    <a href="/register" style="width: 40em; max-width: 90%;"><button class="buttonbox signal-button" style="width: inherit; margin:0; max-width: 100%;">Create An Account</button></a>
    
</div>