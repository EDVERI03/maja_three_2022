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
     */
    StartQuiz(session: string): Promise<StartQuizResult>
    AddQuestions(slug: string, category: string): Promise<boolean>
    loadQuestions(slug: string): Promise<Attempt<Array<QuestionData>>>
    submitAnswer(slug:string, correct:boolean, heat:number): Promise<Attempt<AnswerData>>
    IsEndOfRound(slug:string, currentIndex:number): Promise<boolean>
    getScore(slug: string): Promise<number>
    clearPrevious(slug: string): Promise<boolean>
    getCurrentIndex(slug: string): Promise<number>
}