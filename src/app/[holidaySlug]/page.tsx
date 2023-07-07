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
  let HolidayDescription;
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
      <div className="mt-[72px] flex w-full items-center justify-center gap-x-8 text-[#0F365C]">
        <Link href="/">
          <BackArrow />
        </Link>
        <h1 className="text-4xl font-extrabold leading-[43.57px] md:text-[60px] md:leading-[60px]">
          {holiday.name}
        </h1>
      </div>
      <div className="mt-10 rounded-[16px] bg-white p-4 text-xl text-[#0F365C] shadow-[20px_19px_50px_0px_#0057BC26] md:p-8">
        <div className="holiday-details-container flex flex-col items-start justify-start gap-x-6 md:flex-row">
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-bold leading-[21px]">Kiedy</span>
            <span className="text-2xl font-bold text-[#00BAFF]">
              {format(holiday.start, "dd.MM.yyyy")}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-y-2 font-bold md:mt-0 ">
            <span className="block text-sm leading-[21px]">
              {holiday.name} to święto
            </span>
            <span className="text-2xl leading-[30px]">wolne od pracy</span>
          </div>
        </div>
        {HolidayDescription ? (
          <section className="description mt-8 md:mt-12">
            <HolidayDescription />
          </section>
        ) : null}
      </div>
      <div className="mb-[76px] mt-8">
        <p className="mb-4 text-center text-2xl font-extrabold leading-[29.05px] text-[#0F365C]">
          Zobacz inne święta
        </p>
        <div className="rounded-[16px] bg-white p-4 shadow-[20px_19px_50px_0px_#0057BC26]">
          <ul className="grid grid-cols-1 justify-items-center gap-4 text-[#0F365C] md:grid-cols-2 md:justify-items-start">
            {holidays
              .filter((h) => h.name !== holiday.name)
              .map((h) => (
                <li
                  className="holiday-list-item w-min whitespace-nowrap rounded-[8px] border border-[#D1D5DB] px-4 py-2 text-base font-bold leading-[19.5px]"
                  key={h.name}
                >
                  <Link className="" href={`/${getHolidaySlug(h.name)}`}>
                    {h.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Holiday;
