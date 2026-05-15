import { FC } from 'react';

type CandidateFormLoadingOverlayProps = {
  title?: string;
  description?: string;
};

const CandidateFormLoadingOverlay: FC<CandidateFormLoadingOverlayProps> = ({
  title = 'Saving your details...',
  description = 'Please wait while we create your readiness assessment profile.',
}) => {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 px-4 backdrop-blur-xs">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/70 bg-white p-7 text-center shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2563eb,#60a5fa,#0f172a)]" />

        <div className="absolute -right-17.5 -top-17.5 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -bottom-20 -left-17.5 h-40 w-40 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-5 grid h-18 w-18 place-items-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#2563eb]" />
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#eff6ff] shadow-inner">
              <div className="h-3 w-3 rounded-full bg-[#2563eb]" />
            </div>
          </div>

          <p className="text-base font-black tracking-[-0.2px] text-[#020617]">
            {title}
          </p>

          <p className="mt-2 max-w-72 text-sm font-semibold leading-6 text-(--form-muted)">
            {description}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2563eb]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#60a5fa] [animation-delay:120ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#93c5fd] [animation-delay:240ms]" />
          </div>

          <p className="mt-4 text-xs font-bold text-slate-400">
            Do not refresh this page
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateFormLoadingOverlay;