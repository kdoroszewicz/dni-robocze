import { differenceInCalendarDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import { polishHolidays } from "@/lib/server/workDays";

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();
    let holidays = polishHolidays.getHolidays(currentYear);
    let futureHolidays = holidays.filter((holiday) => holiday.start > new Date());

    // If no future holidays found in current year, check next year
    if (futureHolidays.length === 0) {
      holidays = polishHolidays.getHolidays(currentYear + 1);
      futureHolidays = holidays.filter((holiday) => holiday.start > new Date());
    }

    if (futureHolidays.length === 0) {
      return NextResponse.json({ holiday: null, daysToHoliday: null });
    }

    const closestHoliday = futureHolidays[0];
    
    const daysToHoliday = differenceInCalendarDays(
      toZonedTime(closestHoliday.start, "Europe/Warsaw"),
      toZonedTime(new Date(), "Europe/Warsaw")
    );

    return NextResponse.json({
      holiday: {
        name: closestHoliday.name,
        date: closestHoliday.start,
      },
      daysToHoliday,
    });
  } catch (error) {
    console.error("Error fetching closest holiday:", error);
    return NextResponse.json(
      { error: "Failed to fetch closest holiday" },
      { status: 500 }
    );
  }
}

