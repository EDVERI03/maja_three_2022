<script lang="ts">
    import { enhance } from "$app/forms";
    import Halftone from "$lib/assets/halftone.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData 

</script>

<div class="transparentbox"></div>
<Halftone></Halftone>
<div class="mainbox">
    <h1>{data.SRHighScore.success?.name}</h1>
    <div>
        <cyan>
            <h1>Top Solo-Rush Score:</h1>
        </cyan>
        <h2 class="center-text">{data.SRHighScore.success?.score||0}</h2>
        <blue>
            <h1>Top Survival Score:</h1>
        </blue>
        <h2 class="center-text">{data.SurvivalHighscore.success?.score||0}</h2>
    </div>
    <form use:enhance action="?/logout" method="POST" class="formbox">
        <button type="submit" class="buttonbox peach-button">Sign Out</button>
    </form>
</div>