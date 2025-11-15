"use client";

import { use } from "react";
import Link from "./Link";
import { HTMLAttributes } from "react";
import { cn, getHolidaySlug } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { HolidayData } from "@/lib/server/getClosestHoliday";

type ClosestHoliday = HTMLAttributes<HTMLHeadingElement> & {
  promise: Promise<HolidayData>;
};

const ClosestHoliday = ({ className, promise }: ClosestHoliday) => {
  const data = use(promise);

  if (!data.holiday || data.daysToHoliday === null) {
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
      Najbliższe święto wolne od pracy za {data.daysToHoliday} dni to
      <Link
        className="inline-flex shrink items-center justify-center rounded-[10px] bg-[#0F365C] px-3 py-[2px] text-xs leading-[18px] font-medium text-white"
        href={`/${getHolidaySlug(data.holiday.name)}`}
      >
        {data.holiday.name}
        <span>
          <ChevronRight className="ml-2 h-[10px] w-[10px]" color="white" />
        </span>
      </Link>
    </h3>
  );
};

export default ClosestHoliday;
