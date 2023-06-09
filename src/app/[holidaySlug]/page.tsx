import { format } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import slugify from "slugify";
import { getHoliday, getHolidaySlug, shorthands } from "../../services/utils";
import BackArrow from "../../components/BackArrow";
import Link from "../../components/Link";
import { polishHolidays } from "../../workDaysUtils";
import HolidayDrugiDzienWielkanocy from "../content/holidays/drugi-dzien-wielkanocy.mdx";
import HolidayBozeCialo from "../content/holidays/dzien-bozego-ciala.mdx";
import HolidayNiedzielaWielkanocna from "../content/holidays/niedziela-wielkanocna.mdx";
import HolidaySwieto3Maj from "../content/holidays/swieto-narodowe-trzeciego-maja.mdx";
import HolidaySwietoPracy from "../content/holidays/swieto-pracy.mdx";
import HolidayZieloneSwiatki from "../content/holidays/zielone-swiatki.mdx";

const holidays = polishHolidays.getHolidays();

type Props = {
  params: { holidaySlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

const Holiday = async ({ params }: Props) => {
  let HolidayDescription: any = () => null;
  const holiday = await getHoliday(params);

  if (!holiday) {
    notFound();
  }

  const holidaySlug = getHolidaySlug(holiday.name);

  if (holidaySlugComponentMap.has(holidaySlug)) {
    HolidayDescription = holidaySlugComponentMap.get(holidaySlug);
  }

  return (
    <>
      <Link href="/">
        <BackArrow />{" "}
        <span className="ml-2">wróć do Kalkulatora Dni Roboczych</span>
      </Link>
      <div className="mt-10 space-y-2 text-xl">
        {HolidayDescription ? (
          <HolidayDescription />
        ) : (
          <h1 className="mb-2 text-4xl font-semibold">{holiday.name}</h1>
        )}
        <p>
          Kiedy jest <strong>{holiday.name}</strong>?{" "}
          {`Święto wypada ${format(new Date(holiday.date), "dd.MM.yyyy")}`}.
        </p>
        <p>
          Święto jest <strong>wolne od pracy</strong>.
        </p>
      </div>
      <div className="mt-8">
        <p className="mb-2 text-gray-600">Zobacz inne święta:</p>
        <ul>
          {holidays
            .filter((h) => h.name !== holiday.name)
            .map((h) => (
              <li className="holiday-list-item" key={h.name}>
                <Link
                  className="mb-2 block w-full rounded border border-gray-300 bg-gray-100 p-2 text-blue-600 hover:no-underline"
                  href={`/${getHolidaySlug(h.name)}`}
                >
                  {h.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Holiday;
