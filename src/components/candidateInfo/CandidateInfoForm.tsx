'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateCandidate } from '@/hooks/create-candidate/useCreateCandidate';
import { useUtmTracker } from '@/hooks/utm-tracking/useUtmTracker';
import { candidateFormSchema } from '@/schemas/candidateFormSchema';
import { CandidateInfoFormValue } from '@/types/candidateInfoForm';

import StepWrapper from '../formSteps/StepWrapper';
import InputField from '../InputField';
import CandidateFormLoadingOverlay from './CandidateFormLoadingOverlay';

export type CandidateInfoFormProps = {
    slug: string
}

const CandidateInfoForm: FC<CandidateInfoFormProps> = ({ slug }) => {
    const router = useRouter();

    const { mutateAsync: createCandidate, isPending } = useCreateCandidate();

    const { getStoredUtmData } = useUtmTracker(slug);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CandidateInfoFormValue>({
        resolver: zodResolver(candidateFormSchema),
        mode: 'onTouched',
        defaultValues: {
            fullName: '',
            phone: '',
            email: ''
        }
    });

    const onFormSubmit: SubmitHandler<CandidateInfoFormValue> = async (data) => {
        const utmData = getStoredUtmData();

        const candidatePayload = {
            slug,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,

            landingPage: utmData?.landingPage,
            referrerUrl: utmData?.referrerUrl,

            source: utmData?.source,
            utmSource: utmData?.utmSource,
            utmMedium: utmData?.utmMedium,
            utmCampaign: utmData?.utmCampaign,
            utmContent: utmData?.utmContent,
            utmTerm: utmData?.utmTerm,

            gclid: utmData?.gclid,
            fbclid: utmData?.fbclid,
        };

        try {
           const response = await createCandidate(candidatePayload);

            localStorage.setItem(
                `candidate_submission_${slug}`,
                response.data.submissionId,
            );

            router.push(`/readiness/${slug}/qualification-form`); 
        } catch {}
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

                <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 max-sm:px-5">
                    <StepWrapper
                        title='First, tell us your basic details.'
                        helper='Our team will use this to contact you for your AI-Proof Engineer readiness call and share the next steps after your assessment.'
                    >
                        <InputField
                            name="fullName"
                            label="Full Name *"
                            placeholder="Enter your full name"
                            register={register}
                            error={errors.fullName?.message}
                        />

                        <InputField 
                            name="phone"
                            label="WhatsApp Number *"
                            type="tel"
                            placeholder="Enter your WhatsApp number"
                            register={register}
                            error={errors.phone?.message}
                        />

                        <InputField 
                            name="email"
                            label="Email Address *"
                            type="email"
                            placeholder="Enter your email address"
                            register={register}
                            error={errors.email?.message}
                        />
                    </StepWrapper>

                    <div className="mt-8 flex justify-center gap-3.5 max-sm:flex-col-reverse">
                        <button
                            type="submit"
                            className="btn btn-primary min-h-13.5 rounded-[13px] px-6 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] max-sm:w-full"
                        >
                            Submit Deatils
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default CandidateInfoForm;