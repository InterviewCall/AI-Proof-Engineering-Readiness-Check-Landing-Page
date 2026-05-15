import clsx from 'clsx';
import { FC } from 'react';
import { FieldPath, UseFormRegister } from 'react-hook-form';

import { CandidateInfoFormValue } from '@/types/candidateInfoForm';

import FieldErrorMessage from './FieldErrorMessage';
import FieldLabel from './FieldLabel';

type InputFieldProps = {
  name: FieldPath<CandidateInfoFormValue>;
  label: string;
  placeholder: string;
  register: UseFormRegister<CandidateInfoFormValue>;
  error?: string;
  type?: string;
};

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  register,
  error,
  type = 'text',
}) => {
  return (
    <div className="mb-4.5">
      <FieldLabel
        id={name}
        className="mb-2 block text-sm font-extrabold text-[#334155]"
      >
        {label}
      </FieldLabel>

      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'input input-bordered input-primary min-h-13.5 w-full rounded-[13px] bg-white text-base text-(--form-text)',
          {
            'input-error': error,
          },
        )}
      />

      <FieldErrorMessage message={error} />
    </div>
  );
};

export default InputField;
