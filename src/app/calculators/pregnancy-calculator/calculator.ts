import { PregnancyCalculatorOutputs } from "./types";
import { calculatePregnancy } from "@/lib/calculator-engine/formulas/pregnancy";

export function calculatePregnancyCalculator(inputs: Record<string, any>): PregnancyCalculatorOutputs {
  const result = calculatePregnancy({
    mode: inputs.mode || "lmp",
    lmpDate: inputs.lmpDate,
    dueDate: inputs.dueDate,
    conceptionDate: inputs.conceptionDate,
    ultrasoundDate: inputs.ultrasoundDate,
    ultrasoundWeeks: inputs.ultrasoundWeeks,
    ultrasoundDays: inputs.ultrasoundDays,
    ivfDate: inputs.ivfDate,
    embryoAge: inputs.embryoAge,
    customStartDate: inputs.customStartDate,
    targetDueDate: inputs.targetDueDate,
    cycleLength: inputs.cycleLength,
    pregnancyType: inputs.pregnancyType,
    motherAge: inputs.motherAge,
    heightFt: inputs.heightFt,
    heightIn: inputs.heightIn,
    heightCm: inputs.heightCm,
    preWeightLbs: inputs.preWeightLbs,
    preWeightKg: inputs.preWeightKg,
    currentWeightLbs: inputs.currentWeightLbs,
    currentWeightKg: inputs.currentWeightKg,
    unitSystem: inputs.unitSystem,
  });

  return {
    dueDate: result.dueDateStr,
    gestationalAge: `${result.gestationalAgeWeeks} weeks, ${result.gestationalAgeDays} days`,
    trimester: result.trimesters[result.currentTrimester - 1].name,
    conceptionDate: result.conceptionDateStr,
    daysRemaining: result.daysRemaining,
    percentComplete: result.percentComplete,
  };
}
