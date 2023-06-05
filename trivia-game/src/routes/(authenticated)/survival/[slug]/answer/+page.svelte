<script lang="ts">
    import { enhance, applyAction } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";
    import type { ActionData, PageServerData } from "./$types";

    export let data: PageServerData;
    export let form: ActionData;
    

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


    Reload();

    function Reload() {
        
        scoreAnimationDelayTimer = scoreAnimationDelay
    }

    function Continue() {
        
        Reload();
        console.log("did shit");
        console.log(form?.result);
        if (form?.result) {
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

        return async ({ result }: { result: ActionResult }) => {
            // `result` is an `ActionResult` object
            // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
            await applyAction(result);
            Continue();
        };
    };
</script>

<div class="horizontalbox">
    <h3 style="margin-bottom: 0;">ASDASDASD</h3>
    <h1 style="margin: 0; max-width: 90%; width:25em;">QWEQWEQWEWQE</h1>
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

        <button type="submit" class="buttonbox cyan-button">asdasd</button>
    </form>
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >

        <button type="submit" class="buttonbox sky-button">asdasdad</button>
    </form>
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >

        <button type="submit" class="buttonbox peach-button">qweqwewqe</button>
    </form>
    <div>
        <h1><orange>Score:</orange> {animatedScore}</h1>
        {#if animatedScore < score }
            <h1 style="margin-left: 75px;"><cyan>+{score - animatedScore}</cyan></h1>
        {:else if animatedScore> score} 
        <h1 style="margin-left: 75px;"><red>- {animatedScore - score}</red></h1>
        {/if}
    </div>

</div>
