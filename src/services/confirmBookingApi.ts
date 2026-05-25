import { slotBookingApiClient } from '@/lib/apiClient';
import { ConfirmBookingPayload, ConfirmBookingResponse } from '@/types/slotBooking';

export async function confirmBookingApi(confirmBookingPayload: ConfirmBookingPayload): Promise<ConfirmBookingResponse> {
    const response = await slotBookingApiClient.patch<ConfirmBookingResponse>(
        '/bookings/confirm-booking',
        undefined, {
            params: {
                reservationId: confirmBookingPayload.reservationId
            }
        }
    );

    return response.data;
}