import {
  add,
  differenceInBusinessDays as dbd,
  getYear,
  isWeekend,
  isWithinInterval,
  startOfDay,
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
  earlierDate: Date,
) => {
  const normalizedLaterDate = startOfDay(laterDate);
  const normalizedEarlierDate = startOfDay(earlierDate);

  const holidaysInRange = getHolidaysInDateRange(
    normalizedLaterDate,
    normalizedEarlierDate,
  );
  return holidaysInRange.reduce((total, holiday) => {
    const date = startOfDay(new Date(holiday.date));

    if (
      !isWeekend(date) &&
      isWithinInterval(date, {
        start: normalizedEarlierDate,
        end: normalizedLaterDate,
      })
    ) {
      return total + 1;
    }
    return total;
  }, 0);
};

export const getWorkDays = (laterDate: Date, earlierDate: Date): number => {
  const normalizedLaterDate = startOfDay(laterDate);
  const normalizedEarlierDate = startOfDay(earlierDate);

  const workDays = dbd(
    add(normalizedLaterDate, { days: 1 }),
    normalizedEarlierDate,
  );
  const totalHolidayDays = getTotalNumberOfHolidayDays(
    normalizedLaterDate,
    normalizedEarlierDate,
  );
  return workDays - totalHolidayDays;
};
