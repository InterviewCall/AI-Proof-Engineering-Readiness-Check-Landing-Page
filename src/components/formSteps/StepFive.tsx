import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { mainGapOptions } from '@/utils/formContants';

import RadioGroup from '../RadioGroup';
import StepWrapper from './StepWrapper';

const StepFive: FC<StepProps> = ({ register, errors, watch }) => {
    return (
        <StepWrapper
            title="What do you feel is your biggest gap right now?"
            helper="For AI-era readiness, this helps us identify where you need the most work."
        >
            <RadioGroup 
                name="mainGap"
                options={mainGapOptions}
                register={register}
                selectedValue={watch?.('mainGap')}
                error={errors.mainGap?.message}
            />
        </StepWrapper>
    );
};

export default StepFive;