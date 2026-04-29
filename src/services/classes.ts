import { classes } from "@/data/classes";
import type { ClassItem } from "@/types";

export interface GetClassesFilters {
  category?: string;
  commune?: string;
  sportCenterId?: string;
}

export async function getClasses(
  filters: GetClassesFilters = {},
): Promise<ClassItem[]> {
  let result = classes;

  if (filters.category) {
    result = result.filter((c) => c.category === filters.category);
  }
  if (filters.commune) {
    result = result.filter((c) => c.sportCenter.commune === filters.commune);
  }
  if (filters.sportCenterId) {
    result = result.filter((c) => c.sportCenter.id === filters.sportCenterId);
  }

  return result;
}

export async function getClassById(id: number): Promise<ClassItem | null> {
  // TODO: replace with fetch(`/api/classes/${id}`)
  return classes.find((c) => c.id === id) ?? null;
}

export async function getFeaturedClasses(): Promise<ClassItem[]> {
  // TODO: replace with fetch("/api/classes/featured")
  return classes.filter((c) => c.hasDiscount);
}
