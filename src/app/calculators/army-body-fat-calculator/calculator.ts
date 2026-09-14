import { ArmyBodyFatCalculatorOutputs } from "./types";
import {
  calculateArmyWHtR,
  calculateArmyBodyFat,
  UnitSystem,
  Gender,
  CalculationMethod,
} from "@/lib/formulas/armyBodyFat";

export function calculateArmyBodyFatCalculator(inputs: Record<string, any>): ArmyBodyFatCalculatorOutputs {
  const isHistorical = inputs.mode === "historical_2023_tape" || inputs.mode === "historical";

  if (isHistorical) {
    const gender: Gender = inputs.gender === "female" ? "female" : "male";
    const rawAge = inputs.age;
    const age = Number(rawAge);
    const method: CalculationMethod =
      inputs.method === "navy_traditional_multi_site" ? "navy_traditional_multi_site" : "army_2023_single_site";
    const unitSystem: UnitSystem =
      inputs.unitSystem === "metric" || (inputs.heightCm != null && inputs.heightInches == null)
        ? "metric"
        : "imperial";

    const histResult = calculateArmyBodyFat({
      unitSystem,
      gender,
      calculationMethod: method,
      age: isNaN(age) || age <= 0 ? 25 : age,
      weightLbs: inputs.weightLbs != null ? Number(inputs.weightLbs) : undefined,
      weightKg: inputs.weightKg != null ? Number(inputs.weightKg) : undefined,
      heightInches:
        inputs.heightInches != null
          ? Number(inputs.heightInches)
          : inputs.heightCm != null
          ? Number(inputs.heightCm) / 2.54
          : undefined,
      heightCm: inputs.heightCm != null ? Number(inputs.heightCm) : undefined,
      waistInches:
        inputs.waistInches != null
          ? Number(inputs.waistInches)
          : inputs.waistCm != null
          ? Number(inputs.waistCm) / 2.54
          : undefined,
      waistCm: inputs.waistCm != null ? Number(inputs.waistCm) : undefined,
      neckInches:
        inputs.neckInches != null
          ? Number(inputs.neckInches)
          : inputs.neckCm != null
          ? Number(inputs.neckCm) / 2.54
          : undefined,
      neckCm: inputs.neckCm != null ? Number(inputs.neckCm) : undefined,
      hipInches:
        inputs.hipInches != null
          ? Number(inputs.hipInches)
          : inputs.hipCm != null
          ? Number(inputs.hipCm) / 2.54
          : undefined,
      hipCm: inputs.hipCm != null ? Number(inputs.hipCm) : undefined,
      acftScore: Number(inputs.acftScore) || 0,
      acftPassedAllEvents80: Boolean(inputs.acftPassedAll80 ?? inputs.acftPassedAllEvents80),
    });

    if (!histResult.isValid) {
      return {
        whtr: 0,
        maxAllowedWhtr: 0.55,
        status: "INVALID",
        bodyFatPercent: 0,
        maxAllowed: 0,
      };
    }

    return {
      whtr: 0,
      maxAllowedWhtr: 0.55,
      status: histResult.statusLabel,
      bodyFatPercent: histResult.bodyFatPercentage,
      maxAllowed: histResult.maxAllowableBodyFat,
    };
  }

  // DEFAULT CURRENT 2026 WHtR CALCULATION ENGINE (Directive 2026-13)
  const isMetric =
    inputs.unitSystem === "metric" || (inputs.heightCm != null && inputs.heightInches == null);
  const unitSystem: UnitSystem = isMetric ? "metric" : "imperial";

  const height = isMetric ? Number(inputs.heightCm) : Number(inputs.heightInches ?? inputs.height);
  const waist = isMetric ? Number(inputs.waistCm) : Number(inputs.waistInches ?? inputs.waist);

  const whtrRes = calculateArmyWHtR({
    unitSystem,
    heightInches: isMetric ? undefined : height,
    heightCm: isMetric ? height : undefined,
    waistInches: isMetric ? undefined : waist,
    waistCm: isMetric ? waist : undefined,
  });

  if (!whtrRes.isValid) {
    return {
      whtr: 0,
      maxAllowedWhtr: 0.55,
      status: "INVALID",
      maxCompliantWaist: 0,
      requiredWaistReduction: 0,
      bodyFatPercent: 0,
      maxAllowed: 0,
    };
  }

  return {
    whtr: whtrRes.whtrDisplay,
    maxAllowedWhtr: 0.55,
    status: whtrRes.statusLabel,
    maxCompliantWaist: whtrRes.maxCompliantWaist,
    requiredWaistReduction: whtrRes.requiredWaistReduction,
    bodyFatPercent: 0,
    maxAllowed: 0,
  };
}
