import "server-only";

import { differenceInCalendarDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { cacheLife } from "next/cache";
import { polishHolidays } from "./workDays";

export interface HolidayData {
  holiday: {
    name: string;
    date: string;
  } | null;
  daysToHoliday: number | null;
}

export async function getClosestHoliday(): Promise<HolidayData> {
  "use cache";
  // Cache for 1 hour since holidays don't change frequently
  // but daysToHoliday needs to be recalculated daily
  cacheLife("hours");
  try {
    const currentYear = new Date().getFullYear();
    let holidays = polishHolidays.getHolidays(currentYear);
    let futureHolidays = holidays.filter((holiday) =>
      holiday.start > new Date()
    );

    // If no future holidays found in current year, check next year
    if (futureHolidays.length === 0) {
      holidays = polishHolidays.getHolidays(currentYear + 1);
      futureHolidays = holidays.filter((holiday) => holiday.start > new Date());
    }

    if (futureHolidays.length === 0) {
      return { holiday: null, daysToHoliday: null };
    }

    const closestHoliday = futureHolidays[0];

    const daysToHoliday = differenceInCalendarDays(
      toZonedTime(closestHoliday.start, "Europe/Warsaw"),
      toZonedTime(new Date(), "Europe/Warsaw"),
    );

    return {
      holiday: {
        name: closestHoliday.name,
        date: closestHoliday.start.toISOString(),
      },
      daysToHoliday,
    };
  } catch (error) {
    console.error("Error fetching closest holiday:", error);
    return { holiday: null, daysToHoliday: null };
  }
}
