import { TimeSlotStatus } from '@/enums/TimeSlotStatus';

export type Slot = {
    id: number,
    slotTime: string,
    slotLabel: string
}

export type AvailabilitySlot = {
    id: number,
    slotStartAt: string
    status: TimeSlotStatus
    timeSlot: Slot 
}

export type UiSlot = {
    dateTimeSlotId: number;
    bookingTimeSlotId: number;
    slotTime: string;
    slotLabel: string;
};

export type GetAvalilabilitySlotResponse = {
    success: boolean;
    message: string;
    data: AvailabilitySlot[];
    error?: Record<string, unknown>;
}