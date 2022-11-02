import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";

import getAllData from "../utils/getAllData";
import getDatesBetweenTwo from "../utils/getDatesBetweenTwo";
import NavigationBar from "../components/NavigationBar";
import ChartOfTheMonth from "../components/Charts/OfTheMonth";
import ChartRoomsOccupancy from "../components/Charts/RoomsOccupancy";
import AverangeCostOfRooms from "../components/Charts/AverageCostOfRooms";
import RevenueChart from "../components/Charts/Revenue";

import styles from "../styles/home.module.css";

export default function Graphs() {
  const router = useRouter();
  const [allReservations, setAllReservations] = useState(null);
  const [allRooms, setAllRooms] = useState(null);
  const [reservationsOfTheMonth, setReservationsOfTheMonth] = useState(null);
  const [occupancy, setOccupancy] = useState({});
  const [adr, setAdr] = useState(null);
  const [getAdr, setGetAdr] = useState(null);
  const [RevPAR, setRevPAR] = useState(null);
  const [averangeCost, setAverangeCost] = useState({});
  const currentMonth = `0${moment().month() + 1}`.slice(-2);

  const urlAllReservations = process.env.GET_ALL_RESERVATIONS;
  const urlAllRooms = process.env.GET_ALLROOMS_URL;

  const getReservationsOfTheMont = () => {
    const auxReservationsOfTheMonth = {};
    const auxCostRooms = {};
    const auxAdr = { occupancy: 0, income: 0 };

    allReservations &&
      allReservations.map((reservation) => {
        const day = Number(reservation["check_in_date"].slice(8, 10));
        const month = reservation["check_in_date"].slice(5, 7);

        if (month === currentMonth) {
          day in auxReservationsOfTheMonth
            ? (auxReservationsOfTheMonth[day] += 1)
            : (auxReservationsOfTheMonth[day] = 1);
        }

        if (
          reservation["booking_status"]["booking_status"] !== "Cancelled" &&
          reservation["booking_status"]["booking_status"] !== "Confirmed" &&
          reservation["room"]
        ) {
          const room_id = reservation["room"]["id"];
          room_id in auxCostRooms
            ? (auxCostRooms[room_id] = {
                count: (auxCostRooms[room_id]["count"] += 1),
                total: (auxCostRooms[room_id]["total"] +=
                  reservation["price_per_night"]),
              })
            : (auxCostRooms[room_id] = {
                count: 1,
                total: reservation["price_per_night"],
              });
        }

        if (reservation["booking_status"]["booking_status"] === "Checked In") {
          auxAdr["occupancy"] += 1;
          auxAdr["income"] += reservation["price_per_night"];
        }
      });

    setAdr(auxAdr);
    setAverangeCost(auxCostRooms);
    setReservationsOfTheMonth(auxReservationsOfTheMonth);
  };

  const getRoomsOccupancy = () => {
    if (allRooms) {
      var auxFree = 0;
      var auxOccupies = 0;

      allRooms.map((room) => {
        !room["occupancy"] ? (auxFree += 1) : (auxOccupies += 1);
      });

      setOccupancy({ Libres: auxFree, Ocupadas: auxOccupies });
    }
  };

  useEffect(() => {
    getAllData(setAllReservations, "bookings", urlAllReservations, router);
    getAllData(setAllRooms, "rooms", urlAllRooms, router);
  }, []);

  useEffect(() => {
    getReservationsOfTheMont();
  }, [allReservations]);

  useEffect(() => {
    getRoomsOccupancy();
  }, [allRooms]);

  useEffect(() => {
    if (adr && allRooms) {
      const getOccupancy = adr["occupancy"] / allRooms.length;
      const avaibleRooms = allRooms.length - adr["occupancy"];
      setGetAdr(adr["income"] / adr["occupancy"]);
      setRevPAR(((getAdr * getOccupancy) / avaibleRooms).toFixed(2));
    }
  }, [adr, allRooms]);

  return (
    <div>
      <Head>
        <title> Gráficos </title>
      </Head>
      <main>
        <NavigationBar />

        <Box
          sx={{ width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box className="layout1">
            <Grid container sx={{ mt: 5, width: "100%" }}>
              <Grid sm={12} lg={8}>
                <Container className={styles.tableTitleContainer}>
                  <Typography className="titleDetail"> - </Typography>
                  <Typography className={styles.tableTitleWhite}>
                    Reservas del mes
                  </Typography>
                  <Typography className="titleDetail"> - </Typography>
                </Container>
                {!reservationsOfTheMonth ? (
                  <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
                ) : (
                  <ChartOfTheMonth
                    reservationsOfTheMonth={reservationsOfTheMonth}
                    setReservationsOfTheMonth={setReservationsOfTheMonth}
                  />
                )}
              </Grid>
              <Grid sm={12} lg={4}>
                <Container className={styles.tableTitleContainer}>
                  <Typography className="titleDetail"> - </Typography>
                  <Typography className={styles.tableTitleWhite}>
                    Revenue diario
                  </Typography>
                  <Typography className="titleDetail"> - </Typography>
                </Container>
                <ChartRoomsOccupancy occupancy={occupancy} />
                <Container className={styles.tableTitleContainer}>
                  <Typography className={styles.tableTitleWhite}>
                    {`ADR: $ ${getAdr}`}
                  </Typography>
                  <Typography className={styles.tableTitleWhite}>
                    {`RevPAR: $ ${RevPAR}`}
                  </Typography>
                </Container>
              </Grid>
            </Grid>
          </Box>
          <Box className="layout2">
            <Container className={styles.tableTitleContainer}>
              <Typography className="titleDetail"> - </Typography>
              <Typography className={styles.tableTitleDark}>
                Costo promedio por habitación a lo largo del año
              </Typography>
              <Typography className="titleDetail"> - </Typography>
            </Container>
            <Grid container sx={{ mt: 5, width: "100%" }}>
              <Grid sm={2}></Grid>
              {!averangeCost.lenght === 0 ? (
                <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
              ) : (
                <Grid sm={8}>
                  <AverangeCostOfRooms averangeCost={averangeCost} />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </main>
    </div>
  );
}
