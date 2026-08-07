export interface HorsepowerCalculatorInputs {
  torqueLbFt?: number;
  rpm?: number;
}

export interface HorsepowerCalculatorOutputs {
  horsepower: number;
  kilowatts: number;
}
