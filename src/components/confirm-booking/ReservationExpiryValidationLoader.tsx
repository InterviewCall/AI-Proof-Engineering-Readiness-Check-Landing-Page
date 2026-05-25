import { FC } from 'react';

const ReservationExpiryValidationLoader: FC = () => {
  return (
    <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
      <div className="flex items-center gap-4">
        <span className="size-10 min-w-10 animate-spin rounded-full border-[3px] border-[#bfdbfe] border-t-[#2563eb]" />

        <div>
          <p className="text-sm font-black text-[#1e3a8a]">
            Checking reservation status
          </p>

          <p className="mt-1 text-xs font-bold text-[#475569]">
            Please wait while we verify whether this slot is still reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationExpiryValidationLoader;