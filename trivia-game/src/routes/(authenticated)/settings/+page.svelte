<script>
    import { enhance } from "$app/forms";
    import Halftone from "$lib/assets/halftone.svelte";

</script>

<div class="transparentbox"></div>
<Halftone></Halftone>
<div class="mainbox">
    <form use:enhance action="?/logout" method="POST" class="formbox">
        <button type="submit" class="buttonbox cyan-button">Sign Out</button>
    </form>
</div>