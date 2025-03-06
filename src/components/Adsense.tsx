"use client";
import Script from "next/script";

const Adsense = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default Adsense;
