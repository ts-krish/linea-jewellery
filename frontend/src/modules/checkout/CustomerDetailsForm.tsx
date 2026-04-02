"use client";

import { FormField } from "../../components/form";

const CustomerDetailsForm = () => {
  return (
    <div className="space-y-5">
      <FormField
        name="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
      />
      <div className="grid grid-cols-2 gap-5">
        <FormField
          name="firstName"
          label="First Name"
          placeholder="First name"
        />
        <FormField name="lastName" label="Last Name" placeholder="Last name" />
      </div>
      <FormField
        name="phone"
        label="Phone Number"
        placeholder="Enter your phone number"
        type="tel"
      />
    </div>
  );
};

export default CustomerDetailsForm;
