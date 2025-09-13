import { Metadata } from "next";
import ClosestHoliday from "../components/ClosestHoliday";
import Recommended from "../components/Recommended";
import WorkDaysCalculator from "../components/WorkDaysCalculator";

const currentYear: number = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Dni Roboczych ${currentYear}`,
  description:
    "Dzięki kalkulatorowi dowiesz się ile jest dni roboczych pomiędzy dwoma podanymi datami lub kiedy wypada data końcowa od określonej liczby dni roboczych. Policz dni robocze!",
  robots: "index, follow",
};

const Page = () => {
  return (
    <>
      <h1 className="mb-6 text-center text-4xl leading-[60px] font-extrabold text-[#0F365C] md:text-[60px]">
        <span className="block text-4xl leading-8 -tracking-[1%] md:text-[32px]">
          Kalkulator
        </span>
        {`Dni Roboczych ${currentYear}`}
      </h1>
      <p className="mb-6 text-center text-xl leading-[30px] font-medium text-[#0F365C]">
        Wypełnij 2 z 3 pól
      </p>

      <WorkDaysCalculator />
      <div className="mt-6 flex items-center justify-center">
        <ClosestHoliday />
      </div>
      <Recommended className="mt-8" />

      <div className="mt-8 mb-[200px] space-y-6 rounded-2xl bg-white p-4 text-base leading-[25.6px] font-normal text-[#0F365C] shadow-[20px_19px_50px_0px_#0057BC26]">
        <p>
          Kalkulator dni roboczych powstał aby w łatwy i szybki sposób można
          było wyliczyć wszystkie dni robocze w danym przedziale czasu. Dniami
          odpoczynku są soboty i niedziele, a dni robocze - od poniedziałku do
          piątku. Kalkulator dni roboczych to bardzo dobre narzędzie do
          ustalania wszelkiego rodzaju informacji dotyczących naszych dni
          pracujących.
        </p>
        <div>
          <h2 className="mb-2 text-2xl leading-[29.05px] font-bold text-[#0F365C]">
            Licznik dni roboczych
          </h2>
          <p>
            Licznik dni roboczych liczy jako dni robocze wszystkie dni od
            poniedziałku do piątku, niezależnie od tego, czy w któryś z nich
            wypada święto. Jeśli chcesz wiedzieć, ile dni pracy pozostało Ci do
            końca roku, wystarczy wpisać datę początkową i końcową okresu, który
            Cię interesuje. Wynik pokaże Ci wszystkie dni do tego terminu, z
            wyłączeniem weekendów. Na przykład, jeśli musisz dostarczyć projekt
            do 1 grudnia 2020 r., wprowadź tę datę w polu "data końcowa", a
            jeśli zaczynasz od dzisiaj, pozostaw pole "data początkowa" tak, jak
            jest domyślnie. Ilość dni roboczych pomiędzy datami pojawi się
            automatycznie. W ten sposób dowiesz się, ile dni roboczych masz do
            wykonania. Jeśli będziesz mógł pracować nad tym projektem dopiero od
            1 listopada, po prostu wprowadź go jako datę początkową.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl leading-[29.05px] font-bold text-[#0F365C]">
            Kalkulator dni pracujących
          </h2>
          <p>
            Dzień roboczy, zwany również dniem pracującym to każdy oficjalny
            dzień roboczy. W większości regionów obejmuje to dni od poniedziałku
            do piątku (włącznie). Nie obejmuje weekendów i dni ustawowo wolnych
            od pracy; mogą to być święta religijne lub narodowe. W miesiącu jest
            około 20 dni roboczych.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl leading-[29.05px] font-bold text-[#0F365C]">
            Kalkulator Dni
          </h2>
          <p>
            Kalkulator dni roboczych to narzędzie, które umożliwia obliczenie
            liczby dni roboczych między dwiema określonymi datami. Kalkulator
            ten uwzględnia tylko dni robocze, czyli dni tygodnia od poniedziałku
            do piątku, wyłączając dni wolne, takie jak weekendy i święta.
            Kalkulator dni roboczych może być przydatny w kontekstach, takich
            jak planowanie projektów biznesowych, obliczanie terminów płatności
            lub określanie dat realizacji zadań. Kalkulatory dni roboczych są
            dostępne w różnych formach, takich jak aplikacje internetowe,
            programy komputerowe lub aplikacje mobilne.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
