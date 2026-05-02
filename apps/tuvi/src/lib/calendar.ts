import { 
  solarToLunar, 
  DIA_CHI, 
  THIEN_CAN, 
  generateTuViChart 
} from '@harmony/astrology'

export interface CalendarInfo {
  solarDate: string;
  lunarDate: string;
  lunarMonth: number;
  lunarDay: number;
  lunarYear: number;
  zodiacYear: string;
  heavenlyStem: string;
  earthlyBranch: string;
  cyclicalYear: string;
}

export interface DayLuck {
  date: string;
  lunar: string;
  luckLevel: "Tốt" | "Trung bình" | "Xấu";
  luckScore: number; // 0-100
  zodiacLuck: string; // Luck for specific zodiac
  auspiciousHours: string[];
  inauspiciousHours: string[];
}

/**
 * Convert solar date to lunar calendar
 */
export function toLunarDate(year: number, month: number, day: number): CalendarInfo {
  const lunar = solarToLunar(day, month, year);
  
  return {
    solarDate: `${year}/${month}/${day}`,
    lunarDate: `${lunar.day}/${lunar.month}/${lunar.year}`,
    lunarMonth: lunar.month,
    lunarDay: lunar.day,
    lunarYear: lunar.year,
    zodiacYear: DIA_CHI[lunar.chiYear],
    heavenlyStem: THIEN_CAN[lunar.canYear],
    earthlyBranch: DIA_CHI[lunar.chiYear],
    cyclicalYear: `${THIEN_CAN[lunar.canYear]} ${DIA_CHI[lunar.chiYear]}`,
  };
}

/**
 * Calculate luck for a specific date based on zodiac
 */
export function calculateDayLuck(
  date: Date,
  zodiacIndex: number // 0-11 (Tý-Hợi)
): DayLuck {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const lunar = toLunarDate(year, month, day);

  const dayNum = lunar.lunarDay % 12;
  const zodiacMatch = (zodiacIndex + dayNum) % 12 === 0;

  let luckLevel: "Tốt" | "Trung bình" | "Xấu" = "Trung bình";
  let luckScore = 50;

  const luckyDays = [1, 7, 8, 14, 15, 21, 22, 28, 29]; 
  const unluckyDays = [5, 6, 11, 12, 17, 18, 23, 24]; 

  if (luckyDays.includes(lunar.lunarDay)) {
    luckLevel = zodiacMatch ? "Tốt" : "Trung bình";
    luckScore = zodiacMatch ? 85 : 60;
  } else if (unluckyDays.includes(lunar.lunarDay)) {
    luckLevel = zodiacMatch ? "Trung bình" : "Xấu";
    luckScore = zodiacMatch ? 40 : 20;
  }

  const hours = [
    "23:00-01:00 (Tý)", "01:00-03:00 (Sửu)", "03:00-05:00 (Dần)",
    "05:00-07:00 (Mão)", "07:00-09:00 (Thìn)", "09:00-11:00 (Tỵ)",
    "11:00-13:00 (Ngọ)", "13:00-15:00 (Mùi)", "15:00-17:00 (Thân)",
    "17:00-19:00 (Dậu)", "19:00-21:00 (Tuất)", "21:00-23:00 (Hợi)",
  ];

  const auspiciousHours = hours.filter((_, idx) => {
    const auspiciousIdx = (zodiacIndex + dayNum + idx) % 12;
    return auspiciousIdx % 2 === 0;
  });

  const inauspiciousHours = hours.filter((_, idx) => {
    const inauspiciousIdx = (zodiacIndex + dayNum + idx) % 12;
    return inauspiciousIdx % 2 !== 0;
  });

  return {
    date: `${year}/${month}/${day}`,
    lunar: lunar.lunarDate,
    luckLevel,
    luckScore,
    zodiacLuck: `${zodiacMatch ? "Rất " : ""}hợp với ${DIA_CHI[zodiacIndex]}`,
    auspiciousHours: auspiciousHours.slice(0, 4),
    inauspiciousHours: inauspiciousHours.slice(0, 4),
  };
}

/**
 * Find lucky days in a month for specific zodiac
 */
export function findLuckyDaysInMonth(
  year: number,
  month: number,
  zodiacIndex: number
): DayLuck[] {
  const luckyDays: DayLuck[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayLuck = calculateDayLuck(date, zodiacIndex);
    if (dayLuck.luckLevel === "Tốt") {
      luckyDays.push(dayLuck);
    }
  }

  return luckyDays;
}

/**
 * Get zodiac index from birth date
 */
export function getZodiacIndex(year: number): number {
  return (year - 1900) % 12;
}

