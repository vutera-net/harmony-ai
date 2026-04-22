import { Profile, Element } from "@harmony/database";
import { getLunar } from "chinese-lunar-calendar";
import { calculateMenhCung, distributeStars, StarDistribution } from "./astrology-engine";

// Heavenly Stems (Thiên Can)
const heavenlyStems = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];

// Earthly Branches (Địa Chi / 12 Zodiac Animals)
const earthlyBranches = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

// Palace names (12 Tử Vi palaces)
const palaceNames = [
  "Mệnh",      // Life/Destiny
  "Anh Em",    // Siblings
  "Phu Thê",   // Marriage
  "Tài Lộc",   // Wealth
  "Con Cái",   // Children
  "Nô Tỳ",     // Servants/Employees
  "Tử Tù",     // Enemies/Adversaries
  "Cha Mẹ",    // Parents
  "Quan Lộc",  // Career/Authority
  "Phước Đức", // Merits/Blessing
  "Tình Duyên", // Romance/Relationships
  "Sức Khỏe",  // Health
];

// Element names in Vietnamese (Ngũ Hành)
const elementVN: Record<string, string> = {
  WOOD: "Mộc",
  FIRE: "Hỏa",
  EARTH: "Thổ",
  METAL: "Kim",
  WATER: "Thủy",
};

export interface ChartContext {
  name: string | null;
  gender: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthTime: string | null; // "HH:mm"
  birthLocation: string | null;
  zodiac: string; // Can chi năm sinh (e.g., "Ngọ", "Mùi")
  heavenlyStem: string; // Thiên Can
  earthlyBranch: string; // Địa Chi
  element: string; // Ngũ hành chủ (Kim/Mộc/Thủy/Hỏa/Thổ)
  palaces: Array<{
    name: string;
    element: string;
    description: string;
    stars: string[];
  }>;
  starDistribution: StarDistribution;
  summary: string;
}

/**
 * Build chart context from user's Profile
 * Deterministic Layer: converts DB data to structured chart info
 */
export function buildChartContext(profile: Profile): ChartContext {
  const birthDate = new Date(profile.birthDate);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  // Calculate birth hour as integer (1-12)
  let hour = 1;
  if (profile.birthTime) {
    const [h, m] = profile.birthTime.split(":").map(Number);
    // Map 24h to 12h (Tý=1, Sửu=2...)
    hour = Math.floor(h / 2) + 1;
    if (hour > 12) hour = 1;
  }

  // Get lunar calendar data
  const lunar = getLunar(year, month, day);

  // Calculate heavenly stem and earthly branch from birth year
  const stemIndex = (year - 1900) % 10;
  const branchIndex = (year - 1900) % 12;

  const heavenlyStem = heavenlyStems[stemIndex];
  const earthlyBranch = earthlyBranches[branchIndex];
  const zodiac = earthlyBranch; // Zodiac is the earthly branch

  // Determine primary element from db or derive from stem
  const element = profile.energyType
    ? elementVN[profile.energyType as Element]
    : derivePrimaryElement(stemIndex);

  // Advanced Astrology Calculation
  const menhCung = calculateMenhCung(month, hour);
  const starDistribution = distributeStars(menhCung, day, month);

  // Generate 12 palaces with element rotation and assigned stars
  const palaces = generatePalaces(branchIndex, element, starDistribution);

  // Generate summary text
  const summary = generateZodiacSummary(zodiac, earthlyBranch, element);

  return {
    name: profile.fullName || null,
    gender: profile.gender === "MALE" ? "Nam" : "Nữ",
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    birthTime: profile.birthTime || null,
    birthLocation: profile.birthLocation || null,
    zodiac,
    heavenlyStem,
    earthlyBranch,
    element,
    palaces,
    starDistribution,
    summary,
  };
}

/**
 * Derive primary element from heavenly stem
 * Stems are paired: Giáp/Ất=Mộc, Bính/Đinh=Hỏa, etc.
 */
function derivePrimaryElement(stemIndex: number): string {
  const elementMap: Record<number, string> = {
    0: "Mộc", // Giáp
    1: "Mộc", // Ất
    2: "Hỏa", // Bính
    3: "Hỏa", // Đinh
    4: "Thổ", // Mậu
    5: "Thổ", // Kỷ
    6: "Kim", // Canh
    7: "Kim", // Tân
    8: "Thủy", // Nhâm
    9: "Thủy", // Quý
  };
  return elementMap[stemIndex] || "Thổ";
}

/**
 * Generate 12 palaces with elements and stars
 */
