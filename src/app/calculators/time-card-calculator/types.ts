export interface TimeCardCalculatorInputs {
  monHours?: number;
  tueHours?: number;
  wedHours?: number;
  thuHours?: number;
  friHours?: number;
  hourlyRate?: number;
}

export interface TimeCardCalculatorOutputs {
  grossPay: number;
  totalHours: number;
  regularPay: number;
  overtimePay: number;
}
