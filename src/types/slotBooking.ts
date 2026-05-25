export type CreateBookingPayload = {
    submissionId: string,
    dateTimeSlotId: number
}

export type ConfirmBookingPayload = {
    reservationId: string
}

export type Booking = {
    reservationId: string,
    candidateId: number,
    slotId: number,
    expiredAt: string
}

export type ConfirmBooking = {
    bookingId: number
}

export type CreateBookingResponse = {
    success: boolean,
    message: string,
    data: Booking,
    error?: Record<string, unknown>
}

export type ConfirmBookingResponse = {
    success: boolean,
    message: string,
    data: ConfirmBooking,
    error?: Record<string, unknown>
}