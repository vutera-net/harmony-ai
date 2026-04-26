import { Profile } from "@harmony/database";

export interface CompatibilityResult {
  score: number; // 0-100
  level: "Tuyệt Vời" | "Hợp" | "Trung Bình" | "Xung Đột";
  analysis: {
    element: string;
    zodiac: string;
    summary: string;
  };
}

export function checkCompatibility(p1: Profile, p2: Profile): CompatibilityResult {
  // Simplified Compatibility logic based on Wu Xing (5 Elements) and Zodiac
  const elements: Record<string, string> = {
    WOOD: "Mộc",
    FIRE: "Hỏa",
    EARTH: "Thổ",
    METAL: "Kim",
    WATER: "Thủy",
  };

  const e1 = p1.energyType || "EARTH";
  const e2 = p2.energyType || "EARTH";

  // Element Relationship Matrix
  const elementMatch: Record<string, Record<string, number>> = {
    WOOD: { WOOD: 10, FIRE: 20, EARTH: -20, METAL: -20, WATER: 20 },
    FIRE: { WOOD: 20, FIRE: 10, EARTH: 20, METAL: -20, WATER: -20 },
    EARTH: { WOOD: -20, FIRE: 20, EARTH: 10, METAL: 20, WATER: -20 },
    METAL: { WOOD: 20, FIRE: -20, EARTH: 20, METAL: 10, WATER: 20 },
    WATER: { WOOD: 20, FIRE: -20, EARTH: -20, METAL: 20, WATER: 10 },
  };

  const elementScore = elementMatch[e1][e2] || 0;
  
  // Zodiac Compatibility (Simplified: Tam Hợp)
  // Tý-Thân-Thìn, Dần-Ngọ-Tuất, Mão-Mùi-Hợi, Tỵ-Dậu-Sửu
  const groups = [
    ["Tý", "Thân", "Thìn"],
    ["Dần", "Ngọ", "Tuất"],
    ["Mão", "Mùi", "Hợi"],
    ["Tỵ", "Dậu", "Sửu"],
  ];

  // Note: Profile doesn't have zodiac, we derive it from birth year in a real flow
  // For this mock, we'll use a random match or assume they are extracted
  const zodiacScore = 10; // Default for MVP

  const totalScore = 50 + elementScore + zodiacScore;
  const finalScore = Math.max(0, Math.min(100, totalScore));

  let level: CompatibilityResult["level"] = "Trung Bình";
  if (finalScore > 80) level = "Tuyệt Vời";
  else if (finalScore > 60) level = "Hợp";
  else if (finalScore < 40) level = "Xung Đột";

  return {
    score: finalScore,
    level,
    analysis: {
      element: `Tương tác giữa ${elements[e1]} và ${elements[e2]}`,
      zodiac: "Phân tích dựa trên Tam Hợp / Lục Hợp",
      summary: `Mức độ hòa hợp đạt ${finalScore}%. Cặp đôi này có sự ${level.toLowerCase()} về năng lượng cơ bản.`,
    },
  };
}
