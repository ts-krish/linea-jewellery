import { Aside } from "@/components/layout";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Aside />
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}