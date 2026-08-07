export interface GasMileageCalculatorInputs {
  startOdometer?: number;
  endOdometer?: number;
  gallonsFilled?: number;
}

export interface GasMileageCalculatorOutputs {
  mpg: number;
  l100km: number;
}
