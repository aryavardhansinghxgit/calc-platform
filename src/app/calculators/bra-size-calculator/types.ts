export type BraUnit = "in" | "cm";
export type RegionStandard = "US" | "UK" | "EU" | "FR" | "AU" | "IN";
export type BreastShape = "even" | "shallow" | "projected" | "asymmetrical" | "bell" | "teardrop";

export interface SisterSize {
  size: string;
  bandAdjustment: string;
  cupAdjustment: string;
  fitGuidance: string;
}

export interface BraStyleRecommendation {
  styleName: string;
  description: string;
  idealFor: string;
  supportLevel: string;
}

export interface MultiSystemResult {
  us: string;
  uk: string;
  eu: string;
  fr: string;
  au: string;
  in: string;
  bandSizeInches: number;
  cupLetterUS: string;
  cupLetterUK: string;
  cupLetterEU: string;
}

export interface BraSizeCalculationResult {
  primarySize: string;
  bandSizeInches: number;
  underbustInches: number;
  bustInches: number;
  diffInches: number;
  multiSystem: MultiSystemResult;
  sisterSizes: SisterSize[];
  recommendedStyles: BraStyleRecommendation[];
  shapeAdvice: string;
}
