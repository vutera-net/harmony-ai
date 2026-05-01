import { solarToLunar, lunarToSolar } from './src/lunar-engine.ts'

const d = 28, m = 12, y = 2024
const lunar = solarToLunar(d, m, y)
console.log('Solar:', d, m, y)
console.log('Lunar:', lunar)
const solar = lunarToSolar(lunar.day, lunar.month, lunar.year, lunar.isLeapMonth)
console.log('Solar back:', solar)
