<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData
</script>

<div class="horizontalbox">
    <h1>CHOOSE A CATEGORY</h1>
    <form action="?/addQuestions" method="POST" class="formbox">
        <input type="hidden" name="categoryName" value="Minecraft">
        <input type="hidden" name="slug" value={data.slug}>
        <button class="buttonbox cyan-button">Minecraft</button>
    </form>
</div>