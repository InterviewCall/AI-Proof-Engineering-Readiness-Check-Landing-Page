'use client';

import { FC } from 'react';

import { UiSlot } from '@/types/availabilitySlotResponse';

type BookingReservationLoaderProps = {
  selectedDateLabel: string;
  selectedSlot: UiSlot;
};

const BookingReservationLoader: FC<BookingReservationLoaderProps> = ({
  selectedDateLabel,
  selectedSlot,
}) => {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5 grid size-18 place-items-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#dbeafe]" />

          <div className="relative grid size-16 place-items-center rounded-full bg-[#eff6ff]">
            <span className="size-8 animate-spin rounded-full border-[3px] border-[#bfdbfe] border-t-[#2563eb]" />
          </div>
        </div>

        <h3 className="text-2xl font-black tracking-[-0.4px] text-[#020617]">
          Reserving your slot
        </h3>

        <p className="mt-2 max-w-xs text-sm font-semibold text-[#64748b]">
          Please wait while we temporarily hold this slot for your final
          confirmation.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-4">
        <div className="flex items-start justify-between gap-4 border-b border-[#dbeafe] pb-3">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#64748b]">
            Date
          </p>

          <p className="text-right text-sm font-black text-[#020617]">
            {selectedDateLabel}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 pt-3">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#64748b]">
            Time
          </p>

          <div className="text-right">
            <p className="text-sm font-black text-[#2563eb]">
              {selectedSlot.slotLabel}
            </p>

            <p className="mt-1 text-xs font-bold text-[#64748b]">
              Indian Standard Time
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-2 w-1/2 animate-[reservationProgress_1.2s_ease-in-out_infinite] rounded-full bg-[#2563eb]" />
      </div>

      <p className="mt-4 text-center text-xs font-bold text-[#64748b]">
        Do not refresh or close this page while your slot is being reserved.
      </p>
    </div>
  );
};

export default BookingReservationLoader;