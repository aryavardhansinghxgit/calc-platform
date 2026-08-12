export type PeriodCalculationMode =
  | "lmp"
  | "cycle-length"
  | "future-12m"
  | "tracker"
  | "irregular"
  | "fertility"
  | "pregnancy-plan"
  | "analysis";

export type CycleRegularityType =
  | "regular"
  | "slightly-irregular"
  | "moderately-irregular"
  | "highly-irregular";

export type BirthControlStatusType =
  | "none"
  | "pill"
  | "iud"
  | "implant"
  | "injection";

export interface PeriodInputParams {
  calculationMode: PeriodCalculationMode;
  lmpDate?: string;
  periodLength?: number;
  cycleLength?: number;
  userAge?: number;
  lutealPhaseLength?: number;
  cycleRegularity?: CycleRegularityType;
  birthControl?: BirthControlStatusType;
  isPregnant?: "no" | "yes" | "trying";
  isBreastfeeding?: boolean;
  hasPcos?: boolean;
}

export interface FutureCyclePeriod {
  cycleNumber: number;
  periodStartDate: string;
  periodEndDate: string;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  dueDateIfConceived: string;
  monthLabel: string;
}

export interface DailyFertilityItem {
  dayOffset: number;
  date: string;
  dayLabel: string;
  probability: number;
  status: "Low" | "Moderate" | "High" | "Peak";
  description: string;
}

export interface MenstrualPhaseItem {
  phaseName: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  description: string;
  color: string;
}

export interface CycleTrendItem {
  cycleIndex: number;
  cycleLabel: string;
  cycleLength: number;
  periodLength: number;
  regularityScore: number;
}

export interface PeriodCalculationResults {
  mode: PeriodCalculationMode;
  lmpDate: string;
  nextPeriodStartDate: string;
  nextPeriodEndDate: string;
  daysUntilNextPeriod: number;
  nextOvulationDate: string;
  fertileWindow: {
    start: string;
    end: string;
    peakStart: string;
    peakEnd: string;
  };
  conceptionWindow: {
    start: string;
    end: string;
  };
  implantationWindow: {
    start: string;
    end: string;
    peakDate: string;
  };
  dueDateIfConceived: string;
  futurePeriods: FutureCyclePeriod[];
  probabilities: DailyFertilityItem[];
  cyclePhases: MenstrualPhaseItem[];
  cycleTrends: CycleTrendItem[];
  healthScore: number;
  healthStatus: "Normal" | "Slightly Irregular" | "Moderately Irregular" | "Highly Irregular";
  insights: string[];
  recommendations: string[];
}

export interface PeriodCalculatorOutputs extends Record<string, any> {
  nextPeriodDate: string;
  nextPeriodEndDate: string;
  daysUntilNextPeriod: number;
  ovulationDate: string;
  fertileWindow: string;
  dueDateIfConceived: string;
  healthStatus: string;
  healthScore: number;
}
