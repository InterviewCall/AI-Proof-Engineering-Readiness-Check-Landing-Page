'use client';

import { FC } from 'react';

import { UiSlot } from '../types/availabilitySlotResponse';

type BookingSlotReviewModalProps = {
  isOpen: boolean;
  selectedDateLabel: string;
  selectedSlot: UiSlot | null;
  onClose: () => void;
  onConfirm: () => void;
};

const BookingSlotReviewModal: FC<BookingSlotReviewModalProps> = ({
  isOpen,
  selectedDateLabel,
  selectedSlot,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !selectedSlot) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-5 text-white">
          <div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Review Your Slot
          </div>

          <h3 className="text-2xl font-black tracking-[-0.4px]">
            Confirm your strategy call
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#dbeafe]">
            Please review the date and time before confirming.
          </p>
        </div>

        <div className="p-6">
          <div className="grid gap-3">
            <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-slate-400">
                Selected Date
              </p>

              <p className="text-lg font-black text-[#020617]">
                {selectedDateLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-slate-400">
                Selected Time
              </p>

              <p className="text-lg font-black text-(--booking-blue)">
                {selectedSlot.slotLabel}
              </p>

              <p className="mt-1 text-xs font-bold text-(--booking-muted-light)">
                Indian Standard Time
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-(--booking-orange-border) bg-(--booking-orange-bg) p-4 text-sm font-extrabold text-(--booking-orange-text)">
            Please choose this slot only if you can attend the call without
            distractions. Our team will use your submitted answers to guide the
            discussion.
          </div>

          <div className="mt-6 grid grid-cols-[0.8fr_1.2fr] gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline min-h-12 rounded-[13px] font-black"
            >
              Change Slot
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="btn btn-primary min-h-12 rounded-[13px] font-black text-white"
            >
              Confirm Strategy Call Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSlotReviewModal;