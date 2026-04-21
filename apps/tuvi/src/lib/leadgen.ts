import { getZodiacSlug } from "./seo";

/**
 * Generate a personalized AI Hook (teaser text) based on zodiac and luck/challenge areas
 */
export function generateAIHook(
  zodiac: string,
  luckAreas: string[],
  challengeAreas: string[]
): string {
  const hookTemplates: Record<string, string> = {
    Tý: `Người tuổi Tý thường giỏi phân tích — nhưng có một điểm mù trong ${challengeAreas[0]?.toLowerCase() || "tài chính"} mà rất ít người nhận ra ở bạn. Lá số đầy đủ tiết lộ điều này.`,
    Sửu: `Sự kiên trì của tuổi Sửu là sức mạnh — nhưng lá số tiết lộ thời điểm ${luckAreas[0]?.toLowerCase() || "bứt phá"} thật sự của bạn là khi nào.`,
    Dần: `Tuổi Dần có sức mạnh tự nhiên, nhưng hành động mà bạn định làm trong ${luckAreas[0]?.toLowerCase() || "sự nghiệp"} sắp tới có một mối liên hệ bí mật với ${challengeAreas[0]?.toLowerCase() || "tình cảm"}.`,
    Mão: `Tuổi Mão yêu tự do, nhưng lá số hé lộ điều mà bạn đang bỏ lỡ về ${luckAreas[1]?.toLowerCase() || "mối quan hệ"} — một điều ít người nhận ra.`,
    Thìn: `Tuổi Thìn đầy năng lượng, nhưng có một mục tiêu trong ${luckAreas[0]?.toLowerCase() || "sự nghiệp"} mà chỉ có thể đạt được nếu bạn hiểu rõ ${challengeAreas[0]?.toLowerCase() || "tài chính"}.`,
    Tỵ: `Tuổi Tỵ sâu sắc, nhưng lá số tiết lộ một phát hiện về bản thân bạn trong lĩnh vực ${luckAreas[0]?.toLowerCase() || "tâm linh"} — điều này sẽ thay đổi cách bạn nhìn nhân sự.`,
    Ngọ: `Tuổi Ngọ rực rỡ trong ${luckAreas[0]?.toLowerCase() || "giao tiếp"} — nhưng lá số lộ một bí mật sâu hơn về ${challengeAreas[0]?.toLowerCase() || "sức khỏe"} của bạn.`,
    Mùi: `Tuổi Mùi chân thành, nhưng có một quyết định quan trọng trong ${luckAreas[0]?.toLowerCase() || "gia đình"} mà bạn cần hiểu rõ ${challengeAreas[0]?.toLowerCase() || "tài chính"}.`,
    Thân: `Tuổi Thân linh hoạt, nhưng có một mục tiêu trong ${luckAreas[0]?.toLowerCase() || "học tập"} mà lá số tiết lộ chính xác khi nào là thời điểm vàng.`,
    Dậu: `Tuổi Dậu cẩn thận, nhưng lá số hé lộ điều bạn đang kiểm soát quá chặt trong ${challengeAreas[0]?.toLowerCase() || "mối quan hệ"}.`,
    Tuất: `Tuổi Tuất trung thành, nhưng có một sự thay đổi tích cực sắp tới trong ${luckAreas[0]?.toLowerCase() || "gia đình"} — lá số tiết lộ thời điểm chính xác.`,
    Hợi: `Tuổi Hợi hòa nhân, nhưng lá số lộ một mục tiêu ẩn sâu trong ${luckAreas[1]?.toLowerCase() || "tâm linh"} mà bạn chưa hoàn toàn nhận ra.`,
  };

  return (
    hookTemplates[zodiac] ||
    `Lá số của người tuổi ${zodiac} có một bí mật trong ${luckAreas[0]?.toLowerCase() || "vận mệnh"} — hãy khám phá chi tiết đầy đủ.`
  );
}

/**
 * Build the MenhAn redirect URL with context parameters
 */
export function buildMenhAnUrl(
  zodiac: string,
  birthYear: number,
  source: string
): string {
  const baseUrl = "https://menhan.vutera.net";
  const zodiacSlug = getZodiacSlug(zodiac);
  const currentYear = new Date().getFullYear();

  const params = new URLSearchParams({
    zodiac: zodiacSlug,
    year: birthYear.toString(),
    currentYear: currentYear.toString(),
    ref: "tuvi",
    utm_source: "tuvi",
    utm_medium: "lead-form",
    utm_campaign: source,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
