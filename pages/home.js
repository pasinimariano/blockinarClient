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
import NoDataToShow from "../components/TableLayout/NoDataToShow";
import ExportCSV from "../components/ExportCsv";
import BodyCreateReservation from "../components/Modal/Bodies/BodyCreateReservation";

import styles from "../styles/home.module.css";
import ModalLayout from "../components/Modal/ModalLayout";

export default function Home() {
  const [allRooms, setAllRooms] = useState(null);
  const [dayReservations, setDayReservations] = useState(null);
  const [daySelected, setDaySelected] = useState();
  const [dayForGetData, setDayForGetData] = useState(false);
  const [filterReservations, setFilterReservations] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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
    setDayReservations(null);
    if (dayForGetData) {
      const urlDayReservations = `${dayReservationsUrl}${dayForGetData}`;
      getAllData(setDayReservations, urlDayReservations);
    }
  }, [dayForGetData]);
  console.log();
  return (
    <Box>
      <NavigationBar styles={styles} />
      <Container maxWidth={false} className="layout1">
        <TableTitle
          title={`RESERVAS AL DÍA ${daySelected}`}
          styles={styles}
          cells="reservations"
        />
        <ControlsDayReservation
          currentDay={currentDay}
          allRooms={allRooms}
          dayReservations={dayReservations}
          setDayReservations={setDayReservations}
          setDaySelected={setDaySelected}
          setDayForGetData={setDayForGetData}
          setFilterReservations={setFilterReservations}
          setModalShow={setModalShow}
          styles={styles}
        />
        {!dayReservations ? (
          <Container className={styles.tableContainer}>
            <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
          </Container>
        ) : filterReservations && filterReservations.length === 0 ? (
          <NoDataToShow
            message="No existen reservas para mostrar"
            styles={styles}
          />
        ) : (
          <TableLayout
            data={filterReservations}
            columns={columnsDayReservations}
            cells="reservations"
            Headers={StyledHeadersBlack}
            styles={styles}
          />
        )}
      </Container>

      <Container maxWidth={false} className="layout2">
        <TableTitle title="NUESTROS CUARTOS" styles={styles} cells="rooms" />
        <Container className={styles.iconDownloadContainer}>
          <ExportCSV
            csvData={allRooms}
            fileName="nuestrosCuartos"
            styles={styles}
          />
        </Container>
        {!allRooms ? (
          <Container className={styles.tableContainer}>
            <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
          </Container>
        ) : allRooms && allRooms.length === 0 ? (
          <NoDataToShow message="No se registran cuartos" styles={styles} />
        ) : (
          <TableLayout
            data={allRooms}
            columns={columnsAllRooms}
            cells="rooms"
            Headers={StyledHeadersWhite}
            styles={styles}
          />
        )}
      </Container>
      <ModalLayout
        modalShow={modalShow}
        setModalShow={setModalShow}
        Body={BodyCreateReservation}
        styles={styles}
      />
    </Box>
  );
}

/* open,
  handleClose,
  selectedBody,
  Body,
  refreshData,
  handleOpenSnackBar,
  goTo, */
