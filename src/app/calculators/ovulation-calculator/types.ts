export type OvulationCalculationMode =
  | "lmp"
  | "next-period"
  | "due-date"
  | "conception-date"
  | "reverse"
  | "advanced-planner";

export type FertilityGoal =
  | "general-conception"
  | "conceive-girl"
  | "conceive-boy"
  | "avoid-pregnancy";

export type CervicalMucusType = "dry" | "sticky" | "creamy" | "egg-white";
export type OpkResult = "negative" | "positive" | "peak";

export interface OvulationCalculatorInputs {
  calculationMode?: OvulationCalculationMode;
  lastPeriodDate?: string;
  cycleLength?: number;
  periodLength?: number;
  lutealPhaseLength?: number;
  nextPeriodDate?: string;
  targetDueDate?: string;
  conceptionDate?: string;
  motherAge?: number;
  fertilityGoal?: FertilityGoal;
  bbtTemp?: number;
  opkResult?: OpkResult;
  cervicalMucus?: CervicalMucusType;
}

export interface CalendarDayInfo {
  dateIso: string;
  dayOfMonth: number;
  monthName: string;
  dayOfWeekShort: string;
  status: "menstrual" | "fertile" | "peak" | "ovulation" | "implantation" | "normal" | "next-period";
  fertilityScore: number; // 0 to 100%
  description: string;
  isToday: boolean;
}

export interface ConceptionProbabilityPoint {
  dayLabel: string; // e.g. "O-5", "O-2", "Ovulation", "O+1"
  dayOffset: number; // -5 to +1
  probabilityPercent: number;
  fertilityLevel: "Low" | "Moderate" | "High" | "Peak";
  genderLean: "Girl Lean (X-Sperm)" | "Neutral" | "Boy Lean (Y-Sperm)";
}

export interface HormoneDataPoint {
  day: number;
  dayLabel: string;
  estrogen: number;
  lh: number;
  progesterone: number;
}

export interface OvulationCalculatorOutputs {
  calculationMode: OvulationCalculationMode;
  predictedOvulationDate: string;
  predictedOvulationDateFormatted: string;
  fertileWindowStartFormatted: string;
  fertileWindowEndFormatted: string;
  peakFertilityStartFormatted: string;
  peakFertilityEndFormatted: string;
  nextPeriodDateFormatted: string;
  implantationWindowStartFormatted: string;
  implantationWindowEndFormatted: string;
  earliestHcgUrineTestDateFormatted: string;
  estimatedDueDateFormatted: string;
  dailyFertilityScore: number;
  fertilityRating: "Low" | "Moderate" | "High" | "Peak";
  cycleLength: number;
  periodLength: number;
  lutealPhaseLength: number;
  motherAge: number;
  fertilityGoal: FertilityGoal;
  confidenceLabel: string;
  conceptionProbabilityCurve: ConceptionProbabilityPoint[];
  hormoneCycleData: HormoneDataPoint[];
  monthlyCalendarDays: CalendarDayInfo[];
  shettlesRecommendation: {
    title: string;
    bestWindow: string;
    explanation: string;
  };
  personalizedInsights: {
    title: string;
    text: string;
    advice: string;
  }[];
}
