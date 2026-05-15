// components/qualification-form/CandidateQualificationFormLoader.tsx

import { FC } from 'react';

const CandidateQualificationFormLoader: FC = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--form-bg)] px-4 py-9 text-(--form-text) max-sm:p-0">
      <section className="mx-auto w-[min(820px,100%)] overflow-hidden rounded-3xl border border-(--form-border) bg-(--form-white) shadow-(--form-shadow) max-sm:min-h-screen max-sm:rounded-none max-sm:border-0">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_45%,#0f172a_100%)] px-7 py-9 text-white max-sm:px-5">
          <div className="absolute -right-17.5 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-22.5 -left-17.5 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="h-8 w-40 animate-pulse rounded-full bg-white/20" />
              <div className="h-9 w-28 animate-pulse rounded-full bg-white/15" />
            </div>

            <div className="space-y-3">
              <div className="h-10 w-full max-w-170 animate-pulse rounded-2xl bg-white/20" />
              <div className="h-10 w-[82%] animate-pulse rounded-2xl bg-white/20" />
            </div>

            <div className="mt-5 space-y-2.5">
              <div className="h-4 w-full max-w-175 animate-pulse rounded-full bg-white/15" />
              <div className="h-4 w-[92%] animate-pulse rounded-full bg-white/15" />
              <div className="h-4 w-[70%] animate-pulse rounded-full bg-white/15" />
            </div>
          </div>
        </div>

        <div className="p-7 max-sm:px-5">
          <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 h-4 w-44 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 h-5 w-[72%] animate-pulse rounded-full bg-slate-200" />
                <div className="space-y-3">
                  <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100" />
                  <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CandidateQualificationFormLoader;