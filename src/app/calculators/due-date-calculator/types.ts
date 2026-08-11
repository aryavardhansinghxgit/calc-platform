export type DueDateCalculationMode =
  | "lmp"
  | "ultrasound"
  | "conception-date"
  | "ivf"
  | "reverse";

export type IvfTransferType = "day5" | "day3" | "fresh-retrieval";

export interface DueDateCalculatorInputs {
  calculationMode?: DueDateCalculationMode;
  lmpDate?: string;
  cycleLength?: number;
  lutealPhaseLength?: number;
  ultrasoundDate?: string;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  conceptionDate?: string;
  ivfTransferDate?: string;
  ivfEmbryoType?: IvfTransferType;
  targetDueDate?: string;
  motherAge?: number;
  isFirstPregnancy?: boolean;
}

export interface BirthProbabilityPoint {
  week: number;
  weekLabel: string;
  probabilityPercent: number;
  termCategory: "Preterm" | "Early Term" | "Full Term" | "Late Term" | "Postterm";
  description: string;
}

export interface FetalGrowthPoint {
  week: number;
  weekLabel: string;
  lengthCm: number;
  weightGrams: number;
  fruitAnalogy: string;
}

export interface MilestoneItem {
  key: string;
  title: string;
  dateStr: string;
  gestationalAge: string;
  category: "conception" | "implantation" | "testing" | "clinical" | "delivery";
  description: string;
}

export interface DueDateCalculatorOutputs {
  calculationMode: DueDateCalculationMode;
  estimatedDueDate: string;
  estimatedDueDateFormatted: string;
  adjustedMittendorfDueDateFormatted: string;
  earlyTermStartFormatted: string;
  fullTermStartFormatted: string;
  lateTermStartFormatted: string;
  postTermStartFormatted: string;
  currentGestationalWeeks: number;
  currentGestationalDays: number;
  currentTrimester: 1 | 2 | 3;
  daysRemaining: number;
  weeksRemaining: number;
  progressPercent: number;
  estimatedConceptionDateFormatted: string;
  estimatedLmpDateFormatted: string;
  implantationWindowFormatted: string;
  earliestHcgUrineTestDateFormatted: string;
  fetalHeartbeatDateFormatted: string;
  fetalSizeFruit: string;
  fetalLengthCm: number;
  fetalWeightGrams: number;
  confidenceRangeLabel: string;
  motherAge: number;
  cycleLength: number;
  isFirstPregnancy: boolean;
  birthProbabilityDistribution: BirthProbabilityPoint[];
  timelineMilestones: MilestoneItem[];
  fetalGrowthCurve: FetalGrowthPoint[];
  personalizedInsights: {
    title: string;
    text: string;
    advice: string;
  }[];
}
