export type ReservationStatus =
  | 'pending_confirmation'
  | 'confirmed';

export type ReservationReviewResponse = {
    candidateName: string;
    candidateEmail: string;
    slotDetails: string;
    expiresAt: string;
    reservationStatus: ReservationStatus;
};

export type GetReservationResponse = {
    success: boolean,
    message: string,
    data: ReservationReviewResponse,
    error?: Record<string, unknown>
}