export interface Admin {
    /**
     * @param form function data
     */
    CreateQuiz(form:FormData): Promise<Boolean>
}