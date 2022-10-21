import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { Button, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ControlsDayReservation({
  currentDay,
  dayReservations,
  setDayReservations,
  setDaySelected,
  setDayForGetData,
  styles,
}) {
  const [date, setDate] = useState(dayjs(currentDay));

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  const handleSortAsc = () => {
    const sortedData = dayReservations.sort((a, b) =>
      a["last_name"] > b["last_name"] ? 1 : -1
    );

    setDayReservations([...sortedData]);
  };

  const handleSortDsc = () => {
    const sortedData = dayReservations.sort((a, b) =>
      a["last_name"] < b["last_name"] ? 1 : -1
    );

    setDayReservations([...sortedData]);
  };

  return (
    <Container className={styles.controlsContainer}>
      <Grid sm={6} xl={6} style={{ backgroundColor: "pink", width: "100%" }}>
        Hola
      </Grid>
      <Grid sm={6} md={12} className={styles.controlsGrids2}>
        <Button
          variant="outlined"
          color="success"
          onClick={handleSortAsc}
          sx={{ mr: 2 }}
        >
          <Image src="/iconDown.png" alt="Icon Down" width="40" height="30" />
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={handleSortDsc}
          sx={{ ml: 2 }}
        >
          <Image src="/iconUp.png" alt="Icon Up" width="40" height="30" />
        </Button>
      </Grid>
      <Grid sm={6} xl={4} className={styles.controlsGrids2}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"es-mx"}
        >
          <DatePicker
            label="Selecciona una fecha"
            openTo="day"
            views={["year", "month", "day"]}
            format="DD-MM-YYYY"
            value={date}
            onChange={(newDate) => {
              const formatedMonth = `0${newDate["$M"] + 1}`.slice(-2);
              const formatedDay = `0${newDate["$D"]}`.slice(-2);
              const formatedDate = `${newDate["$y"]}-${formatedMonth}-${formatedDay}23:00:00`;

              setDate(newDate);
              setDaySelected(`${formatedDay}/${formatedMonth}`);
              setDayForGetData(formatedDate);
            }}
            renderInput={(params) => (
              <TextField {...params} onKeyDown={handleKeyDown} size="small" />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </Container>
  );
}
