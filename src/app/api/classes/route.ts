import { NextRequest, NextResponse } from "next/server";
import { classes } from "@/data/classes";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const commune = searchParams.get("commune");
  const sportCenterId = searchParams.get("sportCenterId");

  // TODO: replace with real DB query
  let result = classes;

  if (category) {
    result = result.filter((c) => c.category === category);
  }
  if (commune) {
    result = result.filter((c) => c.sportCenter.commune === commune);
  }
  if (sportCenterId) {
    result = result.filter((c) => c.sportCenter.id === sportCenterId);
  }

  return NextResponse.json(result);
}
