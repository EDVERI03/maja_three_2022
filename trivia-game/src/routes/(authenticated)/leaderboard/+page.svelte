<script lang="ts">
    import Halftone from "$lib/assets/halftone.svelte";
    import type { PageServerData, PageServerLoad } from "./$types";


    export let data: PageServerData
</script>

<div class="transparentbox"></div>
<Halftone></Halftone>
<div class="mainbox">
    <div class="rowbox">
        <div class="boardbox">
            <h1>Solo Rush</h1>
            <h2 class="center-text"><cyan>Top Scores:</cyan></h2>
            <div class="tablebox">
                {#if data.SRScores.success}
                    {#each data.SRScores.success as entry}
                        <p>{entry.score} - {entry.name}</p>
                    {/each}
                {/if}
            </div>
        </div>
        <div class="boardbox">
            <h1>Survival</h1>
            <h2 class="center-text"><orange>Top Scores:</orange></h2>
            <div class="tablebox">
                {#if data.SurvivalScores.success}
                    {#each data.SurvivalScores.success as entry}
                        <p>{entry.score} - {entry.name}</p>
                    {/each}
                {/if}
            </div>
        </div>
    </div>

</div>