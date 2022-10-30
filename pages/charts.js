import Head from "next/head";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import getAllData from "../utils/getAllData";
import NavigationBar from "../components/NavigationBar";
import ChartOfTheMonth from "../components/Charts/OfTheMonth";
import ChartRoomsOccupancy from "../components/Charts/RoomsOccupancy";

export default function Graphs() {
  const [allReservations, setAllReservations] = useState(null);
  const [allRooms, setAllRooms] = useState(null);

  const urlAllReservations = process.env.GET_ALL_RESERVATIONS;
  const urlAllRooms = process.env.GET_ALLROOMS_URL;

  useEffect(() => {
    getAllData(setAllReservations, urlAllReservations);
    getAllData(setAllRooms, urlAllRooms);
  }, []);

  return (
    <div>
      <Head>
        <title> Gráficos </title>
      </Head>
      <main>
        <NavigationBar />
        <Box
          sx={{ p: 4, width: "100%" }}
          display="flex"
          justifyContent="center"
        >
          {!allRooms || !allReservations ? (
            <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
          ) : (
            <Grid container sx={{ mt: 5, width: "100%" }}>
              <Grid sm={12} lg={9}>
                <ChartOfTheMonth allReservations={allReservations} />
              </Grid>
              <Grid sm={12} lg={3}>
                <ChartRoomsOccupancy allRooms={allRooms} />
              </Grid>
            </Grid>
          )}
        </Box>
      </main>
    </div>
  );
}
