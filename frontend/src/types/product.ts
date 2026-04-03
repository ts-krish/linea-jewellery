import { StaticImageData } from "next/image";

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: StaticImageData | string;
  hoverImage: StaticImageData | string;
};