/**
 * Format zodiac name from index
 */
export function formatZodiac(index: number): string {
  return DIA_CHI[index % 12];
}

/**
 * Get a full month calendar view with lunar dates and luck info
 */
export function getMonthCalendarView(
  year: number,
  month: number
): Array<{
  date: number;
  lunar: string;
  luckLevel: "Tốt" | "Trung bình" | "Xấu";
  isCurrentMonth: boolean;
}> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const calendar: Array<{
    date: number;
    lunar: string;
    luckLevel: "Tốt" | "Trung bình" | "Xấu";
    isCurrentMonth: boolean;
  }> = [];

  const prevMonthDays = new Date(year, month - 1, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = prevMonthDays - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const lunar = toLunarDate(prevYear, prevMonth, date);

    calendar.push({
      date,
      lunar: `${lunar.lunarDay}/${lunar.lunarMonth}`,
      luckLevel: "Trung bình",
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const lunar = toLunarDate(year, month, day);
    const dayNum = lunar.lunarDay % 12;

    let luckLevel: "Tốt" | "Trung bình" | "Xấu" = "Trung bình";
    const luckyDays = [1, 7, 8, 14, 15, 21, 22, 28, 29];
    const unluckyDays = [5, 6, 11, 12, 17, 18, 23, 24];

    if (luckyDays.includes(lunar.lunarDay)) {
      luckLevel = "Tốt";
    } else if (unluckyDays.includes(lunar.lunarDay)) {
      luckLevel = "Xấu";
    }

    calendar.push({
      date: day,
      lunar: `${lunar.lunarDay}/${lunar.lunarMonth}`,
      luckLevel,
      isCurrentMonth: true,
    });
  }

  const remainingDays = 42 - calendar.length;
  for (let day = 1; day <= remainingDays; day++) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const lunar = toLunarDate(nextYear, nextMonth, day);

    calendar.push({
      date: day,
      lunar: `${lunar.lunarDay}/${lunar.lunarMonth}`,
      luckLevel: "Trung bình",
      isCurrentMonth: false,
    });
  }

  return calendar;
}

/**
 * Get basic Tử Vi chart for a birth date
 */
export function getBasicChart(year: number, month: number, day: number): {
  solarDate: string;
  lunarDate: string;
  zodiacYear: string;
  palaces: Array<{
    name: string;
    position: number;
    element: string;
    description: string;
  }>;
  summary: string;
} {
  const lunar = solarToLunar(day, month, year);
  
  // Using a simplified version of generateTuViChart for this basic return type
  const chart = generateTuViChart(
    'Basic Chart', 
    'male', // Default to male for basic chart if not provided
    lunar, 
    0 // Default hour
  );

  const palaceNames = [
    "Mệnh", "Anh Em", "Phu Thê", "Tài Lộc", "Con Cái", "Nô Tỳ",
    "Tử Tù", "Cha Mẹ", "Quan Lộc", "Phước Đức", "Tình Duyên", "Sức Khỏe",
  ];

  const palaces = palaceNames.map((name, idx) => {
    const palace = chart.palaces[idx] || { name, mainStars: [] };
    return {
      name,
      position: idx + 1,
      element: chart.menh,
      description: idx === 0 ? "Cung mệnh mạnh định vận nước này" : `Ảnh hưởng đến ${name.toLowerCase()}`,
    };
  });

  return {
    solarDate: `${year}/${month}/${day}`,
    lunarDate: `${lunar.day}/${lunar.month}/${lunar.year}`,
    zodiacYear: DIA_CHI[lunar.chiYear],
    palaces,
    summary: `Mệnh ${chart.menh} (${chart.napAm}). Bản mệnh có những đặc điểm đặc trưng của năm ${DIA_CHI[lunar.chiYear]}.`,
  };
}

/**
 * Get yearly horoscope summary for a zodiac
 */
