import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

import ResponsiveDialog from "../../Dialogs/ResponsiveDialog";

export default function FormReservations({
  context,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isSubmitting,
  setFieldValue,
  handleClose,
  openDialog,
  setOpenDialog,
  allRooms,
  modalBody,
  refreshData,
  styles,
}) {
  const [date, setDate] = useState(dayjs(null));
  const [outDate, setOutDate] = useState(dayjs(null));
  const [totalPrice, setTotalPrice] = useState(null);
  const bookingStatus = [
    { status: "confirmed", color: "#00C851", value: "Confirmed" },
    { status: "in house", color: "#9933CC", value: "In_house" },
    { status: "cancelled", color: "#CC0000", value: "Cancelled" },
    { status: "checked out", color: "#0099CC", value: "Checked_out" },
  ];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  const themeDisabled = createTheme({
    palette: {
      text: {
        disabled: "black",
      },
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    context.setModalShow(false);
    context.setModalBody("");
  };

  useEffect(() => {
    if ((!isNaN(date["$y"]) && !isNaN(outDate["$y"])) || (date && outDate)) {
      const timeDifference = Math.abs(outDate - date);
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      const totalPrice = values["price_per_night"] * daysDifference;

      setTotalPrice(totalPrice);
    }
  }, [date, outDate, values["price_per_night"]]);

  useEffect(() => {
    if (context.modalBody === "edit" && values) {
      const checkInDate = new Date(values["check_in_date"]);
      const checkOutDate = new Date(values["check_out_date"]);
      const timeDifference = Math.abs(checkOutDate - checkInDate);
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      const totalPrice = values["price_per_night"] * daysDifference;

      setDate(checkInDate);
      setOutDate(checkOutDate);
      setTotalPrice(totalPrice);
    }
  }, []);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {context.modalBody === "edit" ? (
          <>
            <Grid sm={4}></Grid>
            <Grid sm={4}>
              <TextField
                name="booking_status"
                label="Estado"
                fullWidth
                required
                select
                size="small"
                value={values["booking_status"]}
                onChange={(option) => {
                  setFieldValue("booking_status", option.target.value);
                }}
                onBlur={handleBlur}
                error={
                  touched["booking_status"] && Boolean(errors["booking_status"])
                }
                helperText={
                  touched["booking_status"] && Boolean(errors["booking_status"])
                    ? errors["booking_status"]
                    : " "
                }
              >
                {bookingStatus.map((status) => (
                  <MenuItem
                    key={status.value}
                    value={status.value}
                    style={{ color: status.color }}
                  >
                    {status.status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid sm={4}></Grid>
          </>
        ) : null}
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
                if (outDate == null) {
                  setFieldValue("check_in_date", "");
                  setDate("");
                } else {
                  const formatedMonth = `0${newDate["$M"] + 1}`.slice(-2);
                  const formatedDay = `0${newDate["$D"]}`.slice(-2);
                  const formatedHour = `0${newDate["$H"]}`.slice(-2);
                  const formatedMinutes = `0${newDate["$m"]}`.slice(-2);
                  const formatedDate = `${newDate["$y"]}-${formatedMonth}-${formatedDay}${formatedHour}:${formatedMinutes}:00`;

                  setDate(newDate["$d"]);
                  setFieldValue("check_in_date", formatedDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="check_in_date"
                  fullWidth
                  required
                  onKeyDown={handleKeyDown}
                  size="small"
                  onBlur={handleBlur}
                  error={
                    touched["check_in_date"] && Boolean(errors["check_in_date"])
                  }
                  helperText={
                    touched["check_in_date"] && Boolean(errors["check_in_date"])
                      ? errors["check_in_date"]
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
              minDate={tomorrow}
              onChange={(newDate) => {
                if (outDate == null) {
                  setFieldValue("check_out_date", "");
                  setOutDate("");
                } else {
                  const formatedMonth = `0${newDate["$M"] + 1}`.slice(-2);
                  const formatedDay = `0${newDate["$D"]}`.slice(-2);
                  const formatedHour = `0${newDate["$H"]}`.slice(-2);
                  const formatedMinutes = `0${newDate["$m"]}`.slice(-2);
                  const formatedDate = `${newDate["$y"]}-${formatedMonth}-${formatedDay}${formatedHour}:${formatedMinutes}:00`;

                  setOutDate(newDate["$d"]);
                  setFieldValue("check_out_date", formatedDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="check_out_date"
                  fullWidth
                  required
                  onKeyDown={handleKeyDown}
                  size="small"
                  onBlur={handleBlur}
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
            label={values["room_id"] ? "Habitación" : "Asignar habitación"}
            fullWidth
            select
            size="small"
            value={values["room_id"]}
            onChange={(option) => {
              setFieldValue("room_id", option.target.value);
            }}
            onBlur={handleBlur}
            error={touched["room_id"] && Boolean(errors["room_id"])}
            helperText={
              touched["room_id"] && Boolean(errors["room_id"])
                ? errors["room_id"]
                : " "
            }
          >
            {allRooms &&
              allRooms.map((room) => (
                <MenuItem
                  key={room.id}
                  value={room.id}
                  style={
                    room.occupancy === 1 ? { color: "red" } : { color: "green" }
                  }
                  disabled={room.occupancy === 1 ? true : false}
                >
                  {room.id}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid sm={3}>
          <TextField
            name="price_per_night"
            label="Precio por noche"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="medium" />
                </InputAdornment>
              ),
            }}
            inputProps={{ style: { textAlign: "center" } }}
            fullWidth
            size="small"
            value={values["price_per_night"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target.name, value.trim());
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
            inputProps={{ style: { textAlign: "center" } }}
            fullWidth
            size="small"
            value={values["number_of_guests"]}
            onChange={handleChange}
            onBlur={(e) => {
              const value = (e.target.value || "").replace(/\s+/gi, " ");
              setFieldValue(e.target.name, value.trim());
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
        <Grid sm={3}>
          <ThemeProvider theme={themeDisabled}>
            <TextField
              name="total_price"
              label="Precio total"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon fontSize="medium" />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { textAlign: "center" } }}
              fullWidth
              disabled
              size="small"
              value={totalPrice ? totalPrice : ""}
            />
          </ThemeProvider>
        </Grid>
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
          sx={{ ml: 2 }}
        >
          {modalBody === "create" ? "Crear" : "Editar"}
        </Button>
      </Box>
      <ResponsiveDialog
        openDialog={openDialog}
        handleClose={handleCloseDialog}
        isSubmitting={isSubmitting}
        title={
          context.modalBody === "edit"
            ? "¿Quieres editar la reserva?"
            : "¿Quieres crear la siguiente reserva?"
        }
        content={{ ...values, totalPrice }}
        styles={styles}
        body={context.modalBody}
        refreshData={refreshData}
      />
    </Box>
  );
}
