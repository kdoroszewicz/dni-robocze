import { Suspense } from "react";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import ClosestHolidayDays from "./ClosestHolidayDays";
import ClosestHolidayLink from "./ClosestHolidayLink";
import ClosestHolidayLoading from "./ClosestHolidayLoading";
import type { HolidayData } from "@/lib/server/getClosestHoliday";

type ClosestHoliday = HTMLAttributes<HTMLHeadingElement> & {
  promise: Promise<HolidayData>;
};

const ClosestHoliday = ({ className, promise }: ClosestHoliday) => {
  return (
    <h3
      className={cn(
        "flex flex-col items-center gap-y-2 rounded-[14px] bg-transparent p-1 pl-2 text-center text-sm leading-[21px] font-medium text-[#0F365C] md:flex-row md:gap-x-2 md:gap-y-0 md:bg-[#E8F6FF]",
        className
      )}
    >
      {/* Static shell - this will be pre-rendered */}
      Najbliższe święto wolne od pracy za{" "}
      <Suspense fallback={<ClosestHolidayLoading />}>
        <ClosestHolidayDays promise={promise} />
      </Suspense>{" "}
      dni to{" "}
      <Suspense
        fallback={
          <span className="inline-block h-5 w-24 animate-pulse rounded bg-[#0F365C]/20" />
        }
      >
        <ClosestHolidayLink promise={promise} />
      </Suspense>
    </h3>
  );
};

export default ClosestHoliday;
