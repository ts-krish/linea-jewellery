import { Separator } from "../../components/ui";
const Sustainable = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl">Sustainibilty</h1>
        <p className="text-black/60 text-lg">
          Creating beautiful jewelry while protecting our planet for future
          generations
        </p>
      </div>
      <div className="py-20">
        <Separator />
      </div>
      <div>
        <div className="flex flex-col">
          <h2 className="text-3xl">Our Environmental Commitment</h2>
        </div>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <h3 className="text-lg">Ethical Sourcing</h3>
            <p className="text-black/60">
              We partner only with suppliers who share our commitment to ethical
              practices. Every gemstone and precious metal in our collection is
              sourced responsibly, with full transparency in our supply chain.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-lg">Recycled Materials</h3>
            <p className="text-black/60">
              Over 80% of our precious metals come from recycled sources,
              reducing the environmental impact of mining while maintaining the
              highest quality standards for our jewelry.
            </p>
          </div>
        </div>
      </div>
      <div className="my-20 py-10 pl-10">
        <div>
          <h3 className="text-3xl">Out Impect Goals</h3>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <h4 className="text-3xl">100%</h4>
            <p className="text-black/60">Carbon neutral operations by 2025</p>
          </div>
          <div>
            <h4 className="text-3xl">90%</h4>
            <p className="text-black/60">Recycled packaging materials</p>
          </div>
          <div>
            <h4 className="text-3xl">Zero</h4>
            <p className="text-black/60">Waste to landfill policy</p>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div>
          <h3 className="text-3xl">Circular Economy</h3>
          <p className="text-black/60 py-5">
            We believe in the power of circular design - creating jewelry that
            can be treasured, repaired, and eventually recycled into new pieces.
          </p>
        </div>
        <div className="grid grid-cols-1 mt-10 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p>Lifetime Care</p>
            <p className="text-black/60">
              Every piece comes with our lifetime care promise, including
              professional cleaning, repairs, and resizing services.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p>Take-Back Program</p>
            <p className="text-black/60">
              When you&apos;re ready for something new, we&apos;ll take back
              your LINEA jewelry to be recycled into future pieces.
            </p>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl">Certifications & Partnerships</h3>
          <p className="text-black/60">
            Our commitment to sustainability is verified through partnerships
            with leading organizations and certifications that hold us
            accountable to the highest standards.
          </p>
        </div>
        <div className="text-black/60 text-xs flex px-20 my-10 justify-between items-center">
          <span>RJC Certified</span>
          <span>B Corp</span>
          <span>SCS Certified</span>
          <span>Fair Trade</span>
        </div>
      </div>
    </div>
  );
};

export default Sustainable;
