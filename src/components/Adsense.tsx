"use client";
import Script from "next/script";

const Adsense = ({
  NEXT_PUBLIC_GOOGLE_ADSENSE,
}: {
  NEXT_PUBLIC_GOOGLE_ADSENSE: string;
}) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${NEXT_PUBLIC_GOOGLE_ADSENSE}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
};

export default Adsense;
