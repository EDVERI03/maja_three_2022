<script>
    import Halftone from "$lib/assets/halftone.svelte";
    import TitleCard from "$lib/assets/titleCard.svelte";
</script>

<div class="transparentbox">

</div>

<Halftone></Halftone>

<div class="mainbox ">
    <TitleCard></TitleCard>
    <div class="buttonholderbox">
        <a href="/survival" style="width:inherit; max-width:inherit;">
            <button type="button" class="buttonbox sky-button">SURVIVAL</button>
        </a>
        <a href="/solo-rush" style="width:inherit; max-width:inherit;">
            <button type="button" class="buttonbox cyan-button">SOLO RUSH</button>
        </a>
    </div>
</div>