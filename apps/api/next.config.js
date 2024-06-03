/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  transpilePackages: ['@repo/ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};
