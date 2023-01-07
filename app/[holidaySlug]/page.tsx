import slugify from "slugify";
import { getHolidaySlug } from "../../services/utils";
import { polishHolidays } from "../../src/workDaysUtils";
import HolidayPage from "./HolidaySlugPage";
import { notFound } from "next/navigation";

const holidays = polishHolidays.getHolidays();

// Alternative paths to long holiday names
const shorthands = {
  wnmp: "wniebowziecie-najswietszej-maryi-panny",
  "3maj": "swieto-narodowe-trzeciego-maja",
  wielkanoc: "niedziela-wielkanocna",
  "swieto-niepodleglosci": "narodowe-swieto-niepodleglosci",
};

export const getHoliday = async (params) => {
  const { holidaySlug } = params;

  if (!holidaySlug || typeof holidaySlug !== "string") {
    notFound();
  }

  const holidayByFullName = holidays.find(
    (holiday) => getHolidaySlug(holiday.name) === holidaySlug
  );

  if (!holidayByFullName) {
    const longName = shorthands?.[holidaySlug];
    if (longName) {
      const holidayByShortName = holidays.find(
        (holiday) => getHolidaySlug(holiday.name) === slugify(longName)
      );
      if (holidayByShortName) {
        return JSON.parse(JSON.stringify(holidayByShortName));
      }
    }

    notFound();
  }

  return JSON.parse(JSON.stringify(holidayByFullName));
};

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
  return <HolidayPage holiday={holiday} />;
};

export default Holiday;
