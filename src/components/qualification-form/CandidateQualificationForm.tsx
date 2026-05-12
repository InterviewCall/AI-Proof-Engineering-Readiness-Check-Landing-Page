'use client';

import { AxiosError } from 'axios';
import { FC, useEffect } from 'react';
import { toast } from 'sonner';

import { useGetQualificationForm } from '@/hooks/qualification-form/useGetQualificationForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { clearQualificationForm, setQualificationForm } from '@/lib/slices/qualificationFormSlice';
import { ApiErrorResponse } from '@/types/apiErrorResponse';

export type CandidateQualificationFormProps = {
    slug: string
}

const CandidateQualificationForm: FC<CandidateQualificationFormProps> = ({ slug }) => {
    const dispatch = useAppDispatch();

    const storedForm = useAppSelector((state) => state.qualificationForm.form);

    const { data, isLoading, isError, error, isSuccess } = useGetQualificationForm(slug);

    useEffect(() => {
        if(isSuccess && data?.data) {
            dispatch(setQualificationForm(data.data));
        }
    }, [isSuccess, data, dispatch]);

    useEffect(() => {
        if(isError) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            toast.error(axiosError.response?.data.message || 'Unable to load qualification form');
        }
    }, [isError, error]);

    useEffect(() => {
        return () => {
            dispatch(clearQualificationForm());
        };
    }, [dispatch]);

    if(isLoading) {
        return (
            <div>
                Loading qualification form...
            </div>
        );
    }

    if(isError) {
        return (
            <div>
                Unable to load qualification form
            </div>
        );
    }

    return (
        <pre className='text-black'>
            {JSON.stringify(storedForm, null, 2)}
        </pre>
    );
};

export default CandidateQualificationForm;