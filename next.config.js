/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GET_ALLROOMS_URL: process.env.GET_ALLROOMS_URL,
  },
};

module.exports = nextConfig;
