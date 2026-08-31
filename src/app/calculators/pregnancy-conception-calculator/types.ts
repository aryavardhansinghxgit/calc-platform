export type ConceptionCalculationMode =
  | "due-date"
  | "lmp"
  | "ultrasound"
  | "conception-date"
  | "ovulation-date"
  | "reverse"
  | "ivf";

export type IvfEmbryoType = "day3" | "day5" | "fresh-retrieval";

export interface PregnancyConceptionCalculatorInputs {
  calculationMode?: ConceptionCalculationMode;
  dueDate?: string;
  lmpDate?: string;
  ultrasoundDate?: string;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  conceptionDate?: string;
  ovulationDate?: string;
  ivfTransferDate?: string;
  ivfEmbryoType?: IvfEmbryoType;
  cycleLength?: number;
  lutealPhaseLength?: number;
  periodLength?: number;
  motherAge?: number;
}

export interface ConceptionProbabilityPoint {
  dayOffset: number; // e.g. -5, -4, -3, -2, -1, 0, +1
  dayLabel: string;
  dateStr: string;
  probabilityPercent: number;
  fertilityLevel: "Low" | "Medium" | "High" | "Peak";
  description: string;
}

export interface TimelineMilestoneItem {
  key: string;
  title: string;
  dateStr: string;
  gestationalAge: string;
  category: "conception" | "implantation" | "testing" | "clinical" | "delivery";
  description: string;
}

export interface ImplantationStageInfo {
  dpo: number; // Days Past Ovulation
  dateStr: string;
  probabilityPercent: number;
  stageName: string;
  description: string;
}

export interface PregnancyConceptionCalculatorOutputs {
  calculationMode: ConceptionCalculationMode;
  estimatedConceptionDate: string;
  estimatedConceptionDateFormatted: string;
  conceptionRangeStartFormatted: string;
  conceptionRangeEndFormatted: string;
  estimatedOvulationDateFormatted: string;
  fertileWindowStart?: string;
  fertileWindowEnd?: string;
  fertileWindowStartFormatted: string;
  fertileWindowEndFormatted: string;
  fertileWindowFormatted: string;
  implantationWindowStartFormatted: string;
  implantationWindowEndFormatted: string;
  implantationWindowFormatted: string;
  estimatedDueDate: string;
  estimatedDueDateFormatted: string;
  lmpDateFormatted: string;
  earliestHcgBloodTestDateFormatted: string;
  earliestHcgUrineTestDateFormatted: string;
  fetalHeartbeatDateFormatted: string;
  currentGestationalAgeWeeks: number;
  currentGestationalAgeDays: number;
  confidenceRangeLabel: string;
  motherAge: number;
  cycleLength: number;
  lutealPhaseLength: number;
  probabilityCurve: ConceptionProbabilityPoint[];
  timelineMilestones: TimelineMilestoneItem[];
  implantationStages: ImplantationStageInfo[];
  personalizedInsights: {
    title: string;
    text: string;
    advice: string;
  }[];
}
