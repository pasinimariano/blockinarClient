import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  refreshData,
  styles,
}) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [getReservation, setGetReservation] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const url = process.env.GET_RESERVATIONBYID_URL;
    const id = context.reservationForEdit;
    const urlReservationsById = `${url}${id}`;
    getAllData(setGetReservation, "bookings", urlReservationsById, router);
  }, [getAllData, setGetReservation]);

  useEffect(() => {
    if (getReservation) {
      if (getReservation[0]["room"]) {
        getReservation[0]["room_id"] = getReservation[0]["room"]["id"];
        delete getReservation[0]["room"];
      }

      getReservation[0]["status_id"] =
        getReservation[0]["booking_status"]["id"];
      delete getReservation[0]["booking_status"];

      setReservation(getReservation[0]);
    }
  }, [getReservation, setReservation]);

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
                context={context}
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
                refreshData={refreshData}
                styles={styles}
              />
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
}
