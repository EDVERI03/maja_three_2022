<script>
    import { enhance } from "$app/forms";

    let question = "QUESTION"
    let heattimer = 80
    let heat = 4
</script>

<div class="horizontalbox">
    <h3>Category</h3>
    <h1>{question}</h1>
    <div class="row">
        <p>&#128293;</p>
        <div class="heatbar">
            <div style="width:{heattimer}%;"></div>
        </div>
        <p>{heat}</p>
    </div>
    <div></div>
    <form action="" class="formbox" use:enhance>
        <button type="submit" class="buttonbox cyan-button">Option 1</button>
        <button type="submit" class="buttonbox sky-button">Option 2</button>
        <button type="submit" class="buttonbox peach-button">Option 3</button>
        <button type="submit" class="buttonbox signal-button">Skip Question</button>
    </form>
</div>