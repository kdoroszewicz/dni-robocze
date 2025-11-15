"use client";

import { useEffect, useState } from "react";
import Link from "./Link";
import { HTMLAttributes } from "react";
import { cn, getHolidaySlug } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface HolidayData {
  holiday: {
    name: string;
    date: string;
  } | null;
  daysToHoliday: number | null;
}

type ClosestHoliday = HTMLAttributes<HTMLHeadingElement>;

const ClosestHoliday = ({ className }: ClosestHoliday) => {
  const [data, setData] = useState<HolidayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClosestHoliday = async () => {
      try {
        const response = await fetch("/api/closest-holiday");
        if (!response.ok) {
          throw new Error("Failed to fetch closest holiday");
        }
        const result = (await response.json()) as HolidayData;
        setData(result);
      } catch (error) {
        console.error("Error fetching closest holiday:", error);
        setData({ holiday: null, daysToHoliday: null });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClosestHoliday();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!data || !data.holiday || data.daysToHoliday === null) {
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
