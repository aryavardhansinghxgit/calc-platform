export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type ZodiacElement = "fire" | "earth" | "air" | "water";

export type FLAMESOutcome = "Friends" | "Lovers" | "Affection" | "Marriage" | "Enemies" | "Siblings";

export interface DimensionalChemistry {
  passion: number;
  communication: number;
  trust: number;
  longTermVision: number;
}

export interface NumerologyBreakdown {
  name1Personality: number;
  name1SoulUrge: number;
  name2Personality: number;
  name2SoulUrge: number;
  harmonyScore: number;
}

export interface ZodiacBreakdown {
  element1: ZodiacElement;
  element2: ZodiacElement;
  elementHarmonyScore: number;
  verdict: string;
}

export interface LifePathBreakdown {
  lifePath1: number;
  lifePath2: number;
  lifePathScore: number;
}

export interface FLAMESResult {
  outcome: FLAMESOutcome;
  remainingLettersCount: number;
  description: string;
}

export interface LoveCalculatorOutputs {
  compatibilityScore: number;
  tierBadge: string;
  verdict: string;
  moniker: string;
  dimensions: DimensionalChemistry;
  numerology?: NumerologyBreakdown;
  zodiac?: ZodiacBreakdown;
  lifePath?: LifePathBreakdown;
  flames?: FLAMESResult;
  advice: string;
}
