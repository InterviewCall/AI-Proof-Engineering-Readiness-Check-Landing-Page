'use client';

import { FC, useEffect, useRef } from 'react';

type ReservationExpiredModalProps = {
  isOpen: boolean;
  onSelectAnotherSlot: () => void;
};

const ReservationExpiredModal: FC<ReservationExpiredModalProps> = ({
  isOpen,
  onSelectAnotherSlot,
}) => {
  const selectAnotherSlotButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;

    /**
     * Prevent the page behind the modal from scrolling.
     */
    document.body.style.overflow = 'hidden';

    /**
     * The only available action receives focus when modal opens.
     */
    selectAnotherSlotButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      /**
       * Candidate cannot dismiss the modal using Escape.
       */
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      /**
       * Since only one action is allowed, keep keyboard focus
       * locked on the Select Another Slot button.
       */
      if (event.key === 'Tab') {
        event.preventDefault();
        selectAnotherSlotButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-expired-title"
      aria-describedby="reservation-expired-description"
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
    >
      <section className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.3)]">
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-6 text-white">
          <div className="mb-4 grid size-13 place-items-center rounded-full bg-white/15 text-2xl font-black">
            !
          </div>

          <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Reservation Expired
          </div>

          <h2
            id="reservation-expired-title"
            className="text-2xl font-black tracking-[-0.4px]"
          >
            Your reserved slot has expired
          </h2>

          <p
            id="reservation-expired-description"
            className="mt-2 text-sm font-semibold text-[#dbeafe]"
          >
            The temporary confirmation period has ended.
          </p>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4">
            <p className="text-sm font-extrabold text-[#9a3412]">
              This slot was held temporarily for your confirmation. Please
              select another available slot to continue your booking.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-4">
            <p className="text-sm font-bold text-[#1e3a8a]">
              Your previous reservation can no longer be confirmed.
            </p>

            <p className="mt-1 text-xs font-bold text-[#475569]">
              Available slots may change in real time, so please choose a new
              suitable time.
            </p>
          </div>

          <button
            ref={selectAnotherSlotButtonRef}
            type="button"
            onClick={onSelectAnotherSlot}
            className="mt-6 min-h-13.5 w-full cursor-pointer rounded-[14px] bg-[#2563eb] px-5 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8] focus:outline-none focus:ring-4 focus:ring-[#bfdbfe]"
          >
            Select Another Slot
          </button>
        </div>
      </section>
    </div>
  );
};

export default ReservationExpiredModal;