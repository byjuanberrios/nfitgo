import Header from "@/parts/Header";
import Footer from "@/parts/Footer";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
