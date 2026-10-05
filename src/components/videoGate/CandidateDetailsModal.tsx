'use client';

import { FC, useEffect, useState } from 'react';

import CandidateDetailsForm, { CandidateDetailsSubmitResult } from '../candidateInfo/CandidateDetailsForm';
import CandidateFormLoadingOverlay from '../candidateInfo/CandidateFormLoadingOverlay';

export type CandidateDetailsModalProps = {
    formSlug: string
    onClose: () => void
    onSubmitted: (result: CandidateDetailsSubmitResult) => void
}

const CandidateDetailsModal: FC<CandidateDetailsModalProps> = ({ formSlug, onClose, onSubmitted }) => {
    const [isPending, setIsPending] = useState(false);

    // Esc closes it (unless we are saving); page behind does not scroll while it is open
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isPending) onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPending, onClose]);

    return (
        <div
            className="fixed inset-0 z-200 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isPending) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="video-gate-title"
                className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-(--form-white) shadow-(--form-shadow) sm:max-w-130 sm:rounded-3xl"
            >
                {isPending && (
                    <CandidateFormLoadingOverlay
                        title="Saving your details..."
                        description="Just a moment while we get everything ready for you."
                    />
                )}

                <header className="relative bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] px-6 py-6 text-white">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        aria-label="Close"
                        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-lg font-black text-white transition hover:bg-white/25"
                    >
                        ×
                    </button>

                    <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-[#dbeafe]">
                        Your Details
                    </div>

                    <h2 id="video-gate-title" className="mb-2 pr-8 text-2xl font-black leading-tight tracking-[-0.5px]">
                        Enter your details to get started
                    </h2>

                    <p className="text-sm font-semibold text-[#dbeafe]">
                        These unlock the free video and your readiness check. You only need to enter them once.
                    </p>
                </header>

                <div className="px-6 pb-6 pt-5">
                    <CandidateDetailsForm
                        slug={formSlug}
                        variant="modal"
                        submitLabel="Continue"
                        onSubmitted={onSubmitted}
                        onPendingChange={setIsPending}
                    />
                </div>
            </div>
        </div>
    );
};

export default CandidateDetailsModal;
