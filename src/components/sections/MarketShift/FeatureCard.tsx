import { FC } from 'react';

type FeatureCardProps = {
    icon: string,
    title: string,
    description: string
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="rounded-[22px] border border-(--color-border) bg-white p-7 shadow-(--shadow-card) max-sm:p-5.5">
      <div className="mb-4.5 grid h-11.5 w-11.5 place-items-center rounded-[14px] bg-[#eff6ff] text-[22px] text-(--color-blue)">
        {icon}
      </div>

      <h3 className="mb-2.5 text-[22px] font-black tracking-[-0.3px] text-[#020617]">
        {title}
      </h3>

      <p className="text-base text-(--color-muted)">{description}</p>
    </div>
  );
};

export default FeatureCard;