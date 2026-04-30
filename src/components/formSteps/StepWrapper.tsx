import { FC, ReactNode } from 'react';

type StepWrapperProps = {
    question: string,
    helper: string,
    children: ReactNode
};

const StepWrapper: FC<StepWrapperProps> = ({ question, helper, children }) => {
    return (
        <div className="animate-[fadeIn_0.22s_ease]">
            <div className="mb-2.5 text-[clamp(24px,3vw,32px)] font-black leading-[1.15] tracking-[-0.7px] text-[#020617]">
                {question}
            </div>

            <div className="mb-6 text-[15px] font-semibold text-(--form-muted-light)">
                {helper}
            </div>

            {children}
        </div>
    );
};

export default StepWrapper;