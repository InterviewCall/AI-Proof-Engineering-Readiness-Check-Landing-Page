import clsx from 'clsx';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CandidateQualificationFormValues, Option, QuestionType } from '@/types/qualificationForm';

import FieldErrorMessage from '../FieldErrorMessage';

export type RadioFieldProps = {
    questionKey: string,
    questionType: QuestionType
    selectedValue: string
    options: Option[]
    register: UseFormRegister<CandidateQualificationFormValues>,
    errors: FieldErrors<CandidateQualificationFormValues>
}

const RadioField: FC<RadioFieldProps> = ({ questionKey, questionType, selectedValue, options, register, errors }) => {
    const errorMessage = errors[questionKey]?.message;
    return (
        <div>
            <div className="grid gap-3">
                {options.map((option) => (
                    <label
                        key={option.id}
                        id={option.optionLabel}
                        className={clsx(
                            'flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition',
                            {
                                'border-(--form-blue) bg-[#eff6ff]':
                                selectedValue === option.optionValue,

                                'border-red-300 bg-white':
                                selectedValue !== option.optionValue && errorMessage,

                                'border-slate-300 bg-white hover:border-(--form-blue) hover:bg-[#eff6ff]':
                                selectedValue !== option.optionValue && !errorMessage,
                            },
                        )}
                    >
                        <input 
                            {...register(questionKey)}
                            id={option.optionLabel}
                            type={questionType}
                            value={option.optionValue}
                            className="radio radio-primary mt-0.5 h-4.5 w-4.5 min-w-4.5"
                        />

                        <span className="text-base font-bold text-[#1e293b]">
                            {option.optionLabel}
                        </span>
                    </label>
                ))}
            </div>

            <FieldErrorMessage message={errorMessage} />
        </div>
    );
};

export default RadioField;