export function getYearlyHoroscope(zodiacIndex: number): {
  zodiac: string;
  year: number;
  summary: string;
  luckAreas: string[];
  challengeAreas: string[];
  luckyColors: string[];
  luckyNumbers: number[];
} {
  const year = new Date().getFullYear();
  const zodiac = DIA_CHI[zodiacIndex % 12];

  const horoscopes: Record<
    string,
    {
      summary: string;
      luckAreas: string[];
      challengeAreas: string[];
      luckyColors: string[];
      luckyNumbers: number[];
    }
  > = {
    "Tý": {
      summary: "Năm này là cơ hội để khơi dậy sáng tạo và khởi động dự án mới.",
      luckAreas: ["Sự nghiệp", "Sáng tạo", "Mối quan hệ"],
      challengeAreas: ["Tài chính", "Sức khỏe"],
      luckyColors: ["Đen", "Xanh dương"],
      luckyNumbers: [1, 6, 7],
    },
    "Sửu": {
      summary: "Một năm ổn định với cơ hội phát triển chậm nhưng chắc chắn.",
      luckAreas: ["Gia đình", "Tài chính", "Công việc"],
      challengeAreas: ["Giao tiếp", "Sáng tạo"],
      luckyColors: ["Trắng", "Vàng"],
      luckyNumbers: [2, 5, 8],
    },
    "Dần": {
      summary: "Năm phát triển nhanh với sự thay đổi tích cực và thách thức.",
      luckAreas: ["Sự nghiệp", "Cá nhân", "Học tập"],
      challengeAreas: ["Tài chính", "Mối quan hệ"],
      luckyColors: ["Xanh lục", "Cam"],
      luckyNumbers: [3, 6, 9],
    },
    "Mão": {
      summary: "Một năm bình yên với các cơ hội tốt trong công việc và tình cảm.",
      luckAreas: ["Mối quan hệ", "Sự nghiệp", "Sáng tạo"],
      challengeAreas: ["Tài chính"],
      luckyColors: ["Xanh lục", "Hồng"],
      luckyNumbers: [1, 4, 7],
    },
    "Thìn": {
      summary: "Năm của sự rực rỡ với cơ hội lớn và trách nhiệm mới.",
      luckAreas: ["Sự nghiệp", "Danh vọng", "Tài chính"],
      challengeAreas: ["Mối quan hệ", "Sức khỏe"],
      luckyColors: ["Vàng", "Xanh dương"],
      luckyNumbers: [2, 5, 8],
    },
    "Tỵ": {
      summary: "Một năm sâu sắc với cơ hội tự hoàn thiện và phát triển cá nhân.",
      luckAreas: ["Cá nhân", "Tâm linh", "Học tập"],
      challengeAreas: ["Giao tiếp", "Sự nghiệp"],
      luckyColors: ["Đỏ", "Cam"],
      luckyNumbers: [3, 6, 9],
    },
    "Ngọ": {
      summary: "Năm năng động với nhiều hoạt động và cơ hội phát triển.",
      luckAreas: ["Giao tiếp", "Sự nghiệp", "Mối quan hệ"],
      challengeAreas: ["Tài chính", "Sức khỏe"],
      luckyColors: ["Đỏ", "Tím"],
      luckyNumbers: [1, 7, 9],
    },
    "Mùi": {
      summary: "Một năm hòa hợp với cơ hội phát triển gia đình và công việc.",
      luckAreas: ["Gia đình", "Tài chính", "Cá nhân"],
      challengeAreas: ["Sáng tạo"],
      luckyColors: ["Vàng", "Nâu"],
      luckyNumbers: [2, 5, 8],
    },
    "Thân": {
      summary: "Năm sôi nổi với nhiều cơ hội thay đổi và phát triển.",
      luckAreas: ["Sự nghiệp", "Giao tiếp", "Sáng tạo"],
      challengeAreas: ["Mối quan hệ", "Tài chính"],
      luckyColors: ["Xanh dương", "Vàng"],
      luckyNumbers: [1, 4, 7],
    },
    "Dậu": {
      summary: "Một năm chỉnh chu với cơ hội hoàn thiện và đạt được mục tiêu.",
      luckAreas: ["Sự nghiệp", "Tài chính", "Cá nhân"],
      challengeAreas: ["Mối quan hệ"],
      luckyColors: ["Vàng", "Trắng"],
      luckyNumbers: [1, 7, 8],
    },
    "Tuất": {
      summary: "Năm trung thành với cơ hội xây dựng nền tảng vững chắc.",
      luckAreas: ["Gia đình", "Mối quan hệ", "Công việc"],
      challengeAreas: ["Sáng tạo", "Tài chính"],
      luckyColors: ["Nâu", "Đen"],
      luckyNumbers: [3, 5, 6],
    },
    "Hợi": {
      summary: "Một năm hòa hợp với cơ hội phát triển toàn diện.",
      luckAreas: ["Mối quan hệ", "Gia đình", "Tâm linh"],
      challengeAreas: ["Sự nghiệp"],
      luckyColors: ["Xanh lục", "Đen"],
      luckyNumbers: [2, 5, 9],
    },
  };

  const horoscope = horoscopes[zodiac] || horoscopes["Tý"];

  return {
    zodiac,
    year,
    ...horoscope,
  };
}
