"use client";

import { use } from "react";
import Link from "./Link";
import { getHolidaySlug } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { HolidayData } from "@/lib/server/getClosestHoliday";

type ClosestHolidayLink = {
  promise: Promise<HolidayData>;
};

const ClosestHolidayLink = ({ promise }: ClosestHolidayLink) => {
  const data = use(promise);

  if (!data.holiday || data.daysToHoliday === null) {
    return null;
  }

  return (
    <Link
      className="inline-flex shrink items-center justify-center rounded-[10px] bg-[#0F365C] px-3 py-[2px] text-xs leading-[18px] font-medium text-white"
      href={`/${getHolidaySlug(data.holiday.name)}`}
    >
      {data.holiday.name}
      <span>
        <ChevronRight className="ml-2 h-[10px] w-[10px]" color="white" />
      </span>
    </Link>
  );
};

export default ClosestHolidayLink;

