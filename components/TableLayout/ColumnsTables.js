import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

export const StyledHeadersBlack = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00001eff",
    color: "#ffffffff",
    fontWeight: "bolder",
  },
}));

export const StyledHeadersWhite = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#B2B2B2",
    color: "#00001eff",
    fontWeight: "bolder",
  },
}));

export const columnsAllRooms = [
  {
    id: "room_id",
    label: "Habitación",
    align: "center",
  },
  {
    id: "category",
    label: "Categoria",
    align: "center",
  },
  {
    id: "max_occupancy",
    label: "Ocupación Máxima",
    align: "center",
  },
  {
    id: "occupancy",
    label: "Ocupación",
    align: "center",
  },
];

export const columnsDayReservations = [
  {
    id: "status",
    label: "Estado",
    align: "center",
  },
  {
    id: "room_id",
    label: "Habitación",
    align: "center",
  },
  {
    id: "check_in",
    label: "Check In",
    align: "center",
  },
  {
    id: "check_out",
    label: "Check Out",
    align: "center",
  },
  {
    id: "complete_name",
    label: "Apellido y nombre",
    align: "center",
  },
  {
    id: "number_of_guests",
    label: "Número de húespedes",
    align: "center",
  },
  {
    id: "price_per_night",
    label: "Precio por noche",
    align: "center",
    maxSize: "1500px",
  },
];
