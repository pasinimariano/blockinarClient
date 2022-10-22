import { Container, Typography } from "@mui/material";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";

export default function NoDataToShow({ message, styles }) {
  return (
    <Container className={styles.noDataContainer}>
      <DangerousRoundedIcon fontSize="large" color="error" />
      <Typography className={styles.noDataMessage}>{message}</Typography>
    </Container>
  );
}
