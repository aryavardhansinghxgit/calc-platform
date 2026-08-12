export type BacMode =
  | "widmark-standard"
  | "driving-sobriety"
  | "drink-counter"
  | "elimination-timeline"
  | "gender-weight-matrix"
  | "seidl-anthropometric"
  | "watson-tbw"
  | "calories-metabolism"
  | "drink-comparison"
  | "custom-toxicology";

export type Gender = "male" | "female";
export type UnitSystem = "us" | "metric";

export interface DrinkEntry {
  id: string;
  name: string;
  category: "beer" | "wine" | "liquor" | "cocktail" | "custom";
  count: number;
  volumeMl: number;
  abvPercent: number;
}

export interface EliminationPoint {
  hour: number;
  timeLabel: string;
  bacPercent: number;
  bacGramsPerLiter: number;
  status: string;
  canDrive: boolean;
}

export interface ImpairmentStage {
  stageName: string;
  bacRangeText: string;
  behavior: string;
  impairment: string;
  colorHex: string;
}

export interface LegalDrivingThreshold {
  countryRegion: string;
  legalLimitBac: number;
  status: "Legal" | "Warning" | "Illegal / License Revocation";
  hoursUntilLegal: number;
}

export interface BacInputs {
  mode: BacMode;
  gender: Gender;
  unitSystem: UnitSystem;
  ageYears: number;

  // Weight & Height Imperial
  weightLbs: number;
  heightFeet: number;
  heightInches: number;

  // Weight & Height Metric
  weightKg: number;
  heightCm: number;

  // Drinking Session Time
  timeSinceFirstDrinkHours: number;
  timeSinceFirstDrinkMinutes: number;

  // Food / Stomach State
  stomachState: "empty" | "full" | "light";

  // Elimination Rate Override (g/dL/hr, default 0.015)
  eliminationRateBeta: number;

  // Drinks Log
  drinks: DrinkEntry[];
}

export interface BacResults {
  mode: BacMode;
  gender: Gender;
  unitSystem: UnitSystem;
  ageYears: number;
  weightKg: number;
  weightLbs: number;
  heightCm: number;

  // Core BAC Metrics
  currentBacPercent: number;
  currentBacGramsPerLiter: number;
  peakBacPercent: number;
  peakTimeMinutes: number;

  // Total Alcohol Intake
  totalPureAlcoholGrams: number;
  totalStandardDrinks: number; // 14g pure alcohol in US
  totalAlcoholCalories: number; // 7 kcal/g

  // Time & Sobriety Metrics
  elapsedHours: number;
  hoursUntilLegalLimit008: number;
  hoursUntilLegalLimit005: number;
  hoursUntilSober000: number;

  // Impairment & Safety Stage
  impairmentStage: ImpairmentStage;
  legalThresholds: LegalDrivingThreshold[];

  // Hour-by-Hour Timeline Curve
  eliminationCurve: EliminationPoint[];

  // Clinical & Safety Recommendations
  safetyWarnings: string[];
  recommendations: string[];
}
