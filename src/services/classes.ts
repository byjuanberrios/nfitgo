import { classes } from "@/data/classes";
import type { ClassItem } from "@/types";

export interface GetClassesFilters {
  category?: string;
  commune?: string;
  sportCenterId?: string;
}

export async function getClasses(
  filters: GetClassesFilters = {}
): Promise<ClassItem[]> {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set("category", filters.category);
  }
  if (filters.commune) {
    params.set("commune", filters.commune);
  }
  if (filters.sportCenterId) {
    params.set("sportCenterId", filters.sportCenterId);
  }

  const query = params.toString();
  const response = await fetch(`/api/classes${query ? `?${query}` : ""}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch classes");
  }

  return (await response.json()) as ClassItem[];
}

export async function getClassById(id: number): Promise<ClassItem | null> {
  // TODO: replace with fetch(`/api/classes/${id}`)
  return classes.find((c) => c.id === id) ?? null;
}

export async function getFeaturedClasses(): Promise<ClassItem[]> {
  // TODO: replace with fetch("/api/classes/featured")
  return classes.filter((c) => c.hasDiscount);
}
