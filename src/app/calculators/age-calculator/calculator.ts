import { AgeCalculatorOutputs } from "./types";

export function calculateAgeCalculator(inputs: Record<string, any>): AgeCalculatorOutputs {
  const bDate = new Date(inputs.birthDate || "2000-01-01");
  const tDate = new Date(inputs.targetDate || "2026-08-07");
  if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) {
    return { ageYearsMonthsDays: "Invalid Date", totalDays: 0, nextBirthday: 0 };
  }
  let years = tDate.getFullYear() - bDate.getFullYear();
  let months = tDate.getMonth() - bDate.getMonth();
  let days = tDate.getDate() - bDate.getDate();
  if (days < 0) {
    months--;
    const lastMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.max(0, Math.floor((tDate.getTime() - bDate.getTime()) / 86400000));
  const nextBdayYear = (tDate.getMonth() > bDate.getMonth() || (tDate.getMonth() === bDate.getMonth() && tDate.getDate() > bDate.getDate())) ? tDate.getFullYear() + 1 : tDate.getFullYear();
  const nextBday = new Date(nextBdayYear, bDate.getMonth(), bDate.getDate());
  const daysToNextBday = Math.max(0, Math.ceil((nextBday.getTime() - tDate.getTime()) / 86400000));
  return { ageYearsMonthsDays: `${years} years, ${months} months, ${days} days`, totalDays, nextBirthday: daysToNextBday };
}
