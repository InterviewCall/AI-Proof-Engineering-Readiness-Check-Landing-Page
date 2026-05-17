'use client';

import clsx from 'clsx';
import { FC } from 'react';

import {
  formatDateForApi,
  getCalendarDays,
  isDateInsideBookingWindow,
  isSameDate,
} from '../utils/bookingCalender';

type CalendarGridProps = {
  today: Date;
  visibleMonth: Date;
  selectedDate: Date | null;
  maxBookableDate: Date;
  calendarDirection: 'next' | 'prev';
  canGoToPreviousMonth: boolean;
  canGoToNextMonth: boolean;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
};

const CalendarGrid: FC<CalendarGridProps> = ({
  today,
  visibleMonth,
  selectedDate,
  maxBookableDate,
  calendarDirection,
  canGoToPreviousMonth,
  canGoToNextMonth,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
}) => {
  const calendarDays = getCalendarDays(visibleMonth);

  return (
    <div className="border-r border-(--booking-border) p-6 max-lg:border-r-0 max-lg:border-b max-sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPreviousMonth}
          disabled={!canGoToPreviousMonth}
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
          onClick={onNextMonth}
          disabled={!canGoToNextMonth}
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
            const dateKey = formatDateForApi(day);

            const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();

            const isSelected = selectedDate
              ? isSameDate(day, selectedDate)
              : false;

            const isTodayDate = isSameDate(day, today);

            const isInsideBookingWindow = isDateInsideBookingWindow(
              day,
              today,
              maxBookableDate,
            );

            const isDisabled = !isCurrentMonth || !isInsideBookingWindow;

            return (
              <button
                key={dateKey}
                type="button"
                disabled={isDisabled}
                onClick={() => onSelectDate(day)}
                className={clsx(
                  'min-h-12 rounded-2xl border text-sm font-black transition-all duration-200',
                  {
                    'cursor-pointer scale-[1.03] border-(--booking-blue) bg-(--booking-blue) text-white shadow-[0_10px_22px_rgba(37,99,235,0.22)]':
                      isSelected,

                    'cursor-pointer border-(--booking-blue) bg-[#eff6ff] text-(--booking-blue)':
                      !isSelected && isTodayDate && !isDisabled,

                    'cursor-pointer border-slate-200 bg-white text-[#020617] hover:scale-[1.03] hover:border-(--booking-blue) hover:bg-[#eff6ff]':
                      !isSelected &&
                      !isTodayDate &&
                      isCurrentMonth &&
                      !isDisabled,

                    'cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300':
                      isDisabled,

                    'border-slate-50 bg-slate-50 text-slate-200':
                      !isCurrentMonth,
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
  );
};

export default CalendarGrid;