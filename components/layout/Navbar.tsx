import logo from "@/public/navbar/LINEA-1.svg";
import { Handbag, Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const nav_links = [
  { name: "Shop", href: "/shop" },
  { name: "New In", href: "/new-in" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  return (
    <header>
      <nav className="w-full">
        <div className="grid grid-cols-3 items-center p-5">
          <div className="flex">
            <div className="lg:hidden">
              <MobileMenu />
            </div>
            <div className="hidden gap-5 font-dm-sans md:flex">
              {nav_links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Image src={logo} alt="LINEA logo" width={90} priority />
          </div>
          <div className="flex justify-end gap-5">
            <Search />
            <Heart className="hidden md:block" />
            <Handbag />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
