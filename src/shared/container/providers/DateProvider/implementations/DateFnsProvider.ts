import {
  differenceInHours,
  differenceInDays,
  isBefore,
  Duration,
  add,
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  addMinutes,
  addDays,
  isSameDay,
  isSameMonth,
  format as formatFunction,
  addMonths,
  addYears,
} from 'date-fns';
import WEEKDAY_ENUM from '../enums/WEEKDAY_ENUM';

import IDateProvider from '../models/IDateProvider';

export default class DateFnsProvider implements IDateProvider {
  public addDays(date: number | Date, days: number): Date {
    return addDays(date, days);
  }

  public differenceInHours(
    dateLeft: number | Date,
    dateRight: number | Date,
  ): number {
    return differenceInHours(dateLeft, dateRight);
  }

  public isBefore(date: number | Date, dateToCompare: number | Date): boolean {
    return isBefore(date, dateToCompare);
  }

  public differenceInDays(
    dateLeft: number | Date,
    dateRight: number | Date,
  ): number {
    const checkDate = new Date(dateRight);
    const requiredDate = new Date(dateLeft);
    return differenceInDays(requiredDate, checkDate);
  }

  public addYears(date: number | Date, years: number): Date {
    return addYears(date, years);
  }

  public addMonths(date: number | Date, months: number): Date {
    return addMonths(date, months);
  }

  public addWeeks(date: number | Date, duration: Duration): Date {
    return add(date, duration);
  }

  public addMinutes(date: number | Date, minutes: number): Date {
    return addMinutes(date, minutes);
  }

  public nextDayOfTheWeek(date: Date, weekday: WEEKDAY_ENUM): Date {
    let nextGivenDay = date;
    if (weekday === 'Monday' && !isMonday(date)) {
      nextGivenDay = nextMonday(date);
    } else if (weekday === 'Tuesday' && !isTuesday(date)) {
      nextGivenDay = nextTuesday(date);
    } else if (weekday === 'Wednesday' && !isWednesday(date)) {
      nextGivenDay = nextWednesday(date);
    } else if (weekday === 'Thursday' && !isThursday(date)) {
      nextGivenDay = nextThursday(date);
    } else if (weekday === 'Friday' && !isFriday(date)) {
      nextGivenDay = nextFriday(date);
    } else if (weekday === 'Saturday' && !isSaturday(date)) {
      nextGivenDay = nextSaturday(date);
    } else if (weekday === 'Sunday' && !isSunday(date)) {
      nextGivenDay = nextSunday(date);
    }
    // const nextDate = format(nextGivenDay, 'yyyy-MM-dd');
    return nextGivenDay;
  }

  public isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean {
    return isSameDay(dateLeft, dateRight);
  }

  public isSameMonth(
    dateLeft: number | Date,
    dateRight: number | Date,
  ): boolean {
    return isSameMonth(dateLeft, dateRight);
  }

  public format(date: number | Date, format: string): string {
    return formatFunction(date, format);
  }
}
