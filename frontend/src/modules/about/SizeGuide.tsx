import {
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "../../components/ui";

const sizeData = [
  { us: "5", uk: "J", eu: "49", diameter: "15.6", circumference: "49.0" },
  { us: "5.5", uk: "K", eu: "50", diameter: "16.0", circumference: "50.2" },
  { us: "6", uk: "L", eu: "51", diameter: "16.4", circumference: "51.5" },
  { us: "6.5", uk: "M", eu: "52", diameter: "16.8", circumference: "52.8" },
  { us: "7", uk: "N", eu: "54", diameter: "17.2", circumference: "54.0" },
  { us: "7.5", uk: "O", eu: "55", diameter: "17.6", circumference: "55.3" },
  { us: "8", uk: "P", eu: "56", diameter: "18.0", circumference: "56.5" },
  { us: "8.5", uk: "Q", eu: "57", diameter: "18.4", circumference: "57.8" },
  { us: "9", uk: "R", eu: "59", diameter: "18.8", circumference: "59.1" },
];

const SizeGuide = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl">Size Guide</h1>
        <p className="text-black/60">
          Find your perfect fit with our comprehensive sizing guide
        </p>
      </div>
      <div className="py-20">
        <Separator />
      </div>
      <div>
        <div>
          <h2 className="text-4xl mb-20">Ring Sizing</h2>
        </div>
        <div className="pl-10">
          <div>
            <h2 className="text-xl">How To Measure Your Ring Size</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h4 className="font-semibold pt-10 py-5">
                Method 1: Using a Ring You Own
              </h4>
              <ol className="text-black/60 list-inside list-decimal space-y-2">
                <li>
                  Take a ring that fits comfortably on your desired finger
                </li>
                <li>
                  Place it on a ruler and measure the inner diameter in
                  millimeters
                </li>
                <li>Use our size chart below to find your size</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold pt-10 py-5">
                Method 2: Using String or Paper
              </h4>
              <ol className="text-black/60 list-inside list-decimal space-y-2">
                <li>
                  Wrap string or paper around your finger where the ring will
                  sit
                </li>
                <li>Mark where the material overlaps</li>
                <li>Measure the length in millimeters</li>
                <li>Divide by 3.14 to get the diameter</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-10 overflow-x-auto">
        <Table>
          <TableHeader className="py-5 text-lg">
            <TableRow>
              <TableHead>US Size</TableHead>
              <TableHead>UK Size</TableHead>
              <TableHead>EU Size</TableHead>
              <TableHead>Diameter (mm)</TableHead>
              <TableHead>Circumference (mm)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="py-5 text-lg">
            {sizeData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.us}</TableCell>
                <TableCell>{row.uk}</TableCell>
                <TableCell>{row.eu}</TableCell>
                <TableCell>{row.diameter}</TableCell>
                <TableCell>{row.circumference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-30">
        <div className="text-3xl my-10">
          <h3>Bracelet & Necklace Sizing</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-5">
            <h4 className="text-2xl">Bracelet Sizes</h4>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Small</span>
              <span>6.5&quot; - 7&quot;</span>
            </div>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Medium</span>
              <span>7&quot; - 7.5&quot;</span>
            </div>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Large</span>
              <span>7.5&quot; - 8&quot;</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-2xl">Necklace Lengths</h4>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Choker</span>
              <span>14&quot; - 16&quot;</span>
            </div>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Princess</span>
              <span>17&quot; - 19&quot;</span>
            </div>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Matinee</span>
              <span>20&quot; - 24&quot;</span>
            </div>
            <div className="flex pb-3 justify-between border-b border-b-black/10">
              <span className="text-black/60">Opera</span>
              <span>28&quot; - 36&quot;</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="text-3xl flex flex-col gap-5">
          <h3>Need Help?</h3>
          <p className="text-base text-black/60">
            Still unsure about sizing? Our jewelry consultants are here to help
            you find the perfect fit. Download our printable size guide or
            schedule a virtual consultation.
          </p>
        </div>
        <div className="flex my-5 gap-3">
          <Button
            className="py-3 font-extrabold bg-white ring ring-gray-500 rounded-none"
            variant={"secondary"}
          >
            Download PDF Guide
          </Button>
          <Button className="rounded-none">Schedule Consultation</Button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
