'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

import { BOOKING_WINDOW_MONTHS } from '@/constants/calender';
import { useCreateBooking } from '@/hooks/create-booking/useCreateBooking';
import { useGetAvailableSlotsByDate } from '@/hooks/get-available-slots/useGetAvailableSlotsByDate';
import { ApiErrorResponse } from '@/types/apiErrorResponse';

import { AvailabilitySlot, UiSlot } from '../../types/availabilitySlotResponse';
import {
  addMonths,
  formatDateForApi,
  formatSelectedDateLabel,
  isDateInsideBookingWindow,
  startOfDay,
} from '../../utils/bookingCalender';
import CalendarGrid from '../CalenderGrid';
import SlotSelector from '../SlotSelector';
import BookingSlotReviewModal from './BookingSlotReviewModal';
import SlotReservationConflictModal from './SlotReservationConflictModal';

type BookingCalendarProps = {
  submissionId: string | null;
  slug: string;
};

const SLOT_CONFLICT_FALLBACK_MESSAGE =
  'This slot is currently being reserved by another candidate. Please select another available slot.';

const BookingCalendar: FC<BookingCalendarProps> = ({
  submissionId,
  slug,
}) => {
  const router = useRouter();

  const {
    mutateAsync: createBooking,
    isPending: isCreatingReservation,
  } = useCreateBooking();

  const today = useMemo(() => startOfDay(new Date()), []);

  const maxBookableDate = useMemo(() => {
    return startOfDay(addMonths(today, BOOKING_WINDOW_MONTHS));
  }, [today]);

  const [visibleMonth, setVisibleMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedSlot, setSelectedSlot] = useState<UiSlot | null>(null);

  const [isSlotReviewModalOpen, setIsSlotReviewModalOpen] =
    useState<boolean>(false);

  const [isSlotConflictModalOpen, setIsSlotConflictModalOpen] =
    useState<boolean>(false);

  const [slotConflictMessage, setSlotConflictMessage] = useState<string>(
    SLOT_CONFLICT_FALLBACK_MESSAGE,
  );

  const [calendarDirection, setCalendarDirection] = useState<'next' | 'prev'>(
    'next',
  );

  const selectedDateKey = selectedDate ? formatDateForApi(selectedDate) : '';

  const {
    data: availableSlotsResponse,
    isLoading: isSlotsLoading,
    isFetching: isSlotsFetching,
    refetch: refetchAvailableSlots,
  } = useGetAvailableSlotsByDate(selectedDateKey);

  const slots: UiSlot[] = useMemo(() => {
    const backendSlots: AvailabilitySlot[] = availableSlotsResponse?.data ?? [];

    return backendSlots.map((slot) => ({
      dateTimeSlotId: slot.id,
      bookingTimeSlotId: slot.timeSlot.id,
      slotTime: slot.timeSlot.slotTime,
      slotLabel: slot.timeSlot.slotLabel,
    }));
  }, [availableSlotsResponse]);

  const selectedDateLabel = formatSelectedDateLabel(selectedDate);

  const firstVisibleAllowedMonth = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [today]);

  const lastVisibleAllowedMonth = useMemo(() => {
    return new Date(
      maxBookableDate.getFullYear(),
      maxBookableDate.getMonth(),
      1,
    );
  }, [maxBookableDate]);

  const canGoToPreviousMonth =
    visibleMonth.getTime() > firstVisibleAllowedMonth.getTime();

  const canGoToNextMonth =
    visibleMonth.getTime() < lastVisibleAllowedMonth.getTime();

  const resetModalStates = (): void => {
    setIsSlotReviewModalOpen(false);
    setIsSlotConflictModalOpen(false);
    setSlotConflictMessage(SLOT_CONFLICT_FALLBACK_MESSAGE);
  };

  const goToPreviousMonth = (): void => {
    if (!canGoToPreviousMonth || isCreatingReservation) {
      return;
    }

    setCalendarDirection('prev');

    setVisibleMonth(
      (previousMonth) =>
        new Date(
          previousMonth.getFullYear(),
          previousMonth.getMonth() - 1,
          1,
        ),
    );

    setSelectedSlot(null);
    resetModalStates();
  };

  const goToNextMonth = (): void => {
    if (!canGoToNextMonth || isCreatingReservation) {
      return;
    }

    setCalendarDirection('next');

    setVisibleMonth(
      (previousMonth) =>
        new Date(
          previousMonth.getFullYear(),
          previousMonth.getMonth() + 1,
          1,
        ),
    );

    setSelectedSlot(null);
    resetModalStates();
  };

  const selectDate = (date: Date): void => {
    if (
      isCreatingReservation ||
      !isDateInsideBookingWindow(date, today, maxBookableDate)
    ) {
      return;
    }

    setSelectedDate(date);
    setSelectedSlot(null);
    resetModalStates();
  };

  const handleSelectSlot = (slot: UiSlot): void => {
    if (isCreatingReservation || isSlotConflictModalOpen) {
      return;
    }

    setSelectedSlot(slot);
    setSlotConflictMessage(SLOT_CONFLICT_FALLBACK_MESSAGE);
    setIsSlotReviewModalOpen(true);
  };

  const closeSlotReviewModal = (): void => {
    if (isCreatingReservation) {
      return;
    }

    setIsSlotReviewModalOpen(false);
  };

  const selectAnotherSlotAfterConflict = async (): Promise<void> => {
    setIsSlotConflictModalOpen(false);
    setSelectedSlot(null);
    setSlotConflictMessage(SLOT_CONFLICT_FALLBACK_MESSAGE);

    /**
     * Refresh availability so the candidate sees the latest
     * slot list after losing a real-time reservation attempt.
     */
    await refetchAvailableSlots();
    // router.refresh();
  };

  const confirmSlot = async (): Promise<void> => {
    if (
      !selectedDate ||
      !selectedSlot ||
      !submissionId ||
      isCreatingReservation
    ) {
      return;
    }

    try {
      const response = await createBooking({
        /**
         * Use the actual date_time_slots row ID.
         */
        dateTimeSlotId: selectedSlot.dateTimeSlotId,
        submissionId,
      });

      const reservationId = response.data.reservationId;

      const queryParams = new URLSearchParams({
        'reservation-id': reservationId,
        'submission-id': submissionId,
      });

      setIsSlotReviewModalOpen(false);

      router.replace(
        `/readiness/${slug}/confirm-booking?${queryParams.toString()}`,
      );
    } catch (error: unknown) {
      if (isSlotReservationConflictError(error)) {
        const errorMessage =
          error.response?.data?.message || SLOT_CONFLICT_FALLBACK_MESSAGE;

        /**
         * Replace reservation-progress/review modal with the
         * non-dismissible conflict modal.
         */
        setIsSlotReviewModalOpen(false);
        setSlotConflictMessage(errorMessage);
        setIsSlotConflictModalOpen(true);

        /**
         * Refresh available slots behind the modal so the user sees
         * current availability after clicking Select Another Slot.
         */
        // void refetchAvailableSlots();

        return;
      }

      /**
       * For non-slot-conflict errors, keep the review modal open.
       * Your mutation hook can show its standard error toast.
       */
    }
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-[1fr_0.8fr] gap-0 max-lg:grid-cols-1">
        <CalendarGrid
          today={today}
          visibleMonth={visibleMonth}
          selectedDate={selectedDate}
          maxBookableDate={maxBookableDate}
          calendarDirection={calendarDirection}
          canGoToPreviousMonth={canGoToPreviousMonth}
          canGoToNextMonth={canGoToNextMonth}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onSelectDate={selectDate}
        />

        <SlotSelector
          selectedDateLabel={selectedDateLabel}
          slots={slots}
          selectedSlot={selectedSlot}
          isLoading={isSlotsLoading || isSlotsFetching}
          emptyMessage={availableSlotsResponse?.message}
          onSelectSlot={handleSelectSlot}
        />
      </div>

      <BookingSlotReviewModal
        isOpen={isSlotReviewModalOpen}
        selectedDateLabel={selectedDateLabel}
        selectedSlot={selectedSlot}
        isSubmitting={isCreatingReservation}
        canContinue={Boolean(submissionId)}
        onClose={closeSlotReviewModal}
        onConfirm={confirmSlot}
      />

      <SlotReservationConflictModal
        isOpen={isSlotConflictModalOpen}
        selectedDateLabel={selectedDateLabel}
        selectedSlot={selectedSlot}
        message={slotConflictMessage}
        onSelectAnotherSlot={selectAnotherSlotAfterConflict}
      />
    </div>
  );
};

export default BookingCalendar;

function isSlotReservationConflictError(
  error: unknown,
): error is {
  response?: {
    status?: number;
    data?: ApiErrorResponse;
  };
} {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return false;
  }

  /**
   * Current backend: GoneError → HTTP 410.
   * Future-friendly: ConflictError → HTTP 409 is also supported.
   */
  return error.response?.status === 410 || error.response?.status === 409;
}