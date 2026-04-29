import { categories } from "@/data/categories";
import type { CategoryItem } from "@/types";

export async function getCategories(): Promise<CategoryItem[]> {
  return categories;
}

export async function getCategoryById(
  id: number
): Promise<CategoryItem | null> {
  return categories.find((c) => c.id === id) ?? null;
}
