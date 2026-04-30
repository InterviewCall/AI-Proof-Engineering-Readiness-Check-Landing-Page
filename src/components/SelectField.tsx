import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { FieldPath, UseFormRegister } from 'react-hook-form';

import { QualificationForm } from '@/types/qualificationForm';

import FieldErrorMessage from './FieldErrorMessage';
import FieldLabel from './FieldLabel';

type SelectFieldProps = {
  name: FieldPath<QualificationForm>;
  label: string;
  register: UseFormRegister<QualificationForm>;
  error?: string;
  children: ReactNode;
};

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  register,
  error,
  children,
}) => {
  return (
    <div className="mb-4.5">
      <FieldLabel
        id={name}
        className="mb-2 block text-sm font-extrabold text-[#334155]"
      >
        {label}
      </FieldLabel>

      <select
        {...register(name)}
        id={name}
        className={clsx(
          'select select-primary cursor-pointer min-h-13.5 w-full rounded-[13px] bg-white text-base text-(--form-text)',
          {
            'select-error': error,
          },
        )}
      >
        {children}
      </select>

      <FieldErrorMessage message={error} />
    </div>
  );
};

export default SelectField;
