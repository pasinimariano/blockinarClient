import { useRouter } from "next/router";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import JSONPRETTY from "react-json-pretty";

import createOrUpdateRecord from "../../utils/createOrUpdateRecord";

export default function ResponsiveDialog({
  openDialog,
  title,
  content,
  body,
  refreshData,
  handleClose,
  styles,
}) {
  const router = useRouter();
  const urlForCreateBooking = process.env.CREATE_RESERVATION_URL;
  const urlForUpdateBooking = process.env.UPDATE_RESERVATION_URL;
  const urlUpdateById = `${urlForUpdateBooking}${content["id"]}`;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const JSONPrettyMon = require("react-json-pretty/dist/monikai");

  const params = {
    first_name: content["first_name"],
    last_name: content["last_name"],
    check_in_date: content["check_in_date"],
    check_out_date: content["check_out_date"],
    room_id: !content["room_id"] ? "" : content["room_id"],
    price_per_night: !content["price_per_night"]
      ? ""
      : content["price_per_night"],
    number_of_guests: !content["number_of_guests"]
      ? ""
      : content["number_of_guests"],
    status_id: content["booking_status"] ? content["booking_status"]["id"] : "",
  };

  const handleSubmit = () => {
    if (body === "create") {
      createOrUpdateRecord(
        params,
        refreshData,
        handleClose,
        urlForCreateBooking,
        router,
        "create"
      );
    }

    if (body === "edit") {
      createOrUpdateRecord(
        params,
        refreshData,
        handleClose,
        urlUpdateById,
        router,
        "edit"
      );
    }
  };

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={styles.dialogTitle}
        >
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent className={styles.dialogColor}>
          <JSONPRETTY
            id="json-pretty"
            data={params}
            theme={JSONPrettyMon}
          ></JSONPRETTY>
        </DialogContent>
        <Divider />
        <DialogActions className={styles.dialogColor}>
          <Button
            autoFocus
            onClick={handleClose}
            color="error"
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            autoFocus
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
          >
            {body === "create" ? "Crear" : "Editar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
