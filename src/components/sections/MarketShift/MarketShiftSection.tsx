import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';

import FeatureCard from './FeatureCard';

export type MarketShiftSectionProps = {
  title: string,
  subtitle: string,
  features: Array<{
    icon: string,
    title: string,
    description: string
  }>
}

const MarketShiftSection: FC<MarketShiftSectionProps> = ({ title, subtitle, features }) => {
  return (
    <section className="py-20.5 max-lg:py-15.5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="mx-auto grid w-[min(1180px,92%)] grid-cols-3 gap-5.5 max-lg:grid-cols-1">
        {features.map((feature) => (
            <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description} 
            />
        ))}
      </div>
    </section>
  );
};

export default MarketShiftSection;
