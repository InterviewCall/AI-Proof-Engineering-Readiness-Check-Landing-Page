import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';

export type ProblemSectionProps = {
  title: string,
  subtitle: string,
  statements: string[],
  highlight: string
}

const ProblemSection: FC<ProblemSectionProps> = ({ title, subtitle, statements, highlight }) => {
  return (
    <section className="bg-(--color-bg-soft) py-20.5 max-lg:py-15.5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="mx-auto w-[min(890px,92%)] rounded-3xl border border-(--color-border) bg-white p-8.5 shadow-[0_16px_44px_rgba(15,23,42,0.06)] max-sm:p-5.5">
        <div className="grid gap-3 text-center text-[19px] font-semibold text-[#334155]">
          {statements.map((statement) => (
            <p key={statement}>{statement}</p>
          ))}
        </div>

        <div className="mt-6 rounded-[18px] bg-[#eff6ff] p-5.5 text-center text-xl font-black text-[#1e3a8a]">
          {highlight}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
