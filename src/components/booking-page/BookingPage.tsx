'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { BookingPageContent } from '@/constants/bookingPageContent';

import BookingCalendar from './BookingCalender';

export type BookingPageProps = {
    content: BookingPageContent
    slug: string
}

const BookingPage: FC<BookingPageProps> = ({ content, slug }) => {
    const searchParams = useSearchParams();
    const submissionId = searchParams.get('submission-id');
    return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--booking-bg)] px-4 py-8.5 text-(--booking-text) max-sm:px-3 max-sm:py-5">
      <div className="mx-auto w-[min(1180px,100%)]">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 max-sm:mb-4.5">
          <div className="text-[22px] font-black tracking-[-0.5px] text-[#020617] max-sm:text-xl">
            Interview
            <span className="text-(--booking-blue)">Call</span>
          </div>

          <div className="rounded-full bg-[#dcfce7] px-3.5 py-2 text-sm font-black text-[#166534]">
            Readiness check submitted — final step pending
          </div>
        </div>

        <section className="grid grid-cols-[0.9fr_1.1fr] items-stretch gap-7.5 max-lg:grid-cols-1">
          <aside className="order-1 max-lg:order-2 overflow-hidden rounded-3xl border border-(--booking-border) bg-(--booking-white) p-8.5 shadow-(--booking-shadow) max-sm:px-5 max-sm:py-6">
            <div className="mb-4.5 inline-flex rounded-full bg-[#eff6ff] px-3.5 py-2 text-[13px] font-black text-(--booking-blue-dark)">
              {content.aside.badge}
            </div>

            <h1 className="mb-4 text-[clamp(34px,5vw,56px)] font-black leading-[1.05] tracking-[-1.4px] text-[#020617]">
              {content.aside.titlePrefix}{' '}
              <span className="text-(--booking-blue)">
                {content.aside.highlightedTitle}
              </span>{' '}
              {content.aside.titleSuffix}
            </h1>

            <p className="mb-6.5 text-lg text-(--booking-muted)">
              {content.aside.description}
            </p>

            <div className="mb-6 rounded-[18px] border border-(--booking-border) bg-[#f8fafc] p-5.5">
              <h2 className="mb-3.75 text-[21px] font-black tracking-[-0.3px] text-[#020617]">
                {content.aside.callBox.heading}
              </h2>

              {content.aside.callBox.items.map((item, index) => (
                <CallItem key={item} number={String(index + 1)} text={item} />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-3.5 text-[22px] font-black tracking-[-0.3px] text-[#020617]">
                {content.aside.expectations.heading}
              </h3>

              <div className="grid gap-3">
                {content.aside.expectations.items.map((item) => (
                  <ChecklistItem key={item} text={item} />
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-(--booking-orange-border) bg-(--booking-orange-bg) p-4.5 text-sm font-extrabold text-(--booking-orange-text)">
              {content.aside.warning}
            </div>
          </aside>

          <section className="order-2 max-lg:order-1 overflow-hidden rounded-3xl border border-(--booking-border) bg-(--booking-white) shadow-(--booking-shadow)">
            <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] p-6.5 text-white max-sm:px-5 max-sm:py-5.5">
              <div className="mb-3 inline-flex rounded-full bg-white/15 px-2.75 py-1.75 text-xs font-black text-[#dbeafe]">
                AI-Proof Engineer Strategy Call
              </div>

              <h2 className="mb-2 text-[28px] font-black leading-[1.12] tracking-[-0.6px]">
                Select your call slot
              </h2>

              <p className="text-[15px] font-semibold text-[#dbeafe]">
                Pick a time that you can attend without distractions. Your
                submitted answers will help our team guide the call better.
              </p>
            </div>

            <div className="relative min-h-172.5 bg-white max-lg:min-h-182.5 max-sm:min-h-190">
              <BookingCalendar submissionId={submissionId} slug={slug}  />
            </div>

            {/* Later show this after successful booking event */}
            {/* <div className="mx-[26px] mb-[26px] mt-[22px] rounded-2xl border border-[#bbf7d0] bg-[#ecfdf5] p-[18px] text-sm font-extrabold text-[#166534]">
              Your strategy call has been scheduled. Please check your email/WhatsApp for confirmation and join on time.
            </div> */}
          </section>
        </section>

        <p className="mt-5.5 text-center text-[13px] font-semibold text-(--booking-muted-light)">
          © InterviewCall. Your booking details will be used only for the
          strategy call and program-fit evaluation.
        </p>
      </div>
    </main>
    );
};

type CallItemProps = {
  number: string;
  text: string;
};

const CallItem: FC<CallItemProps> = ({ number, text }) => {
  return (
    <div className="mb-3.25 flex items-start gap-3 text-[15px] font-bold text-[#334155] last:mb-0">
      <span className="mt-px grid h-6.25 w-6.25 min-w-6.25 place-items-center rounded-full bg-(--booking-blue) text-[13px] font-black text-white">
        {number}
      </span>

      <span>{text}</span>
    </div>
  );
};

type ChecklistItemProps = {
  text: string;
};

const ChecklistItem: FC<ChecklistItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-3 text-[15px] font-bold text-[#334155]">
      <span className="mt-px grid h-5.75 w-5.75 min-w-5.75 place-items-center rounded-full bg-(--booking-green) text-[13px] font-black text-white">
        ✓
      </span>

      <span>{text}</span>
    </div>
  );
};

export default BookingPage;