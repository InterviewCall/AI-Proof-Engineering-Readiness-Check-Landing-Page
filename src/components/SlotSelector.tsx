'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { UiSlot } from '../types/availabilitySlotResponse';
import SlotSelectorSkeleton from './SlotSelectorSkeleton';

type SlotSelectorProps = {
  selectedDateLabel: string;
  slots: UiSlot[];
  selectedSlot: UiSlot | null;
  isLoading: boolean;
  emptyMessage?: string;
  onSelectSlot: (slot: UiSlot) => void;
};

const SlotSelector: FC<SlotSelectorProps> = ({
  selectedDateLabel,
  slots,
  selectedSlot,
  isLoading,
  emptyMessage,
  onSelectSlot,
}) => {
  const noSlotsMessage =
    emptyMessage || 'No slots available for this date. Please choose another date.';

  return (
    <div className="p-6 max-sm:p-5">
      <div className="mb-5">
        <div className="mb-2 inline-flex rounded-full bg-[#eff6ff] px-3 py-1.5 text-xs font-black text-(--booking-blue-dark)">
          Available Slots
        </div>

        <h3 className="text-2xl font-black tracking-[-0.4px] text-[#020617]">
          {selectedDateLabel || 'Select a date'}
        </h3>

        <p className="mt-1 text-sm font-semibold text-(--booking-muted)">
          All slots are shown in Indian Standard Time.
        </p>
      </div>

      {isLoading ? (
        <SlotSelectorSkeleton />
      ) : slots.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
          {slots.map((slot) => {
            const isSelected =
              selectedSlot?.dateTimeSlotId === slot.dateTimeSlotId;

            return (
              <button
                key={slot.dateTimeSlotId}
                type="button"
                onClick={() => onSelectSlot(slot)}
                className={clsx(
                  'min-h-10 cursor-pointer rounded-full border px-2 text-center text-[12px] font-black leading-none whitespace-nowrap transition-all duration-200',
                  {
                    'border-(--booking-blue) bg-(--booking-blue) text-white shadow-[0_10px_22px_rgba(37,99,235,0.22)]':
                      isSelected,

                    'border-slate-300 bg-white text-[#1e293b] hover:border-(--booking-blue) hover:bg-[#eff6ff] hover:text-(--booking-blue)':
                      !isSelected,
                  },
                )}
              >
                {slot.slotLabel.replace(' ', '\u00A0')}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-(--booking-border) bg-[#f8fafc] p-6 text-center">
          <p className="text-sm font-bold text-(--booking-muted)">
            {noSlotsMessage}
          </p>
        </div>
      )}

      <p className="mt-5 text-center text-xs font-semibold text-(--booking-muted-light)">
        Select a time slot to review and confirm your strategy call.
      </p>
    </div>
  );
};

export default SlotSelector;