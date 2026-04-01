import * as Yup from "yup";

export const shippingAddressSchema = Yup.object({
  address: Yup.string().required("Address is required"),

  city: Yup.string().required("City is required"),

  postal_code: Yup.number().required("Postal code is required"),

  country: Yup.string().required("Country is required"),
});
