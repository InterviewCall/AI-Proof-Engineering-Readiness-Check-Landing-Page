import { FC } from 'react';

import { StepProps } from '@/types/props/formStep';

import InputField from '../InputField';
import StepWrapper from './StepWrapper';

const StepOne: FC<StepProps> = ({ register, errors }) => {
    return (
        <StepWrapper
            title="First, tell us your basic details."
            helper="Our team will use this to contact you for your strategy call."
        >
            <InputField 
                name="fullName"
                label="Full Name *"
                placeholder="Enter your full name"
                register={register}
                error={errors.fullName?.message}
            />

            <InputField 
                name="phone"
                label="WhatsApp Number *"
                type="tel"
                placeholder="Enter your WhatsApp number"
                register={register}
                error={errors.phone?.message}
            />

            <InputField 
                name="email"
                label="Email Address *"
                type="email"
                placeholder="Enter your email address"
                register={register}
                error={errors.email?.message}
            />
        </StepWrapper>
    );
};

export default StepOne;