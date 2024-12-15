import createMDX from "@next/mdx";

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
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
