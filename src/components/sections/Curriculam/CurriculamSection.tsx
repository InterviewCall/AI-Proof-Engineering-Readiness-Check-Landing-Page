import { FC } from 'react';

import SectionHeader from '@/components/SectionHeader';

import CurriculamItemBox from './CurriculamItemBox';

export type CurriculamSectionProps = {
  title: string,
  subtitle: string,
  items: Array<{
    title: string,
    description: string
  }>
}

const CurriculamSection: FC<CurriculamSectionProps> = ({ title, subtitle, items }) => {
  return (
    <section className="py-20.5 max-lg:py-15.5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="mx-auto grid w-[min(980px,92%)] grid-cols-2 gap-4.5 max-lg:grid-cols-1">
        {items.map((item, index) => (
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
