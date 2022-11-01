import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import moment from "moment";

import getAllData from "../utils/getAllData";
import { Context } from "../components/Modal/Context";
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
import ModalLayout from "../components/Modal/ModalLayout";
import BodyCreateReservation from "../components/Modal/Bodies/BodyCreateReservation";
import BodyEditReservation from "../components/Modal/Bodies/BodyEditReservation";

import styles from "../styles/home.module.css";

export default function Home() {
  const [allRooms, setAllRooms] = useState(null);
  const [dayReservations, setDayReservations] = useState(null);
  const [daySelected, setDaySelected] = useState();
  const [dayForGetData, setDayForGetData] = useState(false);
  const [filterReservations, setFilterReservations] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [reservationForEdit, setReservationForEdit] = useState(null);

  const router = useRouter();
  const currentDay = moment();
  const urlAllRooms = process.env.GET_ALLROOMS_URL;
  const dayReservationsUrl = process.env.GET_DAYRESERVATIONS_URL;

  const refreshData = () => {
    const urlDayReservations = `${dayReservationsUrl}${dayForGetData}`;
    getAllData(setDayReservations, "bookings", urlDayReservations, router);
  };

  useEffect(() => {
    if (!allRooms) {
      getAllData(setAllRooms, "rooms", urlAllRooms, router);
    }

    const formatedDay = `0${currentDay.format("D")}`.slice(-2);
    const formatedMonth = `0${currentDay.format("M")}`.slice(-2);
    const formatedYear = currentDay.format("YYYY");

    const formatedCurrentDay = `${formatedYear}-${formatedMonth}-${formatedDay}`;

    setDayForGetData(formatedCurrentDay);
    setDaySelected(currentDay.format("D/MM"));
  }, []);

  useEffect(() => {
    setDayReservations(null);
    if (dayForGetData) {
      const urlDayReservations = `${dayReservationsUrl}${dayForGetData}`;
      getAllData(setDayReservations, "bookings", urlDayReservations, router);
    }
  }, [dayForGetData]);

  return (
    <Context.Provider
      value={{
        modalShow,
        setModalShow,
        modalBody,
        setModalBody,
        reservationForEdit,
        setReservationForEdit,
      }}
    >
      <Head>
        <title> Gaia hoteles </title>
      </Head>
      <Box>
        <NavigationBar styles={styles} />
        <Container maxWidth={false} className="layout1">
          <TableTitle
            title={`RESERVAS AL DÍA ${daySelected}`}
            styles={styles}
            cells="reservations"
          />
          <ControlsDayReservation
            Context={Context}
            currentDay={currentDay}
            allRooms={allRooms}
            dayReservations={dayReservations}
            setDayReservations={setDayReservations}
            setDaySelected={setDaySelected}
            setDayForGetData={setDayForGetData}
            setFilterReservations={setFilterReservations}
            styles={styles}
          />
          {!dayReservations ? (
            <Container className={styles.tableContainer}>
              <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
            </Container>
          ) : filterReservations && filterReservations.length === 0 ? (
            <NoDataToShow
              message="No hay reservas por mostrar"
              styles={styles}
            />
          ) : (
            <TableLayout
              Context={Context}
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
          Context={Context}
          allRooms={allRooms}
          BodyCreate={BodyCreateReservation}
          BodyEdit={BodyEditReservation}
          refreshData={refreshData}
          styles={styles}
        />
      </Box>
    </Context.Provider>
  );
}
