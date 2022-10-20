import { Container, Box, Typography } from "@mui/material";

export default function TopBar({ styles }) {
  return (
    <Box>
      <Container maxWidth={false} className={styles.topBarUpper} />
      <Container maxWidth={false} className={styles.topBarBottom}>
        <Container className={styles.titleContainer}>
          <Typography className={styles.subtitle}>Bienvenidos a</Typography>
          <Typography className={styles.title}>GAIA</Typography>
        </Container>
      </Container>
    </Box>
  );
}
