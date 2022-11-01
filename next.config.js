/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    LOGIN_ADMIN: process.env.LOGIN_ADMIN,
    GET_ALLROOMS_URL: process.env.GET_ALLROOMS_URL,
    GET_ALL_RESERVATIONS: process.env.GET_ALL_RESERVATIONS,
    GET_DAYRESERVATIONS_URL: process.env.GET_DAYRESERVATIONS_URL,
    GET_RESERVATIONBYID_URL: process.env.GET_RESERVATIONBYID_URL,
  },
};

module.exports = nextConfig;
