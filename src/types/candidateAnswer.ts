export type CandidateAnswer = {
    questionId: number,
    questionKey: string,
    answerText: string | null,
    answerJson: Record<string, unknown> | null,
    selectedOptionId: number | null
}