export type BodyTypeMode =
  | "female-fashion"
  | "male-structure"
  | "somatotype"
  | "whr-health"
  | "whtr-metabolic"
  | "body-volume"
  | "wardrobe-style"
  | "fitness-shaping"
  | "comparison"
  | "custom";

export type Gender = "female" | "male";
export type UnitSystem = "us" | "metric";

export type FemaleBodyShape =
  | "Hourglass"
  | "Bottom Hourglass"
  | "Top Hourglass"
  | "Spoon"
  | "Triangle (Pear)"
  | "Inverted Triangle (Apple)"
  | "Rectangle (Banana)";

export type MaleBodyShape =
  | "Trapezoid (V-Shape)"
  | "Inverted Triangle"
  | "Rectangle (Column)"
  | "Oval (Apple)"
  | "Triangle (Pear)";

export type WhrHealthRiskCategory =
  | "Lower Risk Reference (< 0.80)"
  | "Moderate Risk Reference (0.80–0.84)"
  | "Higher Risk Reference (≥ 0.85)"
  | "Lower Risk Reference (< 0.90)"
  | "Moderate Risk Reference (0.90–0.99)"
  | "Higher Risk Reference (≥ 1.00)"
  | "Low Risk (Optimal)"
  | "Moderate Risk"
  | "High Risk (Substantial Abdominal Adiposity)"
  | "Very High Risk";

export type WhtrHealthRiskCategory =
  | "Below 0.40 Reference Point"
  | "Healthy Central Adiposity (0.40–0.49)"
  | "Increased Central Adiposity (0.50–0.59)"
  | "High Central Adiposity (≥ 0.60)"
  | "Abnormally Slim"
  | "Healthy / Optimal (Keep Waist Below Half Height)"
  | "Overweight (Increased Health Risk)"
  | "Very Overweight"
  | "High Central Adiposity (Higher Health Risk)";

export interface SomatotypeScores {
  endomorphy: number; // Fatness / Roundness (1-7)
  mesomorphy: number; // Muscularity / Robustness (1-7)
  ectomorphy: number; // Linearity / Slenderness (1-7)
  dominantType: "Endomorph" | "Mesomorph" | "Ectomorph" | "Balanced";
  description: string;
}

export interface WardrobeRecommendation {
  category: string;
  recommendedStyles: string[];
  stylesToAvoid: string[];
  fabricGuidance: string;
}

export interface BodyTypeInputs {
  mode: BodyTypeMode;
  gender: Gender;
  unitSystem: UnitSystem;
  age: number;
  bustChestInches: number;
  waistInches: number;
  highHipInches: number;
  hipInches: number;
  heightInches: number;
  weightLbs: number;
}

export interface ShapeComparisonItem {
  shapeName: string;
  matchPercentage: number;
  description: string;
}

export interface BodyTypeResults {
  isValid: boolean;
  validationError?: string;
  mode: BodyTypeMode;
  gender: Gender;
  unitSystem: UnitSystem;
  primaryShape: string;
  shapeDescription: string;
  shapeCategory: string;
  bustChestInches: number;
  waistInches: number;
  highHipInches: number;
  hipInches: number;
  heightInches: number;
  weightLbs: number;
  
  // Body Ratios
  whr: number; // Waist-to-Hip Ratio
  whrRisk: WhrHealthRiskCategory;
  whrRiskDescription: string;
  whtr: number; // Waist-to-Height Ratio
  whtrRisk: WhtrHealthRiskCategory;
  whtrRiskDescription: string;
  bustToWaistRatio: number;
  hipToWaistRatio: number;
  bustToHipRatio: number;
  highHipToWaistRatio: number;

  // Somatotype
  somatotype: SomatotypeScores;

  // Recommendations & Styling
  stylingTips: WardrobeRecommendation[];
  fitnessAdvice: string[];
  healthInsights: string[];
  ncsuStudyStats: {
    bananaPct: number;
    pearPct: number;
    applePct: number;
    hourglassPct: number;
    spoonPct: number;
    topHourglassPct: number;
    bottomHourglassPct: number;
  };
  shapeComparisons: ShapeComparisonItem[];
}
