import { useQuery } from '@tanstack/react-query';

import { getQualificationFormForCandidateApi } from '@/services/qualificationFormApi';

export function useGetQualificationForm(slug: string) {
    return useQuery({
        queryKey: ['qualification-form', slug],
        queryFn: () => getQualificationFormForCandidateApi(slug),
        enabled: Boolean(slug),
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false
    });
}