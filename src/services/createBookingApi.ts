import { slotBookingApiClient } from '@/lib/apiClient';
import { CreateBookingPayload, CreateBookingResponse } from '@/types/slotBooking';

export async function createBookingApi(createBookingPayload: CreateBookingPayload): Promise<CreateBookingResponse> {
    const response = await slotBookingApiClient.post<CreateBookingResponse>(
        '/bookings/create-booking', 
        createBookingPayload
    );

    return response.data;
}