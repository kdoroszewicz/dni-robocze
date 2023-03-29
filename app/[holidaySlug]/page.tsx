import slugify from "slugify";
import { getHoliday, getHolidaySlug, shorthands } from "../../services/utils";
import HolidayPage from "./HolidaySlugPage";
import { notFound } from "next/navigation";
import { polishHolidays } from "../../src/workDaysUtils";

const holidays = polishHolidays.getHolidays();

export const generateStaticParams = async () => {
  const holidayPaths = holidays.map((holiday) =>
    slugify(holiday.name, {
      lower: true,
    })
  );

  const shorthandsPaths = Object.keys(shorthands).map((shorthand) => shorthand);

  const paths = [...holidayPaths, ...shorthandsPaths].map((path) => ({
    holidaySlug: path,
  }));
  return paths;
};

const Holiday = async ({ params }) => {
  const holiday = await getHoliday(params);

  if (!holiday) {
    notFound();
  }

  return <HolidayPage holiday={holiday} />;
};

export default Holiday;
