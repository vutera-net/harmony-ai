import { NextResponse } from "next/server";
import { calculateBatTu } from "@harmony/astrology";

const HANH_MAP: Record<string, string> = {
  Kim: "Kim",
  Moc: "Mộc",
  Thuy: "Thủy",
  Hoa: "Hỏa",
  Tho: "Thổ",
};

export async function POST(req: Request) {
  try {
    const { date, time } = await req.json();

    if (!date || !time) {
      return NextResponse.json({ error: "Missing date or time" }, { status: 400 });
    }

    const [y, m, d] = date.split("-").map(Number);
    const [hr, min] = time.split(":").map(Number);
    const birthDate = new Date(y, m - 1, d, hr, min);

    const result = calculateBatTu(birthDate);

    // Map English NguHanh to Vietnamese for UI
    const mapPillar = (p: any) => ({
      can: p.can,
      chi: p.chi,
      canHanh: HANH_MAP[p.canHanh] || p.canHanh,
      chiHanh: HANH_MAP[p.chiHanh] || p.chiHanh,
    });

    const mapCount = (count: any) => {
      const newCount: any = {};
      for (const h in count) {
        newCount[HANH_MAP[h] || h] = count[h];
      }
      return newCount;
    };

    const mapArray = (arr: string[]) => arr.map(h => HANH_MAP[h] || h);

    return NextResponse.json({
      year: mapPillar(result.year),
      month: mapPillar(result.month),
      day: mapPillar(result.day),
      hour: mapPillar(result.hour),
      nguHanhCount: mapCount(result.nguHanhCount),
      khuyet: mapArray(result.khuyet),
      vuong: mapArray(result.vuong),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
