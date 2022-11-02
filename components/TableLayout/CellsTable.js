import { useContext } from "react";
import { TableRow, TableCell, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export function CellsTableAllRooms({ room }) {
  return (
    <TableRow>
      <TableCell align="center">{room["id"]}</TableCell>
      <TableCell align="center">{room["category"]["category_name"]}</TableCell>
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
  const bookingStatus = {
    Confirmed: "#2BBBAD",
    "In House": "#ffbb33",
    "Checked In": "#00C851",
    Cancelled: "#CC0000",
    "Checked Out": "#9933CC",
  };

  const splitTimeCheckIn = reservation["check_in_date"].split("T");
  const splitDateCheckIn = splitTimeCheckIn[0].split("-");
  const formatedCheckInDate = `${splitDateCheckIn[2]}/${splitDateCheckIn[1]}/${splitDateCheckIn[0]} - ${splitTimeCheckIn[1]}`;

  const splitTimeCheckOut = reservation["check_out_date"].split("T");
  const splitDateCheckOut = splitTimeCheckOut[0].split("-");
  const formatedCheckInOut = `${splitDateCheckOut[2]}/${splitDateCheckOut[1]}/${splitDateCheckOut[0]} - ${splitTimeCheckOut[1]}`;

  const handleClick = () => {
    context.setModalShow(true);
    context.setModalBody("edit");
    context.setReservationForEdit(reservation["id"]);
  };

  return (
    <TableRow>
      <TableCell
        align="center"
        style={{
          color: bookingStatus[reservation["booking_status"]["booking_status"]],
        }}
      >
        {reservation["booking_status"]["booking_status"].toUpperCase()}
      </TableCell>
      <TableCell align="center">
        {!reservation["room"] ? "-" : reservation["room"]["id"]}
      </TableCell>
      <TableCell align="center">{formatedCheckInDate}</TableCell>
      <TableCell align="center">{formatedCheckInOut}</TableCell>
      <TableCell align="center">{`${reservation["last_name"]},  ${reservation["first_name"]}`}</TableCell>
      <TableCell align="center">
        {!reservation["number_of_guests"]
          ? "-"
          : reservation["number_of_guests"]}
      </TableCell>
      <TableCell align="center">
        {!reservation["price_per_night"]
          ? "-"
          : `$ ${reservation["price_per_night"]}`}
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Editar reserva">
          <EditRoundedIcon color="secondary" onClick={handleClick} />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
