import axios from "axios";

import { getToken } from "./securityService";
import linkTo from "./linkTo";
import SwalError from "./swalError";

const getAllData = async (setter, object, url, router) => {
  const baseUrl = process.env.BASE_URL;

  try {
    const token = getToken();

    if (token === "TokenInsexistente") {
      localStorage.removeItem("access_token");
      linkTo("/", router);
      SwalError("Sesión vencida, vuelva a ingresar");
    } else
      await axios
        .get(`${baseUrl}${url}`, { headers: { token: token } })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("access_token", JSON.stringify(token));
          setter(res.data[object]);
        })
        .catch((error) => {
          SwalError(error.response.data);
        });
  } catch (error) {
    SwalError("Ha ocurrido un error en la comunicación");
  }
};

export default getAllData;
