import { readAllSheets } from "@/lib/excel";
import { NextResponse } from "next/server";

export async function GET() {
  const data = readAllSheets("karty");
  
  if (!data) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }

  return NextResponse.json(data);
}
