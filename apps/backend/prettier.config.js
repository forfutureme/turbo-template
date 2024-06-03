const config = require("@repo/prettier-config/next");


module.exports = {
  ...config,
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx'],
};
