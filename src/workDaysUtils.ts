import {
  add,
  differenceInBusinessDays as dbd,
  getYear,
  isWeekend,
  isWithinInterval,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
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

  let years = [];
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
  console.log(
    "🚀 ~ file: workDaysUtils.ts:57 ~ getWorkDays ~ earlierDate:",
    earlierDate
  );
  console.log(
    "🚀 ~ file: workDaysUtils.ts:57 ~ getWorkDays ~ laterDate:",
    laterDate
  );

  // TODO: ilość dni w maju wylicza się niepoprawnie w przeglądarce
  // difference between business days is off by 1 so compensate for that
  const workDays = dbd(add(laterDate, { days: 1 }), earlierDate);
  console.log(
    "🚀 ~ file: workDaysUtils.ts:59 ~ getWorkDays ~ workDays:",
    workDays
  );
  const totalHolidayDays = getTotalNumberOfHolidayDays(laterDate, earlierDate);
  console.log(
    "🚀 ~ file: workDaysUtils.ts:61 ~ getWorkDays ~ totalHolidayDays:",
    totalHolidayDays
  );
  return workDays - totalHolidayDays;
};
