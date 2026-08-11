export interface PregnancyCalculatorInputs {
  mode?: string;
  lmpDate?: string;
  dueDate?: string;
  conceptionDate?: string;
  ultrasoundDate?: string;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  ivfDate?: string;
  embryoAge?: string;
  customStartDate?: string;
  targetDueDate?: string;
  cycleLength?: number;
  pregnancyType?: string;
  motherAge?: number;
  heightFt?: number;
  heightIn?: number;
  heightCm?: number;
  preWeightLbs?: number;
  preWeightKg?: number;
  currentWeightLbs?: number;
  currentWeightKg?: number;
  unitSystem?: string;
}

export interface PregnancyCalculatorOutputs {
  dueDate: string;
  gestationalAge: string;
  trimester: string;
  conceptionDate: string;
  daysRemaining?: number;
  percentComplete?: number;
}
