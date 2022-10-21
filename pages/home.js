import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";

import getAllData from "../utils/getAllData";
import NavigationBar from "../components/NavigationBar";
import TableLayout from "../components/TableLayout/";
import {
  columnsAllRooms,
  columnsDayReservations,
  StyledHeadersBlack,
  StyledHeadersWhite,
} from "../components/TableLayout/ColumnsTables";

import styles from "../styles/home.module.css";

export default function Home() {
  const [allRooms, setAllRooms] = useState(null);
  const [dayReservations, setDayReservations] = useState(null);

  const currentDay = moment().format("YYYY-MM-DHH:mm:ss");
  const urlAllRooms = process.env.GET_ALLROOMS_URL;
  const urlDayReservations = `${process.env.GET_DAYRESERVATIONS_URL}${currentDay}`;

  useEffect(() => {
    if (!allRooms) {
      getAllData(setAllRooms, urlAllRooms);
    }
    if (!dayReservations) {
      getAllData(setDayReservations, urlDayReservations);
    }
  }, []);

  return (
    <Box>
      <NavigationBar styles={styles} />
      <Container maxWidth={false} className="layout1">
        {!dayReservations ? (
          <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
        ) : (
          <TableLayout
            title={`RESERVAS AL DÍA ${moment().format("D/MM")}`}
            data={dayReservations}
            columns={columnsDayReservations}
            cells="reservations"
            Headers={StyledHeadersBlack}
            styles={styles}
          />
        )}
      </Container>
      <Container maxWidth={false} className="layout2">
        {!allRooms ? (
          <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
        ) : (
          <TableLayout
            title="NUESTROS CUARTOS"
            data={allRooms}
            columns={columnsAllRooms}
            cells="rooms"
            Headers={StyledHeadersWhite}
            styles={styles}
          />
        )}
      </Container>
    </Box>
  );
}
