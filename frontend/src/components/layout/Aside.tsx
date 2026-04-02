"use client";

import { MENUS } from "../../lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = () => {
  const aboutMenu = MENUS[2];
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden md:block sticky top-24 h-fit p-6">
      <h2 className="text-lg tracking-wider mb-7">{aboutMenu.title.name}</h2>

      <ul className="space-y-3">
        {aboutMenu.items.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  relative inline-block text-sm transition-colors duration-200
                  ${isActive ? "text-black font-medium" : "text-black/50 hover:text-black"}

                  after:content-['']
                  after:absolute
                  after:left-0
                  after:-bottom-1

                  
                  after:bg-black
                  after:transition-all
                  after:duration-300
                  
                  ${isActive ? "after:h-0.5" : "after:h-px"}
                  ${isActive ? "after:w-full" : "after:w-0"}

                  hover:after:w-full
                `}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
