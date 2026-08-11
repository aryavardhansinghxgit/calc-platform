export type UnitSystem = "us" | "metric";
export type PregnancyType = "single" | "twins";

export interface PregnancyWeightGainCalculatorInputs {
  unitSystem?: UnitSystem;
  pregnancyType?: PregnancyType;
  week?: number;
  heightFeet?: number;
  heightInches?: number;
  preWeightLbs?: number;
  currentWeightLbs?: number;
  heightCm?: number;
  preWeightKg?: number;
  currentWeightKg?: number;
}

export interface WeightCompositionComponent {
  name: string;
  weightLbs: number;
  weightKg: number;
  percentage: number;
  color: string;
  description: string;
}

export interface WeekScheduleItem {
  week: number;
  trimester: 1 | 2 | 3;
  minGainLbs: number;
  maxGainLbs: number;
  minGainKg: number;
  maxGainKg: number;
  minWeightLbs: number;
  maxWeightLbs: number;
  minWeightKg: number;
  maxWeightKg: number;
  extraCalorieKcal: number;
  fetalMilestone: string;
}

export interface NutrientGuideline {
  nutrient: string;
  target: string;
  importance: string;
  topSources: string;
}

export interface PregnancyWeightGainCalculatorOutputs {
  unitSystem: UnitSystem;
  pregnancyType: PregnancyType;
  currentWeek: number;
  trimester: 1 | 2 | 3;
  heightCm: number;
  heightFeet: number;
  heightInches: number;
  preWeightKg: number;
  preWeightLbs: number;
  currentWeightKg: number;
  currentWeightLbs: number;
  preBmi: number;
  bmiCategory: string;
  bmiCategoryKey: "underweight" | "normal" | "overweight" | "obese";
  actualGainKg: number;
  actualGainLbs: number;
  minGainTotalKg: number;
  maxGainTotalKg: number;
  minGainTotalLbs: number;
  maxGainTotalLbs: number;
  recommendedGainTotal: string;
  recommendedGainTotalFormatted: string;
  minGainWeekKg: number;
  maxGainWeekKg: number;
  minGainWeekLbs: number;
  maxGainWeekLbs: number;
  targetGainWeek: string;
  targetGainWeekFormatted: string;
  minWeightTargetKg: number;
  maxWeightTargetKg: number;
  minWeightTargetLbs: number;
  maxWeightTargetLbs: number;
  statusKey: "under" | "on-track" | "over";
  statusLabel: string;
  statusSummary: string;
  statusAdvice: string;
  weeklyRateFormatted: string;
  extraCalorieKcal: number;
  breakdown: WeightCompositionComponent[];
  schedule: WeekScheduleItem[];
  nutrientGuidelines: NutrientGuideline[];
}
