import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { careerSituationOptions } from '@/utils/formContants';

import RadioGroup from '../RadioGroup';
import StepWrapper from './StepWrapper';

const StepSix: FC<StepProps> = ({ register, errors, watch }) => {
    return (
        <StepWrapper
            question="What best describes your current career situation?"
            helper="This helps us understand the urgency behind your interest."
        >
            <RadioGroup
                name="careerSituation"
                options={careerSituationOptions}
                register={register}
                selectedValue={watch?.('careerSituation')}
                error={errors.careerSituation?.message} 
            />
        </StepWrapper>
    );
};

export default StepSix;