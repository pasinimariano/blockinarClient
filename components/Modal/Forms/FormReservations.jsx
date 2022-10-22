import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CirculasProgress,
  Divider,
  FormGroup,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

export default function FormReservations({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isSubmitting,
  setFieldValue,
  handleClose,
  currentDay,
}) {
  const [date, setDate] = useState(dayjs(currentDay));

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
      </Grid>
    </Box>
  );
}
