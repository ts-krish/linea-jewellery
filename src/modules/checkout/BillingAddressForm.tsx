"use client";

import { FormField } from "@/components/form";

const BillingAddressForm = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-lg">Billing Details</h1>
      <FormField
        name="billingEmail"
        label="Email Address"
        type="email"
        placeholder="Enter billing email"
      />
      <div className="grid grid-cols-2 gap-5">
        <FormField
          name="billingFirstName"
          label="First Name"
          placeholder="First name"
        />
        <FormField
          name="billingLastName"
          label="Last Name"
          placeholder="Last name"
        />
      </div>
      <FormField
        name="billingPhone"
        label="Phone Number"
        type="tel"
        placeholder="Phone Number"
      />

      <FormField name="billingAddress" label="Address" placeholder="Address" />
      <div className="grid grid-cols-2 gap-5">
        <FormField name="billingCity" label="City" placeholder="City" />
        <FormField
          name="billingPostalCode"
          label="Postal Code"
          placeholder="Postal Code"
        />
      </div>
      <FormField name="billingCountry" label="Country" placeholder="Country" />
    </div>
  );
};

export default BillingAddressForm;
