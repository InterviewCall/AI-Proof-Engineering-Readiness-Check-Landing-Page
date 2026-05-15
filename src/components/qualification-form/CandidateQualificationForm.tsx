'use client';

import { AxiosError } from 'axios';
import {
  FC,
  useEffect,
} from 'react';
import { toast } from 'sonner';

import { useGetQualificationForm } from '@/hooks/qualification-form/useGetQualificationForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  clearQualificationForm,
  setQualificationForm,
} from '@/lib/slices/qualificationFormSlice';
import { ApiErrorResponse } from '@/types/apiErrorResponse';

import CandidateQualificationFormContent from './CandidateQualificationFormContent';
import CandidateQualificationFormLoader from './CandidateQualificationFormLoader';

export type CandidateQualificationFormProps = {
  slug: string;
};

const CandidateQualificationForm: FC<CandidateQualificationFormProps> = ({
  slug,
}) => {
  const dispatch = useAppDispatch();

  const storedForm = useAppSelector((state) => state.qualificationForm.form);

  const { data, isLoading, isError, error, isSuccess } =
    useGetQualificationForm(slug);

  const form = storedForm ?? data?.data ?? null;

  useEffect(() => {
    if (!isSuccess || !data?.data) {
      return;
    }

    if (storedForm?.id === data.data.id) {
      return;
    }

    dispatch(setQualificationForm(data.data));
  }, [isSuccess, data, storedForm?.id, dispatch]);

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      toast.error(
        axiosError.response?.data.message ||
          'Unable to load qualification form',
      );
    }
  }, [isError, error]);

  useEffect(() => {
    return () => {
      dispatch(clearQualificationForm());
    };
  }, [dispatch]);

  if (isLoading) {
    return <CandidateQualificationFormLoader />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_30%),var(--form-bg)] px-4 py-9 text-(--form-text) max-sm:p-0">
        <section className="mx-auto grid w-[min(820px,100%)] min-h-105 place-items-center overflow-hidden rounded-3xl border border-(--form-border) bg-(--form-white) p-8 text-center shadow-(--form-shadow) max-sm:min-h-screen max-sm:rounded-none max-sm:border-0">
          <div>
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-2xl">
              ⚠️
            </div>

            <h1 className="text-2xl font-black tracking-[-0.5px] text-slate-950">
              Unable to load qualification form
            </h1>

            <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
              Please check the form link and try again. If the issue continues,
              contact the InterviewCall team.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!form) {
    return <CandidateQualificationFormLoader />;
  }

  return (
    <CandidateQualificationFormContent form={form} />
  );
};

export default CandidateQualificationForm;
