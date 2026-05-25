import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createBookingApi } from '@/services/createBookingApi';
import { ApiErrorResponse } from '@/types/apiErrorResponse';
import { CreateBookingPayload, CreateBookingResponse } from '@/types/slotBooking';

export function useCreateBooking() {
    return useMutation<CreateBookingResponse, AxiosError<ApiErrorResponse>, CreateBookingPayload>({
        mutationFn: createBookingApi,

        onSuccess: (response) => {
            toast.success(response.message);
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to book your slot. Please try again.');
        }
    });
}