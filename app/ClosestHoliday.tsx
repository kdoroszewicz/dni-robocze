import { differenceInCalendarDays } from "date-fns";
import Link from "../components/Link";
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
  closestHoliday.start,
  new Date()
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
