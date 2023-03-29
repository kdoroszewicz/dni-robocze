import slugify from "slugify";
import { polishHolidays } from "../src/workDaysUtils";

export const getHolidaySlug = (holidayName: string) =>
  slugify(holidayName, { lower: true });

// Alternative paths to long holiday names
export const shorthands = {
  wnmp: "wniebowziecie-najswietszej-maryi-panny",
  "3maj": "swieto-narodowe-trzeciego-maja",
  wielkanoc: "niedziela-wielkanocna",
  "swieto-niepodleglosci": "narodowe-swieto-niepodleglosci",
};
const holidays = polishHolidays.getHolidays();

export const getHoliday = async (params) => {
  const { holidaySlug } = params;

  if (!holidaySlug || typeof holidaySlug !== "string") {
    return null;
  }

  const holidayByFullName = holidays.find(
    (holiday) => getHolidaySlug(holiday.name) === holidaySlug
  );

  if (!holidayByFullName) {
    const longName = shorthands?.[holidaySlug];
    if (longName) {
      const holidayByShortName = holidays.find(
        (holiday) => getHolidaySlug(holiday.name) === slugify(longName)
      );
      if (holidayByShortName) {
        return JSON.parse(JSON.stringify(holidayByShortName));
      }
    }

    return null;
  }

  return JSON.parse(JSON.stringify(holidayByFullName));
};
