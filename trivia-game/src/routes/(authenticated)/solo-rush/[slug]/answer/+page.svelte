<script lang="ts">
    import { enhance, applyAction } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";
    import type { ActionData, PageServerData } from "./$types";

    export let data: PageServerData;
    export let form: ActionData;
    
    let current = data.currentIndex;
    let category = "CATEGORY";
    let question = "QUESTION";
    let answer1 = "ANSWER";
    let answer2 = "ANSWER";
    let answer3 = "ANSWER";
    let correct = 99;
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
        category = data.questions.success[current].category;
        question = data.questions.success[current].title;
        answer1 = data.questions.success[current].answer1;
        answer2 = data.questions.success[current].answer2;
        answer3 = data.questions.success[current].answer3;
        correct = data.questions.success[current].correct;
        scoreAnimationDelayTimer = scoreAnimationDelay
    }

    function Continue() {
        if (current < data.questions.success.length-1) {
            console.log(data.questions.success.length)
            current++; 
        } else {
            console.log("beep boop, doing the other thing")
        }
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
        <input type="hidden" name="S" value={data.slug} />
        <input type="hidden" name="H" value={heat} />
        <input type="hidden" name="C" value={correct == 0} />
        <input type="hidden" name="CI" value={current} />
        <button type="submit" class="buttonbox cyan-button">{answer1}</button>
    </form>
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >
        <input type="hidden" name="S" value={data.slug} />
        <input type="hidden" name="H" value={heat} />
        <input type="hidden" name="C" value={correct == 1} />
        <input type="hidden" name="CI" value={current} />
        <button type="submit" class="buttonbox sky-button">{answer2}</button>
    </form>
    <form
        action="?/submitAnswer"
        method="POST"
        class="formbox"
        use:enhance={myEnhance}
    >
        <input type="hidden" name="S" value={data.slug} />
        <input type="hidden" name="CI" value={current} />
        <input type="hidden" name="H" value={heat} />
        <input type="hidden" name="C" value={correct == 2} />
        <button type="submit" class="buttonbox peach-button">{answer3}</button>
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
