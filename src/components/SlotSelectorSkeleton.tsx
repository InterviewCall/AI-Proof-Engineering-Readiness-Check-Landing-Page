import { FC } from 'react';

const SlotSelectorSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
      {Array.from({ length: 11 }).map((_, index) => (
        <div
          key={index}
          className="h-10 animate-pulse rounded-full bg-slate-200"
        />
      ))}
    </div>
  );
};

export default SlotSelectorSkeleton;