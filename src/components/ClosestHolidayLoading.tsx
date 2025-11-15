import { HTMLAttributes } from "react";

type ClosestHolidayLoading = HTMLAttributes<HTMLSpanElement>;

const ClosestHolidayLoading = ({ className }: ClosestHolidayLoading) => {
  return (
    <span className={className}>
      <span className="inline-block h-5 w-8 animate-pulse rounded bg-[#0F365C]/20" />
    </span>
  );
};

export default ClosestHolidayLoading;
