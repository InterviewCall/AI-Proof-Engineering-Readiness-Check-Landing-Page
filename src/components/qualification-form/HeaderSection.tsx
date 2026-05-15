import { FC } from 'react';

export type QualificationFormHeaderSectionProps = {
    name: string,
    title: string,
    subTitle: string
}

const HeaderSection: FC<QualificationFormHeaderSectionProps> = ({ name, title, subTitle }) => {
    return (
        <header className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] p-8 text-white max-sm:px-5 max-sm:py-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xl font-black tracking-[-0.4px]">
                    Interview<span className="text-[#93c5fd]">Call</span>
                </div>
            </div>

            <div className="mb-4 inline-flex rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-black text-[#dbeafe]">
                {name}
            </div>

            <h1 className="mb-3 text-[clamp(30px,4vw,44px)] font-black leading-[1.08] tracking-[-1px]">
                {title}
            </h1>

            <p className="max-w-170 text-base text-[#dbeafe]">
                {subTitle}
            </p>
        </header>
    );
};

export default HeaderSection;