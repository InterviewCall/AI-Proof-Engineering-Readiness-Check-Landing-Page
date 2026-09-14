import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getCandidateApi } from '@/services/getCandidateApi';
import { ApiErrorResponse } from '@/types/apiErrorResponse';

export function useGetCandidate(candidateId?: string) {
    return useQuery({
        queryKey: ['candidate', candidateId],
        queryFn: () => getCandidateApi(candidateId!),
        enabled: Boolean(candidateId),
        retry: false,
        refetchOnWindowFocus: false,
    });
}