import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { QualificationForm } from '../qualificationForm';

export type StepProps = {
    register: UseFormRegister<QualificationForm>,
    errors: FieldErrors<QualificationForm>,
    watch?: UseFormWatch<QualificationForm>
}