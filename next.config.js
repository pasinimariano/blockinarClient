/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GET_ALLROOMS_URL: process.env.GET_ALLROOMS_URL,
    GET_DAYRESERVATIONS_URL: process.env.GET_DAYRESERVATIONS_URL,
  },
};

module.exports = nextConfig;
