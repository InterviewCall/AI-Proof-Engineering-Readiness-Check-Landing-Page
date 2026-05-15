import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CandidateAnswer } from '@/types/candidateAnswer';

export type CandidateAnswerState = {
    answers: CandidateAnswer[]
}

const initialState: CandidateAnswerState = {
    answers: []
};

const candidateAnswerSlice = createSlice({
    name: 'candidateAnswer',
    initialState,
    reducers: {
        setAnswers: (state, action: PayloadAction<CandidateAnswer[]>) => {
            action.payload.forEach((incomingAnswer) => {
                const existingAnswerIndex = state.answers.findIndex(
                    (answer) => answer.questionKey == incomingAnswer.questionKey
                );

                if(existingAnswerIndex == -1) {
                    state.answers.push(incomingAnswer);
                    return;
                }

                state.answers[existingAnswerIndex] = {
                    ...state.answers[existingAnswerIndex],
                    ...incomingAnswer
                };
            });
        }
    }
});

export const { setAnswers } = candidateAnswerSlice.actions;

export default candidateAnswerSlice.reducer;