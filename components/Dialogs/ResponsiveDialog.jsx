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

export default function ResponsiveDialog({
  openDialog,
  setOpenDialog,
  title,
  content,
  handleSubmit,
  styles,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const JSONPrettyMon = require("react-json-pretty/dist/monikai");

  const handleClose = () => {
    setOpenDialog(false);
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
            data={content}
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
            onClick={() => console.log("hola")}
            color="secondary"
            variant="contained"
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
