import { Suspense } from "react";
import { getClasses, getCategories } from "@/services";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
  const [classes, categories] = await Promise.all([
    getClasses(),
    getCategories(),
  ]);

  return (
    <Suspense>
      <ExploreClient classes={classes} categories={categories} />
    </Suspense>
  );
}
