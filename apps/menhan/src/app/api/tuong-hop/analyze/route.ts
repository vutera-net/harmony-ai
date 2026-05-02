import { NextResponse } from "next/server";
import { calculateTuongHop } from "@harmony/astrology";

export async function POST(req: Request) {
  try {
    const { year1, gender1, year2, gender2 } = await req.json();

    if (!year1 || !gender1 || !year2 || !gender2) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const result = calculateTuongHop(
      Number(year1), 
      gender1 as "male" | "female", 
      Number(year2), 
      gender2 as "male" | "female"
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
