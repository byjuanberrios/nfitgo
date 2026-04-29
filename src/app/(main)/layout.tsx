import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/parts/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrapper variant="transparent" />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
