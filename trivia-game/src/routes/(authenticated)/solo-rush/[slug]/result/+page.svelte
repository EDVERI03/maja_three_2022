<script lang="ts">
    import type { PageServerLoad } from "./$types";


    export let data: PageServerLoad;

    //Why is ".finalScore" red? It works!
    let score = data.finalScore;
    let animatedScore = 0
    let scoreAnimationDelayTimer = 100
    let personalHighscore = data.PBScore
    let animatedPersonalHighscore = 0
    let personalHighscoreAnimationDelayTimer = 100
    let globalHighscore = data.GBScore
    let animatedGlobalHighscore = 0
    let globalHighscoreAnimationDelayTimer = 100

    const compeditor = data.compeditor

    console.log(compeditor)

    setInterval(() => {
        //TODO: simplify this into a function that can be used for each step
        if (scoreAnimationDelayTimer > 0) {
            scoreAnimationDelayTimer--
        } else {
            if (animatedScore + 10 < score) {
                animatedScore += 10
            } else if (animatedScore < score) {
                animatedScore++
            } else if (animatedScore > score) {
                animatedScore--
            }
        }
        if (animatedScore == score) {
            if (personalHighscoreAnimationDelayTimer > 0) {
            personalHighscoreAnimationDelayTimer--
            } else {
                if (animatedPersonalHighscore + 10 < personalHighscore) {
                    animatedPersonalHighscore += 10
                } else if (animatedPersonalHighscore < personalHighscore) {
                    animatedPersonalHighscore++
                } else if (animatedPersonalHighscore > personalHighscore) {
                    animatedPersonalHighscore--
                }
            }
            if (animatedPersonalHighscore == personalHighscore) {
                if (globalHighscoreAnimationDelayTimer > 0) {
                    globalHighscoreAnimationDelayTimer--
                } else {
                    if (animatedGlobalHighscore + 10 < globalHighscore) {
                        animatedGlobalHighscore += 10
                    } else if (animatedGlobalHighscore < globalHighscore) {
                        animatedGlobalHighscore++
                    } else if (animatedGlobalHighscore > globalHighscore) {
                        animatedGlobalHighscore--
                    }
                }
            }
        }
    }, 5)
</script>

<div class="horizontalbox">
    <h1>Game Over</h1>
    <div class="scorebox">
        <h1><cyan>Final Score:</cyan> {animatedScore}</h1>
        <h1><blue>Your Top Score:</blue> {animatedPersonalHighscore}</h1>
        <h1><peach>Global Top Score:</peach> {animatedGlobalHighscore}</h1>
    </div>
    <a href="/" style="width: 40em; max-width: 90%;">
    <button class="buttonbox signal-button" style="max-width: 100%;">Continue</button>
    </a>
    {#if compeditor.success}
        <p>You are {compeditor.success.difference} points behind <orange>{compeditor.success.name}</orange></p>
    {:else}
        <p>You are in the lead! &#128081</p>
    {/if}
</div>