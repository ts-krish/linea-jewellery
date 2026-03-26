import { Button } from "@/components/ui";
import founders from "@public/founder/founders.png";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section>
      <div className="grid gap-5 mx-5 md:grid-cols-2">
        <div className="flex flex-col gap-5 order-2 md:order-1 items-start justify-center">
          <h2 className="font-semibold text-lg">Jewelry Drawn From Shadows and Lines</h2>
          <p>
            Linea was born from the meeting of two minds who saw beauty not just
            in ornament, but in structure. With backgrounds spanning
            architecture and fine arts, the founders believed that jewelry could
            be more than decoration — it could be an extension of space, light,
            and line.
          </p>
          <Button variant={"link"}>Read our full story </Button>
        </div>
        <div className="order-1">
          <Image src={founders} alt="founders" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
