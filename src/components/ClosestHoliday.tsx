import { differenceInCalendarDays, startOfDay } from "date-fns";
import Link from "./Link";
import { getHolidaySlug } from "../services/utils";
import { polishHolidays } from "../workDaysUtils";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getNowInWarsaw } from "@/lib/timezone";

const getClosestHoliday = () => {
  // Use Warsaw time so Polish users see accurate "days until" counts
  // even when it's a different day in Poland vs UTC
  const nowInWarsaw = startOfDay(getNowInWarsaw());
  const currentYearInWarsaw = nowInWarsaw.getFullYear();

  let holidays = polishHolidays.getHolidays(currentYearInWarsaw);
  let futureHolidays = holidays.filter(
    (holiday) => startOfDay(holiday.start) >= nowInWarsaw
  );

  // If no future holidays found in current year, check next year
  if (futureHolidays.length === 0) {
    holidays = polishHolidays.getHolidays(currentYearInWarsaw + 1);
    futureHolidays = holidays.filter(
      (holiday) => startOfDay(holiday.start) >= nowInWarsaw
    );
  }

  if (futureHolidays.length === 0) {
    return null;
  }

  return futureHolidays[0];
};

type ClosestHoliday = HTMLAttributes<HTMLHeadingElement>;

const ClosestHoliday = ({ className }: ClosestHoliday) => {
  // Calculate during render - will be cached with the page (1h revalidate)
  const closestHoliday = getClosestHoliday();
  const daysToHoliday = closestHoliday
    ? differenceInCalendarDays(
        startOfDay(closestHoliday.start),
        startOfDay(getNowInWarsaw())
      )
    : null;

  if (!closestHoliday || !daysToHoliday) {
    return null;
  }

  return (
    <h3
      data-freshness={new Date().toISOString()}
      className={cn(
        "flex flex-col items-center gap-y-2 rounded-[14px] bg-transparent p-1 pl-2 text-center text-sm leading-[21px] font-medium text-[#0F365C] md:flex-row md:gap-x-2 md:gap-y-0 md:bg-[#E8F6FF]",
        className
      )}
    >
      Najbliższe święto wolne od pracy za {daysToHoliday} dni to
      <Link
        className="inline-flex shrink items-center justify-center rounded-[10px] bg-[#0F365C] px-3 py-[2px] text-xs leading-[18px] font-medium text-white"
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
