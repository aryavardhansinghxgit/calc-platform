export type ConceptionCalculationMode =
  | "lmp"
  | "ovulation"
  | "due-date"
  | "ultrasound"
  | "ivf"
  | "reverse"
  | "planner"
  | "timeline";

export type CervicalMucusType = "dry" | "sticky" | "creamy" | "watery" | "egg-white";
export type OpkResultType = "none" | "negative" | "positive" | "peak";
export type IvfEmbryoType = "day3" | "day5" | "day6";

export interface ConceptionInputParams {
  calculationMode: ConceptionCalculationMode;
  lmpDate?: string;
  cycleLength?: number;
  periodLength?: number;
  ovulationDate?: string;
  dueDate?: string;
  ultrasoundDate?: string;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  conceptionDate?: string;
  ivfTransferDate?: string;
  ivfEmbryoType?: IvfEmbryoType;
  lutealPhaseLength?: number;
  motherAge?: number;
  cervicalMucus?: CervicalMucusType;
  opkResult?: OpkResultType;
  bbtValue?: number;
  bbtUnit?: "F" | "C";
  targetPlannerMonths?: number;
}

export interface DailyFertilityProbability {
  dayOffset: number;
  date: string;
  dayLabel: string;
  probability: number; // Percentage, e.g. 33
  status: "Low" | "Moderate" | "High" | "Peak";
  description: string;
}

export interface CyclePhaseItem {
  phaseName: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  description: string;
  color: string;
}

export interface PregnancyMilestoneItem {
  title: string;
  date: string;
  gestationalAge: string;
  description: string;
  category: "Conception" | "Implantation" | "Medical" | "Milestone" | "Trimester";
}

export interface FertilityForecastCycle {
  cycleNumber: number;
  periodStartDate: string;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  peakFertilityDate: string;
  dueDateIfConceived: string;
}

export interface BBTLogEntry {
  day: number;
  date: string;
  temperature: number;
  phase: "Follicular" | "Ovulation" | "Luteal";
}

export interface ConceptionCalculationResults {
  mode: ConceptionCalculationMode;
  conceptionDate: string;
  conceptionWindow: {
    start: string;
    end: string;
    mostLikely: string;
  };
  fertileWindow: {
    start: string;
    end: string;
    peakStart: string;
    peakEnd: string;
  };
  ovulationDate: string;
  estimatedDueDate: string;
  estimatedLmpDate: string;
  implantationWindow: {
    start: string;
    end: string;
    peakDate: string;
  };
  earliestTestDate: {
    sensitive10Dpo: string;
    standard14Dpo: string;
  };
  gestationalAge: {
    weeks: number;
    days: number;
    formatted: string;
  };
  trimester: number; // 1, 2, or 3
  overallFertilityScore: number; // 0 to 100
  fertilityStatus: "Low" | "Moderate" | "High" | "Peak";
  probabilities: DailyFertilityProbability[];
  cyclePhases: CyclePhaseItem[];
  milestones: PregnancyMilestoneItem[];
  forecast: FertilityForecastCycle[];
  sampleBBTData: BBTLogEntry[];
  insights: string[];
  recommendations: string[];
}

export interface ConceptionCalculatorOutputs extends Record<string, any> {
  conceptionDate: string;
  conceptionWindow: string;
  fertileWindow: string;
  ovulationDate: string;
  dueDate: string;
  lmpDate: string;
  implantationWindow: string;
  earliestTestDate: string;
  overallScore: number;
}
