import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ClosestHolidayLoading = HTMLAttributes<HTMLHeadingElement>;

const ClosestHolidayLoading = ({ className }: ClosestHolidayLoading) => {
  return (
    <h3
      className={cn(
        "flex flex-col items-center gap-y-2 rounded-[14px] bg-transparent p-1 pl-2 text-center text-sm leading-[21px] font-medium text-[#0F365C] md:flex-row md:gap-x-2 md:gap-y-0 md:bg-[#E8F6FF]",
        className
      )}
    >
      <span className="inline-block h-5 w-48 animate-pulse rounded bg-[#0F365C]/20" />
    </h3>
  );
};

export default ClosestHolidayLoading;
