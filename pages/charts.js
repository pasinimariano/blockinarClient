import Head from "next/head";
import { useState, useEffect } from "react";

import getAllData from "../utils/getAllData";
import NavigationBar from "../components/NavigationBar";
import ChartOfTheMonth from "../components/Charts/OfTheMonth";
import { Container } from "@mui/material";

export default function Graphs() {
  const [allReservations, setAllReservations] = useState(null);
  const urlAllReservations = process.env.GET_ALL_RESERVATIONS;

  useEffect(() => {
    getAllData(setAllReservations, urlAllReservations);
  }, []);

  return (
    <div>
      <Head>
        <title> Gráficos </title>
      </Head>
      <main>
        <NavigationBar />
        <Container sx={{ mt: 5 }}>
          <ChartOfTheMonth allReservations={allReservations} />
        </Container>
      </main>
    </div>
  );
}
