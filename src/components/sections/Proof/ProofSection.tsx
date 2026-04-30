import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { proofItems } from '@/utils/proofItems';

import ProofCard from './ProofCard';

const ProofSection: FC = () => {
  return (
    <section className="bg-(--color-bg-dark) py-20.5 text-white max-lg:py-15.5">
      <SectionHeader
        title="Built around practice, feedback, and proof."
        subtitle="This program is designed to move learners from passive learning to real engineering improvement."
        dark
      />

      <div className="mx-auto grid w-[min(1180px,92%)] grid-cols-3 gap-5.5 max-lg:grid-cols-1">
        {proofItems.map((item) => (
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
