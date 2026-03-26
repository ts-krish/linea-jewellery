"use client";

import { Menu } from "@/types";
import Image from "next/image";
import Link from "next/link";

const HoverMenu = ({ menu }: { menu: Menu }) => {
  return (
    <div className="group inline-block">
      <Link href={menu.title.href} className="py-2">
        {menu.title.name}
      </Link>

      <div className="absolute left-0 top-full -mt-5 pt-4 w-full hidden group-hover:block bg-white shadow-lg">
        <div className="mx-auto w-full grid grid-cols-3 gap-5 p-10">
          <div className="flex flex-col gap-4">
            {menu.items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-blue-500"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className={`grid col-span-2 grid-cols-2 gap-1`}>
            {menu.images?.map((img, i) => (
              <div
                key={i}
                className={`relative aspect-4/3 w-90/100 ${
                  menu.images?.length === 1 ? "col-start-2" : ""
                }`}
              >
                <Image
                  src={img}
                  alt="menu image"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverMenu;
