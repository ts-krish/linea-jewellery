import { StaticImageData } from "next/image";

export type Product = {
  title: string;
  subtitle: string;
  price: number;
  image: StaticImageData;
  hoverImage: StaticImageData;
};
