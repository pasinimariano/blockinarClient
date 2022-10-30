import * as Yup from "yup";
import { parse } from "date-fns";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Campo requerido")
    .min(2, "Se requiere al menos dos caracteres")
    .max(60, "Se acepta un máximo de 60 caracteres")
    .matches(/^(?=.*[a-zA-Z ])/, "Solo se acepta texto"),
  last_name: Yup.string()
    .required("Campo requerido")
    .min(2, "Se requiere al menos dos caracteres")
    .max(60, "Se acepta un máximo de 60 caracteres")
    .matches(/^(?=.*[a-zA-Z ])/, "Solo se acepta texto"),
  check_in_date: Yup.date()
    .required("Campo requerido")
    .transform((value, originalValue, context) => {
      if (context.isType(value)) return value;

      return parse(originalValue, "dd/MM/yyyy", new Date());
    })
    .typeError("Formato de fecha incorrecta"),
  check_out_date: Yup.date()
    .default(null)
    .required("Campo requerido")
    .transform((value, originalValue, context) => {
      if (context.isType(value)) return value;

      return parse(originalValue, "dd/MM/yyyy", new Date());
    })
    .typeError("Formato de fecha incorrecta")
    .when(
      "check_in_date",
      (check_in_date, yup) =>
        check_in_date &&
        yup.min(check_in_date, "El check-out debe ser posterior al check_in")
    ),
  room_id: Yup.string().matches(/^\d+$/, "Solo se admiten números"),
  price_per_night: Yup.string().matches(/^\d+$/, "Solo se admiten números"),
  number_of_guests: Yup.string().matches(/^\d+$/, "Solo se admiten números"),
});
