import { FC } from 'react';

import {
  isNotItems,
  learnItems,
  positioningItems,
} from '@/utils/positioningItems';

import PositioningItem from './PositioningItem';

const PositioningSection: FC = () => {
  return (
    <section className="bg-(--color-bg-soft) py-20.5 max-lg:py-15.5">
      <div className="mx-auto w-[min(930px,92%)] rounded-[26px] bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] p-9 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] max-sm:p-5.5">
        <h2 className="mb-4.5 text-[clamp(30px,4vw,44px)] font-black leading-[1.1] tracking-[-1px]">
          That is why we built the AI-Proof Engineer Program.
        </h2>

        {isNotItems.map((item) => (
          <p key={item} className="mb-3 text-lg text-[#dbeafe]">
            {item}
          </p>
        ))}

        <div className="my-6 grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
          {positioningItems.map((item) => (
            <PositioningItem key={item} text={item} />
          ))}
        </div>

        {learnItems.map((item) => (
          <p key={item} className="mb-3 text-lg text-[#dbeafe]">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
};

export default PositioningSection;
