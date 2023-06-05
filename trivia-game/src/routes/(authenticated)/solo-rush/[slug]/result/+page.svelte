<script lang="ts">
    import type { PageServerLoad } from "./$types";


    export let data: PageServerLoad;

    let score = data.finalScore;
    let animatedScore = 0
    let scoreAnimationDelayTimer = 100
    let personalHighscore = 0
    let globalHighscore = 0

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
</script>

<div class="horizontalbox">
    <h1>Game Over</h1>
    <div class="scorebox">
        <h1><cyan>Final Score:</cyan> {animatedScore}</h1>
        <h1><blue>Your Top Score:</blue> {personalHighscore}</h1>
        <h1><peach>Global Top Score:</peach> {globalHighscore}</h1>
    </div>
    <a href="/" style="width: 40em; max-width: 90%;">
    <button class="buttonbox signal-button" style="max-width: 100%;">Continue</button>
    </a>
</div>