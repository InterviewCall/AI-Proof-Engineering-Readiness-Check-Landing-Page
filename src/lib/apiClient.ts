import axios from 'axios';

export const candidateFormApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CANDIDATE_FORM_SERVICE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const slotBookingApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SLOT_BOOKING_SERVICE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});