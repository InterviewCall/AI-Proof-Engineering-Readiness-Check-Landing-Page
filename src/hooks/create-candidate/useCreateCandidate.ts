import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createCandidateApi } from '@/services/createCandidateApi';
import { ApiErrorResponse } from '@/types/apiErrorResponse';
import { CreateCandidateResponse, CreateCandidateValue } from '@/types/candidateInfoForm';

export function useCreateCandidate() {
    return useMutation<CreateCandidateResponse, AxiosError<ApiErrorResponse>, CreateCandidateValue>({
        mutationFn: createCandidateApi,

        onSuccess: (response) => {
            toast.success(response.message);
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to save your details. Please try again.');
        }
    });
}