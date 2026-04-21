declare module "chinese-lunar-calendar" {
  interface LunarDate {
    lunarMonth: number;
    lunarDate: number;
    isLeap: boolean;
    solarTerm: string;
    lunarYear: string;
    zodiac: string;
    dateStr: string;
  }

  export function getLunar(year: number, month: number, day: number): LunarDate;
}
