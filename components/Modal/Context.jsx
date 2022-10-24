import { createContext } from "react";

export const Context = createContext({
  modalShow: false,
  setModalShow: () => {},
  modalBody: "",
  setModalBody: () => {},
  reservationForEdit: null,
  setReservationForEdit: () => {},
});
