import clsx from 'clsx';
import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { investmentReadinessOptions } from '@/utils/formContants';

import FieldErrorMessage from '../FieldErrorMessage';
import FieldLabel from '../FieldLabel';
import RadioGroup from '../RadioGroup';
import StepWrapper from './StepWrapper';

const StepEight: FC<StepProps> = ({ register, errors, watch }) => {
  return (
    <StepWrapper
      title="Can you invest in a structured career program if it is the right fit?"
      helper="The program requires time, effort, and financial commitment."
    >
      <RadioGroup
        name="investmentReadiness"
        options={investmentReadinessOptions}
        register={register}
        selectedValue={watch?.('investmentReadiness')}
        error={errors.investmentReadiness?.message}
      />

      <div className="mt-5.5">
        <FieldLabel
            id="notes"
            className="mb-2 block text-sm font-extrabold text-[#334155]"
        >
            Anything else we should know?
        </FieldLabel>

        <textarea
          id="notes"
          placeholder="Example: I am a backend developer with 3 years of experience, but I feel my current work is repetitive and I am worried about AI..."
          className={clsx(
            'textarea textarea-bordered textarea-primary min-h-32 w-full resize-y rounded-[13px] bg-white text-base text-(--form-text)',
            {
              'textarea-error': errors.notes,
            },
          )}
          {...register('notes')}
        />

        <FieldErrorMessage message={errors.notes?.message} />
      </div>
    </StepWrapper>
  );
};

export default StepEight;
