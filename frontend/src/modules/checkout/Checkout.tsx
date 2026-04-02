"use client";

import { Button, Checkbox, Input, Label, Separator } from "../../components/ui";
import { shippingAddressSchema } from "../../validation";
import earring from "@public/products/earring.jpg";
import { Form, Formik } from "formik";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { CartItem } from "../cart";
import BillingAddressForm from "./BillingAddressForm";
import CustomerDetailsForm from "./CustomerDetailsForm";
import PaymentDetailsForm from "./PaymentDetailsForm";
import ShippingOptions from "./ShippingOptions";
import ShippingAddressForm from "./ShipppingAddressForm";

type CartItemProps = {
  image: StaticImageData;
  title: string;
  brand: string;
  price: number;
};

const cartItems: CartItemProps[] = [
  {
    image: earring,
    title: "Earrings",
    brand: "Pantheon",
    price: 2850,
  },
];

const Checkout = () => {
  const initialValues = shippingAddressSchema.cast(
    {},
    { assert: false, stripUnknown: true },
  );

  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState("");
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const handleApply = () => {
    console.log("Applying code:", code);
  };

  return (
    <section className="grid grid-cols-1 px-10 md:pl-70 md:pr-50 md:grid-cols-4 gap-10">
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          phone: "",

          ...initialValues,

          billingEmail: "",
          billingFirstName: "",
          billingLastName: "",
          billingPhone: "",
          billingAddress: "",
          billingCity: "",
          billingPostalCode: "",
          billingCountry: "",
        }}
        onSubmit={(values) => {
          console.log("FINAL DATA:", values);
        }}
      >
        <Form className="space-y-10 md:px-20 order-2 md:order-1 col-span-3 md:min-w-3xl">
          <div>
            <h1 className="text-lg my-10">Customer Details</h1>
            <CustomerDetailsForm />
          </div>
          <Separator />
          <div>
            <h1 className="text-lg my-10">Shipping Address</h1>
            <ShippingAddressForm />
          </div>
          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="billing-toggle"
                checked={showBillingAddress}
                onCheckedChange={(checked) =>
                  setShowBillingAddress(checked === true)
                }
              />
              <Label htmlFor="billing-toggle">Other billing address</Label>
            </div>

            {showBillingAddress && <BillingAddressForm />}
          </div>
          <Separator />

          <div>
            <h1 className="text-lg my-10">Shipping Options</h1>
            <ShippingOptions />
          </div>

          <div>
            <h1 className="text-lg my-10">Payment Details</h1>
            <PaymentDetailsForm />
          </div>

          <div className="flex md:mx-10 flex-col gap-5 border border-gray-400 p-8">
            <div className="flex justify-between">
              <p className="text-black/60">Subtotal</p>
              <p>€2,450</p>
            </div>
            <div className="flex justify-between">
              <p className="text-black/60">Shipping</p>
              <p>Free</p>
            </div>
            <Separator />
            <div className="flex font-bold justify-between">
              <p>Total</p>
              <p>€2,450</p>
            </div>
          </div>
          <Button type="submit" className="w-full p-5 font-extrabold">
            Complete Order
          </Button>
        </Form>
      </Formik>

      <aside className="order-1 md:order-2 h-fit col-span-1 md:sticky top-20 space-y-6">
        <div>
          <h2 className="font-semibold mb-4">Order Summary</h2>

          {cartItems.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div>
          {!showInput ? (
            <p
              className="underline cursor-pointer"
              onClick={() => setShowInput(true)}
            >
              Discount Code
            </p>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter discount code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
              />

              <Button
                type="button"
                onClick={handleApply}
                disabled={!code.trim()}
              >
                Apply
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowInput(false);
                  setCode("");
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>€2,850</p>
        </div>
      </aside>
    </section>
  );
};

export default Checkout;
