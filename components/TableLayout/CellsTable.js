import { useContext } from "react";
import { TableRow, TableCell, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export function CellsTableAllRooms({ room }) {
  return (
    <TableRow>
      <TableCell align="center">{room["id"]}</TableCell>
      <TableCell align="center">{room["category"]}</TableCell>
      <TableCell align="center">{room["max_occupancy"]}</TableCell>
      <TableCell
        align="center"
        style={{ color: room["occupancy"] === 1 ? "red" : "#00C851" }}
      >
        {room["occupancy"] === 1 ? "OCUPADA" : "LIBRE"}
      </TableCell>
    </TableRow>
  );
}

export function CellsTableDayReservation({ reservation, Context }) {
  const context = useContext(Context);

  const handleClick = () => {
    context.setModalShow(true);
    context.setModalBody("edit");
    context.setReservationForEdit(reservation["room_id"]);
  };

  return (
    <TableRow>
      <TableCell
        align="center"
        style={{
          color:
            reservation["booking_status"] === "confirmed"
              ? "#00C851"
              : "#0099CC",
        }}
      >
        {reservation["booking_status"].toUpperCase()}
      </TableCell>
      <TableCell align="center">{reservation["room_id"]}</TableCell>
      <TableCell align="center">{`${reservation["check_in_date"].slice(
        0,
        10
      )} - ${reservation["check_in_date"].slice(11, 13)}:00`}</TableCell>
      <TableCell align="center">{`${reservation["check_out_date"].slice(
        0,
        10
      )} - ${reservation["check_out_date"].slice(11, 13)}:00`}</TableCell>
      <TableCell align="center">{`${reservation["last_name"]},  ${reservation["first_name"]}`}</TableCell>
      <TableCell align="center">{reservation["number_of_guests"]}</TableCell>
      <TableCell align="center">{`$ ${reservation["price_per_night"]}`}</TableCell>
      <TableCell align="center">
        <Tooltip title="Editar reserva">
          <EditRoundedIcon color="secondary" onClick={handleClick} />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
