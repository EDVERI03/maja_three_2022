<script lang="ts">
    import { enhance, applyAction } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";
    import type { ActionData, PageServerData } from "./$types";
    import HeartEmpty from "$lib/assets/heart_empty.svelte";
    import HeartFull from "$lib/assets/heart_full.svelte";

    export let data: PageServerData;
    export let form: ActionData;
    
    let category = data.question.success.category;
    let question = data.question.success.title;
    let answer1 = data.question.success.answer1;
    let answer2 = data.question.success.answer2;
    let answer3 = data.question.success.answer3;
    let correct = data.question.success.correct;
    let health = data.health;

    let defaultHeatTime = 70;
    let heatTimer = 0;
    let heat = 0;
    let score = data.score;
    let animatedScore = score;
    const scoreAnimationDelay = 100;
    let scoreAnimationDelayTimer = scoreAnimationDelay;

    setInterval(() => {
        if (heatTimer > 0) heatTimer--;
        if (heatTimer <= 0 && heat > 0) heat = 0;
    }, 100);

    setInterval(() => {
        if (scoreAnimationDelayTimer > 0) {
            scoreAnimationDelayTimer--
        } else {
            if (animatedScore < score) {
                animatedScore++
            } else if (animatedScore > score) {
                animatedScore--
            }
        }
    }, 5)

    function Reload() {
        if (form && form.question && form.question.success) {
            category = form.question.success.category;
            question = form.question.success.title;
            answer1 = form.question.success.answer1;
            answer2 = form.question.success.answer2;
            answer3 = form.question.success.answer3;
            correct = form.question.success.correct;
            health = form.health;

        }
        
        scoreAnimationDelayTimer = scoreAnimationDelay
    }

    function Continue() {
        
        Reload();
        if (form && form.result) {
            score = form.result.success?.score||0;
            if (form.result.success?.correct) {
                heat++;
                heatTimer = defaultHeatTime;
            } else {
                heat = 0;
                heatTimer = 0;
            }
        }
    }


    const myEnhance = ({}) => {
        // `formElement` is this `<form>` element
        // `formData` is its `FormData` object that's about to be submitted
        // `action` is the URL to which the form is posted
        // calling `cancel()` will prevent the submission
        // `submitter` is the `HTMLElement` that caused the form to be submitted

        return async ({ result, update }: { result: ActionResult, update: any }) => {
            // `result` is an `ActionResult` object
            // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
            await applyAction(result);
            await update({ reset: true });
            Continue();
        };
    };
</script>

<div class="horizontalbox">
    <h3 style="margin-bottom: 0;">{category}</h3>
    <h1 class="question-text">{question}</h1>
    <div class="row">
        <p>&#128293;</p>
        <div class="heatbar">
            <div style="width:{(heatTimer / defaultHeatTime) * 100}%;" />
        </div>
        <p>{heat}</p>
    </div>
    <div />
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >
        <input type="hidden" name="C" value={correct == 0}>
        <input type="hidden" name="S" value={data.slug}>
        <input type="hidden" name="H" value={heat}>
        <button type="submit" class="buttonbox cyan-button">{answer1}</button>
    </form>
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >
        <input type="hidden" name="C" value={correct == 1}>
        <input type="hidden" name="S" value={data.slug}>
        <input type="hidden" name="H" value={heat}>
        <button type="submit" class="buttonbox sky-button">{answer2}</button>
    </form>
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >
        <input type="hidden" name="C" value={correct == 2}>
        <input type="hidden" name="S" value={data.slug}>
        <input type="hidden" name="H" value={heat}>
        <button type="submit" class="buttonbox peach-button">{answer3}</button>
    </form>
    <div class="borderbox">
        {#if health == 3}
            <peach class="flex">
                <HeartFull/>
                <HeartFull/>
                <HeartFull/>
            </peach>
        {:else if health == 2}
        <peach class="flex">
            <HeartFull/>
            <HeartFull/>
            <HeartEmpty/>
        </peach>
        {:else}
        <peach class="flex">
            <HeartFull/>
            <HeartEmpty/>
            <HeartEmpty/>
        </peach>
        {/if}

    </div>
    <div>
        <h1><orange>Score:</orange> {animatedScore}</h1>
        {#if animatedScore < score }
            <h1 style="margin-left: 75px;"><cyan>+{score - animatedScore}</cyan></h1>
        {:else if animatedScore> score} 
        <h1 style="margin-left: 75px;"><red>- {animatedScore - score}</red></h1>
        {/if}
    </div>

    

</div>
