import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { confirmBookingApi } from '@/services/confirmBookingApi';
import { ApiErrorResponse } from '@/types/apiErrorResponse';
import { ConfirmBookingPayload, ConfirmBookingResponse } from '@/types/slotBooking';

export function useConfirmBooking() {
    return useMutation<ConfirmBookingResponse, AxiosError<ApiErrorResponse>, ConfirmBookingPayload>({
        mutationFn: confirmBookingApi,

        onSuccess: (response) => {
            toast.success(response.message);
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to book your slot. Please try again.');
        }
    });
}