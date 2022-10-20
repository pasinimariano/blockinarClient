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

import { columnsAllRooms, StyledHeaders } from "./ColumnsTables";

export default function TableAllRooms({ allRooms, styles }) {
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
        <Typography className={styles.tableTitle}>NUESTROS CUARTOS</Typography>
        <Typography className={styles.titleDetail}> - </Typography>
      </Container>
      <Paper className={styles.tablePaper}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsAllRooms.map((column) => (
                  <StyledHeaders key={column.id} align={column.align}>
                    {column.label}
                  </StyledHeaders>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allRooms &&
                allRooms
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((room) => {
                    return (
                      <TableRow key={room.id}>
                        <TableCell align="center">{room["category"]}</TableCell>
                        <TableCell align="center">
                          {room["max_occupancy"]}
                        </TableCell>
                        <TableCell align="center">
                          {room["occupancy"]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        labelRowsPerPage="Mostrar"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count} `
        }
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allRooms ? allRooms.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
