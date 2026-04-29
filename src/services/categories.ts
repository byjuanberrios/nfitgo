import { categories } from "@/data/categories";
import type { CategoryItem } from "@/types";

export async function getCategories(): Promise<CategoryItem[]> {
  // TODO: replace with fetch("/api/categories") — note: icon is a client-side
  // mapping and won't come from the API; keep a local id→icon map after migration.
  return categories;
}

export async function getCategoryById(id: number): Promise<CategoryItem | null> {
  // TODO: replace with fetch(`/api/categories/${id}`)
  return categories.find((c) => c.id === id) ?? null;
}
