'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler,useForm } from 'react-hook-form';
import { toast } from 'sonner';

import StepEight from '@/components/formSteps/StepEight';
import StepFive from '@/components/formSteps/StepFive';
import StepFour from '@/components/formSteps/StepFour';
import StepOne from '@/components/formSteps/StepOne';
import StepSeven from '@/components/formSteps/StepSeven';
import StepSix from '@/components/formSteps/StepSix';
import StepThree from '@/components/formSteps/StepThree';
import StepTwo from '@/components/formSteps/StepTwo';
import { stepFields } from '@/form/stepFields';
import { qualificationFormSchema } from '@/schemas/qualificationFormSchema';
import { QualificationForm, SavedQualificationFormStep, SavedQualificationFormValue } from '@/types/qualificationForm';
import { STEP_STORAGE_KEY, totalSteps,VALUE_STORAGE_KEY } from '@/utils/formContants';

const QualificationFormClient: FC = () => {
    const router = useRouter();

    const defaultValues: QualificationForm = {
        fullName: '',
        phone: '',
        email: '',
        company: '',
        role: '',
        yoe: '',
        aiConcern: '',
        currentCtc: '',
        targetCtc: '',
        mainGap: '',
        careerSituation: '',
        urgency: '',
        investmentReadiness: '',
        notes: ''
    };

    const getSavedQualificationFormValue = (): SavedQualificationFormValue | null => {
        if(typeof window === 'undefined') {
            return null;
        }
        const savedData = localStorage.getItem(VALUE_STORAGE_KEY);

        if(!savedData) {
            return null;
        }

        try {
            return JSON.parse(savedData) as SavedQualificationFormValue;
        } catch (error) {
            console.log('Failed to parse saved qualification form values', error);
            localStorage.removeItem(VALUE_STORAGE_KEY);
            return null;
        }
    };

    const getSavedQualificationFormStep = (): SavedQualificationFormStep | null => {
        if(typeof window === 'undefined') {
            return null;
        }

        const savedData = localStorage.getItem(STEP_STORAGE_KEY);

        if(!savedData) {
            return null;
        }

        try {
            return JSON.parse(savedData) as SavedQualificationFormStep;
        } catch (error) {
            console.log('Failed to parse saved qualification form', error);
            localStorage.removeItem(STEP_STORAGE_KEY);
            return null;
        }
    };

    const getStep = (): number => {
        const savedData = getSavedQualificationFormStep();

        if(
            savedData &&
            typeof savedData?.currentStep === 'number' &&
            savedData?.currentStep >= 1 &&
            savedData?.currentStep <= totalSteps
        ) {
            return savedData.currentStep;
        }

        return 1;
    };

    const getInitialFormValues = (): QualificationForm => {
        const savedData = getSavedQualificationFormValue();

        return {
            ...defaultValues,
            ...savedData?.formData
        };
    };

    const saveFormProgressValue = (formData: Partial<QualificationForm>): void => {
        localStorage.setItem(
            VALUE_STORAGE_KEY,
            JSON.stringify({
                formData
            })
        );
    };

    const saveFormStep = (step: number): void => {
        const savedStep = getStep();

        if(savedStep > step) {
            return;
        }

        localStorage.setItem(
            STEP_STORAGE_KEY,
            JSON.stringify({
                currentStep: step
            })
        );
    };

    const clearSavedFormProgress = (): void => {
        localStorage.removeItem(STEP_STORAGE_KEY);
        localStorage.removeItem(VALUE_STORAGE_KEY);
        reset(defaultValues);
        setCurrentStep(1);

        toast.success('Saved progress cleared. You can start again');
    };

    const [currentStep, setCurrentStep] = useState<number>(() => getStep());

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        subscribe,
        formState: { errors }
    } = useForm<QualificationForm>({
        resolver: zodResolver(qualificationFormSchema),
        mode: 'onTouched',
        defaultValues: getInitialFormValues()
    });

    useEffect(() => {
       const unsubscribe = subscribe({
        formState: {
            values: true
        },
        callback: ({ values }) => {
            saveFormProgressValue(values);
        }
       });

       return unsubscribe;
    }, [subscribe]);

    const progress: number = Math.round(((getStep() - 1) / totalSteps) * 100);

    const nextStep = async (): Promise<void> => {
        const fieldsToValidate = stepFields[currentStep];
        const isStepValid: boolean = await trigger(fieldsToValidate, {
            shouldFocus: true
        });

        if(!isStepValid) {
            return;
        }

        if(currentStep < totalSteps) {
            const next = currentStep + 1;
            setCurrentStep(next);
            saveFormStep(next);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = (): void => {
        if(currentStep > 1) {
            const prev = currentStep - 1;
            setCurrentStep(prev);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const onFormSubmit: SubmitHandler<QualificationForm> = (data: QualificationForm) => {
        console.log(data);
        toast.success('Submitted successfully. Choose your strategy call slot.');
        router.push('/book-strategy-call');
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--form-bg)] px-4 py-9 text-(--form-text) max-sm:p-0">
            <section className="mx-auto w-[min(820px,100%)] overflow-hidden rounded-3xl border border-(--form-border) bg-(--form-white) shadow-(--form-shadow) max-sm:min-h-screen max-sm:rounded-none max-sm:border-0">
                <header className="bg-[linear-gradient(135deg,#1d4ed8,#0f172a)] p-8 text-white max-sm:px-5 max-sm:py-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-xl font-black tracking-[-0.4px]">
                            Interview<span className="text-[#93c5fd]">Call</span>
                        </div>

                        <div className="rounded-full bg-white/15 px-3 py-2 text-[13px] font-extrabold text-[#dbeafe]">
                            AI Fear / VSL A
                        </div>
                    </div>

                    <div className="mb-4 inline-flex rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-black text-[#dbeafe]">
                        AI-Proof Engineer Readiness Check
                    </div>

                    <h1 className="mb-3 text-[clamp(30px,4vw,44px)] font-black leading-[1.08] tracking-[-1px]">
                        Let’s check whether your current skillset is strong enough for the AI era.
                    </h1>

                    <p className="max-w-170 text-base text-[#dbeafe]">
                        Answer a few questions so our team can understand your current
                        engineering stage, AI-readiness, and whether the AI-Proof Engineer
                        Program is the right fit for you.
                    </p>
                </header>

                <div className="px-8 pt-6 max-sm:px-5">
                    <div className="mb-2.5 flex justify-between gap-3 text-sm font-extrabold text-(--form-muted-light)">
                        <span>
                            Step {currentStep} of {totalSteps}
                        </span>
                        
                        <span>{progress}% completed</span>
                    </div>

                    <progress 
                        className="progress progress-primary h-2.5 w-full"
                        value={progress}
                        max={100}
                    />
                </div>

                <form className="p-8 max-sm:px-5" onSubmit={handleSubmit(onFormSubmit)}>
                    {currentStep == 1 && (
                        <StepOne 
                            register={register}
                            errors={errors}
                        />
                    )}

                    {currentStep == 2 && (
                        <StepTwo 
                            register={register}
                            errors={errors}
                        />
                    )} 

                    {currentStep == 3 && (
                        <StepThree
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    )}

                    {currentStep == 4 && (
                        <StepFour
                            register={register}
                            errors={errors} 
                        />
                    )}

                    {currentStep == 5 && (
                        <StepFive 
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    )}

                    {currentStep == 6 && (
                        <StepSix 
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    )}

                    {currentStep == 7 && (
                        <StepSeven 
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    )}

                    {currentStep == 8 && (
                        <StepEight 
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    )}

                    <div className="mt-8 flex justify-between gap-3.5 max-sm:flex-col-reverse">
                        <button
                            type="button"
                            onClick={prevStep}
                            className={clsx('btn btn-neutral min-h-13.5 rounded-[13px] px-6 text-base font-black max-sm:w-full', 
                                {
                                    'invisible max-sm:hidden': currentStep == 1
                                }
                            )}
                        >
                            Previous
                        </button>

                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="btn btn-primary min-h-13.5 rounded-[13px] px-6 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] max-sm:w-full"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary min-h-13.5 rounded-[13px] px-6 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] max-sm:w-full"
                            >
                                Submit & Book Strategy Call
                            </button>
                        )}
                    </div>
                    
                    <button
                        type="button"
                        onClick={clearSavedFormProgress}
                        className="mt-4 w-fit text-center flex mx-auto text-sm font-bold text-(--form-muted-light) transition hover:text-(--form-red) cursor-pointer"
                    >
                        Clear saved progress and start again
                    </button>

                    <p className="mt-4.5 text-center text-[13px] font-semibold text-(--form-muted-light)">
                        Your information is used only for program-fit evaluation and
                        strategy call follow-up.
                    </p>
                </form>
            </section>
        </main>
    );
};

export default QualificationFormClient;