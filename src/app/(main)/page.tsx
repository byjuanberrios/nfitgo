import FeaturedClassSlider from "@/components/FeaturedClassSlider";
import LatestClassesSlider from "@/components/LatestClassesSlider";
import SCBanner from "@/components/SCBanner";

export default function Home() {
  return (
    <main>
      <FeaturedClassSlider />
      <LatestClassesSlider />
      <SCBanner />
    </main>
  );
}
