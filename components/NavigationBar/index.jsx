import { Container, Box, Typography } from "@mui/material";

export default function NavigationBar({ styles }) {
  return (
    <Box>
      <Container maxWidth={false} className="navBarUpper" />
      <Container maxWidth={false} className="navBarBottom">
        <Container className="navMainContainer">
          <Typography className="navTitle">GAIA</Typography>
        </Container>
      </Container>
    </Box>
  );
}
