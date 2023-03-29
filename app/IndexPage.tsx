import { differenceInCalendarDays } from "date-fns";
import Link from "../components/Link";
import { getHolidaySlug } from "../services/utils";
import { polishHolidays } from "../src/workDaysUtils";
import WorkDaysCalculator from "./[holidaySlug]/WorkDaysCalculator";

const getClosestHoliday = () => {
  const holidays = polishHolidays.getHolidays();

  const futureHolidays = holidays.filter(
    (holiday) => holiday.start > new Date()
  );

  return futureHolidays[0];
};

const HomePage = () => {
  const closestHoliday = getClosestHoliday();
  const daysToHoliday = differenceInCalendarDays(
    closestHoliday.start,
    new Date()
  );
  const currentYear = new Date().getFullYear();

  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold">
        {`Kalkulator Dni Roboczych ${currentYear}`}
      </h1>
      <div className="space-y-4">
        <WorkDaysCalculator />
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
      </div>
      <div className="mt-8 space-y-4 text-slate-500">
        <p>
          Kalkulator dni roboczych powstał aby w łatwy i szybki sposób można
          było wyliczyć wszystkie dni robocze w danym przedziale czasu. Dniami
          odpoczynku są soboty i niedziele, a dni robocze - od poniedziałku do
          piątku. Kalkulator dni roboczych to bardzo dobre narzędzie do
          ustalania wszelkiego rodzaju informacji dotyczących naszych dni
          pracujących.
        </p>
        <h2 className="text-lg font-semibold">Licznik dni roboczych</h2>
        <p>
          Licznik dni roboczych liczy jako dni robocze wszystkie dni od
          poniedziałku do piątku, niezależnie od tego, czy w któryś z nich
          wypada święto. Jeśli chcesz wiedzieć, ile dni pracy pozostało Ci do
          końca roku, wystarczy wpisać datę początkową i końcową okresu, który
          Cię interesuje. Wynik pokaże Ci wszystkie dni do tego terminu, z
          wyłączeniem weekendów. Na przykład, jeśli musisz dostarczyć projekt do
          1 grudnia 2020 r., wprowadź tę datę w polu "data końcowa", a jeśli
          zaczynasz od dzisiaj, pozostaw pole "data początkowa" tak, jak jest
          domyślnie. Ilość dni roboczych pomiędzy datami pojawi się
          automatycznie. W ten sposób dowiesz się, ile dni roboczych masz do
          wykonania. Jeśli będziesz mógł pracować nad tym projektem dopiero od 1
          listopada, po prostu wprowadź go jako datę początkową.
        </p>
        <h2 className="text-lg font-semibold">Kalkulator dni pracujących</h2>
        <p>
          Dzień roboczy, zwany również dniem pracującym to każdy oficjalny dzień
          roboczy. W większości regionów obejmuje to dni od poniedziałku do
          piątku (włącznie). Nie obejmuje weekendów i dni ustawowo wolnych od
          pracy; mogą to być święta religijne lub narodowe. W miesiącu jest
          około 20 dni roboczych.
        </p>
      </div>
    </>
  );
};

export default HomePage;
