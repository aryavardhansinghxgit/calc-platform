/**
 * Pure Mathematical Logic for Age Calculation.
 */

export interface AgeFormulaInput {
  birthDate: string; // YYYY-MM-DD
  targetDate?: string; // YYYY-MM-DD (defaults to today)
}

export interface AgeFormulaResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
}

export function calculateAgeFormula({
  birthDate,
  targetDate = new Date().toISOString().split("T")[0],
}: AgeFormulaInput): AgeFormulaResult {
  const birth = new Date(birthDate);
  const target = new Date(targetDate);

  if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      nextBirthdayDays: 0,
    };
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = Math.abs(target.getTime() - birth.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday < target) {
    nextBday.setFullYear(target.getFullYear() + 1);
  }
  const nextBdayDiff = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    nextBirthdayDays: nextBdayDiff,
  };
}
