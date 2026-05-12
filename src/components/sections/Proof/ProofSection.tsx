import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';

import ProofCard from './ProofCard';

export type ProofSectionProps = {
  title: string,
  subtitle: string,
  items: Array<{
    title: string,
    description: string
  }>
}

const ProofSection: FC<ProofSectionProps> = ({ title, subtitle, items }) => {
  return (
    <section className="bg-(--color-bg-dark) py-20.5 text-white max-lg:py-15.5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        dark
      />

      <div className="mx-auto grid w-[min(1180px,92%)] grid-cols-3 gap-5.5 max-lg:grid-cols-1">
        {items.map((item) => (
          <ProofCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ProofSection;
