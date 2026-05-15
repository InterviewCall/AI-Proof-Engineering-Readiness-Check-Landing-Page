import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createCandidateAnswerApi } from '@/services/createCandidateAnswerApi';
import { ApiErrorResponse } from '@/types/apiErrorResponse';
import { CreateCandidateAnswerResponse, CreateSubmissionPayload } from '@/types/candidateInfoForm';

export function useCreateCandidateSubmission() {
    return useMutation<CreateCandidateAnswerResponse, AxiosError<ApiErrorResponse>, CreateSubmissionPayload>({
        mutationFn: createCandidateAnswerApi,

        onSuccess: (response) => {
            toast.success(response.message);
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to save your answers. Please try again.');
        }
    });
}