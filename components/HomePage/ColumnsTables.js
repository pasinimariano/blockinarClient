import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

export const StyledHeaders = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00001eff",
    color: "#ffffffff",
    fontWeight: "bolder",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const columnsAllRooms = [
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
