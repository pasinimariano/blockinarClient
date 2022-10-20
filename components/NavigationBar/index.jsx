import { Container, Box, Typography } from "@mui/material";

export default function NavigationBar({ styles }) {
  return (
    <Box>
      <Container maxWidth={false} className={styles.navBarUpper} />
      <Container maxWidth={false} className={styles.navBarBottom}>
        <Container className={styles.navMainContainer}>
          <Typography className={styles.navTitle}>GAIA</Typography>
        </Container>
      </Container>
    </Box>
  );
}
