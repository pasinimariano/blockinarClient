import axios from "axios";

import { getToken } from "./securityService";
import linkTo from "./linkTo";
import SwalError from "./swalError";
import SwalSuccess from "./swalSuccess";

const createRecord = async (params, refreshData, handleClose, url, router) => {
  const baseUrl = process.env.BASE_URL;
  try {
    const token = getToken();

    if (token === "TokenInsexistente") {
      localStorage.removeItem("access_token");
      linkTo("/", router);
      SwalError("Sesión vencida, vuelva a ingresar");
    } else
      await axios
        .post(`${baseUrl}${url}`, params, { headers: { token: token } })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("access_token", JSON.stringify(token));
          refreshData();
          handleClose();
          SwalSuccess("Reserva creada exitosamente");
        })
        .catch((error) => {
          SwalError(error.response.data);
        });
  } catch {
    SwalError("Ha ocurrido un error en la comunicación");
  }
};

export default createRecord;
