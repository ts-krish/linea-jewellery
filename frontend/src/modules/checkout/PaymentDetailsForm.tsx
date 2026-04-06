import { FormField } from "../../components/form";

const PaymentDetailsForm = () => {
  return (
    <div className="space-y-5">
      <FormField
        name="cardHolderName"
        label="Cardholder Name"
        placeholder="Name on card"
      />
      <FormField
        name="cardNumber"
        label="Card Number"
        type="number"
        placeholder="424242 424242 424242"
      />
      <div className="grid grid-cols-2 gap-5">
        <FormField name="expiryDate" label="Expiry Date" placeholder="MM/YY" />
        <FormField name="cvv" label="CVV" type="number" placeholder="123" />
      </div>
    </div>
  );
};

export default PaymentDetailsForm;
