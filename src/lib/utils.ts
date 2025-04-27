import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  startOfWeek,
  addDays as dateFnsAddDays,
  isSameDay as dateFnsIsSameDay,
  format as dateFnsFormat,
  compareAsc as dateFnsCompareAsc,
  isToday as dateFnsIsToday,
  eachDayOfInterval,
  addWeeks as dateFnsAddWeeks, 
  subWeeks as dateFnsSubWeeks,
  StartOfWeekOptions
} from 'date-fns'; // Example using date-fns

const weekOptions: StartOfWeekOptions<Date> = { weekStartsOn: 0 };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getWeekStartDate = (date: Date): Date => {
  // Assuming week starts on Sunday can adjust if needed
  return startOfWeek(date, weekOptions);
};

export const addDays = (date: Date, amount: number): Date => {
  return dateFnsAddDays(date, amount);
};

export const isSameDay = (dateLeft: Date, dateRight: Date): boolean => {
    if (!dateLeft || !dateRight) return false;
  return dateFnsIsSameDay(dateLeft, dateRight);
};

export const isToday = (date: Date): boolean => {
  return dateFnsIsToday(date);
};

export const format = (date: Date, formatString: string): string => {
    if (!date) return '';
  return dateFnsFormat(date, formatString);
};

export const compareAsc = (dateLeft: Date, dateRight: Date): number => {
  if (!dateLeft || !dateRight) return 0;
  return dateFnsCompareAsc(dateLeft, dateRight);
};

export const getWeekDates = (date: Date = new Date()): Date[] => {
  const weekStart = getWeekStartDate(date);
  const daysOfWeek = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });
  return daysOfWeek;
}

export const getWeekDatesFrom = (startDate: Date = new Date()): Date[] =>
  eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 6),
  });

// List of dates for the current week
export const getCurrentWeekDates = (): Date[] => {
  const start = getWeekStartDate(new Date());
  return getWeekDatesFrom(start);
};

// List of dates for the next week
export const getNextWeekDates = (date: Date = new Date()): Date[] => {
  const nextWeekStart = dateFnsAddWeeks(getWeekStartDate(date), 1);
  return getWeekDatesFrom(nextWeekStart);
};

// List of dates for previous week
export const getPreviousWeekDates = (date: Date = new Date()): Date[] => {
  const prevWeekStart = dateFnsSubWeeks(getWeekStartDate(date), 1);
  return getWeekDatesFrom(prevWeekStart);
};