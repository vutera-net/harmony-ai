import { getCanChiYear } from './data/can-chi'

export interface CanXuongResult {
  luong: number;
  chi: number;
  total: string;
  reading: string;
  interpretation: string;
  title: string;
  level: "excellent" | "good" | "neutral" | "challenging";
}

const YEAR_WEIGHTS: Record<string, number> = {
  "Giáp Tý": 1.2, "Ất Sửu": 0.9, "Bính Dần": 0.6, "Đinh Mão": 0.7,
  "Mậu Thìn": 1.2, "Kỷ Tỵ": 0.5, "Canh Ngọ": 0.9, "Tân Mùi": 0.8,
  "Nhâm Thân": 0.7, "Quý Dậu": 0.8, "Giáp Tuất": 1.5, "Ất Hợi": 0.9,
  "Bính Tý": 1.6, "Đinh Sửu": 0.8, "Mậu Dần": 0.8, "Kỷ Mão": 1.9,
  "Canh Thìn": 1.2, "Tân Tỵ": 0.6, "Nhâm Ngọ": 0.8, "Quý Mùi": 0.7,
  "Giáp Thân": 1.7, "Ất Dậu": 0.9, "Bính Tuất": 0.6, "Đinh Hợi": 0.8,
  "Mậu Tý": 1.0, "Kỷ Sửu": 0.6, "Canh Dần": 1.7, "Tân Mão": 0.9,
  "Nhâm Thìn": 1.6, "Quý Tỵ": 0.5, "Giáp Ngọ": 1.1, "Ất Mùi": 0.7,
  "Bính Thân": 0.9, "Đinh Dậu": 0.6, "Mậu Tuất": 0.8, "Kỷ Hợi": 1.0,
  "Canh Tý": 1.5, "Tân Sửu": 0.8, "Nhâm Dần": 0.7, "Quý Mão": 0.9,
  "Giáp Thìn": 1.2, "Ất Tỵ": 0.5, "Bính Ngọ": 1.4, "Đinh Mùi": 0.7,
  "Mậu Thân": 1.1, "Kỷ Dậu": 0.8, "Canh Tuất": 1.1, "Tân Hợi": 0.8,
  "Nhâm Tý": 1.3, "Quý Sửu": 0.9, "Giáp Dần": 1.8, "Ất Mão": 1.0,
  "Bính Thìn": 1.3, "Đinh Tỵ": 0.6, "Mậu Ngọ": 0.9, "Kỷ Mùi": 0.7,
  "Canh Thân": 1.2, "Tân Dậu": 0.6, "Nhâm Tuất": 0.7, "Quý Hợi": 0.8,
};

const MONTH_WEIGHTS = [0.6, 0.7, 1.8, 0.9, 0.5, 1.6, 0.8, 1.5, 1.8, 0.8, 0.9, 0.5];
const DAY_WEIGHTS = [
  0.5, 1.0, 0.8, 1.5, 1.6, 1.5, 0.8, 1.6, 0.8, 1.6,
  0.9, 1.7, 0.8, 1.7, 1.0, 0.8, 0.9, 1.8, 0.5, 1.5,
  1.0, 0.9, 0.8, 0.9, 1.5, 1.8, 0.7, 0.8, 1.6, 0.6,
];
const HOUR_WEIGHTS = [1.6, 0.6, 0.7, 1.0, 0.9, 1.6, 1.0, 0.8, 0.8, 0.9, 0.6, 0.9];

