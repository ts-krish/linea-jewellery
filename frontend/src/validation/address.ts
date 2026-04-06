import * as Yup from "yup";

export const shippingAddressSchema = Yup.object({
  address: Yup.string().required("Address is required").default(""),
  city: Yup.string().required("City is required").default(""),
  postal_code: Yup.string().required("Postal code is required").default(""),
  country: Yup.string().required("Country is required").default(""),
});
