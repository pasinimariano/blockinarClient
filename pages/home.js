import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";

import getAllRooms from "../utils/getAllRooms";
import NavigationBar from "../components/NavigationBar";
import TableAllRooms from "../components/HomePage/TableAllRooms";

import styles from "../styles/home.module.css";

export default function Home() {
  const [allRooms, setAllRooms] = useState(null);

  useEffect(() => {
    getAllRooms(setAllRooms);
  }, []);

  return (
    <Box>
      <NavigationBar styles={styles} />
      <Container maxWidth={false} className="layout1">
        {!allRooms ? (
          <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
        ) : (
          <TableAllRooms allRooms={allRooms} styles={styles} />
        )}
      </Container>
      <Container maxWidth={false} className="layout2">
        HOLA
      </Container>
    </Box>
  );
}
