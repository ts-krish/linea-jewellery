import { MENUS } from "@/lib/navigation";
import logo from "@/public/navbar/LINEA-1.svg";
import { Handbag, Heart, Search } from "lucide-react";
import Image from "next/image";
import HoverMenu from "./HoverMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <header>
      <nav className="w-full relative">
        <div className="grid grid-cols-3 items-center p-5">
          <div className="flex">
            <div className="lg:hidden">
              <MobileMenu />
            </div>
            <div className="hidden gap-8 font-dm-sans md:flex">
              {MENUS.map((menu) => (
                <HoverMenu key={menu.title.name} menu={menu} />
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
