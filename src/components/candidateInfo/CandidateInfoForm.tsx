'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import CandidateDetailsForm, { CandidateDetailsSubmitResult } from './CandidateDetailsForm';
import CandidateFormLoadingOverlay from './CandidateFormLoadingOverlay';

export type CandidateInfoFormProps = {
    slug: string
    routeSlug?: string
}

const CandidateInfoForm: FC<CandidateInfoFormProps> = ({ slug, routeSlug }) => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const readinessRouteSlug = routeSlug ?? slug;

    const handleSubmitted = ({ candidateId }: CandidateDetailsSubmitResult) => {
        router.push(`/${readinessRouteSlug}/qualification-form?candidate-id=${candidateId}`);
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--form-bg)] px-4 py-9 text-(--form-text) max-sm:p-0">
            <section className="relative mx-auto w-[min(820px,100%)] overflow-hidden rounded-3xl border border-(--form-border) bg-(--form-white) shadow-(--form-shadow) max-sm:min-h-screen max-sm:rounded-none max-sm:border-0">
                {isPending && (
                    <CandidateFormLoadingOverlay 
                        title="Saving your details..."
                        description="Please wait while we create your readiness assessment profile"
                    />
                )}

                <header className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] p-8 text-white max-sm:px-5 max-sm:py-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-xl font-black tracking-[-0.4px]">
                            Interview<span className="text-[#93c5fd]">Call</span>
                        </div>
                    </div>

                    <div className="mb-4 inline-flex rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-black text-[#dbeafe]">
                        Personal Details
                    </div>

                    <h1 className="mb-3 text-[clamp(30px,4vw,44px)] font-black leading-[1.08] tracking-[-1px]">
                        Let’s begin with your basic details.
                    </h1>

                    <p className="max-w-170 text-base text-[#dbeafe]">
                        Enter your name, WhatsApp number, and email so our team can connect your readiness assessment with the right strategy call and next steps.
                    </p>
                </header>

                <div className="p-8 max-sm:px-5">
                    <CandidateDetailsForm
                        slug={slug}
                        onSubmitted={handleSubmitted}
                        onPendingChange={setIsPending}
                    />
                </div>
            </section>
        </main>
    );
};

export default CandidateInfoForm;