import { FieldPath } from 'react-hook-form';

import { QualificationForm } from '@/types/qualificationForm';

export const stepFields: Record<number, FieldPath<QualificationForm>[]> = {
    1: ['fullName', 'phone', 'email'],
    2: ['company', 'role', 'yoe'],
    3: ['aiConcern'],
    4: ['currentCtc', 'targetCtc'],
    5: ['mainGap'],
    6: ['careerSituation'],
    7: ['urgency'],
    8: ['investmentReadiness', 'notes']
};