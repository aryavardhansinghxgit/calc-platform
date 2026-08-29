export type UnitSystem = "us" | "metric" | "other";
export type Gender = "male" | "female";
export type FrameSize = "small" | "medium" | "large";
export type FrameMode = "auto" | "manual";

export interface IdealWeightInput {
  unitSystem?: UnitSystem;
  gender: Gender;
  age: number;
  // US Units
  heightFeet?: number;
  heightInches?: number;
  currentWeightLbs?: number;
  wristInches?: number;
  // Metric Units
  heightCm?: number;
  currentWeightKg?: number;
  wristCm?: number;
  // Frame options
  frameSize?: FrameSize;
  frameMode?: FrameMode;
}

export interface IdealWeightFormulaResult {
  name: string;
  year: string;
  weightKg: number;
  weightLbs: number;
  description: string;
}

export interface IdealWeightResult {
  heightCm: number;
  heightInches: number;
  gender: Gender;
  age: number;
  frameSize: FrameSize;
  frameMode: FrameMode;
  frameMultiplier: number;
  isSub5Feet: boolean;
  // Formulas
  hamwi: IdealWeightFormulaResult;
  devine: IdealWeightFormulaResult;
  robinson: IdealWeightFormulaResult;
  miller: IdealWeightFormulaResult;
  lemmens: IdealWeightFormulaResult;
  // Consensus Average
  consensusKg: number;
  consensusLbs: number;
  // WHO Healthy BMI Range (18.5 - 24.99) - Unscaled by frame size
  whoMinKg: number;
  whoMinLbs: number;
  whoMaxKg: number;
  whoMaxLbs: number;
  whoPrimeKg: number;
  whoPrimeLbs: number;
  // Current Weight Comparison (if provided)
  currentWeightKg?: number;
  currentWeightLbs?: number;
  weightDeltaLbs: number; // positive = to lose, negative = to gain
  weightDeltaKg: number;
  statusCategory: "Underweight" | "Optimal Ideal Range" | "Overweight" | "Obese";
  // Timeline estimates to reach consensus IBW
  weeksAtHalfLbPerWk: number;
  weeksAtOneLbPerWk: number;
  weeksAtOneAndHalfLbPerWk: number;
  weeksAtTwoLbsPerWk: number;
}

export function evaluateFrameSizeFromWrist(
  gender: Gender,
  heightCm: number,
  wristCm?: number,
  wristInches?: number
): FrameSize {
  let wIn = wristInches && wristInches > 0 ? wristInches : 0;
  if (!wIn && wristCm && wristCm > 0) {
    wIn = wristCm / 2.54;
  }
  if (!wIn) return "medium";

  const heightIn = heightCm / 2.54;

  if (gender === "female") {
    if (heightIn < 62) {
      if (wIn < 5.5) return "small";
      if (wIn <= 5.75) return "medium";
      return "large";
    } else if (heightIn <= 65) {
      if (wIn < 6.0) return "small";
      if (wIn <= 6.25) return "medium";
      return "large";
    } else {
      if (wIn < 6.25) return "small";
      if (wIn <= 6.5) return "medium";
      return "large";
    }
  } else {
    if (wIn < 6.5) return "small";
    if (wIn <= 7.5) return "medium";
    return "large";
  }
}

