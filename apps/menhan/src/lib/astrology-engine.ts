/**
 * Astrology Engine - Deterministic Layer for Tử Vi Đẩu Số
 * This implements the core calculations for star distribution.
 */

export type MainStar = 
  | "Tử Vi" | "Thiên Phủ" | "Vũ Khúc" | "Thái Dương" | "Thái Âm" 
  | "Thiên Cơ" | "Thiên Đồng" | "Liêm Trinh" | "Thiên Tướng" | "Thiên Lương" 
  | "Cự Môn" | "Tham Lang" | "Thất Sát" | "Phá Quân";

export interface StarDistribution {
  [palace: string]: MainStar[];
}

/**
 * Calculate the Mệnh cung (Destiny Palace) position
 * Based on birth month and birth hour.
 * Formula: (Month - Hour) logic (simplified for MVP but mathematically based)
 */
export function calculateMenhCung(month: number, hour: number): number {
  // month: 1-12, hour: 1-12 (Tý=1, Sửu=2...)
  // Standard formula: Start at Dần (3), move clockwise by month, then counter-clockwise by hour.
  let position = 3 + (month - 1);
  position = position - (hour - 1);
  
  // Normalize to 1-12 (1=Tý, 2=Sửu... 12=Hợi)
  let normalized = (position - 1) % 12;
  if (normalized < 0) normalized += 12;
  return normalized + 1;
}

/**
 * Distribute 14 main stars across 12 palaces
 * In a real system, this uses complex tables. For MVP, we use the core distribution patterns.
 */
export function distributeStars(menhCung: number, birthDay: number, birthMonth: number): StarDistribution {
  const palaces = [
    "Mệnh", "Anh Em", "Phu Thê", "Tài Lộc", "Con Cái", "Nô Tỳ", 
    "Tử Tù", "Cha Mẹ", "Quan Lộc", "Phước Đức", "Tình Duyên", "Sức Khỏe"
  ];
  
  const distribution: StarDistribution = {};
  palaces.forEach(p => distribution[p] = []);

  // Core logic for Tử Vi star (The Emperor)
  // Position is based on birth day and menh cung
  const tuViPos = (menhCung + (birthDay % 12)) % 12 || 12;
  const tuViPalaceIdx = (tuViPos - 1 + 12) % 12; // simplified mapping to palace array
  
  // Map stars to palaces based on traditional relative positions to Tử Vi
  // This is a simplified deterministic model for MVP
  const stars = [
    { name: "Tử Vi", offset: 0 },
    { name: "Thiên Phủ", offset: 4 },
    { name: "Vũ Khúc", offset: 2 },
    { name: "Thái Dương", offset: 6 },
    { name: "Thái Âm", offset: 8 },
    { name: "Thiên Cơ", offset: 1 },
    { name: "Thiên Đồng", offset: 3 },
    { name: "Liêm Trinh", offset: 5 },
    { name: "Thiên Tướng", offset: 7 },
    { name: "Thiên Lương", offset: 9 },
    { name: "Cự Môn", offset: 11 },
    { name: "Tham Lang", offset: 10 },
    { name: "Thất Sát", offset: 12 },
    { name: "Phá Quân", offset: 13 },
  ] as const;

  stars.forEach(star => {
    // Calculate宫 vị based on tuViPos and offset
    const starPos = (tuViPos + star.offset - 1) % 12 + 1;
    // Map the calculated position to the 12 palaces relative to Mệnh
    const palaceIdx = (starPos - menhCung + 12) % 12;
    const palaceName = palaces[palaceIdx];
    distribution[palaceName].push(star.name as MainStar);
  });

  return distribution;
}
