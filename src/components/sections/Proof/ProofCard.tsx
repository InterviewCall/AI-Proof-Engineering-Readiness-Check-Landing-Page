import { FC } from 'react';

type ProofCardProps = {
    title: string,
    description: string
}

const ProofCard: FC<ProofCardProps> = ({ title, description }) => {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/6 p-7 max-sm:p-5.5">
      <h3 className="mb-2.5 text-[22px] font-black text-white">{title}</h3>
      <p className="text-base text-[#cbd5e1]">{description}</p>
    </div>
  );
};

export default ProofCard;