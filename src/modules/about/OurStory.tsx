import { Separator } from "@/components/ui";
import founders from "@public/founder/founders.png";
import Image from "next/image";

const OurStory = () => {
  return (
      <div className="w-full">
        <div className="flex gap-5 flex-col ">
          <h1 className="text-5xl">Our Story</h1>
          <p className="text-black/70 text-lg">
            A journey of passion, craftsmanship, and timeless elegance
          </p>
        </div>
        <div className="py-20">
          <Separator />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative w-full aspect-square lg:h-200">
            <Image
              loading="lazy"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              src={founders}
              alt="founders"
            />
          </div>
          <div className="flex flex-col gap-5 justify-center ">
            <h2 className="text-2xl font-medium">Founded on Passion</h2>
            <p className="text-black/70">
              LINEA Jewelry was born from a shared vision of creating timeless
              pieces that transcend fleeting trends. Our founders, united by
              their passion for exceptional craftsmanship and sustainable
              practices, established the brand with a commitment to creating
              jewelry that tells a story - your story.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-10 md:mt-30 gap-10">
          <div className="text-3xl">
            <h2>Our Heritage</h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-xl ">
                Traditional Craftsmanship
              </h3>
              <p className="text-black/50">
                Every piece in our collection is meticulously handcrafted by
                skilled artisans who have honed their craft over generations. We
                honor traditional techniques while embracing modern innovation,
                ensuring each piece meets our exacting standards for quality and
                beauty.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-xl ">Sustainable Future</h3>
              <p className="text-black/50">
                We believe luxury and sustainability can coexist beautifully.
                Our commitment to ethical sourcing, recycled materials, and
                responsible manufacturing practices ensures that every piece you
                wear contributes to a more sustainable future.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-30">
          <div className="text-3xl mb-10">
            <h2>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-lg ">Excellence</h3>
              <p className="text-black/50">
                We pursue perfection in every detail, from the initial design
                concept to the final polish.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-xl ">Authenticity</h3>
              <p className="text-black/50">
                Each piece reflects genuine craftsmanship and tells an authentic
                story of artistry and care.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-medium text-lg ">Innovation</h3>
              <p className="text-black/50">
                We continuously evolve our designs and techniques while honoring
                timeless aesthetic principles.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OurStory;
