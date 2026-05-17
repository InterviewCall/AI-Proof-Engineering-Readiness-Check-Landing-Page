import dayjs from 'dayjs';

export function getCalendarDays(month: Date): Date[] {
  const startOfMonth = dayjs(month).startOf('month');
  const calendarStart = startOfMonth.subtract(startOfMonth.day(), 'day');

  const days: Date[] = [];

  for (let index = 0; index < 42; index += 1) {
    days.push(calendarStart.add(index, 'day').toDate());
  }

  return days;
}

export function startOfDay(date: Date): Date {
  return dayjs(date).startOf('day').toDate();
}

export function addMonths(date: Date, months: number): Date {
  return dayjs(date).add(months, 'month').startOf('day').toDate();
}

export function isSameDate(firstDate: Date, secondDate: Date): boolean {
  return dayjs(firstDate).isSame(secondDate, 'day');
}

export function isDateInsideBookingWindow(
  date: Date,
  today: Date,
  maxBookableDate: Date,
): boolean {
  const normalizedDate = dayjs(date).startOf('day');
  const normalizedToday = dayjs(today).startOf('day');
  const normalizedMaxDate = dayjs(maxBookableDate).startOf('day');

  return (
    normalizedDate.isSame(normalizedToday, 'day') ||
    normalizedDate.isSame(normalizedMaxDate, 'day') ||
    (normalizedDate.isAfter(normalizedToday, 'day') &&
      normalizedDate.isBefore(normalizedMaxDate, 'day'))
  );
}

export function formatDateForApi(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function formatSelectedDateLabel(date: Date | null): string {
  if (!date) {
    return '';
  }

  return dayjs(date).format('dddd, D MMMM YYYY');
}