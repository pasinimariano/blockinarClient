import Head from "next/head";
import { useState, useEffect } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";

import getAllData from "../utils/getAllData";
import NavigationBar from "../components/NavigationBar";
import ChartOfTheMonth from "../components/Charts/OfTheMonth";
import ChartRoomsOccupancy from "../components/Charts/RoomsOccupancy";
import AverangeCostOfRooms from "../components/Charts/AverageCostOfRooms";

export default function Graphs() {
  const [allReservations, setAllReservations] = useState(null);
  const [allRooms, setAllRooms] = useState(null);
  const [reservationsOfTheMonth, setReservationsOfTheMonth] = useState({});
  const [averangeCost, setAverangeCost] = useState({});
  const currentMonth = `0${moment().month() + 1}`.slice(-2);

  const urlAllReservations = process.env.GET_ALL_RESERVATIONS;
  const urlAllRooms = process.env.GET_ALLROOMS_URL;

  const getReservationsOfTheMont = () => {
    if (allReservations) {
      const costRooms = {};
      allReservations.map((reservation) => {
        const day = Number(reservation["check_in_date"].slice(8, 10));
        const month = reservation["check_in_date"].slice(5, 7);

        if (month === currentMonth) {
          setReservationsOfTheMonth((prevState) => ({
            ...prevState,
            [day]: (prevState[day] += 1),
          }));
        }
        if (
          reservation["booking_status"] !== "cancelled" &&
          reservation["room_id"]
        ) {
          costRooms[reservation["room_id"]] = costRooms[reservation["room_id"]]
            ? {
                total: (costRooms[reservation["room_id"]].total +=
                  reservation["price_per_night"]),
                count: (costRooms[reservation["room_id"]].count += 1),
              }
            : { total: reservation["price_per_night"], count: 1 };
        }
      });

      setAverangeCost(costRooms);
    }
  };

  useEffect(() => {
    getAllData(setAllReservations, urlAllReservations);
    getAllData(setAllRooms, urlAllRooms);
  }, []);

  useEffect(() => {
    getReservationsOfTheMont();
  }, [allReservations]);
  console.log(averangeCost);
  return (
    <div>
      <Head>
        <title> Gráficos </title>
      </Head>
      <main>
        <NavigationBar />

        {!allRooms || !allReservations ? (
          <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
        ) : (
          <Box
            sx={{ width: "100%" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box className="layout1">
              <Grid container sx={{ mt: 5, width: "100%" }}>
                <Grid sm={12} lg={9}>
                  <ChartOfTheMonth
                    reservationsOfTheMonth={reservationsOfTheMonth}
                    setReservationsOfTheMonth={setReservationsOfTheMonth}
                  />
                </Grid>
                <Grid sm={12} lg={3}>
                  <ChartRoomsOccupancy allRooms={allRooms} />
                </Grid>
              </Grid>
            </Box>
            <Box className="layout2">
              <Grid container sx={{ mt: 5, width: "100%" }}>
                <Grid sm={2}></Grid>
                <Grid sm={8}>
                  <AverangeCostOfRooms averangeCost={averangeCost} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </main>
    </div>
  );
}
