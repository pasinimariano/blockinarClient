import { useRouter } from "next/router";
import { Container, Box, Typography, Tooltip } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import linkTo from "../../utils/linkTo";
import SwalSuccess from "../../utils/swalSuccess";

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
                    ? { color: "#00ff99ff", cursor: "pointer" }
                    : { color: "#ffffffff", cursor: "pointer" }
                }
              />
            </Tooltip>
            <Tooltip title="Gráficos">
              <TimelineRoundedIcon
                onClick={() => linkTo("/charts", router)}
                style={
                  pathname === "/charts"
                    ? {
                        color: "#00ff99ff",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }
                    : {
                        color: "#ffffffff",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }
                }
              />
            </Tooltip>
            <Tooltip title="Cerrar sesión">
              <ExitToAppRoundedIcon
                onClick={() => {
                  linkTo("/", router);
                  localStorage.removeItem("access_token");
                  SwalSuccess("Sesión cerrada correctamente");
                }}
                style={{
                  color: "#ffffffff",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}
