export interface BACCalculatorInputs {
  gender?: string;
  weightKg?: number;
  drinksCount?: number;
  hoursSinceFirst?: number;
}

export interface BACCalculatorOutputs {
  bac: number;
  sobrietyHours: number;
  status: string;
}
