/* eslint-disable semi */
import { Duration } from 'date-fns';
import WEEKDAY_ENUM from '../enums/WEEKDAY_ENUM';

export default interface IDateProvider {
  differenceInHours(dateLeft: number | Date, dateRight: number | Date): number;
  isBefore(date: Date | number, dateToCompare: Date | number): boolean;
  differenceInDays(dateLeft: number | Date, dateRight: number | Date): number;
  addMonths(date: number | Date, months: number): Date;
  addYears(date: number | Date, years: number): Date;
  addWeeks(date: number | Date, duration: Duration): Date;
  addDays(date: number | Date, days: number): Date;
  addMinutes(date: number | Date, minutes: number): Date;
  nextDayOfTheWeek(date: number | Date, weekday: WEEKDAY_ENUM): Date;
  isSameDay(dateLeft: number | Date, dateRight: number | Date): boolean;
  isSameMonth(dateLeft: number | Date, dateRight: number | Date): boolean;
  format(date: number | Date, format: string): string;
}
