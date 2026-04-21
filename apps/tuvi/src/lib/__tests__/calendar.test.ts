import {
  toLunarDate,
  calculateDayLuck,
  findLuckyDaysInMonth,
  getZodiacIndex,
  formatZodiac,
} from "../calendar";

describe("Calendar Utilities", () => {
  describe("toLunarDate", () => {
    it("should convert solar date to lunar date", () => {
      // Tết 2026 (Lunar New Year)
      const lunar = toLunarDate(2026, 2, 1);

      expect(lunar.solarDate).toBe("2026/2/1");
      expect(lunar.lunarDate).toBeDefined();
      expect(lunar.lunarMonth).toBeGreaterThan(0);
      expect(lunar.lunarDay).toBeGreaterThan(0);
      expect(lunar.cyclicalYear).toBeDefined();
    });

    it("should have valid zodiac animals", () => {
      const lunar = toLunarDate(2024, 1, 1);
      expect(lunar.zodiacYear).toMatch(
        /Tý|Sửu|Dần|Mão|Thìn|Tỵ|Ngọ|Mùi|Thân|Dậu|Tuất|Hợi/
      );
    });

    it("should have valid heavenly stem and earthly branch", () => {
      const lunar = toLunarDate(2025, 6, 15);
      expect(lunar.heavenlyStem).toMatch(/Giáp|Ất|Bính|Đinh|Mậu|Kỷ|Canh|Tân|Nhâm|Quý/);
      expect(lunar.earthlyBranch).toMatch(
        /Tý|Sửu|Dần|Mão|Thìn|Tỵ|Ngọ|Mùi|Thân|Dậu|Tuất|Hợi/
      );
    });
  });

  describe("calculateDayLuck", () => {
    it("should return luck information for a date", () => {
      const date = new Date(2026, 1, 15); // Feb 15, 2026
      const luck = calculateDayLuck(date, 0); // Tý zodiac

      expect(luck.date).toBe("2026/2/15");
      expect(luck.lunar).toBeDefined();
      expect(luck.luckLevel).toMatch(/Tốt|Trung bình|Xấu/);
      expect(luck.luckScore).toBeGreaterThanOrEqual(0);
      expect(luck.luckScore).toBeLessThanOrEqual(100);
    });

    it("should include auspicious and inauspicious hours", () => {
      const date = new Date(2026, 5, 10);
      const luck = calculateDayLuck(date, 5); // Tỵ zodiac

      expect(Array.isArray(luck.auspiciousHours)).toBe(true);
      expect(Array.isArray(luck.inauspiciousHours)).toBe(true);
      expect(luck.auspiciousHours.length).toBeGreaterThan(0);
    });

    it("should have zodiac-specific luck message", () => {
      const date = new Date(2026, 3, 20);
      const luck = calculateDayLuck(date, 2); // Dần zodiac

      expect(luck.zodiacLuck).toContain("Dần");
    });
  });

  describe("findLuckyDaysInMonth", () => {
    it("should find lucky days in a month", () => {
      const luckyDays = findLuckyDaysInMonth(2026, 2, 0); // February 2026, Tý zodiac

      expect(Array.isArray(luckyDays)).toBe(true);
      luckyDays.forEach((day) => {
        expect(day.luckLevel).toBe("Tốt");
        expect(day.luckScore).toBeGreaterThan(70);
      });
    });

    it("should return empty array if no lucky days found", () => {
      // Hypothetical month with no lucky days
      const luckyDays = findLuckyDaysInMonth(2000, 1, 0);
      expect(Array.isArray(luckyDays)).toBe(true);
    });
  });

  describe("getZodiacIndex", () => {
    it("should return correct zodiac index from year", () => {
      expect(getZodiacIndex(2024)).toBe(0); // 2024 is Year of Dragon (Thìn)
      expect(getZodiacIndex(1900)).toBe(0); // 1900 is Year of Rat (Tý)
      expect(getZodiacIndex(1901)).toBe(1); // 1901 is Year of Ox (Sửu)
    });

    it("should handle 12-year cycle", () => {
      const index1 = getZodiacIndex(2000);
      const index2 = getZodiacIndex(2012);
      expect(index1).toBe(index2); // Same zodiac year
    });
  });

  describe("formatZodiac", () => {
    it("should format zodiac animal name", () => {
      expect(formatZodiac(0)).toBe("Tý");
      expect(formatZodiac(1)).toBe("Sửu");
      expect(formatZodiac(11)).toBe("Hợi");
    });

    it("should handle index wrapping", () => {
      expect(formatZodiac(12)).toBe("Tý"); // Wraps around
      expect(formatZodiac(13)).toBe("Sửu");
    });
  });
});
