import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CirculasProgress,
  Divider,
  FormGroup,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import moment from "moment";

import ResponsiveDialog from "../../Dialogs/ResponsiveDialog";

export default function FormReservations({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isSubmitting,
  setFieldValue,
  setFieldError,
  handleClose,
  styles,
}) {
  const currentDate = new Date();
  const [date, setDate] = useState(dayjs(currentDate));
  const [outDate, setOutDate] = useState(dayjs(currentDate));
  const [openDialog, setOpenDialog] = useState(false);
  const today = new Date();

  const handleKeyDown = (event) => {
    event.preventDefault();
  };
  console.log(errors);
  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid sm={12} md={6}>
          <TextField
            name="first_name"
            label="Nombre del húesped"
            required
            fullWidth
            size="small"
            value={values["first_name"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target.name, value.trim());
              handleBlur(e);
            }}
            error={touched["first_name"] && Boolean(errors["first_name"])}
            helperText={
              touched["first_name"] && Boolean(errors["first_name"])
                ? errors["first_name"]
                : " "
            }
          />
        </Grid>
        <Grid sm={12} md={6}>
          <TextField
            name="last_name"
            label="Apellido del húesped"
            required
            fullWidth
            size="small"
            value={values["last_name"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target.name, value.trim());
              handleBlur(e);
            }}
            error={touched["last_name"] && Boolean(errors["last_name"])}
            helperText={
              touched["last_name"] && Boolean(errors["last_name"])
                ? errors["last_name"]
                : " "
            }
          />
        </Grid>
        <Grid sm={12} md={6}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"es-mx"}
          >
            <DateTimePicker
              label="Check-in"
              openTo="day"
              views={["year", "month", "day", "hours", "minutes"]}
              format="DD-MM-YYYY"
              value={date}
              minDate={today}
              onChange={(newDate) => {
                setDate(newDate);
                if (
                  date > outDate ||
                  date["$d"].getTime() > outDate["$d"].getTime()
                ) {
                  setFieldError(
                    "check_out_date",
                    "La fecha de checkout debe ser mayor"
                  );
                } else {
                  const formatedMonth = `0${newDate["$M"] + 1}`.slice(-2);
                  const formatedDay = `0${newDate["$D"]}`.slice(-2);
                  const formatedHour = `0${newDate["$H"]}`.slice(-2);
                  const formatedMinutes = `0${newDate["$m"]}`.slice(-2);
                  const formatedDate = `${newDate["$y"]}-${formatedMonth}-${formatedDay}${formatedHour}:${formatedMinutes}:00`;

                  setFieldValue("check_in_date", formatedDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  onKeyDown={handleKeyDown}
                  size="small"
                  onBlur={handleBlur}
                  error={touched.check_in_date && Boolean(errors.check_in_date)}
                  helperText={
                    touched.check_in_date && Boolean(errors.check_in_date)
                      ? errors.check_in_date
                      : " "
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid sm={12} md={6}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"es-mx"}
          >
            <DateTimePicker
              label="Check-out"
              openTo="day"
              views={["year", "month", "day", "hours", "minutes"]}
              format="DD-MM-YYYY"
              value={outDate}
              minDate={today}
              onChange={(newDate) => {
                setOutDate(newDate);
                if (
                  date > outDate ||
                  date["$d"].getTime() > outDate["$d"].getTime()
                ) {
                  setFieldError(
                    "check_out_date",
                    "La fecha de checkout debe ser mayor"
                  );
                } else {
                  const formatedMonth = `0${newDate["$M"] + 1}`.slice(-2);
                  const formatedDay = `0${newDate["$D"]}`.slice(-2);
                  const formatedHour = `0${newDate["$H"]}`.slice(-2);
                  const formatedMinutes = `0${newDate["$m"]}`.slice(-2);
                  const formatedDate = `${newDate["$y"]}-${formatedMonth}-${formatedDay}${formatedHour}:${formatedMinutes}:00`;

                  setFieldValue("check_out_date", formatedDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  onKeyDown={handleKeyDown}
                  size="small"
                  onBlur={(e) => {
                    const value = (e.target.value || "").replace(/\s+/gi, " ");
                    setFieldValue(e.target["check_out_date"], value.trim());
                    handleBlur(e);
                  }}
                  error={
                    touched["check_out_date"] &&
                    Boolean(errors["check_out_date"])
                  }
                  helperText={
                    touched["check_out_date"] &&
                    Boolean(errors["check_out_date"])
                      ? errors["check_out_date"]
                      : " "
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid sm={3}>
          <TextField
            name="room_id"
            label="Asignar habitación"
            fullWidth
            size="small"
            value={values["room_id"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target["room_id"], value.trim());
              handleBlur(e);
            }}
            error={touched["room_id"] && Boolean(errors["room_id"])}
            helperText={
              touched["room_id"] && Boolean(errors["room_id"])
                ? errors["room_id"]
                : " "
            }
          />
        </Grid>
        <Grid sm={3}>
          <TextField
            name="price_per_night"
            label="Precio por noche"
            required
            fullWidth
            size="small"
            value={values["price_per_night"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target["price_per_night"], value.trim());
              handleBlur(e);
            }}
            error={
              touched["price_per_night"] && Boolean(errors["price_per_night"])
            }
            helperText={
              touched["price_per_night"] && Boolean(errors["price_per_night"])
                ? errors["price_per_night"]
                : " "
            }
          />
        </Grid>
        <Grid sm={3}>
          <TextField
            name="number_of_guests"
            label="Número de húespedes"
            required
            fullWidth
            size="small"
            value={values["number_of_guests"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target["number_of_guests"], value.trim());
              handleBlur(e);
            }}
            error={
              touched["number_of_guests"] && Boolean(errors["number_of_guests"])
            }
            helperText={
              touched["number_of_guests"] && Boolean(errors["number_of_guests"])
                ? errors["number_of_guests"]
                : " "
            }
          />
        </Grid>
        <Grid sm={3}></Grid>
      </Grid>
      <Divider sx={{ mt: 5, mb: 5 }} />
      <Box display="flex" justifyContent="flex-end">
        <Button color="error" variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          onClick={() => {
            if (!errors) setOpenDialog(true);
          }}
          sx={{ ml: 2 }}
        >
          Crear
        </Button>
      </Box>
      <ResponsiveDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="¿Quieres crear la siguiente reserva?"
        content={values}
        styles={styles}
      />
    </Box>
  );
}
