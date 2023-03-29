module.exports = {
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  experimental: {
    appDir: true,
  },
  modularizeImports: {
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },
};
