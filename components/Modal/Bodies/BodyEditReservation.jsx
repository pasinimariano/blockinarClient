import { useState, useEffect } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { Formik } from "formik";

import getAllData from "../../../utils/getAllData";
import { validationSchema } from "../../../schemas/SchemaCreateReservation";

import FormReservations from "../Forms/FormReservations";

export default function BodyEditReservation({
  context,
  handleClose,
  allRooms,
  modalBody,
  prevData,
  styles,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const url = process.env.GET_RESERVATIONBYID_URL;
    const id = context.reservationForEdit;
    const urlReservationsById = `${url}${id}`;
    getAllData(setReservation, urlReservationsById);
  }, []);

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
        {!reservation ? (
          <Container className={styles.tableContainer}>
            <CircularProgress size={100} style={{ color: "#00ff99ff" }} />
          </Container>
        ) : (
          <Formik
            validationSchema={validationSchema}
            onSubmit={() => setOpenDialog(true)}
            initialValues={reservation}
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
        )}
      </Box>
    </Box>
  );
}
