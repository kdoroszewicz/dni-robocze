import { differenceInCalendarDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import Link from "./Link";
import { getHolidaySlug } from "../services/utils";
import { polishHolidays } from "../workDaysUtils";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

const getClosestHoliday = () => {
  const currentYear = new Date().getFullYear();
  let holidays = polishHolidays.getHolidays(currentYear);
  let futureHolidays = holidays.filter((holiday) => holiday.start > new Date());

  // If no future holidays found in current year, check next year
  if (futureHolidays.length === 0) {
    holidays = polishHolidays.getHolidays(currentYear + 1);
    futureHolidays = holidays.filter((holiday) => holiday.start > new Date());
  }

  if (futureHolidays.length === 0) {
    return null;
  }

  return futureHolidays[0];
};

const closestHoliday = getClosestHoliday();

const daysToHoliday = closestHoliday
  ? differenceInCalendarDays(
      toZonedTime(closestHoliday.start, "Europe/Warsaw"),
      toZonedTime(new Date(), "Europe/Warsaw")
    )
  : null;

interface ClosestHoliday extends HTMLAttributes<HTMLHeadingElement> {}

const ClosestHoliday = ({ className }: ClosestHoliday) => {
  noStore();

  if (!closestHoliday || !daysToHoliday) {
    return null;
  }

  return (
    <h3
      data-freshness={new Date().toISOString()}
      className={cn(
        "flex flex-col items-center gap-y-2 rounded-[14px] bg-transparent p-1 pl-2 text-center text-sm font-medium leading-[21px] text-[#0F365C] md:flex-row md:gap-x-2 md:gap-y-0 md:bg-[#E8F6FF]",
        className
      )}
    >
      Najbliższe święto wolne od pracy za {daysToHoliday} dni to
      <Link
        className="inline-flex shrink items-center justify-center rounded-[10px] bg-[#0F365C] px-3 py-[2px] text-xs font-medium leading-[18px] text-white"
        href={`/${getHolidaySlug(closestHoliday.name)}`}
      >
        {closestHoliday.name}
        <span>
          <ChevronRight className="ml-2 h-[10px] w-[10px]" color="white" />
        </span>
      </Link>
    </h3>
  );
};

export default ClosestHoliday;
