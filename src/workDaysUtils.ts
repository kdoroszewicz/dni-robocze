import {
  add,
  differenceInBusinessDays as dbd,
  getYear,
  isSaturday,
  isSunday,
  isWithinInterval,
  startOfDay
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
  earlierDate: Date
) => {
  let holidaysInRange = getHolidaysInDateRange(laterDate, earlierDate)
    .map((holiday) => {
      const date = new Date(holiday.date.slice(0, 10));
      if (!isSaturday(date) && !isSunday(date)) {
        return date;
      }
      return null;
    })
    .filter((value) => value != null);

  const numberOfHolidays = holidaysInRange.reduce((total, holiday) => {
    if (isWithinInterval(holiday, { start: earlierDate, end: laterDate })) {
      return total + 1;
    }
    return total;
  }, 0);

  return numberOfHolidays;
};

export const getWorkDays = (laterDate: Date, earlierDate: Date) => {
  const trueLaterDater = add(laterDate, {
    hours: 24,
  });

  const beginDate = startOfDay(earlierDate);
  const endDate = startOfDay(trueLaterDater);

  const workDays = dbd(endDate, beginDate);
  const finalDays = workDays - getTotalNumberOfHolidayDays(endDate, beginDate);
  return finalDays;
};
