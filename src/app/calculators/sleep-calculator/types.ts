export type SleepPlannerMode = "wakeup" | "bedtime" | "now" | "nap";

export type AgeGroupBracket =
  | "newborn"
  | "infant"
  | "toddler"
  | "preschool"
  | "school"
  | "teen"
  | "adult"
  | "older_adult";

export type Chronotype = "lion" | "bear" | "wolf" | "dolphin";

export interface SleepCycleOption {
  cycles: number;
  totalSleepMinutes: number;
  totalSleepHours: number;
  timeFormatted: string; // Bedtime or Wake-up time string
  status: "optimal" | "sufficient" | "deficit";
  colorTag: string; // Tailwind color class
  note: string;
}

export interface PowerNapOption {
  type: "quick" | "full" | "nappuccino";
  title: string;
  durationMinutes: number;
  bestFor: string;
  instructions: string;
  wakeTimeFormatted: string;
}

export interface SleepDebtResult {
  weeklyActualHours: number;
  weeklyTargetHours: number;
  totalDebtHours: number;
  recoveryDays: number;
  dailyExtraMinutes: number;
  recoveryPlanNotes: string;
}

export interface ChronotypeQuizResult {
  chronotype: Chronotype;
  name: string;
  description: string;
  idealBedtimeWindow: string;
  peakProductivityHours: string;
  caffeineCutoff: string;
}

export interface SleepCalculationResult {
  mode: SleepPlannerMode;
  targetTime: string;
  latencyMinutes: number;
  ageBracket: AgeGroupBracket;
  cycles: SleepCycleOption[];
  naps?: PowerNapOption[];
  debt?: SleepDebtResult;
}
