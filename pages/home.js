import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import moment from "moment";

import getAllData from "../utils/getAllData";
import NavigationBar from "../components/NavigationBar";
import TableTitle from "../components/TableLayout/TableTitle";
import ControlsDayReservation from "../components/TableLayout/ControlsDayReservations";
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
  const [daySelected, setDaySelected] = useState();
  const [dayForGetData, setDayForGetData] = useState(false);

  const currentDay = moment();
  const urlAllRooms = process.env.GET_ALLROOMS_URL;
  const dayReservationsUrl = process.env.GET_DAYRESERVATIONS_URL;

  useEffect(() => {
    if (!allRooms) {
      getAllData(setAllRooms, urlAllRooms);
    }

    const formatedCurrentDay = `${currentDay.format("YYYY-MM-D")}23:00:00`;
    setDayForGetData(formatedCurrentDay);
    setDaySelected(currentDay.format("D/MM"));
  }, []);

  useEffect(() => {
    if (dayForGetData) {
      const urlDayReservations = `${dayReservationsUrl}${dayForGetData}`;
      getAllData(setDayReservations, urlDayReservations);
    }
  }, [dayForGetData]);

  console.log(dayReservations);
  return (
    <Box>
      <NavigationBar styles={styles} />
      {!dayReservations ? (
        <Container maxWidth={false} className="layout1">
          <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
        </Container>
      ) : (
        <Container maxWidth={false} className="layout1">
          <TableTitle
            title={`RESERVAS AL DÍA ${daySelected}`}
            styles={styles}
            cells="reservations"
          />
          <ControlsDayReservation
            currentDay={currentDay}
            setDaySelected={setDaySelected}
            setDayForGetData={setDayForGetData}
            styles={styles}
          />
          <TableLayout
            data={dayReservations}
            columns={columnsDayReservations}
            cells="reservations"
            Headers={StyledHeadersBlack}
            styles={styles}
          />
        </Container>
      )}

      {!allRooms ? (
        <Container maxWidth={false} className="layout2">
          <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
        </Container>
      ) : (
        <Container maxWidth={false} className="layout2">
          <TableTitle title="NUESTROS CUARTOS" styles={styles} cells="rooms" />
          <TableLayout
            data={allRooms}
            columns={columnsAllRooms}
            cells="rooms"
            Headers={StyledHeadersWhite}
            styles={styles}
          />
        </Container>
      )}
    </Box>
  );
}
