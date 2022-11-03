import { useRouter } from "next/router";
import Link from "next/link";
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
              <Link href="/home">
                <HomeRoundedIcon
                  style={
                    pathname === "/home"
                      ? { color: "#00ff99ff", cursor: "pointer" }
                      : { color: "#ffffffff", cursor: "pointer" }
                  }
                />
              </Link>
            </Tooltip>
            <Tooltip title="Gráficos">
              <Link href="/charts">
                <TimelineRoundedIcon
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
              </Link>
            </Tooltip>
            <Tooltip title="Cerrar sesión">
              <Link href="/">
                <ExitToAppRoundedIcon
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    SwalSuccess("Sesión cerrada correctamente");
                  }}
                  style={{
                    color: "#ffffffff",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </Tooltip>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}
