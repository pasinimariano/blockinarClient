import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { Button, TextField, MenuItem, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import getAllData from "../../utils/getAllData";

export default function ControlsDayReservation({
  Context,
  currentDay,
  dayReservations,
  setDayReservations,
  setDaySelected,
  setDayForGetData,
  setFilterReservations,
  styles,
}) {
  const [date, setDate] = useState(dayjs(currentDay));
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const context = useContext(Context);
  const router = useRouter();

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

  const filterByCategory = () => {
    if (dayReservations && selectedCategory !== "All") {
      const filteredData = dayReservations.filter((reservation) => {
        if (reservation["room"]) {
          const roomCategory = reservation["room"]["category"]["id"];
          if (roomCategory === selectedCategory) return reservation;
        }
      });
      return filteredData;
    }

    return dayReservations;
  };

  useEffect(() => {
    const urlGetAllCategories = process.env.GET_ALL_CATEGORIES;

    getAllData(setAllCategories, "categories", urlGetAllCategories, router);
  }, []);

  useEffect(() => {
    const filter = filterByCategory();
    setFilterReservations(filter);
  }, [selectedCategory]);

  useEffect(() => {
    setFilterReservations(dayReservations);
  }, [dayReservations]);

  return (
    <Grid container spacing={2} className={styles.controlsContainer}>
      <Grid xs={6} md={3} className={styles.controlsGrids2}>
        <TextField
          label="Filtrar por categoria"
          select
          fullWidth
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value.target.value);
          }}
          size="small"
        >
          <MenuItem value="All"> Mostrar todas </MenuItem>
          {allCategories &&
            allCategories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category["category_name"]}
                </MenuItem>
              );
            })}
        </TextField>
      </Grid>
      <Grid xs={6} md={3} className={styles.controlsGrids2}>
        <Tooltip title="Ordenar de A-Z">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSortAsc}
            sx={{ mr: 2 }}
          >
            <Image src="/iconDown.png" alt="Icon Down" width="40" height="30" />
          </Button>
        </Tooltip>
        <Tooltip title="Ordenar de Z-A">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSortDsc}
            sx={{ ml: 2 }}
          >
            <Image src="/iconUp.png" alt="Icon Up" width="40" height="30" />
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={6} md={3} className={styles.controlsGrids2}>
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
              const formatedDate = `${newDate["$y"]}-${formatedMonth}-${formatedDay}`;

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
      <Grid xs={6} md={3} className={styles.controlsGrids2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            context.setModalShow(true);
            context.setModalBody("create");
          }}
        >
          Crear reserva
        </Button>
      </Grid>
    </Grid>
  );
}
