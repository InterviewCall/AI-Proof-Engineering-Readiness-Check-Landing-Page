import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { urgencyOptions } from '@/utils/formContants';

import RadioGroup from '../RadioGroup';
import StepWrapper from './StepWrapper';

const StepSeven: FC<StepProps> = ({ register, errors, watch }) => {
    return (
        <StepWrapper
            question="How soon do you want to seriously work on this?"
            helper="This helps us prioritize serious candidates for strategy calls."
        >
            <RadioGroup 
                name="urgency"
                options={urgencyOptions}
                register={register}
                selectedValue={watch?.('urgency')}
                error={errors.urgency?.message}
            />
        </StepWrapper>
    );
};

export default StepSeven;