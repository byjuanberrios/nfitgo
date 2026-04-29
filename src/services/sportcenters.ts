import { sportCenters } from "@/data/sportcenters";
import { classes } from "@/data/classes";
import type { SportCenterItem, ClassItem } from "@/types";

export async function getSportCenters(): Promise<SportCenterItem[]> {
  return sportCenters;
}

export async function getSportCenterById(
  id: string
): Promise<SportCenterItem | null> {
  return sportCenters.find((sc) => sc.id === id) ?? null;
}

export async function getClassesBySportCenter(
  sportCenterId: string
): Promise<ClassItem[]> {
  return classes.filter((c) => c.sportCenter.id === sportCenterId);
}
