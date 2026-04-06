import * as Yup from "yup";

export const customerDetailsSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .default(""),

  firstName: Yup.string()
    .min(2, "Too short")
    .required("First name is required")
    .default(""),

  lastName: Yup.string()
    .min(2, "Too short")
    .required("Last name is required")
    .default(""),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid phone number")
    .required("Phone number is required")
    .default(""),
});
