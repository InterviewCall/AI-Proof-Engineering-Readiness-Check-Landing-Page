'use client';

import { FC } from 'react';

type LockedVideoPreviewProps = {
    previewSrc: string
    posterSrc?: string
    title: string
    isChecking: boolean
    onUnlockClick: () => void
}

// Silent looping teaser. Clicking anywhere on it opens the details popup.
const LockedVideoPreview: FC<LockedVideoPreviewProps> = ({ previewSrc, posterSrc, title, isChecking, onUnlockClick }) => {
    return (
        <button
            type="button"
            onClick={onUnlockClick}
            disabled={isChecking}
            aria-label={`${title}: enter your details to watch`}
            className="group relative block h-full w-full cursor-pointer overflow-hidden text-left disabled:cursor-wait"
        >
            <video
                src={previewSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none h-full w-full object-cover"
            />

            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_30%,rgba(2,6,23,0.65)_100%)]" />

            <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
                <span aria-hidden="true">🔇</span>
                Preview
            </span>

            <span className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-4 pb-5 text-center">
                <span className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-(--color-blue) px-6 text-base font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.45)] transition group-hover:-translate-y-0.5 group-hover:bg-(--color-blue-dark) max-sm:text-sm">
                    <span aria-hidden="true">▶</span>
                    Watch the free breakdown
                </span>

                <span className="text-xs font-bold text-white/85">
                    Enter your details to unlock the full video
                </span>
            </span>
        </button>
    );
};

export default LockedVideoPreview;
