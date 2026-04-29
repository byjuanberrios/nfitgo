import { sportCenters } from "@/data/sportcenters";
import { classes } from "@/data/classes";
import type { SportCenterItem, ClassItem } from "@/types";

export async function getSportCenters(): Promise<SportCenterItem[]> {
  // TODO: replace with fetch("/api/sport-centers")
  return sportCenters;
}

export async function getSportCenterById(
  id: string
): Promise<SportCenterItem | null> {
  // TODO: replace with fetch(`/api/sport-centers/${id}`)
  return sportCenters.find((sc) => sc.id === id) ?? null;
}

export async function getSportCenterClasses(
  sportCenterId: string
): Promise<ClassItem[]> {
  // TODO: replace with fetch(`/api/sport-centers/${sportCenterId}/classes`)
  return classes.filter((c) => c.sportCenter.id === sportCenterId);
}
