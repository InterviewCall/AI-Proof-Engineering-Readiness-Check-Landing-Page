'use client';

import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';

type Slot = {
  id: string;
  label: string;
};

const slotsPerPage = 3;

const BookingCalendar: FC = () => {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [visibleMonth, setVisibleMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [slotPage, setSlotPage] = useState<number>(0);
  const [slotDirection, setSlotDirection] = useState<'next' | 'prev'>('next');

  const [calendarDirection, setCalendarDirection] = useState<'next' | 'prev'>(
    'next',
  );

  const calendarDays = useMemo(() => {
    return getCalendarDays(visibleMonth);
  }, [visibleMonth]);

  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const slots = selectedDate ? getSlotsForDate(selectedDate) : [];

  const totalSlotPages = Math.ceil(slots.length / slotsPerPage);

  const visibleSlots = slots.slice(
    slotPage * slotsPerPage,
    slotPage * slotsPerPage + slotsPerPage,
  );

  const canGoToPreviousSlots = slotPage > 0;
  const canGoToNextSlots = slotPage < totalSlotPages - 1;

  const goToPreviousMonth = (): void => {
    setCalendarDirection('prev');

    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );

    setSelectedSlot(null);
    setSlotPage(0);
    setSlotDirection('prev');
  };

  const goToNextMonth = (): void => {
    setCalendarDirection('next');

    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );

    setSelectedSlot(null);
    setSlotPage(0);
    setSlotDirection('next');
  };

  const selectDate = (date: Date): void => {
    if (isPastDate(date, today)) {
      return;
    }

    setSelectedDate(date);
    setSelectedSlot(null);
    setSlotPage(0);
    setSlotDirection('next');
  };

  const goToPreviousSlots = (): void => {
    if (!canGoToPreviousSlots) {
      return;
    }

    setSlotDirection('prev');
    setSlotPage((prev) => prev - 1);
  };

  const goToNextSlots = (): void => {
    if (!canGoToNextSlots) {
      return;
    }

    setSlotDirection('next');
    setSlotPage((prev) => prev + 1);
  };

  const confirmSlot = (): void => {
    if (!selectedDate || !selectedSlot) {
      return;
    }

    console.log({
      selectedDate,
      selectedSlot,
    });

    /**
     * Later:
     * 1. Send selected date + selected slot to backend
     * 2. Create booking
     * 3. Show confirmation
     * 4. Send WhatsApp/email confirmation
     */
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-[1fr_0.8fr] gap-0 max-lg:grid-cols-1">
        {/* Calendar Section */}
        <div className="border-r border-(--booking-border) p-6 max-lg:border-r-0 max-lg:border-b max-sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="btn btn-sm btn-ghost rounded-full"
            >
              ←
            </button>

            <div className="text-center">
              <h3 className="text-xl font-black text-[#020617]">
                {visibleMonth.toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>

              <p className="text-xs font-bold text-(--booking-muted-light)">
                Select a date for your strategy call
              </p>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              className="btn btn-sm btn-ghost rounded-full"
            >
              →
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-black text-(--booking-muted-light)"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div
              key={`${visibleMonth.getFullYear()}-${visibleMonth.getMonth()}`}
              className={clsx('grid grid-cols-7 gap-2', {
                'animate-[calendarSlideFromRight_0.28s_ease-out]':
                  calendarDirection === 'next',

                'animate-[calendarSlideFromLeft_0.28s_ease-out]':
                  calendarDirection === 'prev',
              })}
            >
              {calendarDays.map((day) => {
                const isCurrentMonth =
                  day.getMonth() === visibleMonth.getMonth();

                const isSelected = selectedDate
                  ? isSameDate(day, selectedDate)
                  : false;

                const isTodayDate = isSameDate(day, today);
                const isPast = isPastDate(day, today);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={isPast}
                    onClick={() => selectDate(day)}
                    className={clsx(
                      'min-h-12 cursor-pointer rounded-2xl border text-sm font-black transition-all duration-200',
                      {
                        'scale-[1.03] border-(--booking-blue) bg-(--booking-blue) text-white shadow-[0_10px_22px_rgba(37,99,235,0.22)]':
                          isSelected,

                        'border-(--booking-blue) bg-[#eff6ff] text-(--booking-blue)':
                          !isSelected && isTodayDate,

                        'border-slate-200 bg-white text-[#020617] hover:scale-[1.03] hover:border-(--booking-blue) hover:bg-[#eff6ff]':
                          !isSelected &&
                          !isTodayDate &&
                          isCurrentMonth &&
                          !isPast,

                        'border-slate-100 bg-slate-50 text-slate-300':
                          !isCurrentMonth && !isPast,

                        'cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300':
                          isPast,
                      },
                    )}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Slots Section */}
        <div className="p-6 max-sm:p-5">
          <div className="mb-5">
            <div className="mb-2 inline-flex rounded-full bg-[#eff6ff] px-3 py-1.5 text-xs font-black text-(--booking-blue-dark)">
              Available Slots
            </div>

            <h3 className="text-2xl font-black tracking-[-0.4px] text-[#020617]">
              {selectedDateLabel}
            </h3>

            <p className="mt-1 text-sm font-semibold text-(--booking-muted)">
              All slots are shown in Indian Standard Time.
            </p>
          </div>

          {slots.length > 0 ? (
            <>
              <div className="mb-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goToPreviousSlots}
                  disabled={!canGoToPreviousSlots}
                  className="btn btn-sm btn-outline rounded-full"
                >
                  ← Prev
                </button>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-(--booking-muted-light)">
                  {slotPage + 1} / {totalSlotPages}
                </span>

                <button
                  type="button"
                  onClick={goToNextSlots}
                  disabled={!canGoToNextSlots}
                  className="btn btn-sm btn-outline rounded-full"
                >
                  Next →
                </button>
              </div>

              <div className="relative min-h-45 overflow-hidden">
                <div
                  key={`${selectedDate?.toISOString()}-${slotPage}`}
                  className={clsx('grid gap-3', {
                    'animate-[slotSlideFromRight_0.28s_ease-out]':
                      slotDirection === 'next',

                    'animate-[slotSlideFromLeft_0.28s_ease-out]':
                      slotDirection === 'prev',
                  })}
                >
                  {visibleSlots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={clsx(
                          'btn min-h-13.5 justify-start rounded-2xl border px-4 text-base font-black transition',
                          {
                            'btn-primary border-(--booking-blue) text-white':
                              isSelected,

                            'btn-outline border-slate-300 bg-white text-[#1e293b] hover:border-(--booking-blue) hover:bg-[#eff6ff] hover:text-(--booking-blue)':
                              !isSelected,
                          },
                        )}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-(--booking-border) bg-[#f8fafc] p-6 text-center">
              <p className="text-sm font-bold text-(--booking-muted)">
                No slots available for this date. Please choose another date.
              </p>
            </div>
          )}

          <button
            type="button"
            disabled={!selectedDate || !selectedSlot}
            onClick={confirmSlot}
            className="btn btn-primary mt-6 min-h-13.5 w-full rounded-[13px] text-base font-black text-white"
          >
            Confirm Strategy Call Slot
          </button>

          <p className="mt-4 text-center text-xs font-semibold text-(--booking-muted-light)">
            After confirmation, our team will verify the slot and contact you on
            WhatsApp/email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;

function getCalendarDays(month: Date): Date[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const startDay = firstDayOfMonth.getDay();

  const calendarStart = new Date(year, monthIndex, 1 - startDay);

  const days: Date[] = [];

  for (let index = 0; index < 42; index += 1) {
    days.push(
      new Date(
        calendarStart.getFullYear(),
        calendarStart.getMonth(),
        calendarStart.getDate() + index,
      ),
    );
  }

  return days;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDate(firstDate: Date, secondDate: Date): boolean {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

function isPastDate(date: Date, today: Date): boolean {
  return startOfDay(date).getTime() < today.getTime();
}

function getSlotsForDate(date: Date): Slot[] {
  const day = date.getDay();

  // Sunday closed
  if (day === 0) {
    return [];
  }

  return generateSlots({
    date,
    startHour: 13,
    endHour: 20,
    intervalMinutes: 30,
  });
}

function generateSlots({
  date,
  startHour,
  endHour,
  intervalMinutes,
}: {
  date: Date;
  startHour: number;
  endHour: number;
  intervalMinutes: number;
}): Slot[] {
  const slots: Slot[] = [];

  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHour,
    0,
    0,
  );

  const end = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    endHour,
    0,
    0,
  );

  let current = start;

  while (current < end) {
    const label = current.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    slots.push({
      id: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${current.getHours()}-${current.getMinutes()}`,
      label,
    });

    current = new Date(current.getTime() + intervalMinutes * 60 * 1000);
  }

  return slots;
}