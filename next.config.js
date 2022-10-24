/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    GET_ALLROOMS_URL: process.env.GET_ALLROOMS_URL,
    GET_DAYRESERVATIONS_URL: process.env.GET_DAYRESERVATIONS_URL,
    GET_RESERVATIONBYID_URL: process.env.GET_RESERVATIONBYID_URL,
  },
};

module.exports = nextConfig;
