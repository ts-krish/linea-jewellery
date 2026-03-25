import earings from "@/public/hero/earrings-collection.png";
import bracelet from "@/public/hero/link-bracelet.png";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <div className="grid grid-rows-2 gap-5 mx-8 mt-5 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden mb-5">
            <Image
              src={earings}
              alt="earning-image"
              priority
              className="cursor-pointer transition-transform duration-230 ease-in-out hover:scale-105"
            />
          </div>
          <div>
            <h3 className="font-semibold">Organic Forms</h3>
            <p>Nature-inspired pieces with fluid, sculptural details</p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden mb-5">
            <Image
              src={bracelet}
              alt="bracelet-image"
              priority
              className="cursor-pointer transition-transform duration-230 ease-in-out hover:scale-105"
            />
          </div>
          <div>
            <h3 className="font-semibold">Chain Collection</h3>
            <p>Refined links and connections in precious metals</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
