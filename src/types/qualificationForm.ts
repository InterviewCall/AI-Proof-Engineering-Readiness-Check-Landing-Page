import z from 'zod';

import { qualificationFormSchema } from '@/schemas/qualificationFormSchema';

export type QualificationForm = z.infer<typeof qualificationFormSchema>;

export type SavedQualificationFormValue = {
    formData?: Partial<QualificationForm>
}

export type SavedQualificationFormStep = {
    currentStep?: number
};