export type OvulationCalculationMode =
  | "lmp"
  | "next-period"
  | "due-date"
  | "conception-date"
  | "reverse"
  | "advanced-planner";

export type FertilityGoal =
  | "general-conception"
  | "fertile-window-optimization"
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
  reverseOvulationDate?: string;
  opkTestDate?: string;
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
  status:
    | "menstrual"
    | "fertile"
    | "peak"
    | "ovulation"
    | "implantation"
    | "normal"
    | "next-period";
  fertilityScore: number; // 0 to 100 relative index
  description: string;
  isToday: boolean;
}

export interface ConceptionProbabilityPoint {
  dayLabel: string; // e.g. "O-5", "O-2", "Ovulation Day (O)", "O+1"
  dayOffset: number; // -5 to +1
  probabilityPercent: number; // Wilcox et al. population reference fecundability
  fertilityLevel: "Low" | "Moderate" | "High" | "Peak";
  clinicalInterpretation: string;
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
  dailyFertilityScore: number; // Relative 0-100 scale
  fertilityRating: "Low" | "Moderate" | "High" | "Peak";
  fecundabilityReferenceNote: string;
  cycleLength: number;
  periodLength: number;
  lutealPhaseLength: number;
  motherAge: number;
  fertilityGoal: FertilityGoal;
  confidenceLabel: string;
  conceptionProbabilityCurve: ConceptionProbabilityPoint[];
  hormoneCycleData: HormoneDataPoint[];
  monthlyCalendarDays: CalendarDayInfo[];
  timingRecommendation: {
    title: string;
    bestWindow: string;
    explanation: string;
  };
  historicalContextNote: {
    title: string;
    explanation: string;
  };
  personalizedInsights: {
    title: string;
    text: string;
    advice: string;
  }[];
}
