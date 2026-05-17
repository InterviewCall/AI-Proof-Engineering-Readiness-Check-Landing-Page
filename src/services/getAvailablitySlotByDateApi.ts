import { slotBookingApiClient } from '@/lib/apiClient';
import { GetAvalilabilitySlotResponse } from '@/types/availabilitySlotResponse';

export async function getAvailabilitySlotByDateApi(date: string) {
    const response = await slotBookingApiClient.get<GetAvalilabilitySlotResponse>('/date-time-slots/available-slots', {
        params: {
            bookingDate: date
        }
    });

    return response.data;
}