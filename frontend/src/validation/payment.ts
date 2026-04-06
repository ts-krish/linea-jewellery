import * as Yup from "yup";

export const paymentDetailsSchema = Yup.object({
  cardHolderName: Yup.string()
    .required("Card Holder name is required")
    .default(""),

  cardNumber: Yup.number().required("Card number is required").default(0),

  expiryDate: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-2]|1[0-2])\/?([0-9]{2})$/, "Must be MM/YY")
    .default("01/20"),

  cvv: Yup.number().required("CVV is required").default(0),
});
