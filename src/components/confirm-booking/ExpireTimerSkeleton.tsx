import { FC } from 'react';

const ExpireTimerSkeleton: FC = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="h-3 w-32 rounded-full bg-[#dbeafe]" />
          <div className="mt-3 h-4 w-full max-w-70 rounded-full bg-[#dbeafe]" />
        </div>

        <div className="size-14 min-w-14 rounded-full bg-white" />
      </div>

      <div className="h-2 rounded-full bg-white" />
    </div>
  );
};

export default ExpireTimerSkeleton;