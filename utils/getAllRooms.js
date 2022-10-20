import axios from "axios";

import SwalError from "./swalError";

const getAllRooms = async (setAllRooms) => {
  try {
    const url = process.env.GET_ALLROOMS_URL;
    await axios
      .get(url)
      .then((json) => setAllRooms(json.data))
      .catch((error) => SwalError(error.response.data));
  } catch {
    SwalError("Ha ocurrido un error en la comunicación");
  }
};

export default getAllRooms;
