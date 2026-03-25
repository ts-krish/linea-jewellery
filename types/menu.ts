import { StaticImageData } from "next/image";

export type MenuItem = {
  name: string;
  href: string;
};

export type Menu = {
  title: MenuItem;
  items: MenuItem[];
  images?: StaticImageData[];
};
