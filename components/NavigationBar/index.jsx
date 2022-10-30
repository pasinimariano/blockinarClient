import { useRouter } from "next/router";
import { Container, Box, Typography, Tooltip } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import linkTo from "../../utils/linkTo";

export default function NavigationBar() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Box>
      <Container maxWidth={false} className="navBarUpper" />
      <Container maxWidth={false} className="navBarBottom">
        <Container className="navMainContainer">
          <Typography className="navTitle">GAIA</Typography>
          <Box display="flex" justifyContent="flex-end" sx={{ width: "100%" }}>
            <Tooltip title="Home">
              <HomeRoundedIcon
                onClick={() => linkTo("/home", router)}
                style={
                  pathname === "/home"
                    ? { color: "#00ff99ff" }
                    : { color: "#ffffffff" }
                }
              />
            </Tooltip>
            <Tooltip title="Gráficos">
              <TimelineRoundedIcon
                onClick={() => linkTo("/charts", router)}
                style={
                  pathname === "/charts"
                    ? { color: "#00ff99ff", marginLeft: "10px" }
                    : { color: "#ffffffff", marginLeft: "10px" }
                }
              />
            </Tooltip>
            <Tooltip title="Cerrar sesión">
              <ExitToAppRoundedIcon
                onClick={() => linkTo("/", router)}
                style={{ color: "#ffffffff", marginLeft: "10px" }}
              />
            </Tooltip>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}
