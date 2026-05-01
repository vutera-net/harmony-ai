import { THIEN_CAN, DIA_CHI } from './data/can-chi'
import { solarToLunar, jdFromDate } from './lunar-engine'
import type { Pillar, BatTuResult, NguHanh } from './types'

const CAN_HANH: Record<string, NguHanh> = {
  "Giáp": "Moc", "Ất": "Moc",
  "Bính": "Hoa", "Đinh": "Hoa",
  "Mậu": "Tho", "Kỷ": "Tho",
  "Canh": "Kim", "Tân": "Kim",
  "Nhâm": "Thuy", "Quý": "Thuy",
};

const CHI_HANH: Record<string, NguHanh> = {
  "Dần": "Moc", "Mão": "Moc",
  "Tỵ": "Hoa", "Ngọ": "Hoa",
  "Thân": "Kim", "Dậu": "Kim",
  "Hợi": "Thuy", "Tý": "Thuy",
  "Thìn": "Tho", "Tuất": "Tho", "Sửu": "Tho", "Mùi": "Tho",
};

export function calculateBatTu(date: Date): BatTuResult {
  let d = new Date(date);
  let hr = d.getHours();
  
  // Trụ Giờ thay đổi lúc 23:00 (chuyển sang giờ Tý của ngày hôm sau)
  if (hr >= 23) {
    d.setDate(d.getDate() + 1);
  }
  
  const dd = d.getDate();
  const mm = d.getMonth() + 1;
  const yy = d.getFullYear();
  
  const lunar = solarToLunar(dd, mm, yy);
  
  // 1. Trụ Năm
  const yearCanIdx = (lunar.year + 6) % 10;
  const yearChiIdx = (lunar.year + 8) % 12;
  const yearCan = THIEN_CAN[yearCanIdx];
  const yearChi = DIA_CHI[yearChiIdx];
  
  // 2. Trụ Tháng
  const monthChiIdx = (lunar.month + 1) % 12;
  const monthChi = DIA_CHI[monthChiIdx];
  const monthCanIdx = (((yearCanIdx % 5) * 2) + lunar.month + 1) % 10;
  const monthCan = THIEN_CAN[monthCanIdx];
  
  // 3. Trụ Ngày
  const jd = jdFromDate(dd, mm, yy);
  const dayCanIdx = (jd + 9) % 10;
  const dayChiIdx = (jd + 9) % 12;
  const dayCan = THIEN_CAN[dayCanIdx];
  const dayChi = DIA_CHI[dayChiIdx];
  
  // 4. Trụ Giờ
  let rawHour = hr;
  if (hr >= 23) rawHour = hr - 24; 
  const hourChiIdx = Math.floor((rawHour + 1) / 2) % 12; 
  const normHourChiIdx = hourChiIdx < 0 ? hourChiIdx + 12 : hourChiIdx;
  const hourChi = DIA_CHI[normHourChiIdx];
  
  const hourCanIdx = ((dayCanIdx % 5) * 2 + normHourChiIdx) % 10;
  const hourCan = THIEN_CAN[hourCanIdx];
  
  const yearPillar: Pillar = { can: yearCan, chi: yearChi, canHanh: CAN_HANH[yearCan], chiHanh: CHI_HANH[yearChi] };
  const monthPillar: Pillar = { can: monthCan, chi: monthChi, canHanh: CAN_HANH[monthCan], chiHanh: CHI_HANH[monthChi] };
  const dayPillar: Pillar = { can: dayCan, chi: dayChi, canHanh: CAN_HANH[dayCan], chiHanh: CHI_HANH[dayChi] };
  const hourPillar: Pillar = { can: hourCan, chi: hourChi, canHanh: CAN_HANH[hourCan], chiHanh: CHI_HANH[hourChi] };
  
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const count: Record<NguHanh, number> = { Kim: 0, Moc: 0, Thuy: 0, Hoa: 0, Tho: 0 };
  
  for (const p of pillars) {
    count[p.canHanh]++;
    count[p.chiHanh]++;
  }
  
  const percent: Record<NguHanh, number> = {
    Kim: (count.Kim / 8) * 100,
    Moc: (count.Moc / 8) * 100,
    Thuy: (count.Thuy / 8) * 100,
    Hoa: (count.Hoa / 8) * 100,
    Tho: (count.Tho / 8) * 100,
  };
  
  const khuyet: NguHanh[] = [];
  const vuong: NguHanh[] = [];
  
  for (const hanh in count) {
    const h = hanh as NguHanh;
    if (count[h] === 0) khuyet.push(h);
    if (count[h] >= 2) vuong.push(h); // >= 25% (2 out of 8 words)
  }
  
  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    nguHanhCount: count,
    nguHanhPercent: percent,
    khuyet,
    vuong
  };
}
