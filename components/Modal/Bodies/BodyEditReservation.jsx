import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Formik } from "formik";

import { validationSchema } from "../../../schemas/SchemaCreateReservation";

import FormReservations from "../Forms/FormReservations";

export default function BodyEditReservation({
  handleClose,
  allRooms,
  modalBody,
  prevData,
  styles,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const initialValues = {
    first_name: "",
    last_name: "",
    check_in_date: "",
    check_out_date: "",
    room_id: "",
    price_per_night: "",
    number_of_guests: "",
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography className="titleDetail"> - </Typography>
          <Typography className={styles.tableTitleWhite}>
            EDITAR RESERVA
          </Typography>
          <Typography className="titleDetail"> - </Typography>
        </Box>
        <Formik
          validationSchema={validationSchema}
          onSubmit={() => setOpenDialog(true)}
          initialValues={initialValues}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
            setFieldValue,
          }) => (
            <FormReservations
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              handleClose={handleClose}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              allRooms={allRooms}
              modalBody={modalBody}
              styles={styles}
            />
          )}
        </Formik>
      </Box>
    </Box>
  );
}
