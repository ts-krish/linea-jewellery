import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui";

import { MENUS } from "../../lib/navigation";

const MobileMenu = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            {MENUS.map((menu) => (
              <div key={menu.title.name}>
                <SheetTitle>
                  <Link href={menu.title.href}>{menu.title.name}</Link>
                </SheetTitle>

                <div className="my-6 space-y-4">
                  {menu.items.map((item) => (
                    <Link key={item.name} href={item.href} className="block">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
