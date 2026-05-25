'use client';

import { FC, useEffect, useRef } from 'react';

import { UiSlot } from '@/types/availabilitySlotResponse';

type SlotReservationConflictModalProps = {
  isOpen: boolean;
  selectedDateLabel: string;
  selectedSlot: UiSlot | null;
  message: string;
  onSelectAnotherSlot: () => void;
};

const SlotReservationConflictModal: FC<
  SlotReservationConflictModalProps
> = ({
  isOpen,
  selectedDateLabel,
  selectedSlot,
  message,
  onSelectAnotherSlot,
}) => {
  const selectAnotherSlotButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;

    /**
     * Prevent scrolling and background interaction while
     * the mandatory modal is visible.
     */
    document.body.style.overflow = 'hidden';

    /**
     * The only actionable element in this modal receives focus.
     */
    selectAnotherSlotButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      /**
       * The candidate must not dismiss this modal using Escape.
       */
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      /**
       * There is only one actionable element.
       * Keep keyboard focus locked on that button so the candidate
       * cannot tab into controls behind the modal.
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

  if (!isOpen || !selectedSlot) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slot-conflict-title"
      aria-describedby="slot-conflict-description"
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
    >
      <section className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.3)]">
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-6 text-white">
          <div className="mb-4 grid size-13 place-items-center rounded-full bg-white/15 text-2xl font-black">
            !
          </div>

          <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Slot Unavailable
          </div>

          <h2
            id="slot-conflict-title"
            className="text-2xl font-black tracking-[-0.4px]"
          >
            Another candidate reserved this slot
          </h2>

          <p
            id="slot-conflict-description"
            className="mt-2 text-sm font-semibold text-[#dbeafe]"
          >
            This slot became unavailable while your request was being
            processed.
          </p>
        </div>

        <div className="p-6">
          <div className="grid gap-3">
            <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-slate-400">
                Selected Date
              </p>

              <p className="text-base font-black text-[#020617]">
                {selectedDateLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-slate-400">
                Selected Time
              </p>

              <p className="text-base font-black text-[#2563eb]">
                {selectedSlot.slotLabel}
              </p>

              <p className="mt-1 text-xs font-bold text-[#64748b]">
                Indian Standard Time
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4">
            <p className="text-sm font-extrabold text-[#9a3412]">
              {message}
            </p>
          </div>

          <p className="mt-4 text-center text-xs font-semibold text-[#64748b]">
            Available slots are updated in real time. Please select another
            suitable time to continue.
          </p>

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

export default SlotReservationConflictModal;