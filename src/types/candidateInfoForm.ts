import { z } from 'zod';

import { candidateFormSchema } from '@/schemas/candidateFormSchema';

import { CandidateAnswer } from './candidateAnswer';

export type CandidateInfoFormValue = z.infer<typeof candidateFormSchema>;

export interface CreateCandidateValue extends CandidateInfoFormValue {
    slug: string
    source?: string
    landingPage?: string
    referrerUrl?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    utmContent?: string
    utmTerm?: string
    gclid?: string
    fbclid?: string
}

export type CreateSubmissionPayload = {
    submissionId: string,
    answerPayload: CandidateAnswer[]
}

export type CreateCandidateResponse = {
    success: boolean
    message: string
    data: {
        candidateId: number,
        submissionId: string
    };
    error?: Record<string, unknown>;
}

export type CreateCandidateAnswerResponse = {
    success: boolean
    message: string
    data: {
        submissionId: string
    };
    error?: Record<string, unknown>;
}