'use client';

import { FC } from 'react';

import { UiSlot } from '../../types/availabilitySlotResponse';

type BookingSlotReviewModalProps = {
  isOpen: boolean;
  selectedDateLabel: string;
  selectedSlot: UiSlot | null;
  isSubmitting: boolean;
  canContinue: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const BookingSlotReviewModal: FC<BookingSlotReviewModalProps> = ({
  isOpen,
  selectedDateLabel,
  selectedSlot,
  isSubmitting,
  canContinue,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !selectedSlot) {
    return null;
  }

  const handleBackdropClick = (): void => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-slot-review-title"
      aria-describedby="booking-slot-review-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-5 text-white">
          <div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Review Your Slot
          </div>

          <h3
            id="booking-slot-review-title"
            className="text-2xl font-black tracking-[-0.4px]"
          >
            Reserve this strategy call slot
          </h3>

          <p
            id="booking-slot-review-description"
            className="mt-1 text-sm font-semibold text-[#dbeafe]"
          >
            Review your selection before continuing to final confirmation.
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

          <div className="mt-5 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-4">
            <p className="text-sm font-extrabold text-[#1e3a8a]">
              Your slot will be held temporarily after you continue.
            </p>

            <p className="mt-1 text-xs font-bold text-[#475569]">
              On the next step, please review your details and confirm the
              booking before the reservation timer expires.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-(--booking-orange-border) bg-(--booking-orange-bg) p-4 text-sm font-extrabold text-(--booking-orange-text)">
            Please choose this slot only if you can attend the call without
            distractions. Our team will use your submitted answers to guide the
            discussion.
          </div>

          {!canContinue && (
            <div className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm font-extrabold text-[#991b1b]">
              Your submission reference is missing. Please restart the booking
              process from your readiness result page.
            </div>
          )}

          <div className="mt-6 grid grid-cols-[0.8fr_1.2fr] gap-3 max-sm:grid-cols-1">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="btn btn-outline min-h-12 rounded-[13px] font-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              Change Slot
            </button>

            <button
              type="button"
              disabled={!canContinue || isSubmitting}
              onClick={onConfirm}
              className="btn btn-primary flex min-h-12 items-center justify-center gap-2 rounded-[13px] px-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Reserving Slot...
                </>
              ) : (
                'Reserve Slot & Continue'
              )}
            </button>
          </div>

          {isSubmitting && (
            <p className="mt-4 text-center text-xs font-semibold text-(--booking-muted-light)">
              Please wait while we reserve this slot for you.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSlotReviewModal;