import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50vw",
  bgcolor: "background.paper",
  border: "1.5px solid #78909c",
  borderRadius: "16px",
  boxShadow: 24,
  p: 5,
};

export default function ModalLayout({
  modalShow,
  setModalShow,
  selectedBody,
  Body,
  refreshData,
  handleOpenSnackBar,
  goTo,
  styles,
}) {
  const handleClose = (event) => {
    event.preventDefault();

    setModalShow(false);
  };

  return (
    <div>
      <Modal open={modalShow} onClose={handleClose}>
        <Box sx={style}>
          <Body styles={styles} handleClose={handleClose} />
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
