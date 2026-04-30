import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';

const ProblemSection: FC = () => {
  return (
    <section className="bg-(--color-bg-soft) py-20.5 max-lg:py-15.5">
      <SectionHeader
        title="Software engineering is changing fast."
        subtitle="AI is making basic coding faster. Companies are becoming leaner. Teams are expected to produce more with fewer people."
      />

      <div className="mx-auto w-[min(890px,92%)] rounded-3xl border border-(--color-border) bg-white p-8.5 shadow-[0_16px_44px_rgba(15,23,42,0.06)] max-sm:p-5.5">
        <div className="grid gap-3 text-center text-[19px] font-semibold text-[#334155]">
          <p>This does not mean engineers are finished.</p>
          <p>It means average engineering is under pressure.</p>
          <p>The safest engineers are not the ones who ignore AI.</p>
        </div>

        <div className="mt-6 rounded-[18px] bg-[#eff6ff] p-5.5 text-center text-xl font-black text-[#1e3a8a]">
          The safest engineers are the ones who combine strong fundamentals with
          AI-assisted execution.
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
