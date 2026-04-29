import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/parts/Footer";

export default function ReservaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrapper variant="solid" />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
