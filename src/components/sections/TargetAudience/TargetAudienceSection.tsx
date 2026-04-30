import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { fitCardItems } from '@/utils/fitCardItems';

import FitCard from './FitCard';

const TargetAudienceSection: FC = () => {
  return (
    <section className="bg-(--color-bg-soft) py-20.5 max-lg:py-15.5">
      <SectionHeader
        title="This program is for serious working engineers."
        subtitle="This is designed for engineers who want structured preparation, serious feedback, and a clear path to become more valuable in the AI-era market."
      />

      <div className="mx-auto grid w-[min(980px,92%)] grid-cols-2 gap-6 max-lg:grid-cols-1">
        {fitCardItems.map((item, index) => (
          <FitCard
            key={index}
            title={item.title}
            items={item.items}
            type={item.type}
          />
        ))}
      </div>
    </section>
  );
};

export default TargetAudienceSection;
