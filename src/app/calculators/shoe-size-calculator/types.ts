export type ShoeGender = "men" | "women" | "kids";

export type ShoeBrand =
  | "standard"
  | "nike"
  | "adidas"
  | "converse"
  | "hoka"
  | "vans"
  | "asics"
  | "doc_martens";

export type UnitSystem = "in" | "cm" | "mm";

export type FootWidthCategory =
  | "Narrow (A / 2A / B)"
  | "Standard / Medium (D / M)"
  | "Wide (E / 2E / W)"
  | "Extra Wide (4E / 6E / XW)";

export interface InternationalSizes {
  usMen: number;
  usWomen: number;
  usKids: number;
  uk: number;
  india: number;
  eu: number;
  japanCm: number;
  mondopointMm: number;
  mexico: number;
  australia: number;
}

export interface BrandFitDetails {
  brand: ShoeBrand;
  brandName: string;
  recommendedSizeUs: number;
  fitNote: string;
}

export interface KidsGrowthProjection {
  currentAgeMonths?: number;
  projected3MonthsSizeUs: number;
  projected6MonthsSizeUs: number;
  growthNote: string;
}

export interface ShoeSizeConversionResult {
  gender: ShoeGender;
  usedFootLengthInches: number;
  usedFootLengthCm: number;
  isBilateralUsed: boolean;
  largerFootNote?: string;
  internationalSizes: InternationalSizes;
  widthCategory: FootWidthCategory;
  brandFit?: BrandFitDetails;
  growthProjection?: KidsGrowthProjection;
}
