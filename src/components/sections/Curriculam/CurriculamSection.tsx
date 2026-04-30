import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';
import { curriculumItems } from '@/utils/curriculamItem';

import CurriculamItemBox from './CurriculamItemBox';

const CurriculamSection: FC = () => {
  return (
    <section className="py-20.5 max-lg:py-15.5">
      <SectionHeader
        title="What You Will Learn"
        subtitle="A structured curriculum that combines durable engineering fundamentals with AI-era execution skills."
      />

      <div className="mx-auto grid w-[min(980px,92%)] grid-cols-2 gap-4.5 max-lg:grid-cols-1">
        {curriculumItems.map((item, index) => (
          <CurriculamItemBox
            key={item.title}
            title={item.title}
            order={index + 1}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default CurriculamSection;
