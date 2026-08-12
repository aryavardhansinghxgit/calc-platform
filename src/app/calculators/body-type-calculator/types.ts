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
  | "Low Risk (Optimal)"
  | "Moderate Risk"
  | "High Risk (Substantial Abdominal Adiposity)"
  | "Very High Risk";

export type WhtrHealthRiskCategory =
  | "Abnormally Slim"
  | "Healthy / Optimal (Keep Waist Below Half Height)"
  | "Overweight (Increased Health Risk)"
  | "Very Overweight"
  | "Morbidly Obese / High Risk";

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
  };
  shapeComparisons: ShapeComparisonItem[];
}
