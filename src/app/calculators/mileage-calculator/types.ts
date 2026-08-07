export interface MileageCalculatorInputs {
  distanceMiles?: number;
  irsRate?: number;
}

export interface MileageCalculatorOutputs {
  reimbursement: number;
  distanceKm: number;
}
