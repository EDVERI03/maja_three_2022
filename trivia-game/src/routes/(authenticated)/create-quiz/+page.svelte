<script>
    import { enhance } from "$app/forms";
    import Halftone from "$lib/assets/halftone.svelte";
    import Optionblock from "$lib/assets/optionblock.svelte";
    import { each } from "svelte/internal";

    let questions = ["question1"]

    function add() {
        questions.push(`question${questions.length + 1}`)
        questions = questions
    }

    function remove() {
        questions.pop()
        questions = questions
    }
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

<div class="transparentbox">

</div>

<Halftone></Halftone>

<div class="mainbox ">
    <form action="?/createNewCategory" method="POST" class="formbox" use:enhance>
        <h1>CREATE NEW/ADD TO CATEGORY</h1>
        <input type="text" name="title" id="title" placeholder="CATEGORY NAME" class="inputbox cyan-text">

        <input type="hidden" name="prefixes" value="{questions}">

        {#each questions as question}
        <div class="blockbox">
            <input type="text" name="{question}_question" id="{question}_question" placeholder="Question" class="inputbox cyan-text">
            <div class="spacerbox">
                <input type="text" name="{question}_answer1" id="{question}_answer1" placeholder="Option 1" class="inputbox sky-text">
                <input type="radio" name="{question}_isCorrect" value="1" id="{question}_isCorrect" class="checkbox sky-check">
            </div>
            <div class="spacerbox">
                <input type="text" name="{question}_answer2" id="{question}_answer2" placeholder="Option 2" class="inputbox peach-text">
                <input type="radio" name="{question}_isCorrect" value="2" id="{question}_isCorrect" class="checkbox peach-check">
            </div>
            <div class="spacerbox">
                <input type="text" name="{question}_answer3" id="{question}_answer3" placeholder="Option 3" class="inputbox signal-text">
                <input type="radio" name="{question}_isCorrect" value="3" id="{question}_isCorrect" class="checkbox signal-check">
            </div>
        </div>
        {/each}

        <div>
            
            <button type="button" class="roundbutton sky-button" on:click={() => {
                remove()
            }}>
                <span class="material-symbols-outlined">
                    check_indeterminate_small
                </span>
            </button>
            <button type="button" class="roundbutton peach-button" on:click={() => {
                add()
            }}>
                <span class="material-symbols-outlined">
                    add
                </span>
            </button>
        </div>

        <button type="submit" class="buttonbox signal-button">Create Category</button>
    </form>
    
</div>