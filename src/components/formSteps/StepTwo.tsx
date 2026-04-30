import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';
import { yoeOptions } from '@/utils/formContants';

import InputField from '../InputField';
import SelectField from '../SelectField';
import StepWrapper from './StepWrapper';

const StepTwo: FC<StepProps> = ({ register, errors }) => {
    return (
        <StepWrapper
            question="Where are you currently in your engineering career?"
            helper="This helps us understand your current role and experience level."
        >
            <InputField 
                name="company"
                label="Current Company *"
                placeholder="Example: TCS, Accenture, Wipro, Startup"
                register={register}
                error={errors.company?.message}
            />

            <InputField
                name="role"
                label="Current Role *"
                placeholder="Example: Software Engineer, Backend Developer"
                register={register}
                error={errors.role?.message}
            />

            <SelectField
                name="yoe"
                label="Years of Experience *"
                register={register}
                error={errors.yoe?.message}
            >
                <option value="">Select your experience</option>
                {yoeOptions.map((option) => (
                    <option key={option} value={option}>
                        {option === '0-1' && '0–1 years'}
                        {option === '1-2' && '1–2 years'}
                        {option === '2-4' && '2–4 years'}
                        {option === '4-7' && '4–7 years'}
                        {option === '7+' && '7+ years'}
                    </option>
                ))}
            </SelectField>
        </StepWrapper>
    );
};

export default StepTwo;