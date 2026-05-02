import { NextResponse } from "next/server";
import { calculateCanXuong } from "@harmony/astrology";

export async function POST(req: Request) {
  try {
    const { year, month, day, hourIdx } = await req.json();

    if (!year || !month || !day || hourIdx === undefined) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const result = calculateCanXuong(
      Number(year), 
      Number(month), 
      Number(day), 
      Number(hourIdx)
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
