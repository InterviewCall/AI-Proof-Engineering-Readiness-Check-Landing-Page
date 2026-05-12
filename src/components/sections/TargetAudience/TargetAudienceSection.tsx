import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';

import FitCard from './FitCard';

export type TargetAudienceSectionProps = {
  title: string,
  subtitle: string,
  fitCards: Array<{
    title: string,
    type: string,
    items: string[]
  }>
}

const TargetAudienceSection: FC<TargetAudienceSectionProps> = ({ title, subtitle, fitCards }) => {
  return (
    <section className="bg-(--color-bg-soft) py-20.5 max-lg:py-15.5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="mx-auto grid w-[min(980px,92%)] grid-cols-2 gap-6 max-lg:grid-cols-1">
        {fitCards.map((item, index) => (
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
