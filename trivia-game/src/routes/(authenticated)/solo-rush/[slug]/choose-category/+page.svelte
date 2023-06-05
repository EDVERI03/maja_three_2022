<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData

    const CATEGORY = data.categories.success||[]
</script>

<div class="horizontalbox">
    <h1>CHOOSE A CATEGORY</h1>
    <form action="?/addQuestions" method="POST" class="formbox">
        <input type="hidden" name="categoryName" value={CATEGORY[0]}>
        <input type="hidden" name="slug" value={data.slug}>
        <button class="buttonbox cyan-button">{CATEGORY[0]}</button>
    </form>
    <form action="?/addQuestions" method="POST" class="formbox">
        <input type="hidden" name="categoryName" value={CATEGORY[1]}>
        <input type="hidden" name="slug" value={data.slug}>
        <button class="buttonbox sky-button">{CATEGORY[1]}</button>
    </form>
    <form action="?/addQuestions" method="POST" class="formbox">
        <input type="hidden" name="categoryName" value={CATEGORY[2]}>
        <input type="hidden" name="slug" value={data.slug}>
        <button class="buttonbox peach-button">{CATEGORY[2]}</button>
    </form>
    <h1><orange>Score:</orange> {data.score}</h1>
</div>