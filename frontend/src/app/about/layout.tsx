import { Aside } from "../../components/layout";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Aside />
      <section className="flex-1 w-full">
        <div className="md:pl-75 mt-10 pt-5 w-full px-5 md:px-20">
          {children}
        </div>
      </section>
    </div>
  );
}
