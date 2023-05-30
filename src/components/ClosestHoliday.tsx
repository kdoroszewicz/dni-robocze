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
        "flex rounded-[14px] bg-[#E8F6FF] p-1 pl-2 text-center text-sm font-medium leading-[21px] text-[#0F365C]",
        className
      )}
    >
      Najbliższe święto wolne od pracy za {daysToHoliday} dni to
      <Link
        className="ml-2 flex items-center rounded-[10px] bg-[#0F365C] px-3 py-[2px] text-xs font-medium leading-[18px] text-white"
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
