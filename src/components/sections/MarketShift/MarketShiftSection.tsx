import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { marketFeatures } from '@/utils/marketFeatures';

import FeatureCard from './FeatureCard';

const MarketShiftSection: FC = () => {
  return (
    <section className="py-20.5 max-lg:py-15.5">
      <SectionHeader
        title="The market now rewards high-leverage engineers."
        subtitle="A high-leverage engineer is not just someone who writes code. They can understand problems, design systems, debug real issues, use AI responsibly, and communicate clearly."
      />

      <div className="mx-auto grid w-[min(1180px,92%)] grid-cols-3 gap-5.5 max-lg:grid-cols-1">
        {marketFeatures.map((feature) => (
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
