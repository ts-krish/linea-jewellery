import * as Yup from "yup";
import { shippingAddressSchema } from "./address";
import { billingAddressSchema } from "./billling";
import { customerDetailsSchema } from "./customer";
import { paymentDetailsSchema } from "./payment";
export const checkoutSchema = customerDetailsSchema
  .concat(shippingAddressSchema)
  .concat(billingAddressSchema)
  .concat(paymentDetailsSchema)
  .shape({
    shippingMethod: Yup.string()
      .required("Select a shipping method")
      .default(""),
  });

export const checkoutInitialValues = checkoutSchema.cast(
  {},
  { assert: false, stripUnknown: true },
);
