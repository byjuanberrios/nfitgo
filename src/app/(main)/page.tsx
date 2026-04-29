import { getClasses, getCategories } from "@/services";
import FeaturedClassSlider from "@/components/FeaturedClassSlider";
import LatestClassesSlider from "@/components/LatestClassesSlider";
import SCBanner from "@/components/SCBanner";

export default async function Home() {
  const [classes, categories] = await Promise.all([
    getClasses(),
    getCategories(),
  ]);

  return (
    <main>
      <FeaturedClassSlider classes={classes} categories={categories} />
      <LatestClassesSlider classes={classes} />
      <SCBanner />
    </main>
  );
}
