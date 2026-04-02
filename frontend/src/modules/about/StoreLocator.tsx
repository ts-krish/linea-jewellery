"use client";

import { Button, Separator } from "../../components/ui";
import Map from "./Map";

const stores = [
  {
    name: "LINEA Madison Avenue",
    address: "789 Madison Avenue, New York, NY 10065",
    phone: "+1 (212) 555-0123",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    services1: ["Personal Shopping", "VIP Suites"],
    services2: ["Repairs", "Appraisals"],
  },
  {
    name: "LINEA Beverly Hills",
    address: "456 Rodeo Drive, Beverly Hills, CA 90210",
    phone: "+1 (310) 555-0456",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    services1: ["Personal Shopping", "Custom Design"],
    services2: ["VIP Suites", "Repairs"],
  },
  {
    name: "LINEA SoHo",
    address: "123 Spring Street, New York, NY 10012",
    phone: "+1 (212) 555-0789",
    hours: "Mon-Sat: 11AM-8PM, Sun: 12PM-7PM",
    services1: ["Browse & Buy", "Repairs"],
    services2: ["Gift Wrapping"],
  },
];

const StoreLocator = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl">Store Locator</h1>
        <p className="text-black/60 text-lg">
          Visit us in person for a personalized jewelry experience
        </p>
      </div>
      <div className="py-20">
        <Separator />
      </div>
      <div>
        <div className="py-10">
          <h2 className="text-3xl">Interactive Store Map</h2>
        </div>
        <div>
          <Map />
        </div>
      </div>
      <div>
        <div className="my-10 pt-10">
          <h3 className="text-3xl">Our Locations</h3>
        </div>
        {stores.map((store, index) => (
          <div
            key={index}
            className="grid grid-cols-1 my-10 md:grid-cols-2 border border-black/10 rounded-sm px-10 py-5"
          >
            <div>
              <div className="text-lg mt-5">
                <h3>{store.name}</h3>
              </div>

              <div className="text-black/60 my-5 flex flex-col gap-3">
                <span>{store.address}</span>
                <span>{store.phone}</span>
                <span>{store.hours}</span>

                <div className="flex flex-col md:flex-row gap-3">
                  <Button
                    className="p-5 bg-white border-gray-300 rounded-none font-bold"
                    variant={"secondary"}
                  >
                    Get Directions
                  </Button>

                  <Button className="py-5 px-7 font-bold rounded-none">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="text-lg mt-5">
                <h3>Available Services</h3>
              </div>

              <div className="flex my-5 text-black/60 gap-20">
                <ul className="list-inside list-disc">
                  {store.services1.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <ul className="list-inside list-disc">
                  {store.services2.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-3xl">
          <h3>Private Appoinments</h3>
        </div>
        <div className="text-black/60 my-7">
          <p>
            Experience personalized service with a private appointment. Our
            jewelry consultants will guide you through our collections, help
            with custom designs, and provide expert advice in a comfortable,
            private setting.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h4 className="text-lg">Personal Shopping</h4>
            <p className="text-black/60">
              One-on-one guidance to find the perfect piece for any occasion
            </p>
          </div>
          <div>
            <h4 className="text-lg">Custom Design</h4>
            <p className="text-black/60">
              Work with our designers to create a unique piece just for Your
            </p>
          </div>
          <div>
            <h4 className="text-lg">Expert Services</h4>
            <p className="text-black/60">
              Professional appraisals, repairs, and maintenance services
            </p>
          </div>
        </div>
        <div className="my-10">
          <Button className="font-bold px-8 py-5 rounded-none">
            Schedule Your Appointment
          </Button>
        </div>
      </div>
      <div className="my-30">
        <div className="py-10 text-3xl">
          <h2>Virtual Consulations</h2>
        </div>
        <div className="p-10 flex flex-col gap-5">
          <h4 className="text-xl">Can&apos;t visit in person?</h4>
          <p className="text-black/60">
            Book a virtual consultation with one of our jewelry experts.
            We&apos;ll showcase pieces via video call, answer your questions,
            and help you make the perfect selection from the comfort of your
            home.
          </p>
          <div>
            <Button
              variant={"secondary"}
              className="bg-white font-bold p-5 border-black/10 rounded-none"
            >
              Book Virtual Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
