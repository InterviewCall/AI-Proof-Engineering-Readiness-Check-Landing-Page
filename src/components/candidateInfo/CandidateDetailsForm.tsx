'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateCandidate } from '@/hooks/create-candidate/useCreateCandidate';
import { useUtmTracker } from '@/hooks/utm-tracking/useUtmTracker';
import { saveCandidateSession } from '@/lib/candidateSession';
import { candidateFormSchema } from '@/schemas/candidateFormSchema';
import { CandidateInfoFormValue } from '@/types/candidateInfoForm';

import StepWrapper from '../formSteps/StepWrapper';
import InputField from '../InputField';

export type CandidateDetailsSubmitResult = {
    candidateId: string
    submissionId: string
}

export type CandidateDetailsFormProps = {
    // form slug used by the backend (landingPageData.formSlug)
    slug: string
    onSubmitted: (result: CandidateDetailsSubmitResult) => void
    onPendingChange?: (isPending: boolean) => void
    // 'page' shows the step heading used on /candidate-info, 'modal' is the compact version
    variant?: 'page' | 'modal'
    submitLabel?: string
}

// The 3 personal-detail fields + create-candidate call. Shared by the /candidate-info page and the video popup.
const CandidateDetailsForm: FC<CandidateDetailsFormProps> = ({
    slug,
    onSubmitted,
    onPendingChange,
    variant = 'page',
    submitLabel = 'Submit Details',
}) => {
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

    useEffect(() => {
        onPendingChange?.(isPending);
    }, [isPending, onPendingChange]);

    const onFormSubmit: SubmitHandler<CandidateInfoFormValue> = async (data) => {
        const utmData = getStoredUtmData();

        const candidatePayload = {
            slug,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,

            referrerUrl: utmData?.referrerUrl,
            landingPage: utmData?.landingPage,

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
            const { candidateId, submissionId } = response.data;

            saveCandidateSession(slug, { candidateId, submissionId });
            onSubmitted({ candidateId: String(candidateId), submissionId });
        } catch {
            // error toast is shown by useCreateCandidate
        }
    };

    const fields = (
        <>
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
        </>
    );

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            {variant === 'page' ? (
                <StepWrapper
                    title='First, tell us your basic details.'
                    helper='Our team will use this to contact you for your AI-Proof Engineer readiness call and share the next steps after your assessment.'
                >
                    {fields}
                </StepWrapper>
            ) : (
                fields
            )}

            <div className="mt-6 flex justify-center gap-3.5 max-sm:flex-col-reverse">
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary min-h-13.5 rounded-[13px] px-6 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] max-sm:w-full"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

export default CandidateDetailsForm;
