/**
 * Result either contains an error object or a slugID if successful.
 */
export type StartQuizResult =
    | { error: { code: number; data: any }; success?: undefined }
    | { error?: undefined; success: { slug: string } };


export interface Quizler {
    /**
     * @param form function data
     */
    StartQuiz(): Promise<StartQuizResult>
}