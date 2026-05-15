import clsx from 'clsx';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CandidateQualificationFormValues, } from '@/types/qualificationForm';

export type TextAreaFieldProps = {
    questionKey: string,
    questionText: string,
    isRequired: boolean,
    placeholder: string
    register: UseFormRegister<CandidateQualificationFormValues>,
    errors: FieldErrors<CandidateQualificationFormValues>
}

const TextAreaField: FC<TextAreaFieldProps> = ({ questionKey, questionText, isRequired, placeholder, errors, register }) => {
    const errorMessage = errors[questionKey]?.message;
    return (
        <div className="mt-5.5">
            <label 
                htmlFor={questionKey}
                className="mb-2 block text-sm font-extrabold text-[#334155]"
            >
                {questionText} {isRequired && ' *'}
            </label>

            <textarea
                {...register(questionKey)} 
                id={questionKey}
                placeholder={placeholder}
                className={clsx(
                    'textarea textarea-bordered textarea-primary min-h-32 w-full resize-y rounded-[13px] bg-white text-base text-(--form-text)',
                    {
                        'textarea-error': errorMessage,
                    },
                )}
            />
        </div>
    );
};

export default TextAreaField;