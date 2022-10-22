import * as Yup from "yup";
/* import { parse } from "date-fns"; */

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Campo requerido")
    .min(2, "Se requiere al menos dos caracteres")
    .max(150, "Se acepta un máximo de 150 caracteres"),
});
