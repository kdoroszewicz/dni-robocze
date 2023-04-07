import slugify from "slugify";
import { getHoliday, getHolidaySlug, shorthands } from "../../services/utils";
import HolidayPage from "./HolidaySlugPage";
import { notFound } from "next/navigation";
import { polishHolidays } from "../../src/workDaysUtils";
import HolidayNiedzielaWielkanocna from "./niedziela-wielkanocna.mdx";
import HolidayDrugiDzienWielkanocy from "./drugi-dzien-wielkanocy.mdx";
import HolidayZieloneSwiatki from "./zielone-swiatki.mdx";
import HolidaySwietoPracy from "./swieto-pracy.mdx";
import HolidaySwieto3Maj from "./swieto-narodowe-trzeciego-maja.mdx";
import HolidayBozeCialo from "./dzien-bozego-ciala.mdx";

const holidays = polishHolidays.getHolidays();

export async function generateMetadata({ params }) {
  const holiday = await getHoliday(params);
  const currentYear = new Date().getFullYear();

  if (!holiday) {
    return {
      title: `Kalkulator Dni Roboczych ${currentYear}`,
    };
  }

  return {
    title: `${holiday.name} — Kalkulator Dni Roboczych ${currentYear}`,
    description: `${holiday.name} — Kiedy wypada święto? Czy jest wolne od pracy?`,
    alternates: {
      canonical: `https://kalkulatordniroboczych.pl/${getHolidaySlug(
        holiday.name
      )}`,
    },
  };
}

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

const holidaySlugComponentMap = new Map([
  ["niedziela-wielkanocna", HolidayNiedzielaWielkanocna],
  ["drugi-dzien-wielkanocy", HolidayDrugiDzienWielkanocy],
  ["zielone-swiatki", HolidayZieloneSwiatki],
  ["swieto-panstwowe-swieto-pracy", HolidaySwietoPracy],
  ["swieto-narodowe-trzeciego-maja", HolidaySwieto3Maj],
  ["dzien-bozego-ciala", HolidayBozeCialo],
]);

const Holiday = async ({ params }) => {
  let HolidayDescription: (props: any) => JSX.Element = () => null;
  const holiday = await getHoliday(params);

  if (!holiday) {
    notFound();
  }

  const holidaySlug = getHolidaySlug(holiday.name);

  if (holidaySlugComponentMap.has(holidaySlug)) {
    HolidayDescription = holidaySlugComponentMap.get(holidaySlug);
  }

  return (
    <HolidayPage holiday={holiday}>
      <HolidayDescription />
    </HolidayPage>
  );
};

export default Holiday;
