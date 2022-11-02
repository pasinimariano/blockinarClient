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
              context={context}
              handleClose={handleClose}
              allRooms={allRooms}
              modalBody={context.modalBody}
              refreshData={refreshData}
              styles={styles}
            />
          ) : (
            <BodyEdit
              context={context}
              handleClose={handleClose}
              allRooms={allRooms}
              modalBody={context.modalBody}
              reservation={reservation}
              refreshData={refreshData}
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
