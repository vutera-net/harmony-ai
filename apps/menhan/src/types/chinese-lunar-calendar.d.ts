declare module "chinese-lunar-calendar" {
  interface LunarDate {
    lunarMonth: number;
    lunarDate: number;
    zodiac: string;
  }

  export function getLunar(year: number, month: number, day: number): LunarDate;
}
