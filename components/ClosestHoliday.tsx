import { differenceInCalendarDays } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "./Link";
import { getHolidaySlug } from "../services/utils";
import { polishHolidays } from "../src/workDaysUtils";

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

const ClosestHoliday = () => {
  return (
    <h3 className="text-lg">
      Najbliższe święto wolne od pracy to{" "}
      <Link
        className="text-blue-500"
        href={`/${getHolidaySlug(closestHoliday.name)}`}
      >
        {closestHoliday.name}
      </Link>{" "}
      za {daysToHoliday} dni.
    </h3>
  );
};

export default ClosestHoliday;
