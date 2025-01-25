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
  experimental: {
    mdxRs: false,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['react-day-picker']
};

module.exports = withMDX(nextConfig);
