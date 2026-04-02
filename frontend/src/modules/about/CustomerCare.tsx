"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
  Label,
  Separator,
  Textarea,
} from "../../components/ui";
import { useState } from "react";

const faqData = [
  {
    title: "What are your shipping options and timeframes?",
    content:
      "We offer free standard shipping (3-5 business days) on orders over $500. Express shipping (1-2 business days) is available for $25. All orders are fully insured and require signature confirmation.",
  },
  {
    title: "What is your return and exchange policy?",
    content:
      "We offer a 30-day return policy for unworn items in original condition. Custom and engraved pieces are final sale. Returns are free with our prepaid return label.",
  },
  {
    title: "What warranty do you offer on your jewelry?",
    content:
      "All LINEA jewelry comes with a lifetime warranty against manufacturing defects. This includes free repairs for normal wear and tear, stone tightening, and professional cleaning.",
  },
  {
    title: "Can I resize my jewelry after purchase?",
    content:
      "Yes, we offer free ring resizing within 60 days of purchase (up to 2 sizes). Additional resizing is available for a service fee. Some designs cannot be resized due to their construction.",
  },
  {
    title: "How should I care for my LINEA jewelry?",
    content:
      "Store pieces separately in soft pouches, avoid contact with chemicals and cosmetics, and clean gently with a soft cloth. We recommend professional cleaning every 6-12 months.",
  },
  {
    title: "How can I verify the authenticity of my jewelry?",
    content:
      "Every LINEA piece comes with a certificate of authenticity and is hallmarked. You can verify authenticity on our website using your unique piece number or contact our customer care team.",
  },
];
const CustomerCare = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orderNumber: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      orderNumber: "",
      message: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl">Customer Care</h1>
        <p className="text-black/60">
          We&apos;re here to help you with all your jewelry needs
        </p>
      </div>
      <div className="py-20">
        <Separator />
      </div>
      <div>
        <div>
          <h2 className="text-3xl">Contact Information</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col gap-5">
            <p className="text-lg">Phone</p>
            <p className="text-black/60">+1 (555) 123-4567</p>
            <p className="text-black/60">
              Mon-Fri: 9AM-6PM EST <br /> Sat: 10AM-4PM EST
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-lg">Email</p>
            <p className="text-black/60">care@lineajewelry.com</p>
            <p className="text-black/60">Response within 24 hours</p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-lg">Live Chat</p>
            <div>
              <Button
                className="bg-white ring ring-gray-300 rounded-none font-bold"
                variant={"secondary"}
              >
                Start Chat
              </Button>
            </div>
            <p className="text-black/60">Available during business hours</p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h3 className="font-bold text-3xl">Frequently Asked Questions</h3>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, i) => (
            <AccordionItem
              className="py-2 my-3 ring-b-0 ring ring-gray-200"
              key={i}
              value={`item-${i}`}
            >
              <AccordionTrigger className="text-left px-5 font-extrabold text-base">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm px-5 text-gray-600">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div>
        <div className="text-3xl my-10">
          <h3>Contact Form</h3>
        </div>
        <div className="my-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <Label>First Name</Label>
                <Input
                  className="rounded-none my-3 py-5"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  className="rounded-none my-3 py-5"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                className="rounded-none mt-5 py-5"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label>Order Number (Optional)</Label>
              <Input
                className="rounded-none mt-5 py-5"
                placeholder="Enter your order number if applicable"
                name="orderNumber"
                value={form.orderNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>How can we help you?</Label>
              <Textarea
                name="message"
                className="mt-3 rounded-none"
                placeholder="Please describe your inquiry in detail"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-5 font-extrabold rounded-none"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
