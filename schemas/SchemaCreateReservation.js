import * as Yup from "yup";
import { parse } from "date-fns";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Campo requerido")
    .min(2, "Se requiere al menos dos caracteres")
    .max(150, "Se acepta un máximo de 150 caracteres")
    .matches(/^(?=.*[a-zA-Z ])/, "Solo se acepta texto"),
  last_name: Yup.string()
    .required("Campo requerido")
    .min(2, "Se requiere al menos dos caracteres")
    .max(150, "Se acepta un máximo de 150 caracteres")
    .matches(/^(?=.*[a-zA-Z ])/, "Solo se acepta texto"),
  check_in_date: Yup.date()
    .required("Campo requerido")
    .transform((value, originalValue, context) => {
      if (context.isType(value)) return value;

      return parse(originalValue, "dd/MM/yyyy", new Date());
    })
    .typeError("Formato de fecha incorrecta"),
  check_out_date: Yup.date()
    .required("Campo requerido")
    .transform((value, originalValue, context) => {
      if (context.isType(value)) return value;

      return parse(originalValue, "dd/MM/yyyy", new Date());
    })
    .typeError("Formato de fecha incorrecta"),
  room_id: Yup.string().matches(/^\d+$/, "Solo se admiten números"),
  price_per_night: Yup.string()
    .required("Campo requerido")
    .matches(/^\d+$/, "Solo se admiten números"),
  number_of_guests: Yup.string()
    .required("Campo requerido")
    .matches(/^\d+$/, "Solo se admiten números"),
});
