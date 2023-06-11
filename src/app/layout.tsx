import BaseLayout from "../components/BaseLayout";
import "./globals.css";
import GoogleAnalytics from "../components/GoogleAnalytics";

import { Inter } from "next/font/google";
import Adsense from "@/components/Adsense";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.className}>
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID!} />
      <Adsense
        NEXT_PUBLIC_GOOGLE_ADSENSE={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE!}
      />
      <body>
        {/* <Providers> */}
        <BaseLayout>{children}</BaseLayout>
        {/* </Providers> */}
      </body>
    </html>
  );
}
