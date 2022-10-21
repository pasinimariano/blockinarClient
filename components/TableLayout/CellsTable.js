import { TableRow, TableCell } from "@mui/material";

export function CellsTableAllRooms({ room }) {
  return (
    <TableRow>
      <TableCell align="center">{room["id"]}</TableCell>
      <TableCell align="center">{room["category"]}</TableCell>
      <TableCell align="center">{room["max_occupancy"]}</TableCell>
      <TableCell align="center">{room["occupancy"]}</TableCell>
    </TableRow>
  );
}

export function CellsTableDayReservation({ reservation }) {
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
      <TableCell align="center">{`${reservation["last_name"]} ${reservation["first_name"]}`}</TableCell>
      <TableCell align="center">{reservation["number_of_guests"]}</TableCell>
      <TableCell align="center">{`$ ${reservation["price_per_night"]}`}</TableCell>
    </TableRow>
  );
}
