import { useQuery } from '@tanstack/react-query';

import { getAvailabilitySlotByDateApi } from '@/services/getAvailablitySlotByDateApi';

export function useGetAvailableSlotsByDate(date: string) {
    return useQuery({
        queryKey: ['available-slots', date],
        queryFn: () => getAvailabilitySlotByDateApi(date),
        enabled: Boolean(date),
        staleTime: 30 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false
    });
}