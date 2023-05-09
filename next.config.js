const withMDX = require("@next/mdx")();

/**
 * Vercel runs builds in UTC so force it locally
 * to avoid server-client mismatches
 */
process.env.TZ = "UTC";
console.log(
  `Running with timezone ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    mdxRs: true,
  },
  modularizeImports: {
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },
};

module.exports = withMDX(nextConfig);
