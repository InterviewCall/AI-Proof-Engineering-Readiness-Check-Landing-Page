import clsx from 'clsx';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CandidateQualificationFormValues, QuestionType } from '@/types/qualificationForm';

import FieldErrorMessage from '../FieldErrorMessage';

export type InputFieldProps = {
    questionKey: string,
    questionText: string,
    isRequired: boolean,
    questionType: QuestionType
    placeholder: string
    register: UseFormRegister<CandidateQualificationFormValues>,
    errors: FieldErrors<CandidateQualificationFormValues>
}

const InputField: FC<InputFieldProps> = ({ questionKey, questionText, isRequired, placeholder, questionType, register, errors }) => {
    const errorMessage = errors[questionKey]?.message;

    return (
        <div className="mb-4.5">
            <label
                htmlFor={questionKey}
                className='mb-2 block text-sm font-extrabold text-[#334155]'
            >
                {questionText} {isRequired && ' *'}
            </label>

            <input 
                {...register(questionKey)}
                id={questionKey}
                type={questionType}
                placeholder={placeholder}
                className={clsx('input input-bordered input-primary min-h-13.5 w-full rounded-[13px] bg-white text-base text-(--form-text)',
                    {
                        'input-error': errorMessage
                    }
                )}
            />

            <FieldErrorMessage message={errorMessage} />
        </div>
    );
};

export default InputField;