function generatePalaces(
  branchIndex: number,
  primaryElement: string,
  stars: StarDistribution
): ChartContext["palaces"] {
  const elements = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
  const descriptions: Record<string, string> = {
    Mệnh: "Điểm định bản tính và vận mệnh sống cơ bản",
    "Anh Em": "Mối quan hệ với anh chị em ruột và bạn bè gần gũi",
    "Phu Thê": "Hôn nhân, tình yêu và quan hệ vợ chồng",
    "Tài Lộc": "Tiền bạc, sự giàu sang và cơ hội tài chính",
    "Con Cái": "Sức khỏe và tương lai của con em",
    "Nô Tỳ": "Mối quan hệ với cấp dưới, nhân viên và phụng tự",
    "Tử Tù": "Thư tung, phiền não và những thách thức",
    "Cha Mẹ": "Quan hệ với cha mẹ, ông bà và tổ tiên",
    "Quan Lộc": "Sự nghiệp, công việc và vị thế xã hội",
    "Phước Đức": "Phước báu, may mắn và những điều tốt lành",
    "Tình Duyên": "Tình cảm, hợp nhân duyên và quan hệ nhân sự",
    "Sức Khỏe": "Sức khoẻ thể chất và tinh thần",
  };

  return palaceNames.map((name, idx) => {
    const elementIdx = (branchIndex + idx) % 5;
    const palaceElement = elements[elementIdx];
    return {
      name,
      element: palaceElement,
      description: descriptions[name] || "",
      stars: stars[name] || [],
    };
  });
}

/**
 * Generate zodiac personality summary
 */
function generateZodiacSummary(zodiac: string, branch: string, element: string): string {
  const summaries: Record<string, string> = {
    Tý: "Sinh năm Tý: Cá tính nhạy cảm, thông minh, có óc sáng tạo. Những người tuổi Tý tuy ngoài hình dung yên tĩnh nhưng sâu bên trong là những người có lý tưởng lớn.",
    Sửu: "Sinh năm Sửu: Tính cách chắc chắn, kiên định, trung thực. Công việc cần kiên nhẫn, những người tuổi Sửu có khả năng gânh vác trách nhiệm lớn.",
    Dần: "Sinh năm Dần: Can đảm, quyết đoán, có tinh thần lãnh đạo. Những người tuổi Dần luôn sẵn sàng đối mặt thách thức và tiên phong trong công việc.",
    Mão: "Sinh năm Mão: Tính nhẫn nại, khéo léo, đầu óc linh hoạt. Những người tuổi Mão có tài ngoại giao tốt, luôn biết tìm ra lối thoát.",
    Thìn: "Sinh năm Thìn: Tràn đầy năng lượng, phóng khoáng, có tham vọng. Những người tuổi Thìn là những người mơ mộng lớn và dám chỉnh chu.",
    Tỵ: "Sinh năm Tỵ: Sâu sắc, bí ẩn, khôn ngoan. Những người tuổi Tỵ có trực giác tốt, biết cách che giấu cảm xúc thật sự.",
    Ngọ: "Sinh năm Ngọ: Nhiệt tình, hoạt bát, yêu tự do. Những người tuổi Ngọ không yêu ràng buộc, luôn tìm cách thoát khỏi những giới hạn.",
    Mùi: "Sinh năm Mùi: Hiền lành, chu đáo, thích hòa hợp. Những người tuổi Mùi có trái tim nhân hậu, luôn lo lắng cho người khác.",
    Thân: "Sinh năm Thân: Linh hoạt, hóm hỉnh, yêu vui vẻ. Những người tuổi Thân có tài ngoại giao, dễ kết bạn và thích thích học hỏi.",
    Dậu: "Sinh năm Dậu: Trung thực, tự tin, có nguyên tắc. Những người tuổi Dậu không bao giờ thất bại vì họ tin vào sức mạnh nội tâm.",
    Tuất: "Sinh năm Tuất: Trung thực, tận tâm, có tinh thần tập thể. Những người tuổi Tuất là những người bạn tốt, luôn sẵn sàng giúp đỡ.",
    Hợi: "Sinh năm Hợi: Chân thành, hồn nhiên, yêu thích hòa bình. Những người tuổi Hợi có lòng nhân hậu, không bao giờ kỳ thị ai.",
  };

  return summaries[zodiac] || `Sinh năm ${zodiac}: Một con người độc đáo với những đặc điểm riêng.`;
}

/**
 * Format chart context into readable string for system prompt
 * Now including detailed star distribution
 */
export function formatChartForPrompt(ctx: ChartContext): string {
  const palaceList = ctx.palaces
    .map((p) => `• ${p.name} (${p.element}): ${p.description} | Chính tinh: ${p.stars.join(", ") || "Không có"}`)
    .join("\n");

  return `=== LÁ SỐ CHUYÊN SÂU ===
Tên: ${ctx.name || "Người dùng"}
Giới tính: ${ctx.gender}
Ngày sinh: ${ctx.birthDay}/${ctx.birthMonth}/${ctx.birthYear}
${ctx.birthTime ? `Giờ sinh: ${ctx.birthTime}` : "Giờ sinh: không xác định"}
${ctx.birthLocation ? `Nơi sinh: ${ctx.birthLocation}` : ""}

Can Chi Năm Sinh: ${ctx.heavenlyStem} ${ctx.earthlyBranch} (${ctx.zodiac})
Ngũ Hành Chủ: ${ctx.element}

TÓM TẮT TÍNH CÁCH:
${ctx.summary}

CHI TIẾT CÁC CUNG VÀ CHÍNH TINH:
${palaceList}`;
}
