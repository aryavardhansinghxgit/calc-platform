export interface GolfHandicapCalculatorInputs {
  adjustedScore?: number;
  courseRating?: number;
  slopeRating?: number;
}

export interface GolfHandicapCalculatorOutputs {
  differential: number;
  handicapIndex: number;
}
