<script>
    import { enhance } from "$app/forms";

    let question = "QUESTION"
    let defaultHeatTime = 70
    let heatTimer = 0
    let heat = 0

    setInterval(() => {
    if (heatTimer > 0) heatTimer--;
    if (heatTimer <= 0 && heat > 0) heat = 0;
  }, 100);

</script>

<div class="horizontalbox">
    <h3>Category</h3>
    <h1>{question}</h1>
    <div class="row">
        <p>&#128293;</p>
        <div class="heatbar">
            <div style="width:{(heatTimer/defaultHeatTime)*100}%;"></div>
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