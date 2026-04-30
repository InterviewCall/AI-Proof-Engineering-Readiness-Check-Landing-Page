import clsx from 'clsx';
import { FC } from 'react';
import { FieldPath, UseFormRegister } from 'react-hook-form';

import { QualificationForm } from '@/types/qualificationForm';

import FieldErrorMessage from './FieldErrorMessage';
import FieldLabel from './FieldLabel';

type RadioGroupProps = {
  name: FieldPath<QualificationForm>;
  options: string[];
  selectedValue?: string;
  register: UseFormRegister<QualificationForm>;
  error?: string;
};

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  register,
  error,
}) => {
  return (
    <div>
      <div className="grid gap-3">
        {options.map((option, index) => {
          const optionId = `${name}-${index}`;
          return (
            <FieldLabel
              key={option}
              id={optionId}
              className={clsx(
                'flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition',
                {
                  'border-(--form-blue) bg-[#eff6ff]': selectedValue === option,
                  'border-red-300 bg-white': selectedValue !== option && error,
                  'border-slate-300 bg-white hover:border-(--form-blue) hover:bg-[#eff6ff]':
                    selectedValue !== option && !error,
                },
              )}
            >
              <input
                id={optionId}
                type="radio"
                value={option}
                className="radio radio-primary mt-0.5 h-4.5 w-4.5 min-w-4.5"
                {...register(name)}
              />

              <span className="text-base font-bold text-[#1e293b]">
                {option}
              </span>
            </FieldLabel>
          );
        })}
      </div>

      <FieldErrorMessage message={error} />
    </div>
  );
};

export default RadioGroup;
