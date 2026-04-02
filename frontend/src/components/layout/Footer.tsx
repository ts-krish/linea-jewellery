import Link from "next/link";
import { Separator } from "../ui";

const SHOP_MENU = [
  {
    title: "Shop",
    links: [
      { name: "New in", href: "/category/new-in" },
      { name: "Rings", href: "/category/rings" },
      { name: "Earrings", href: "/category/earrings" },
      { name: "Bracelets", href: "/category/bracelets" },
      { name: "Necklaces", href: "/category/necklaces" },
    ],
  },
];

const SUPPORT_MENU = [
  {
    title: "Support",
    links: [
      { name: "Size Guide", href: "/" },
      { name: "Care Instructions", href: "/" },
      { name: "Returns", href: "/" },
      { name: "Shipping", href: "/" },
      { name: "Contact", href: "/" },
    ],
  },
];

const CONNECT_MENU = [
  {
    title: "Connect",
    links: [
      { name: "Instagram", href: "/" },
      { name: "Pintrest", href: "/" },
      { name: "Newsletter", href: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-10 md:mt-50">
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-5 py-10">
        <div className="">
          <div className="flex flex-col mb-5 gap-5">
            <h2 className="text-2xl ">Linea Jewelry Inc.</h2>
            <p className="text-black/70 text-sm">
              Minimalist jewelry crafted for the modern individual
            </p>
          </div>
          <div>
            <div className="flex flex-col mb-5 gap-2">
              <span className="text-sm font-bold">Visit Us</span>
              <p className="text-sm text-black/70 font-light">
                123 Madison Avenue <br /> New York, NY 10016
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold">Contact</span>
              <p className="text-sm text-black/70 font-light">
                +1 (212) 555-0123 <br /> hello@lineajewelry.com
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[SHOP_MENU[0], SUPPORT_MENU[0], CONNECT_MENU[0]].map((section) => (
            <div
              key={section.title}
              className="flex flex-col font-semibold gap-3"
            >
              <h3>{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/70 font-light hover:text-foreground transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex text-sm flex-col items-center md:flex-row py-2 px-5 md:justify-between">
        <div>
          <p>© 2024 Linea. All rights reserved.</p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
          <Link href={"/terms-of-service"}>Terms of Services</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
