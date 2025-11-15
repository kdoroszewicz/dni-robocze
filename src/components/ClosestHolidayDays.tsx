"use client";

import { use } from "react";
import type { HolidayData } from "@/lib/server/getClosestHoliday";

type ClosestHolidayDays = {
  promise: Promise<HolidayData>;
};

const ClosestHolidayDays = ({ promise }: ClosestHolidayDays) => {
  const data = use(promise);

  if (!data.holiday || data.daysToHoliday === null) {
    return null;
  }

  return <>{data.daysToHoliday}</>;
};

export default ClosestHolidayDays;

