'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, MouseEvent, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateCandidateSubmission } from '@/hooks/create-candidate-submission/useCreateCandidateSubmission';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  goToNextStep,
  goToPreviousStep,
} from '@/lib/slices/qualificationFormSlice';
import { createCandidateQualificationFormSchema } from '@/schemas/createCandidateQualificationFormSchema';
import { CandidateAnswer } from '@/types/candidateAnswer';
import {
  CandidateQualificationFormValues,
  GetQualificationFormForCandidateResponse,
} from '@/types/qualificationForm';
import { buildCandidateAnswersFromSteps } from '@/utils/buildCandidateAnswersFromStep';
import { createCandidateFormDefaultValues } from '@/utils/qualification-form/createCandidateFormDefaultValues';

import CandidateFormLoadingOverlay from '../candidateInfo/CandidateFormLoadingOverlay';
import CandidateFormStep from './CandidateFormStep';
import HeaderSection from './HeaderSection';

export type CandidateQualificationFormContentProps = {
  form: GetQualificationFormForCandidateResponse;
};

const CandidateQualificationFormContent: FC<CandidateQualificationFormContentProps> = ({ form }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { mutateAsync: createCandidateSubmission, isPending } = useCreateCandidateSubmission();

  const currentStepIndex = useAppSelector(
    (state) => state.qualificationForm.currentStepIndex,
  );

  const defaultValues = useMemo(() => {
    return createCandidateFormDefaultValues(form.steps);
  }, [form.steps]);

  const validationSchema = useMemo(() => {
    return createCandidateQualificationFormSchema(form.steps);
  }, [form.steps]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CandidateQualificationFormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
    defaultValues,
    shouldUnregister: false,
  });

  const steps = form.steps;

  const totalSteps = steps.length || 1;

  const safeCurrentStepIndex = Math.min(currentStepIndex, totalSteps - 1);

  const currentStepNumber = safeCurrentStepIndex + 1;

  const progress =
    totalSteps <= 1
      ? 100
      : Math.round((safeCurrentStepIndex / (totalSteps - 1)) * 100);

  const currentStep = steps[safeCurrentStepIndex];

  const goNext = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!currentStep) {
      return;
    }

    const currentStepFields = currentStep.questions.map(
      (question) => question.questionKey,
    );

    const isValid = await trigger(currentStepFields, {
      shouldFocus: true,
    });

    if (!isValid) {
      return;
    }

    dispatch(goToNextStep());

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goPrevious = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(goToPreviousStep());
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onFormSubmit: SubmitHandler<CandidateQualificationFormValues> = async (values) => {
    try {
        const submissionId = localStorage.getItem(`candidate_submission_${form.slug}`);
        if(!submissionId) {
            toast.error('You do not have filled your contact details yet, please fill it first');
            router.push(`/readiness/${form.slug}/candidate-info`);
            return;
        }

        const answerPayload: CandidateAnswer[] = buildCandidateAnswersFromSteps(form.steps, values);

        const response = await createCandidateSubmission({
            submissionId,
            answerPayload
        });

        router.push(`/readiness/${form.slug}/book-strategy-call?submission-id=${response.data.submissionId}`);
    } catch {}
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--form-bg)] px-4 py-9 text-(--form-text) max-sm:p-0">
      <section className="relative mx-auto w-[min(820px,100%)] overflow-hidden rounded-3xl border border-(--form-border) bg-(--form-white) shadow-(--form-shadow) max-sm:min-h-screen max-sm:rounded-none max-sm:border-0">
        {isPending && (
            <CandidateFormLoadingOverlay
                title='Saving your answers...'
                description='Please wait while we create your readiness score based on your answers'
            />
        )}
        <HeaderSection
          name={form.name}
          title={form.title}
          subTitle={form.subTitle}
        />

        <div className="px-8 pt-6 max-sm:px-5">
          <div className="mb-2.5 flex justify-between gap-3 text-sm font-extrabold text-(--form-muted-light)">
            <span>
              Step {currentStepNumber} of {totalSteps}
            </span>

            <span>{progress}% completed</span>
          </div>

          <progress
            className="progress progress-primary h-2.5 w-full"
            value={progress}
            max={100}
          />
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 max-sm:px-5">
          {currentStep ? (
            <CandidateFormStep
              title={currentStep.title}
              helper={currentStep.helperText}
              stepNo={currentStep.stepNo}
              questions={currentStep.questions}
              register={register}
              errors={errors}
              watch={watch}
            />
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-bold text-amber-700">
              No step found for this form.
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3.5 max-sm:flex-col-reverse">
            <button
              type="button"
              onClick={goPrevious}
              className={clsx(
                'btn btn-neutral min-h-13.5 rounded-[13px] px-6 text-base font-black max-sm:w-full',
                {
                  'invisible max-sm:hidden': currentStepNumber == 1,
                },
              )}
            >
              Previous
            </button>

            {safeCurrentStepIndex < totalSteps - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="btn btn-primary min-h-13.5 rounded-[13px] px-6 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] max-sm:w-full"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary min-h-13.5 rounded-[13px] px-6 text-base font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] max-sm:w-full"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default CandidateQualificationFormContent;
