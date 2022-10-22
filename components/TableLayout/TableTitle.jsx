import { Container, Typography } from "@mui/material";

export default function TableTitle({ title, cells, styles }) {
  return (
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
  );
}
