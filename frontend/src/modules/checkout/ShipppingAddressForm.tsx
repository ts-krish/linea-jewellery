"use client";

import { FormField } from "../../components/form";

const ShippingAddressForm = () => {
  return (
    <div className="space-y-5">
      <FormField name="address" label="Address *" placeholder="Street Address" />
      <div className="grid grid-cols-2 gap-5">
        <FormField name="city" label="City *" placeholder="City" />
        <FormField
          name="postal_code"
          label="Postal Code *"
          placeholder="Postal code"
        />
      </div>
      <FormField name="country" label="Country" placeholder="Country" />
    </div>
  );
};

export default ShippingAddressForm;
