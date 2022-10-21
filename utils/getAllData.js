import axios from "axios";

import SwalError from "./swalError";

const getAllData = async (setter, url) => {
  try {
    await axios
      .get(url)
      .then((json) => setter(json.data))
      .catch((error) => SwalError(error.response.data.message));
  } catch {
    SwalError("Ha ocurrido un error en la comunicación");
  }
};

export default getAllData;
