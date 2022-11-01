import axios from "axios";

import { getToken } from "./securityService";
import linkTo from "./linkTo";
import SwalError from "./swalError";
import SwalSuccess from "./swalSuccess";

const createOrUpdateRecord = async (
  params,
  refreshData,
  handleClose,
  url,
  router,
  body
) => {
  const baseUrl = process.env.BASE_URL;
  const method = body === "create" ? axios.post : axios.put;
  try {
    const token = getToken();

    if (token === "TokenInsexistente") {
      localStorage.removeItem("access_token");
      linkTo("/", router);
      SwalError("Sesión vencida, vuelva a ingresar");
    } else
      await method(`${baseUrl}${url}`, params, { headers: { token: token } })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("access_token", JSON.stringify(token));
          refreshData();
          handleClose();
          {
            body === "create"
              ? SwalSuccess("Reserva creada exitosamente")
              : SwalSuccess("Reserva actualizada exitosamente");
          }
        })
        .catch((error) => {
          handleClose();
          SwalError(error.response.data);
        });
  } catch {
    SwalError("Ha ocurrido un error en la comunicación");
  }
};

export default createOrUpdateRecord;
