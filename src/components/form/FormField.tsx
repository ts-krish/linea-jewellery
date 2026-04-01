"use client";

import { useField } from "formik";
import { Input, Label } from "../ui";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

const FormField = ({ label, name, ...props }: Props) => {
  const [field, meta] = useField(name);

  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>

      <Input className="rounded-none my-2 py-5 w-full" id={name} {...field} {...props} />

      {meta.touched && meta.error && (
        <p className="text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default FormField;