function getCanXuongReading(weight: number): {
  reading: string;
  interpretation: string;
  title: string;
  level: "excellent" | "good" | "neutral" | "challenging";
} {
  if (weight >= 6.0) {
    return {
      title: "Đại Phú Quý Số",
      reading: "Vinh hoa phú quý, hậu vận rực rỡ.",
      interpretation:
        "Lượng Chỉ của bạn thuộc hàng đại phú quý. Tiền tài dồi dào, sự nghiệp thăng hoa như diều gặp gió. Phúc lộc song toàn, gia đình hòa thuận, con cháu hiếu thảo. Đây là mệnh cách nhận được nhiều ân huệ từ trời cao. Hậu vận ngày càng vẻ vang, tiếng thơm lưu truyền.",
      level: "excellent",
    };
  }
  if (weight >= 5.0) {
    return {
      title: "Thượng Thượng Số",
      reading: "Số phúc lộc dày, công danh sự nghiệp hanh thông.",
      interpretation:
        "Phúc đức tích luỹ từ nhiều đời, vận trình thông suốt. Bạn có khả năng xây dựng sự nghiệp vững chắc, được quý nhân phù trợ trong lúc khó khăn. Tài lộc phong phú, tình duyên trọn vẹn. Tuổi trung niên sẽ là giai đoạn cực thịnh trong cuộc đời.",
      level: "excellent",
    };
  }
  if (weight >= 4.5) {
    return {
      title: "Phúc Lộc Tề Lai",
      reading: "Vận đến như nước chảy, tài lộc an nhàn.",
      interpretation:
        "Cuộc đời bạn nhìn chung thuận lợi, tài lộc từ từ tích lũy theo năm tháng. Ở tuổi trung niên bắt đầu gặt hái thành quả. Tuy có lúc vất vả nhưng luôn có người tốt giúp đỡ. Gia đình ổn định, sức khỏe dồi dào, cuối đời an nhàn hưởng phúc.",
      level: "good",
    };
  }
  if (weight >= 4.0) {
    return {
      title: "Tự Thành Chí Phú",
      reading: "Tự lực cánh sinh, kiên trì ắt thành công.",
      interpretation:
        "Bạn thuộc típ người phải tự thân vận động, ít nhờ cậy người khác. Thuở thiếu thời có thể khó khăn, nhưng ý chí kiên cường sẽ giúp bạn vượt qua tất cả. Trung vận bắt đầu ổn định, hậu vận về cơ bản an lành. Cần biết tiết kiệm và đầu tư đúng hướng.",
      level: "good",
    };
  }
  if (weight >= 3.5) {
    return {
      title: "Bình Thường Số",
      reading: "Bình hòa, đủ ăn đủ mặc, cuộc đời ít biến động.",
      interpretation:
        "Vận mệnh theo hướng trung bình, không quá thăng hoa nhưng cũng không quá khó khăn. Cuộc sống bình lặng, giản dị. Tài lộc đủ chi tiêu nhưng không giàu có dư dả. Phúc lành ở chỗ ít phải tranh đấu căng thẳng, tâm hồn thanh thản. Nên trân trọng những điều nhỏ bé trong cuộc sống.",
      level: "neutral",
    };
  }
  if (weight >= 3.0) {
    return {
      title: "Tiểu Khổ Đại Sướng",
      reading: "Sớm gian khổ, muộn an nhàn, kiên trì là bí quyết.",
      interpretation:
        "Thuở đầu đời thường gặp nhiều gian truân thử thách, nhưng đây là quá trình tôi luyện để trưởng thành. Sau tuổi 40, vận khí bắt đầu chuyển tốt dần. Biết nhẫn nại, chăm chỉ và trung thực là chìa khóa giúp bạn vượt qua khó khăn và tiến đến thành công.",
      level: "neutral",
    };
  }
  return {
    title: "Thử Thách Số",
    reading: "Mệnh cách cần nỗ lực phi thường, phúc lộc đến sau gian khó.",
    interpretation:
      "Cuộc đời chứa đựng nhiều thử thách và biến cố. Tuy nhiên, đây không phải điều bất hạnh - đây là cơ hội để bạn rèn giũa bản thân trở nên phi thường. Những người có số này nếu kiên trì không buông bỏ, cuối cùng sẽ đạt được điều người khác không thể. Cần chú ý sức khỏe và tránh xa các quyết định liều lĩnh.",
    level: "challenging",
  };
}

export function calculateCanXuong(
  year: number,
  month: number,
  day: number,
  hourIndex: number
): CanXuongResult {
  const yearName = getCanChiYear(year).full;
  const yW = YEAR_WEIGHTS[yearName] || 1.0;
  const mW = MONTH_WEIGHTS[Math.max(0, Math.min(11, month - 1))];
  const dW = DAY_WEIGHTS[Math.max(0, Math.min(29, day - 1))];
  const hW = HOUR_WEIGHTS[Math.max(0, Math.min(11, hourIndex))];

  const total = yW + mW + dW + hW;
  const luong = Math.floor(total);
  const chiVal = Math.round((total - luong) * 10);

  return {
    luong,
    chi: chiVal,
    total: total.toFixed(1),
    ...getCanXuongReading(total),
  };
}
