import { FC } from 'react';

const ConfirmBookingPageSkeleton: FC = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-[#020617]">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="h-7 w-36 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-64 animate-pulse rounded-full bg-slate-200" />
        </div>

        <section className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-7 py-7 max-sm:px-5">
            <div className="h-7 w-32 animate-pulse rounded-full bg-white/20" />
            <div className="mt-4 h-11 w-full max-w-sm animate-pulse rounded-xl bg-white/20" />
            <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-full bg-white/15" />
          </div>

          <div className="grid grid-cols-[1.05fr_0.95fr] gap-0 max-lg:grid-cols-1">
            <div className="border-r border-[#e2e8f0] p-7 max-lg:border-r-0 max-lg:border-b max-sm:p-5">
              <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="h-3 w-32 animate-pulse rounded-full bg-[#dbeafe]" />
                    <div className="mt-3 h-4 w-full max-w-72 animate-pulse rounded-full bg-[#dbeafe]" />
                  </div>

                  <div className="size-14 animate-pulse rounded-full bg-white" />
                </div>

                <div className="h-2 animate-pulse rounded-full bg-white" />
              </div>

              <div className="mb-5 mt-6">
                <div className="h-8 w-44 animate-pulse rounded-lg bg-slate-200" />
                <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded-full bg-slate-100" />
              </div>

              <div className="grid gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4"
                  >
                    <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
                    <div className="mt-3 h-5 w-52 max-w-full animate-pulse rounded-full bg-slate-200" />
                  </div>
                ))}
              </div>

              <div className="mt-6 h-13.5 w-full animate-pulse rounded-[14px] bg-slate-200" />
              <div className="mt-3 h-12 w-full animate-pulse rounded-[14px] bg-slate-100" />
            </div>

            <aside className="bg-[#f8fafc] p-7 max-sm:p-5">
              <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5">
                <div className="h-7 w-44 animate-pulse rounded-lg bg-slate-200" />

                <div className="mt-5 grid gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="size-6 min-w-6 animate-pulse rounded-full bg-slate-200" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 h-30 animate-pulse rounded-2xl border border-[#dbeafe] bg-[#eff6ff]" />
              <div className="mt-5 h-24 animate-pulse rounded-2xl border border-[#fed7aa] bg-[#fff7ed]" />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ConfirmBookingPageSkeleton;