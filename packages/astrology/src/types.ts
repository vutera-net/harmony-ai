export type NguHanh = 'Kim' | 'Moc' | 'Thuy' | 'Hoa' | 'Tho';

export type CungMenh = 'Khảm' | 'Khôn' | 'Chấn' | 'Tốn' | 'Càn' | 'Đoài' | 'Cấn' | 'Ly';

export type HuongName = 'Sinh Khi' | 'Thien Y' | 'Dien Nien' | 'Phuc Vi' | 'Hoa Hai' | 'Luc Sat' | 'Ngu Quy' | 'Tuyet Menh';

export type MenhNhom = 'dong' | 'tay';

export interface HuongInfo {
  name: HuongName;
  direction: string;
  isTot: boolean;
  meaning: string;
  usage: string;
}

export interface RoomRecommendation {
  item: string;
  placement: string;
  purpose: string;
  warning?: string;
}

export interface RoomType {
  name: string;
  nameVi: string;
  purpose: string;
  bestDirections: string[];
  avoidDirections: string[];
  elements: string[];
  colors: string[];
  recommendations: RoomRecommendation[];
}

export interface Pillar {
  can: string;
  chi: string;
  canHanh: NguHanh;
  chiHanh: NguHanh;
}

export interface BatTuResult {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
  nguHanhCount: Record<NguHanh, number>;
  nguHanhPercent: Record<NguHanh, number>;
  khuyet: NguHanh[];
  vuong: NguHanh[];
}

export type EventType = 'cuoiHoi' | 'khaiTruong' | 'dongTho' | 'nhapTrach' | 'xuatHanh' | 'kyHopDong' | 'general';

export interface DateSelectionResult {
  solar: SolarDate;
  lunar: LunarDate;
  score: number;
  rating: 'tot' | 'kha' | 'trung' | 'xau';
  truc: string;
  sao28: string;
  sao28Rating: 'tot' | 'xau' | 'trung';
  hoangDaoHours: string[];
  issues: string[];
  advantages: string[];
  suitable: boolean;
}

export interface HoroscopeScore {
  overall: number;
  love: number;
  career: number;
  finance: number;
  health: number;
}

export interface DailyHoroscope {
  date: Date;
  zodiac: string;
  title: string;
  overview: string;
  loveForecast: string;
  careerForecast: string;
  financeForecast: string;
  healthForecast: string;
  luckyColor: string;
  luckyDirection: string;
  luckyHour: string;
  scores: HoroscopeScore;
  rating: 'excellent' | 'good' | 'average' | 'bad';
}

export interface TuongHopResult {
  canScore: number;
  canText: string;
  canDesc: string;
  chiScore: number;
  chiText: string;
  chiDesc: string;
  cungScore: number;
  cungText: string;
  cungDesc: string;
  totalScore: number;
  interpretation: string;
}

export interface NguHanhInfo {
  menh: NguHanh;
  napAm: string;
  mauSacTot: string[];
  mauSacXau: string[];
  huongTot: string[];
  soMayMan: number[];
  tinhCach: string;
  sinhBoi: NguHanh;
  khacBoi: NguHanh;
  sinh: NguHanh;
  khac: NguHanh;
}

export interface CompatibilityResult {
  person1: { name: string; menh: NguHanh; napAm: string };
  person2: { name: string; menh: NguHanh; napAm: string };
  relationship: string;
  score: number;
  analysis: string;
}

export type StarBrightness = 'mieu' | 'vuong' | 'dacDia' | 'binhHoa' | 'hamDia';

export interface Star {
  name: string;
  brightness: StarBrightness;
  isGood: boolean;
  shortMeaning?: string;
}

export interface Palace {
  index: number;
  name: string;
  diaChi: string;
  isLifePalace: boolean;
  isSoulPalace: boolean;
  mainStars: Star[];
  minorStars: Star[];
}

export interface DaiHan {
  startAge: number;
  endAge: number;
  startYear: number;
  palaceIndex: number;
  palaceName: string;
  diaChi: string;
}

export interface TieuHan {
  age: number;
  year: number;
  canChi: string;
  palaceIndex: number;
  palaceName: string;
  diaChi: string;
}

export interface TuViChart {
  label: string;
  gender: 'male' | 'female';
  birthDate: LunarDate;
  birthHourIndex: number;
  birthHourName: string;
  cuc: string;
  cucNumber: number;
  menh: NguHanh;
  napAm: string;
  cungMenhIndex: number;
  cungThanIndex: number;
  palaces: Palace[];
  daiHan: DaiHan[];
}

export interface PalaceInterpretation {
  palaceName: string;
  overview: string;
  mainStarsAnalysis: string[];
  minorStarsAnalysis: string[];
  summary: string;
  rating: 'excellent' | 'good' | 'average' | 'bad';
}

export interface SolarDate {
  day: number;
  month: number;
  year: number;
  dayOfWeek: number;
}

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeapMonth: boolean;
  canDay: number;
  chiDay: number;
  canMonth: number;
  chiMonth: number;
  canYear: number;
  chiYear: number;
  jd?: number;
}

export interface DayInfo {
  solar: SolarDate;
  lunar: LunarDate;
  canGio: number[];
  chiGio: number[];
  hoangDaoGio: number[];
  hacDaoGio: number[];
  truc: string;
  sao28: string;
  sao28Rating: 'tot' | 'xau' | 'trung';
  solarTerm?: string;
  ngayKy: string[];
  festivals: string[];
  rating: 'tot' | 'xau' | 'trung';
}

export interface BatTrachResult {
  cungMenh: CungMenh;
  cungNumber: number;
  nhomMenh: MenhNhom;
  huongs: HuongInfo[];
  huongNhaTot: HuongInfo[];
  huongNhaXau: HuongInfo[];
}

export interface CuuCungCell {
  star: number;
  direction: string;
  isTot: boolean;
  meaning: string;
}

export interface CuuCungResult {
  year: number;
  month?: number;
  centerStar: number;
  grid: CuuCungCell[][];
  analysis: string;
}
