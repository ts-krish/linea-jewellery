import fashion from "@public/fashion/fashion.png";
import Image from "next/image";

const FashionSection = () => {
  return (
    <section>
      <div className="mx-5">
        <div className="lg:h-210 overflow-hidden">
          <Image className="object-cover" src={fashion} alt="fashion-image" />
        </div>
        <div className="my-5">
          <h3 className="font-bold text-sm">Modern Heritage</h3>
          <p className="text-sm">Contemporary jewelry crafted with timeless elegance</p>
        </div>
      </div>
    </section>
  );
};

export default FashionSection;
