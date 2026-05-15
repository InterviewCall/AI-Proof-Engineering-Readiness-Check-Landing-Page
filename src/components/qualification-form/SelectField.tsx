import clsx from 'clsx';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CandidateQualificationFormValues, Option } from '@/types/qualificationForm';

import FieldErrorMessage from '../FieldErrorMessage';

export type SelectFieldProps = {
    questionKey: string,
    questionText: string,
    isRequired: boolean,
    placeholder: string,
    options: Option[]
    register: UseFormRegister<CandidateQualificationFormValues>,
    errors: FieldErrors<CandidateQualificationFormValues>
}

const SelectField: FC<SelectFieldProps> = ({ questionKey, questionText, isRequired, placeholder, options, register, errors }) => {
    const errorMessage = errors[questionKey]?.message;

    return (
        <div className="mb-4.5">
            <label
                htmlFor={questionKey}
                className="mb-2 block text-sm font-extrabold text-[#334155]"
            >
                {questionText} {isRequired && ' *'}
            </label>

            <select
                {...register(questionKey)}
                id={questionKey}
                className={clsx('select select-primary cursor-pointer min-h-13.5 w-full rounded-[13px] bg-white text-base text-(--form-text)', 
                    {
                        'select-error': errorMessage
                    }
                )}
            >
                <option value=''>{placeholder}</option>

                {options.map((option) => (
                    <option key={option.id} value={option.optionValue}>
                        {option.optionLabel}
                    </option>
                ))}
            </select>

            <FieldErrorMessage message={errorMessage} />
        </div>
    );
};

export default SelectField;