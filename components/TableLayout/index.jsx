import { useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { CellsTableAllRooms, CellsTableDayReservation } from "./CellsTable";

export default function TableLayout({
  title,
  data,
  columns,
  cells,
  Headers,
  styles,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container className={styles.tableContainer}>
      <Container className={styles.tableTitleContainer}>
        <Typography className={styles.titleDetail}> - </Typography>
        <Typography
          className={
            cells === "reservations"
              ? styles.tableTitleWhite
              : styles.tableTitleDark
          }
        >
          {title}
        </Typography>
        <Typography className={styles.titleDetail}> - </Typography>
      </Container>
      <Paper className={styles.tablePaper}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <Headers key={column.id} align={column.align}>
                    {column.label}
                  </Headers>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                cells === "rooms" &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((room) => {
                    return <CellsTableAllRooms room={room} key={room.id} />;
                  })}

              {data &&
                cells === "reservations" &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((reservation) => {
                    return (
                      <CellsTableDayReservation
                        reservation={reservation}
                        key={reservation.id}
                      />
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        className={
          cells === "reservations"
            ? styles.paginationWhite
            : styles.paginationDark
        }
        labelRowsPerPage="Mostrar"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count} `
        }
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
