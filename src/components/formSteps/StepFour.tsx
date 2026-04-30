import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { currentCtcOptions, targetCtcOptions } from '@/utils/formContants';

import SelectField from '../SelectField';
import StepWrapper from './StepWrapper';

const StepFour: FC<StepProps> = ({ register, errors }) => {
    return (
        <StepWrapper
            question="What is your current and target CTC?"
            helper="This helps us understand your current growth stage."
        >
            <SelectField 
                name="currentCtc"
                label="Current CTC *"
                register={register}
                error={errors.currentCtc?.message}
            >
                <option value="">Select current CTC</option>
                {currentCtcOptions.map((option) => (
                    <option key={option} value={option}>
                        {option == '<5 LPA' && 'Less than ₹5 LPA'}
                        {option == '5-10 LPA' && '₹5–10 LPA'}
                        {option == '10-20 LPA' && '₹10–20 LPA'}
                        {option == '20+ LPA' && '₹20 LPA+'}
                    </option>
                ))}
            </SelectField>

            <SelectField
                name="targetCtc"
                label="Target CTC *"
                register={register}
                error={errors.targetCtc?.message}
            >
                <option value="">Select target CTC</option>
                {targetCtcOptions.map((option) => (
                    <option key={option} value={option}>
                        {option == '10-20 LPA' && '₹10–20 LPA'}
                        {option == '20-30 LPA' && '₹20–30 LPA'}
                        {option == '30-50 LPA' && '₹30–50 LPA'}
                        {option == '50+ LPA' && '₹50 LPA+'}
                    </option>
                ))}
            </SelectField>
        </StepWrapper>
    );
};

export default StepFour;