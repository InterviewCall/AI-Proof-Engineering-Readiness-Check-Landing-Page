import { CandidateQualificationFormValues, GetQualificationFormForCandidateResponse } from '@/types/qualificationForm';

export function createCandidateFormDefaultValues(steps: GetQualificationFormForCandidateResponse['steps']): CandidateQualificationFormValues {
    const defaultValues: CandidateQualificationFormValues = {};

    steps.forEach((step) => {
        step.questions.forEach((question) => {
            defaultValues[question.questionKey] = '';
        });
    });

    return defaultValues;
}