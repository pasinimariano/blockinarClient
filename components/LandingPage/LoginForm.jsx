import { useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";

import { LoginSchema } from "../../schemas/LoginSchema";
import SwalError from "../../utils/swalError";
import linkTo from "../../utils/linkTo";

export default function LoginForm({ styles }) {
  const [open, setOpen] = useState(false);
  const passwordInput = useRef(null);
  const router = useRouter();
  const urlForLogin = `${process.env.BASE_URL}${process.env.LOGIN_ADMIN}`;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    await axios
      .post(urlForLogin, values)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("access_token", JSON.stringify(token));
        handleOpen();
        linkTo("/home", router);
      })
      .catch((error) => SwalError(error.response.data));
  };

  return (
    <Container className={styles.mainContainer}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container className={styles.titleFormContainer}>
          <Typography className="titleDetail"> - </Typography>
          <Typography className={styles.titleForm}>
            INGRESO AL SISTEMA
          </Typography>
          <Typography className="titleDetail"> - </Typography>
        </Container>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            values,
          }) => (
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                name="email"
                label="Correo electrónico"
                id="email"
                required
                fullWidth
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={
                  touched.email && Boolean(errors.email) ? errors.email : " "
                }
                onBlur={handleBlur}
                touched={touched}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && values.email != "") {
                    passwordInput.current.focus();
                  }
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                inputRef={passwordInput}
                required
                fullWidth
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={
                  touched.password && Boolean(errors.password)
                    ? errors.password
                    : " "
                }
                onBlur={handleBlur}
                touched={touched}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                sx={{ mb: 2 }}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  disabled={isSubmitting || open}
                  variant="contained"
                  color="secondary"
                  sx={{ mb: 2 }}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? <CircularProgress size={25} /> : "Ingresar"}
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Logueo exitoso
        </Alert>
      </Snackbar>
    </Container>
  );
}
