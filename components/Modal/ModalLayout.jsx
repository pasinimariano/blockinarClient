import { useContext } from "react";
import { Box, Button, Modal } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function ModalLayout({
  Context,
  allRooms,
  BodyCreate,
  BodyEdit,
  reservation,
  refreshData,
  handleOpenSnackBar,
  goTo,
  styles,
}) {
  const context = useContext(Context);

  const handleClose = (event) => {
    event.preventDefault();

    context.setModalShow(false);
    context.setModalBody("");
    context.setReservationForEdit(null);
  };

  return (
    <div>
      <Modal open={context.modalShow} onClose={handleClose}>
        <Box className="modalLayout">
          {context.modalBody === "create" ? (
            <BodyCreate
              handleClose={handleClose}
              allRooms={allRooms}
              modalBody={context.modalBody}
              styles={styles}
            />
          ) : (
            <BodyEdit
              handleClose={handleClose}
              allRooms={allRooms}
              modalBody={context.modalBody}
              reservation={reservation}
              styles={styles}
            />
          )}
          <Button
            sx={{ position: "absolute", top: 2, right: 2 }}
            onClick={handleClose}
          >
            <CloseOutlinedIcon color="error" />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
