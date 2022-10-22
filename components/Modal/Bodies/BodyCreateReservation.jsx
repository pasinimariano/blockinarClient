import { Box, Typography, Container } from "@mui/material";
import { Formik } from "formik";

import { validationSchema } from "../../../schemas/SchemaCreateReservation";

import FormReservations from "../Forms/FormReservations";

export default function BodyCreateReservation({
  handleClose,
  currentDate,
  styles,
}) {
  const initialValues = {
    first_name: "",
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
            CREAR NUEVA RESERVA
          </Typography>
          <Typography className="titleDetail"> - </Typography>
        </Box>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
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
            />
          )}
        </Formik>
      </Box>
    </Box>
  );
}
