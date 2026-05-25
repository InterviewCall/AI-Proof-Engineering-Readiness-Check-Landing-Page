// src/components/thank-you/ThankYouPageSkeleton.tsx

import { FC } from 'react';

const ThankYouPageSkeleton: FC = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-[#020617]">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="h-7 w-36 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-44 animate-pulse rounded-full bg-slate-200" />
        </div>

        <section className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="bg-[linear-gradient(135deg,#15803d,#0f172a)] px-7 py-9 text-center max-sm:px-5">
            <div className="mx-auto size-16 animate-pulse rounded-full bg-white/20" />
            <div className="mx-auto mt-5 h-10 w-80 max-w-full animate-pulse rounded-xl bg-white/20" />
            <div className="mx-auto mt-4 h-5 w-120 max-w-full animate-pulse rounded-full bg-white/15" />
          </div>

          <div className="grid gap-5 p-7 max-sm:p-5">
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5"
                >
                  <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
                  <div className="mt-3 h-5 w-48 max-w-full animate-pulse rounded-full bg-slate-200" />
                </div>
              ))}
            </div>

            <div className="h-28 animate-pulse rounded-2xl border border-[#dbeafe] bg-[#eff6ff]" />
            <div className="mx-auto h-13 w-64 animate-pulse rounded-[14px] bg-slate-200" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ThankYouPageSkeleton;