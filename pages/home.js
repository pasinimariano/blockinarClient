import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

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
      <Container maxWidth={false} className="basicLayout1">
        <TableAllRooms styles={styles} />
      </Container>
    </Box>
  );
}
