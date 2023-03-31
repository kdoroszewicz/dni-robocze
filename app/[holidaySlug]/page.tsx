import slugify from "slugify";
import { getHoliday, getHolidaySlug, shorthands } from "../../services/utils";
import HolidayPage from "./HolidaySlugPage";
import { notFound } from "next/navigation";
import { polishHolidays } from "../../src/workDaysUtils";
import NiedzielaWielkanocna from "./niedziela-wielkanocna.mdx";
import DrugiDzienWielkanocy from "./drugi-dzien-wielkanocy.mdx";

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
  let HolidayDescription: typeof NiedzielaWielkanocna = () => null;
  const holiday = await getHoliday(params);

  if (!holiday) {
    notFound();
  }

  const holidaySlug = getHolidaySlug(holiday.name);

  if (holidaySlug === "niedziela-wielkanocna") {
    HolidayDescription = NiedzielaWielkanocna;
  }

  if (holidaySlug === "drugi-dzien-wielkanocy") {
    HolidayDescription = DrugiDzienWielkanocy;
  }

  return (
    <HolidayPage holiday={holiday}>
      <HolidayDescription />
    </HolidayPage>
  );
};

export default Holiday;
