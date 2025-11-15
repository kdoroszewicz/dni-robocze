import "server-only";

import {
  add,
  addBusinessDays,
  differenceInBusinessDays as dbd,
  getYear,
  isWeekend,
  isWithinInterval,
} from "date-fns";
import Holidays from "date-holidays";

export const polishHolidays = new Holidays("PL", {
  languages: "pl",
  types: ["public"],
});

export const getYearsRange = (date1: Date, date2: Date) => {
  const date1Year = getYear(date1);
  const date2Year = getYear(date2);

  const minYear = Math.min(date1Year, date2Year);
  const maxYear = Math.max(date1Year, date2Year);

  const years = [];
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years;
};

export const getHolidaysInDateRange = (laterDate: Date, earlierDate: Date) => {
  const yearsArray = getYearsRange(laterDate, earlierDate);

  const holidays = yearsArray
    .map((year) => polishHolidays.getHolidays(year.toString()))
    .flat();
  return holidays;
};

export const getTotalNumberOfHolidayDays = (
  laterDate: Date,
  earlierDate: Date
) => {
  const holidaysInRange = getHolidaysInDateRange(laterDate, earlierDate);
  return holidaysInRange.reduce((total, holiday) => {
    const date = new Date(holiday.date);

    if (
      !isWeekend(date) &&
      isWithinInterval(date, { start: earlierDate, end: laterDate })
    ) {
      return total + 1;
    }
    return total;
  }, 0);
};

export const getWorkDays = (laterDate: Date, earlierDate: Date): number => {
  const workDays = dbd(add(laterDate, { days: 1 }), earlierDate);
  const totalHolidayDays = getTotalNumberOfHolidayDays(laterDate, earlierDate);
  return workDays - totalHolidayDays;
};

/**
 * Adds the specified number of work days to a date, excluding weekends and holidays.
 * @param startDate The starting date
 * @param workDaysToAdd The number of work days to add
 * @returns The resulting date after adding work days
 */
export const addWorkDays = (startDate: Date, workDaysToAdd: number): Date => {
  if (workDaysToAdd === 0) {
    return startDate;
  }

  // Start with business days (excludes weekends) as an approximation
  let candidateDate = addBusinessDays(startDate, workDaysToAdd);
  
  // Iteratively adjust until we have the exact number of work days
  // This accounts for holidays that fall within the range
  let attempts = 0;
  const maxAttempts = 100; // Safety limit
  
  while (attempts < maxAttempts) {
    const actualWorkDays = getWorkDays(candidateDate, startDate);
    
    if (actualWorkDays === workDaysToAdd) {
      break;
    }
    
    // Calculate the difference and adjust
    const diff = workDaysToAdd - actualWorkDays;
    candidateDate = addBusinessDays(candidateDate, diff);
    attempts++;
  }
  
  return candidateDate;
};

