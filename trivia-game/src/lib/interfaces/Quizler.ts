/**
 * Result either contains an error object or a slugID if successful.
 */
export type StartQuizResult =
    | { error: { code: number; data: any }; success?: undefined }
    | { error?: undefined; success: { slug: string } };

export type QuestionData = {title: string, answer1: string, answer2: string, answer3: string, correct: number, category: string}

export type Attempt<T> = 
    | {success: T, error?: undefined}
    | {error:{code: number, data: any}, success?: undefined}

export type AnswerData = {correct: boolean, score: number}

export interface Quizler {
    /**
     * @param slug browser pathway slug
     * @param correct A boolean describing if the player answered correctly.
     * @param heat Players current heat score
     * @param currentIndex index of the question that the player should be on if the page where to reload mid round
     */
    StartQuiz(session: string): Promise<StartQuizResult>
    StartSurvival(session: string): Promise<StartQuizResult>
    SurvivalGetQuestionData(slug: string): Promise<Attempt<QuestionData>>
    AddQuestions(slug: string, category: string): Promise<boolean>
    loadQuestions(slug: string): Promise<Attempt<Array<QuestionData>>>
    submitAnswer(slug:string, correct:boolean, heat:number): Promise<Attempt<AnswerData>>
    SurvivalSubmitAnswer(slug:string, correct:boolean, heat:number): Promise<Attempt<AnswerData>>
    SurvivalLoadNewQuestion(slug:string): Promise<void>
    SurvivalStepsUntilDeath(slug: string): Promise<number>
    IsEndOfRound(slug:string, currentIndex:number): Promise<boolean>
    getScore(slug: string): Promise<number>
    SurvivalGetScore(slug: string): Promise<Number>
    clearPrevious(slug: string): Promise<boolean>
    getCurrentIndex(slug: string): Promise<number>
    getRandomCategories(): Promise<Attempt<Array<string>>>
    isGameComplete(slug: string): Promise<Boolean>
    SRsaveHighscore(slug: string): Promise<number>
    SurvivalSaveHighscore(slug: string): Promise<number>
}