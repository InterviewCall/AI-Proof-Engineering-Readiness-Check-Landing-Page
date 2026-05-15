import z from 'zod';

import { qualificationFormSchema } from '@/schemas/qualificationFormSchema';

export type QualificationForm = z.infer<typeof qualificationFormSchema>;

export type SavedQualificationFormValue = {
    formData?: Partial<QualificationForm>
}

export type SavedQualificationFormStep = {
    currentStep?: number
};

export type Option = {
    id: number;
    optionLabel: string;
    optionValue: string;
    sortOrder: number;
}

export enum QuestionType {
    TEXT = 'text',
    EMAIL = 'email',
    PHONE = 'phone',
    NUMBER = 'number',
    SELECT = 'select',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'textarea'
}

export type Question = {
    id: number;
    questionKey: string;
    questionText: string;
    placeholder: string | null;
    questionType: QuestionType;
    isRequired: boolean;
    sortOrder: number;
    validationRules: Record<string, unknown> | null;
    options: Option[]
}

export type Step = {
    id: number;
    stepNo: number;
    title: string;
    helperText: string;
    questions: Question[]
}

export type GetQualificationFormForCandidateResponse = {
    id: number;
    name: string;
    slug: string;
    segmentKey: string;
    title: string;
    subTitle: string;
    steps: Step[]
};

export type GetQualificationFormApiResponse = {
    success: boolean;
    message: string;
    data: GetQualificationFormForCandidateResponse;
    error?: Record<string, unknown>;
};

export type CandidateQualificationFormValues = Record<string, string>;