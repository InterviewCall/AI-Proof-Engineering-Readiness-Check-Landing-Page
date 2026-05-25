import { slotBookingApiClient } from '@/lib/apiClient';
import { GetReservationResponse } from '@/types/reservation';

export async function getReservationDetailsApi(reservationId: string): Promise<GetReservationResponse> {
    const response = await slotBookingApiClient.get<GetReservationResponse>(`/reservations/${reservationId}`);
    return response.data;
}