import * as Yup from "yup";

export const billingAddressSchema = Yup.object({
  billingEmail: Yup.string()
    .email("Invalid email")
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) => s.required("Email is required"),
    }),

  billingFirstName: Yup.string()
    .min(2, "Too short")
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) => s.required("First name is required"),
    }),

  billingLastName: Yup.string().default(""),
  billingPhone: Yup.string()
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) =>
        s
          .matches(/^[0-9]{10}$/, "Enter valid phone number")
          .required("Phone number is required"),
    }),

  billingAddress: Yup.string()
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) => s.required("Address is required"),
    }),

  billingCity: Yup.string()
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) => s.required("City is required"),
    }),

  billingPostalCode: Yup.string()
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) => s.required("Postal code is required"),
    }),

  billingCountry: Yup.string()
    .default("")
    .when("$showBillingAddress", {
      is: true,
      then: (s) => s.required("Country is required"),
    }),
});
