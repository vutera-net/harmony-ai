import { Profile } from "@harmony/database";
import {
  solarToLunar,
  generateTuViChart,
  calculateBatTu,
  THIEN_CAN,
  DIA_CHI
} from "@harmony/astrology";

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
  starDistribution: Record<string, string[]>;
  summary: string;
  batTu?: any; // Bát Tự data
}

/**
 * Build chart context from user's Profile
 * Deterministic Layer: converts DB data to structured chart info
 */
export function buildChartContext(profile: Profile): ChartContext {
  if (!profile.birthDate) {
    throw new Error("Birth date is required to build chart context");
  }
  const birthDate = new Date(profile.birthDate);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  // Calculate birth hour as integer (0-11)
  let birthHourChi = 0;
  if (profile.birthTime) {
    const [h, m] = profile.birthTime.split(":").map(Number);
    if (h === 23) {
      birthHourChi = 0;
    } else {
      birthHourChi = Math.floor((h + 1) / 2) % 12;
    }
  }

  // Get lunar calendar data
  const lunarDate = solarToLunar(day, month, year);

  // Generate full Tu Vi chart
  const gender = profile.gender === "MALE" ? "male" : "female";
  const tuViChart = generateTuViChart(
    profile.fullName || "User",
    gender,
    lunarDate,
    birthHourChi
  );

  // Generate Bat Tu result
  const batTu = calculateBatTu(birthDate);

  const heavenlyStem = THIEN_CAN[lunarDate.canYear];
  const earthlyBranch = DIA_CHI[lunarDate.chiYear];
  const zodiac = earthlyBranch;

  // Map TuViChart to ChartContext
  const starDistribution: Record<string, string[]> = {};
  tuViChart.palaces.forEach(p => {
    starDistribution[p.name] = p.mainStars.map(s => s.name);
  });

  // Generate 12 palaces with element rotation and assigned stars
  const palaces = generatePalaces(lunarDate.chiYear, tuViChart.menh, starDistribution);

  // Generate summary text
  const summary = generateZodiacSummary(zodiac, earthlyBranch, tuViChart.menh);

  return {
    name: profile.fullName || null,
    gender: gender === "male" ? "Nam" : "Nữ",
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    birthTime: profile.birthTime || null,
    birthLocation: profile.birthLocation || null,
    zodiac,
    heavenlyStem,
    earthlyBranch,
    element: tuViChart.menh,
    palaces,
    starDistribution,
    summary,
    batTu,
  };
}

/**
 * Generate 12 palaces with elements and stars
 */
function generatePalaces(
  branchIndex: number,
  primaryElement: string,
  stars: Record<string, string[]>
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
