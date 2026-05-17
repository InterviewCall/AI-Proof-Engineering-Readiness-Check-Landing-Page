'use client';

import { FC, useMemo, useState } from 'react';

import { BOOKING_WINDOW_MONTHS } from '@/constants/calender';
import { useGetAvailableSlotsByDate } from '@/hooks/get-available-slots/useGetAvailableSlotsByDate';

import { AvailabilitySlot, UiSlot } from '../types/availabilitySlotResponse';
import {
  addMonths,
  formatDateForApi,
  formatSelectedDateLabel,
  isDateInsideBookingWindow,
  startOfDay,
} from '../utils/bookingCalender';
import BookingSlotReviewModal from './BookingSlotReviewModal';
import CalendarGrid from './CalenderGrid';
import SlotSelector from './SlotSelector';

const BookingCalendar: FC = () => {
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

  const [calendarDirection, setCalendarDirection] = useState<'next' | 'prev'>(
    'next',
  );

  const selectedDateKey = selectedDate ? formatDateForApi(selectedDate) : '';

  const {
    data: availableSlotsResponse,
    isLoading: isSlotsLoading,
    isFetching: isSlotsFetching,
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

  const goToPreviousMonth = (): void => {
    if (!canGoToPreviousMonth) {
      return;
    }

    setCalendarDirection('prev');

    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );

    setSelectedSlot(null);
    setIsSlotReviewModalOpen(false);
  };

  const goToNextMonth = (): void => {
    if (!canGoToNextMonth) {
      return;
    }

    setCalendarDirection('next');

    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );

    setSelectedSlot(null);
    setIsSlotReviewModalOpen(false);
  };

  const selectDate = (date: Date): void => {
    if (!isDateInsideBookingWindow(date, today, maxBookableDate)) {
      return;
    }

    setSelectedDate(date);
    setSelectedSlot(null);
    setIsSlotReviewModalOpen(false);
  };

  const handleSelectSlot = (slot: UiSlot): void => {
    setSelectedSlot(slot);
    setIsSlotReviewModalOpen(true);
  };

  const closeSlotReviewModal = (): void => {
    setIsSlotReviewModalOpen(false);
  };

  const confirmSlot = (): void => {
    if (!selectedDate || !selectedSlot) {
      return;
    }

    console.log({
      bookingDate: selectedDateKey,
      dateTimeSlotId: selectedSlot.dateTimeSlotId,
      selectedSlot,
    });

    setIsSlotReviewModalOpen(false);

    /**
     * Later:
     * 1. Call booking API with selectedSlot.dateTimeSlotId
     * 2. Show success state/toast
     * 3. Refetch available slots for selectedDateKey
     */
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
        onClose={closeSlotReviewModal}
        onConfirm={confirmSlot}
      />
    </div>
  );
};

export default BookingCalendar;