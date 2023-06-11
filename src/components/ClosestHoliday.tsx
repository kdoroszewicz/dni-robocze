import { differenceInCalendarDays } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "./Link";
import { getHolidaySlug } from "../services/utils";
import { polishHolidays } from "../workDaysUtils";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const getClosestHoliday = () => {
  const holidays = polishHolidays.getHolidays();

  const futureHolidays = holidays.filter(
    (holiday) => holiday.start > new Date()
  );

  return futureHolidays[0];
};

const closestHoliday = getClosestHoliday();

const daysToHoliday = differenceInCalendarDays(
  utcToZonedTime(closestHoliday.start, "Europe/Warsaw"),
  utcToZonedTime(new Date(), "Europe/Warsaw")
);

interface ClosestHoliday extends HTMLAttributes<HTMLHeadingElement> {}

const ClosestHoliday = ({ className }: ClosestHoliday) => {
  return (
    <h3
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