export function calculateIdealWeight(input: IdealWeightInput): IdealWeightResult {
  const gender: Gender = input.gender === "female" ? "female" : "male";
  const age = Math.max(2, Math.min(120, Number(input.age) || 28));
  const unitSystem = input.unitSystem || "us";

  let heightCm = 178;
  let currentWeightKg = 0;

  if (input.heightCm && (!input.heightFeet || unitSystem === "metric")) {
    heightCm = Number(input.heightCm);
    if (input.currentWeightKg && input.currentWeightKg > 0) {
      currentWeightKg = input.currentWeightKg;
    } else if (input.currentWeightLbs && input.currentWeightLbs > 0) {
      currentWeightKg = input.currentWeightLbs * 0.45359237;
    }
  } else if (unitSystem === "us") {
    const feet = Number(input.heightFeet) || 5;
    const inches = Number(input.heightInches) || 10;
    heightCm = (feet * 12 + inches) * 2.54;
    if (input.currentWeightLbs && input.currentWeightLbs > 0) {
      currentWeightKg = input.currentWeightLbs * 0.45359237;
    }
  } else if (unitSystem === "metric") {
    heightCm = Number(input.heightCm) || 178;
    if (input.currentWeightKg && input.currentWeightKg > 0) {
      currentWeightKg = input.currentWeightKg;
    }
  } else if (unitSystem === "other") {
    if (input.heightCm && input.heightCm > 0) heightCm = input.heightCm;
    if (input.currentWeightKg && input.currentWeightKg > 0) currentWeightKg = input.currentWeightKg;
  }

  // Safety clamps (e.g. 90 cm to 250 cm)
  heightCm = Math.max(90, Math.min(250, heightCm));
  const rawInches = heightCm / 2.54;
  const heightInches = parseFloat(rawInches.toFixed(1));
  const heightM = heightCm / 100;
  
  // Height relative to 5-foot (60-inch / 152.4 cm) baseline
  const isSub5Feet = heightCm < 152.4 || rawInches < 60;
  const inchesDiffFrom60 = rawInches - 60;

  // Frame Size Model: Manual selection is authoritative when frameMode === "manual"
  const frameMode: FrameMode = input.frameMode || "manual";
  let frameSize: FrameSize = input.frameSize || "medium";

  if (frameMode === "auto" && (input.wristInches || input.wristCm)) {
    frameSize = evaluateFrameSizeFromWrist(gender, heightCm, input.wristCm, input.wristInches);
  }

  const frameMultiplier = frameSize === "small" ? 0.9 : frameSize === "large" ? 1.1 : 1.0;

  // 1. Hamwi Formula (1964)
  const hamwiBaseKg = Math.max(
    15,
    gender === "male" ? 48.0 + 2.7 * inchesDiffFrom60 : 45.5 + 2.2 * inchesDiffFrom60
  );
  const hamwiKg = parseFloat((hamwiBaseKg * frameMultiplier).toFixed(1));
  const hamwiLbs = parseFloat((hamwiKg / 0.45359237).toFixed(1));

  // 2. Devine Formula (1974)
  const devineBaseKg = Math.max(
    15,
    gender === "male" ? 50.0 + 2.3 * inchesDiffFrom60 : 45.5 + 2.3 * inchesDiffFrom60
  );
  const devineKg = parseFloat((devineBaseKg * frameMultiplier).toFixed(1));
  const devineLbs = parseFloat((devineKg / 0.45359237).toFixed(1));

  // 3. Robinson Formula (1983)
  const robinsonBaseKg = Math.max(
    15,
    gender === "male" ? 52.0 + 1.9 * inchesDiffFrom60 : 49.0 + 1.7 * inchesDiffFrom60
  );
  const robinsonKg = parseFloat((robinsonBaseKg * frameMultiplier).toFixed(1));
  const robinsonLbs = parseFloat((robinsonKg / 0.45359237).toFixed(1));

  // 4. Miller Formula (1983)
  const millerBaseKg = Math.max(
    15,
    gender === "male" ? 56.2 + 1.41 * inchesDiffFrom60 : 53.1 + 1.36 * inchesDiffFrom60
  );
  const millerKg = parseFloat((millerBaseKg * frameMultiplier).toFixed(1));
  const millerLbs = parseFloat((millerKg / 0.45359237).toFixed(1));

  // 5. Lemmens Formula (2005)
  const lemmensBaseKg = 22 * heightM * heightM;
  const lemmensKg = parseFloat((lemmensBaseKg * frameMultiplier).toFixed(1));
  const lemmensLbs = parseFloat((lemmensKg / 0.45359237).toFixed(1));

  // Consensus Average
  const consensusKg = parseFloat(((hamwiKg + devineKg + robinsonKg + millerKg + lemmensKg) / 5).toFixed(1));
  const consensusLbs = parseFloat((consensusKg / 0.45359237).toFixed(1));

  // WHO Healthy BMI Range (18.5 - 24.99) — STRICTLY INDEPENDENT of frame multiplier!
  const whoMinKg = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const whoMinLbs = parseFloat((whoMinKg / 0.45359237).toFixed(1));

  const whoMaxKg = parseFloat((24.99 * heightM * heightM).toFixed(1));
  const whoMaxLbs = parseFloat((whoMaxKg / 0.45359237).toFixed(1));

  const whoPrimeKg = parseFloat((21.75 * heightM * heightM).toFixed(1));
  const whoPrimeLbs = parseFloat((whoPrimeKg / 0.45359237).toFixed(1));

  // Current Weight Comparison
  const currentLbs = currentWeightKg > 0 ? parseFloat((currentWeightKg / 0.45359237).toFixed(1)) : undefined;
  const currentKgVal = currentWeightKg > 0 ? parseFloat(currentWeightKg.toFixed(1)) : undefined;

  let weightDeltaLbs = 0;
  let weightDeltaKg = 0;
  let statusCategory: "Underweight" | "Optimal Ideal Range" | "Overweight" | "Obese" = "Optimal Ideal Range";

  if (currentLbs) {
    weightDeltaLbs = parseFloat((currentLbs - consensusLbs).toFixed(1));
    weightDeltaKg = parseFloat((currentWeightKg - consensusKg).toFixed(1));

    const currentBmi = currentWeightKg / (heightM * heightM);
    if (currentBmi < 18.5) statusCategory = "Underweight";
    else if (currentBmi <= 24.9) statusCategory = "Optimal Ideal Range";
    else if (currentBmi <= 29.9) statusCategory = "Overweight";
    else statusCategory = "Obese";
  }

  const absDeltaLbs = Math.abs(weightDeltaLbs);
  const weeksAtHalfLbPerWk = Math.max(0, Math.ceil(absDeltaLbs / 0.5));
  const weeksAtOneLbPerWk = Math.max(0, Math.ceil(absDeltaLbs / 1.0));
  const weeksAtOneAndHalfLbPerWk = Math.max(0, Math.ceil(absDeltaLbs / 1.5));
  const weeksAtTwoLbsPerWk = Math.max(0, Math.ceil(absDeltaLbs / 2.0));

  return {
    heightCm: Math.round(heightCm),
    heightInches,
    gender,
    age,
    frameSize,
    frameMode,
    frameMultiplier,
    isSub5Feet,
    hamwi: {
      name: "Hamwi Formula",
      year: "1964",
      weightKg: hamwiKg,
      weightLbs: hamwiLbs,
      description: "Originally created for medicinal drug dosing baseline calculation",
    },
    devine: {
      name: "Devine Formula",
      year: "1974",
      weightKg: devineKg,
      weightLbs: devineLbs,
      description: "Most widely used formula in clinical pharmacology and research",
    },
    robinson: {
      name: "Robinson Formula",
      year: "1983",
      weightKg: robinsonKg,
      weightLbs: robinsonLbs,
      description: "Modification of Devine equation based on empirical population research",
    },
    miller: {
      name: "Miller Formula",
      year: "1983",
      weightKg: millerKg,
      weightLbs: millerLbs,
      description: "Updated empirical formula modifying baseline weights for men and women",
    },
    lemmens: {
      name: "Lemmens Formula",
      year: "2005",
      weightKg: lemmensKg,
      weightLbs: lemmensLbs,
      description: "Modern target formula setting ideal weight at 22.0 BMI baseline",
    },
    consensusKg,
    consensusLbs,
    whoMinKg,
    whoMinLbs,
    whoMaxKg,
    whoMaxLbs,
    whoPrimeKg,
    whoPrimeLbs,
    currentWeightKg: currentKgVal,
    currentWeightLbs: currentLbs,
    weightDeltaLbs,
    weightDeltaKg,
    statusCategory,
    weeksAtHalfLbPerWk,
    weeksAtOneLbPerWk,
    weeksAtOneAndHalfLbPerWk,
    weeksAtTwoLbsPerWk,
  };
}
