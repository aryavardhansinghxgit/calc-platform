export interface AgeCalculatorInputs {
  birthDate?: string;
  targetDate?: string;
}

export interface AgeCalculatorOutputs {
  ageYearsMonthsDays: string;
  totalDays: number;
  nextBirthday: number;
}
