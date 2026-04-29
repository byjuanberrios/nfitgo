import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/parts/Footer";
import ProfileSidebar from "@/components/ProfileSidebar";

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrapper variant="solid" />
      <main className="flex-1 pt-20 lg:pt-24 pb-16 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw]">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start pt-4">
          <ProfileSidebar />
          <div className="w-full">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
