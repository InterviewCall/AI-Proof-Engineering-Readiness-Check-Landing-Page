import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetQualificationFormForCandidateResponse } from '@/types/qualificationForm';

export type QualificationFormState = {
    form: GetQualificationFormForCandidateResponse | null,
    currentStepIndex: number,
    isLoaded: boolean
}

const initialState: QualificationFormState = {
    form: null,
    currentStepIndex: 0,
    isLoaded: false
};

const qualificationFormSlice = createSlice({
    name: 'qualificationForm',
    initialState,
    reducers: {
        setQualificationForm: (state, action: PayloadAction<GetQualificationFormForCandidateResponse>) => {
            state.form = action.payload;
            state.currentStepIndex = 0;
            state.isLoaded = true;
        },

        clearQualificationForm: (state) => {
            state.form = null;
            state.currentStepIndex = 0;
            state.isLoaded = false;
        },

        setCurrentStepIndex: (state, action: PayloadAction<number>) => {
            state.currentStepIndex = action.payload;
        },

        getNextStep: (state) => {
            if(!state.form) {
                return;
            }

            const totalSteps = state.form.steps.length + 1;

            if(state.currentStepIndex < totalSteps - 1) {
                state.currentStepIndex += 1;
            }
        },

        goToPreviousStep: (state) => {
            if(state.currentStepIndex > 0) {
                state.currentStepIndex -= 1;
            }
        }
    }
});

export const { setQualificationForm, clearQualificationForm, setCurrentStepIndex, getNextStep, goToPreviousStep } = qualificationFormSlice.actions;

export default qualificationFormSlice.reducer;