'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useMemo, useState } from 'react';

import { useConfirmBooking } from '@/hooks/confirm-booking/useConfirmBooking';
import { useGetReservationDetails } from '@/hooks/reservation-details/useGetReservationDetails';
import { ApiErrorResponse } from '@/types/apiErrorResponse';

import ConfirmBookingPageSkeleton from './ConfirmBookingPageSkeleton';
import ExpireTimerSkeleton from './ExpireTimerSkeleton';
import ReservationExpiredModal from './ReservationExpiredModal';

const ExpireTimer = dynamic(() => import('./ExpireTimer'), {
  ssr: false,
  loading: () => <ExpireTimerSkeleton />,
});

type ConfirmBookingProps = {
  callTitle: string;
};

const ConfirmBookingPage: FC<ConfirmBookingProps> = ({ callTitle }) => {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = params.slug;

  /**
   * reservation-id:
   * Used to fetch reservation details and confirm the booking.
   *
   * submission-id:
   * Preserved only for returning to slot selection.
   */
  const reservationId = searchParams.get('reservation-id') ?? '';
  const submissionId = searchParams.get('submission-id') ?? '';

  const [isReservationExpiredModalOpen, setIsReservationExpiredModalOpen] =
    useState<boolean>(false);

  const previousBookingPageUrl = useMemo(() => {
    const queryParams = new URLSearchParams();

    if (submissionId) {
      queryParams.set('submission-id', submissionId);
    }

    const queryString = queryParams.toString();

    return queryString
      ? `/readiness/${slug}/book-strategy-call?${queryString}`
      : `/readiness/${slug}/book-strategy-call`;
  }, [slug, submissionId]);

  const thankYouPageUrl = useMemo(() => {
    const queryParams = new URLSearchParams({
      'reservation-id': reservationId,
    });

    return `/readiness/${slug}/thank-you?${queryParams.toString()}`;
  }, [slug, reservationId]);

  const {
    data: reservationResponse,
    isLoading: isReservationLoading,
    isError: isReservationError,
    error: reservationError,
  } = useGetReservationDetails(reservationId);

  const {
    mutateAsync: confirmBooking,
    isPending: isConfirmingBooking,
  } = useConfirmBooking();

  const reservationDetails = reservationResponse?.data;

  const reservationErrorMessage =
    reservationError?.response?.data?.message ||
    'Unable to load reservation details. Please select your slot again.';

  const hasExpiredReservationError = isReservationExpiredError(
    reservationError?.response?.status,
    reservationError?.response?.data?.message,
  );

  const openReservationExpiredModal = useCallback((): void => {
    setIsReservationExpiredModalOpen(true);
  }, []);

  /**
   * Triggered only by the visible countdown reaching zero.
   *
   * If confirmation is already processing, do not interrupt it.
   * The confirm API will decide whether confirmation succeeded or expired.
   */
  const handleTimerExpired = useCallback((): void => {
    if (isConfirmingBooking) {
      return;
    }

    openReservationExpiredModal();
  }, [isConfirmingBooking, openReservationExpiredModal]);

  const confirmBookingHandler = async (): Promise<void> => {
    if (
      !reservationId ||
      !reservationDetails ||
      isConfirmingBooking ||
      isReservationExpiredModalOpen
    ) {
      return;
    }

    try {
      await confirmBooking({
        reservationId,
      });

      router.replace(thankYouPageUrl);
    } catch (error: unknown) {
      /**
       * If backend confirms that the reservation expired,
       * show the non-dismissible expiry modal.
       */
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message;

        if (isReservationExpiredError(statusCode, errorMessage)) {
          openReservationExpiredModal();
          return;
        }
      }

      /**
       * Rare UI fallback:
       * If the confirm request failed at or after the displayed expiry time,
       * block further interaction on this page.
       *
       * Backend still remains the final protection layer.
       */
      const expiryTimestamp = new Date(reservationDetails.expiresAt).getTime();

      if (
        !Number.isNaN(expiryTimestamp) &&
        expiryTimestamp <= Date.now()
      ) {
        openReservationExpiredModal();
      }

      /**
       * For non-expiry errors, your mutation hook can show an error toast.
       */
    }
  };

  const changeSlot = (): void => {
    router.replace(previousBookingPageUrl);
  };

  const selectAnotherSlotAfterExpiry = (): void => {
    router.replace(previousBookingPageUrl);
  };

  if (!reservationId) {
    return (
      <ReservationUnavailableState
        message="Reservation details are missing. Please return and select an available slot again."
        onBack={changeSlot}
      />
    );
  }

  if (isReservationLoading) {
    return <ConfirmBookingPageSkeleton />;
  }

  /**
   * If the candidate refreshes or manually reopens an already expired URL,
   * the initial GET API should return an expiry error.
   */
  if (hasExpiredReservationError) {
    return (
      <ExpiredReservationPageState
        onSelectAnotherSlot={selectAnotherSlotAfterExpiry}
      />
    );
  }

  if (isReservationError || !reservationDetails) {
    return (
      <ReservationUnavailableState
        message={reservationErrorMessage}
        onBack={changeSlot}
      />
    );
  }

  const areActionsDisabled =
    isConfirmingBooking || isReservationExpiredModalOpen;

  return (
    <>
      <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-[#020617]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="text-[22px] font-black tracking-[-0.5px] text-[#020617]">
              Interview<span className="text-[#2563eb]">Call</span>
            </div>

            <div className="rounded-full bg-[#dcfce7] px-4 py-2 text-sm font-black text-[#166534]">
              Slot reserved — confirmation pending
            </div>
          </div>

          <section className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-7 py-7 text-white max-sm:px-5">
              <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
                Final Confirmation
              </div>

              <h1 className="text-[clamp(30px,4vw,46px)] font-black leading-[1.05] tracking-[-1px]">
                Review your booking
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] font-semibold text-[#dbeafe]">
                Please check your selected slot carefully. This reservation is
                held only for a short time.
              </p>
            </div>

            <div className="grid grid-cols-[1.05fr_0.95fr] gap-0 max-lg:grid-cols-1">
              <div className="border-r border-[#e2e8f0] p-7 max-lg:border-r-0 max-lg:border-b max-sm:p-5">
                <ExpireTimer
                  target={reservationDetails.expiresAt}
                  onExpire={handleTimerExpired}
                />

                <div className="mb-5 mt-6">
                  <h2 className="text-2xl font-black tracking-[-0.4px]">
                    Booking details
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-[#64748b]">
                    Please confirm only if you can attend this slot on time.
                  </p>
                </div>

                <div className="grid gap-3">
                  <DetailRow
                    label="Candidate"
                    value={reservationDetails.candidateName}
                  />

                  <DetailRow
                    label="Email"
                    value={reservationDetails.candidateEmail}
                  />

                  <DetailRow
                    label="Strategy Call"
                    value={callTitle}
                  />

                  <DetailRow
                    label="Selected Slot"
                    value={reservationDetails.slotDetails}
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-[#bbf7d0] bg-[#ecfdf5] p-4 text-sm font-extrabold text-[#166534]">
                  Your slot is reserved temporarily. Confirm now to complete
                  your booking.
                </div>

                <button
                  type="button"
                  disabled={areActionsDisabled}
                  onClick={confirmBookingHandler}
                  className="mt-6 flex min-h-13.5 w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#2563eb] px-5 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {isConfirmingBooking ? (
                    <>
                      <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Confirming Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>

                <button
                  type="button"
                  disabled={areActionsDisabled}
                  onClick={changeSlot}
                  className="mt-3 min-h-12 w-full cursor-pointer rounded-[14px] border border-[#cbd5e1] bg-white px-5 text-sm font-black text-[#334155] transition hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Change Slot
                </button>

                <p className="mt-4 text-center text-xs font-semibold text-[#64748b]">
                  After confirmation, our team will contact you on WhatsApp/email
                  with the next steps.
                </p>
              </div>

              <aside className="bg-[#f8fafc] p-7 max-sm:p-5">
                <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5">
                  <h3 className="mb-4 text-xl font-black tracking-[-0.3px]">
                    Before you confirm
                  </h3>

                  <div className="grid gap-3">
                    <ChecklistItem text="Be available at the selected time without distractions." />
                    <ChecklistItem text="Keep 30 minutes free for the discussion." />
                    <ChecklistItem text="Use the same email/phone number submitted in your readiness check." />
                    <ChecklistItem text="Be ready to discuss your current work, goals, and skill gaps honestly." />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-4">
                  <h3 className="text-base font-black text-[#1e3a8a]">
                    What happens after confirmation?
                  </h3>

                  <p className="mt-2 text-sm font-bold text-[#334155]">
                    Your selected slot will be confirmed. Our team will review
                    your readiness check and prepare the call around your current
                    role, skill gaps, and career goal.
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-[#e2e8f0] bg-white p-4">
                  <h3 className="text-base font-black text-[#020617]">
                    Need to change the slot?
                  </h3>

                  <p className="mt-2 text-sm font-bold text-[#475569]">
                    Use the “Change Slot” button before the timer ends. Once this
                    reservation expires, you will need to choose an available
                    slot again.
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm font-extrabold text-[#9a3412]">
                  This call is meant for serious working engineers. If you cannot
                  attend this slot, please go back and choose another available
                  time.
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <ReservationExpiredModal
        isOpen={isReservationExpiredModalOpen}
        onSelectAnotherSlot={selectAnotherSlotAfterExpiry}
      />
    </>
  );
};

export default ConfirmBookingPage;

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow: FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
      <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-[#94a3b8]">
        {label}
      </p>

      <p className="break-all text-base font-black text-[#020617]">{value}</p>
    </div>
  );
};

type ChecklistItemProps = {
  text: string;
};

const ChecklistItem: FC<ChecklistItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-6 min-w-6 place-items-center rounded-full bg-[#16a34a] text-xs font-black text-white">
        ✓
      </span>

      <span className="text-sm font-bold text-[#334155]">{text}</span>
    </div>
  );
};

type ReservationUnavailableStateProps = {
  message: string;
  onBack: () => void;
};

const ReservationUnavailableState: FC<ReservationUnavailableStateProps> = ({
  message,
  onBack,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-8 text-[#020617]">
      <section className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-6 text-white">
          <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Reservation Unavailable
          </div>

          <h1 className="text-3xl font-black tracking-[-0.5px]">
            Select a slot again
          </h1>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm font-extrabold text-[#9a3412]">
            {message}
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 min-h-13 w-full cursor-pointer rounded-[14px] bg-[#2563eb] px-5 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8]"
          >
            Choose Another Slot
          </button>
        </div>
      </section>
    </main>
  );
};

type ExpiredReservationPageStateProps = {
  onSelectAnotherSlot: () => void;
};

const ExpiredReservationPageState: FC<ExpiredReservationPageStateProps> = ({
  onSelectAnotherSlot,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-8 text-[#020617]">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-6 text-white">
          <div className="mb-4 grid size-13 place-items-center rounded-full bg-white/15 text-2xl font-black">
            !
          </div>

          <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Reservation Expired
          </div>

          <h1 className="text-2xl font-black tracking-[-0.4px]">
            Your reserved slot has expired
          </h1>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm font-extrabold text-[#9a3412]">
            The temporary confirmation period has ended. Please select another
            available slot to continue your booking.
          </div>

          <button
            type="button"
            onClick={onSelectAnotherSlot}
            className="mt-6 min-h-13.5 w-full cursor-pointer rounded-[14px] bg-[#2563eb] px-5 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8]"
          >
            Select Another Slot
          </button>
        </div>
      </section>
    </main>
  );
};

function isReservationExpiredError(
  statusCode?: number,
  message?: string,
): boolean {
  if (statusCode === 410) {
    return true;
  }

  return (
    statusCode === 400 &&
    message?.toLowerCase().includes('expired') === true
  );
}