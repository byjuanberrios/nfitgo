import Header from "@/parts/Header";
import Footer from "@/parts/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="transparent" />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
