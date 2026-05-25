import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getReservationDetailsApi } from '@/services/getReservationDetailsApi';
import { ApiErrorResponse } from '@/types/apiErrorResponse';
import { GetReservationResponse } from '@/types/reservation';

export function useGetReservationDetails(reservationId: string) {
    return useQuery<GetReservationResponse, AxiosError<ApiErrorResponse>>({
        queryKey: ['reservation-details', reservationId],
        queryFn: () => getReservationDetailsApi(reservationId),
        enabled: Boolean(reservationId),
        staleTime: 0,
        gcTime: 60 * 1000,
        retry: 1
    });
}