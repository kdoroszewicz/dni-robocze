import IndexPage from "./IndexPage";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Kalkulator Dni Roboczych ${currentYear}`,
  description:
    "Dzięki kalkulatorowi dowiesz się ile jest dni roboczych pomiędzy dwoma podanymi datami lub kiedy wypada data końcowa od określonej liczby dni roboczych. Policz dni robocze!",
  robots: "index, follow",
};

const Page = () => {
  return <IndexPage />;
};

export default Page;
