import { AgeCalculatorOutputs } from "./types";
import { calculateDetailedAge } from "@/lib/calculator-engine/formulas/age";

export function calculateAgeCalculator(inputs: Record<string, any>): AgeCalculatorOutputs {
  const birthStr = String(inputs.birthDate || "2000-01-01");
  const targetStr = String(inputs.targetDate || "2026-08-18");

  try {
    const res = calculateDetailedAge({
      birthDate: birthStr,
      targetDate: targetStr,
    });

    return {
      ageYearsMonthsDays: res.matrix.yearsMonthsDays,
      totalDays: res.matrix.totalDays,
      nextBirthday: res.nextBirthday.daysRemaining,
    };
  } catch (e) {
    return {
      ageYearsMonthsDays: "0 years, 0 months, 0 days",
      totalDays: 0,
      nextBirthday: 0,
    };
  }
}
