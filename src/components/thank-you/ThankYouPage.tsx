// src/components/thank-you/ThankYouPage.tsx

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { useGetReservationDetails } from '@/hooks/reservation-details/useGetReservationDetails';

import ThankYouPageSkeleton from './ThankYouPageSkeleton';

type ThankYouPageProps = {
  callTitle: string;
};

const ThankYouPage: FC<ThankYouPageProps> = ({ callTitle }) => {
  const searchParams = useSearchParams();

  const reservationId = searchParams.get('reservation-id') ?? '';

  const {
    data: reservationResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetReservationDetails(reservationId);

  const reservationDetails = reservationResponse?.data;

  const errorMessage =
    error?.response?.data?.message ||
    'We could not load your confirmed booking details. Please contact our team if you have already completed your booking.';

  if (!reservationId) {
    return (
      <ThankYouUnavailableState message="Booking confirmation reference is missing." />
    );
  }

  if (isLoading || isFetching) {
    return <ThankYouPageSkeleton />;
  }

  if (isError || !reservationDetails) {
    return <ThankYouUnavailableState message={errorMessage} />;
  }

  if (reservationDetails.reservationStatus !== 'confirmed') {
    return (
      <ThankYouUnavailableState message="This booking has not been confirmed yet." />
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-[#020617]">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[22px] font-black tracking-[-0.5px] text-[#020617]">
            Interview<span className="text-[#2563eb]">Call</span>
          </div>

          <div className="rounded-full bg-[#dcfce7] px-4 py-2 text-sm font-black text-[#166534]">
            Booking Confirmed
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="bg-[linear-gradient(135deg,#15803d,#0f172a)] px-7 py-9 text-center text-white max-sm:px-5">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-white/15 text-3xl font-black">
              ✓
            </div>

            <div className="mt-5 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dcfce7]">
              Reservation Completed
            </div>

            <h1 className="mt-4 text-[clamp(30px,4vw,46px)] font-black leading-[1.08] tracking-[-1px]">
              Your strategy call is confirmed
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-[15px] font-semibold text-[#dcfce7]">
              Thank you, {reservationDetails.candidateName}. Your selected slot
              has been confirmed successfully.
            </p>
          </div>

          <div className="p-7 max-sm:p-5">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-4 text-center text-2xl font-black tracking-[-0.4px]">
                Your booking details
              </h2>

              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <ConfirmedDetailRow
                  label="Strategy Call"
                  value={callTitle}
                />

                <ConfirmedDetailRow
                  label="Confirmed Slot"
                  value={`${reservationDetails.slotDetails} IST`}
                />

                <ConfirmedDetailRow
                  label="Candidate"
                  value={reservationDetails.candidateName}
                />

                <ConfirmedDetailRow
                  label="Email"
                  value={reservationDetails.candidateEmail}
                />
              </div>

              <div className="mt-5 rounded-2xl border border-[#bbf7d0] bg-[#ecfdf5] p-5">
                <h3 className="text-lg font-black text-[#166534]">
                  Your booking has been secured
                </h3>

                <p className="mt-2 text-sm font-bold text-[#334155]">
                  Please keep this selected time available. Further call details
                  and instructions will be shared with you on your registered
                  contact details.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-5">
                <h3 className="text-lg font-black text-[#1e3a8a]">
                  Prepare for your strategy call
                </h3>

                <div className="mt-4 grid gap-3">
                  <NextStepItem text="Keep 30 minutes free for the discussion." />
                  <NextStepItem text="Join from a quiet place with stable internet." />
                  <NextStepItem text="Be ready to discuss your current role, goals, and skill gaps." />
                  <NextStepItem text="Our team will use your submitted readiness answers to guide the conversation." />
                </div>
              </div>

              <div className="mt-7 text-center">
                <Link
                  href="/"
                  className="inline-flex min-h-13 items-center justify-center rounded-[14px] bg-[#2563eb] px-8 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8]"
                >
                  Go to InterviewCall Home
                </Link>

                <p className="mt-4 text-xs font-semibold text-[#64748b]">
                  You may close this page now. Your confirmed slot has been
                  recorded successfully.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ThankYouPage;

type ConfirmedDetailRowProps = {
  label: string;
  value: string;
};

const ConfirmedDetailRow: FC<ConfirmedDetailRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
      <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-[#94a3b8]">
        {label}
      </p>

      <p className="text-base font-black text-[#020617]">{value}</p>
    </div>
  );
};

type NextStepItemProps = {
  text: string;
};

const NextStepItem: FC<NextStepItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-6 min-w-6 place-items-center rounded-full bg-[#16a34a] text-xs font-black text-white">
        ✓
      </span>

      <span className="text-sm font-bold text-[#334155]">{text}</span>
    </div>
  );
};

type ThankYouUnavailableStateProps = {
  message: string;
};

const ThankYouUnavailableState: FC<ThankYouUnavailableStateProps> = ({
  message,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-8 text-[#020617]">
      <section className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
        <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-6 text-white">
          <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
            Booking Details
          </div>

          <h1 className="text-3xl font-black tracking-[-0.5px]">
            Unable to show confirmation
          </h1>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm font-extrabold text-[#9a3412]">
            {message}
          </div>

          <Link
            href="/"
            className="mt-6 flex min-h-13 w-full items-center justify-center rounded-[14px] bg-[#2563eb] px-5 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8]"
          >
            Go to InterviewCall Home
          </Link>
        </div>
      </section>
    </main>
  );
};