import circular_collection from "@public/lifestyle/circular-collection.png";
import orgenic_earring from "@public/lifestyle/orgenic_earring.png";
import Image from "next/image";

const LifeStyleSection = () => {
  return (
    <section className="px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 items-start">
        <div className="md:col-span-2 flex flex-col group">
          <div className="relative w-full aspect-3/4 overflow-hidden">
            <Image
              src={orgenic_earring}
              alt="Artisan Craft"
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-250"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm">Artisan Craft</h3>
            <p className="text-sm mt-2 text-gray-500">
              Handcrafted pieces with meticulous attention to detail.
            </p>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col group">
          <div className="relative w-full aspect-3/4 md:aspect-152/100 overflow-hidden bg-gray-100">
            <Image
              src={circular_collection}
              alt="Circular Elements"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-250"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold">Circular Elements</h3>
            <p className="text-sm mt-2 text-gray-500">
              Geometric perfection meets contemporary minimalism in our latest
              collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeStyleSection;
