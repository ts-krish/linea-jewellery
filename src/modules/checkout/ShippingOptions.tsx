"use client";

import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { useField } from "formik";

const options = [
  {
    value: "standard",
    label: "Standard Shipping",
    description: "Free • 3-5 business days",
  },
  {
    value: "express",
    label: "Express Shipping",
    description: "€15 • 1-2 business days",
  },
  {
    value: "overnight",
    label: "Overnight Delivery",
    description: "€35 • Next business day",
  },
];

const ShippingOptions = () => {
  const [field, meta, helpers] = useField("shippingMethod");

  return (
    <div className="space-y-3">
      <RadioGroup
        value={field.value}
        onValueChange={(value) => helpers.setValue(value)}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center justify-between border rounded-lg p-4 ${
              field.value === option.value ? "border-black" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value={option.value} id={option.value} />

              <Label htmlFor={option.value} className="cursor-pointer">
                <div className="flex flex-col justify-between">
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>

      {meta.touched && meta.error && (
        <p className="text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default ShippingOptions;
