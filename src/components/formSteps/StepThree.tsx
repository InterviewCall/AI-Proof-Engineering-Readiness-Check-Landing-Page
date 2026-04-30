import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { aiConcernOptions } from '@/utils/formContants';

import RadioGroup from '../RadioGroup';
import StepWrapper from './StepWrapper';

const StepThree: FC<StepProps> = ({ register, errors, watch }) => {
    return (
        <StepWrapper
            question="How worried are you about AI affecting your software engineering role?"
            helper="Choose the option that best describes your current concern."
        >
            <RadioGroup 
                name="aiConcern"
                options={aiConcernOptions}
                register={register}
                selectedValue={watch?.('aiConcern')}
                error={errors.aiConcern?.message}
            />
        </StepWrapper>
    );
};

export default StepThree;