"use client";

import { Form, Formik } from "formik";
import { useState } from "react";

import { toast } from "sonner";
import { Button, Checkbox, Input, Label, Separator } from "../../components/ui";
import { useCart } from "../../context/CartContext";
import { getProductImageUrl } from "../../lib/api";

import { checkoutInitialValues, checkoutSchema } from "@/validation/checkout";
import { CartItem } from "../cart";
import BillingAddressForm from "./BillingAddressForm";
import CustomerDetailsForm from "./CustomerDetailsForm";
import PaymentDetailsForm from "./PaymentDetailsForm";
import ShippingOptions from "./ShippingOptions";
import ShippingAddressForm from "./ShipppingAddressForm";

const Checkout = () => {
  const { items, subtotal } = useCart();

  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState("");
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const handleApply = () => {
    console.log("Applying code:", code);
  };

  return (
    <section className="grid grid-cols-1 px-10 md:pl-70 md:pr-50 md:grid-cols-4 gap-10">
      <Formik
        initialValues={checkoutInitialValues}
        validationSchema={checkoutSchema}
        validateOnMount
        context={{ showBillingAddress }}
        onSubmit={(values) => {
          console.log("FINAL DATA:", values);
        }}
      >
        {(formik) => (
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

              {formik.touched.shippingMethod &&
                formik.errors.shippingMethod && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.shippingMethod}
                  </p>
                )}
            </div>

            <Separator />

            <div>
              <h1 className="text-lg my-10">Payment Details</h1>
              <PaymentDetailsForm />
            </div>

            <div className="flex md:mx-10 flex-col gap-5 border border-gray-400 p-8">
              <div className="flex justify-between">
                <p className="text-black/60">Subtotal</p>
                <p>€{subtotal.toLocaleString()}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-black/60">Shipping</p>
                <p>Free</p>
              </div>

              <Separator />

              <div className="flex font-bold justify-between">
                <p>Total</p>
                <p>€{subtotal.toLocaleString()}</p>
              </div>
            </div>

            <Button
              type="button"
              className="w-full p-5 font-extrabold"
              onClick={async () => {
                const errors = await formik.validateForm();
                console.log(errors);
                if (Object.keys(errors).length > 0) {
                  toast.error("Please fill all required fields correctly.");
                  return;
                }

                formik.handleSubmit();
                formik.handleReset();
              }}
            >
              Complete Order
            </Button>
          </Form>
        )}
      </Formik>

      <aside className="order-1 md:order-2 h-fit col-span-1 md:sticky top-20 space-y-6">
        <div>
          <h2 className="font-semibold mb-4">Order Summary</h2>

          {items.length === 0 ? (
            <p className="text-sm text-black/40">Your bag is empty.</p>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.cart_item_id}
                cart_item_id={item.cart_item_id}
                image={getProductImageUrl(item.product)}
                title={item.product.category}
                brand={item.product.brand_name}
                price={item.unit_price}
                quantity={item.quantity}
              />
            ))
          )}
        </div>

        <div>
          {!showInput ? (
            <p
              className="underline cursor-pointer text-sm"
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

        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>€{subtotal.toLocaleString()}</p>
        </div>
      </aside>
    </section>
  );
};

export default Checkout;
