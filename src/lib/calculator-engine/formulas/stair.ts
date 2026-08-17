/**
 * Mathematical Calculation Engine for Stair Calculator Suite
 * Compliant with IRC (International Residential Code) R311.7 & IBC (International Building Code)
 */

export type StairLinearUnit = "inches" | "feet" | "meters" | "centimeters";
export type MountType = "standard" | "flush"; // standard: top tread is 1 step down from floor; flush: top tread is level with floor

export interface StairBasicInput {
  runMode: "one_run" | "total_run";
  runValue: number; // Single step run or total run
  runUnit: StairLinearUnit;
  totalRise: number;
  riseUnit: StairLinearUnit;
}

export interface StairComprehensiveInput {
  runMode: "one_run" | "total_run";
  runValue: number;
  runUnit: StairLinearUnit;
  totalRise: number;
  riseUnit: StairLinearUnit;
  riseMode: "fixed_rise" | "fixed_steps";
  targetRiserHeight?: number; // inches
  fixedStepsCount?: number;
  hasTread: boolean;
  treadThickness: number; // inches (default 1" or 1.125")
  nosingLength: number; // inches (default 0.75" to 1")
  hasHeadroomRestriction: boolean;
  floorThickness?: number; // inches (default 10" or 12")
  headroomRequired?: number; // inches (default 80" IRC)
  mountType: MountType; // "standard" or "flush"
}

export interface StairCodeCompliance {
  isCompliant: boolean;
  riserStatus: "pass" | "fail_high" | "fail_low";
  treadStatus: "pass" | "fail_low";
  angleStatus: "pass" | "steep" | "shallow";
  headroomStatus: "pass" | "fail";
  blondelStatus: "ideal" | "acceptable" | "poor";
  blondelValue: number; // 2R + T
  messages: string[];
}

export interface StairCalculationResult {
  totalRiseInches: number;
  totalRiseFeet: number;
  totalRiseCm: number;
  
  numberOfRisers: number;
  exactRiserHeightInches: number;
  exactRiserHeightFraction: string;
  exactRiserHeightCm: number;

  numberOfTreads: number;
  exactTreadDepthInches: number; // Run
  exactTreadDepthFraction: string;
  exactTreadDepthCm: number;

  totalRunInches: number;
  totalRunFeet: number;
  totalRunCm: number;

  inclineAngleDegrees: number;
  stringerLengthInches: number;
  stringerLengthFeet: number;
  stringerHeightInches: number;

  treadThicknessInches: number;
  nosingLengthInches: number;
  effectiveTreadSurfaceInches: number; // Tread run + nosing

  mountType: MountType;
  compliance: StairCodeCompliance;
}

export interface StairHeadroomResult {
  floorToFloorInches: number;
  floorThicknessInches: number;
  targetHeadroomInches: number;
  openingLengthInches: number;
  openingLengthFeet: number;
  
  actualHeadroomInches: number;
  actualHeadroomFeet: number;
  minRequiredOpeningInches: number;
  minRequiredOpeningFeet: number;
  stepsUnderCeiling: number;
  isCompliant: boolean;
}

export interface StairMaterialInput {
  stairWidthInches: number; // e.g. 36", 42", 48"
  stringerLumberSize: "2x10" | "2x12";
  treadMaterial: "pine" | "oak" | "hardwood" | "composite" | "pressure_treated";
  riserMaterial: "plywood" | "hardwood" | "primed_mdf" | "none";
  pricePerStringerBoard: number;
  pricePerTread: number;
  pricePerRiser: number;
  fastenersAndBracketsCost: number;
  handrailCost?: number;
  laborCost?: number;
  taxRatePercent: number;
}

export interface StairMaterialResult {
  stringersCount: number;
  stringerBoardLengthFt: number;
  stringerBoardSize: string;
  totalTreadsCount: number;
  totalRisersCount: number;
  
  stringerLumberCost: number;
  treadsCost: number;
  risersCost: number;
  fastenersCost: number;
  handrailCost: number;
  laborCost: number;
  materialsSubtotal: number;
  taxCost: number;
  totalEstimatedCost: number;
}

// ─── Unit Conversion Helpers ────────────────────────────────────────────────

export function toInches(val: number, unit: StairLinearUnit): number {
  switch (unit) {
    case "inches":
      return val;
    case "feet":
      return val * 12;
    case "meters":
      return val * 39.3700787;
    case "centimeters":
      return val * 0.393700787;
    default:
      return val;
  }
}

export function fromInches(inches: number, unit: StairLinearUnit): number {
  switch (unit) {
    case "inches":
      return inches;
    case "feet":
      return inches / 12;
    case "meters":
      return inches / 39.3700787;
    case "centimeters":
      return inches * 2.54;
    default:
      return inches;
  }
}

/**
 * Converts a decimal number of inches into a standard carpentry fraction (to nearest 1/16")
 */
export function toCarpentryFraction(decimalInches: number): string {
  if (isNaN(decimalInches) || decimalInches <= 0) return "0\"";
  const whole = Math.floor(decimalInches);
  const remainder = decimalInches - whole;
  const sixteenths = Math.round(remainder * 16);

  if (sixteenths === 0) return `${whole}"`;
  if (sixteenths === 16) return `${whole + 1}"`;

  // Reduce fraction
  let num = sixteenths;
  let den = 16;
  if (num % 8 === 0) {
    num /= 8;
    den /= 8;
  } else if (num % 4 === 0) {
    num /= 4;
    den /= 4;
  } else if (num % 2 === 0) {
    num /= 2;
    den /= 2;
  }

  return whole > 0 ? `${whole} ${num}/${den}"` : `${num}/${den}"`;
}

// ─── Code Compliance Evaluation (IRC R311.7) ─────────────────────────────────

export function evaluateStairCompliance(
  riserInches: number,
  treadInches: number,
  angleDeg: number,
  headroomInches: number = 80
): StairCodeCompliance {
  const messages: string[] = [];

  // 1. Riser Check (IRC max 7.75" / 197mm, min 4.0")
  let riserStatus: "pass" | "fail_high" | "fail_low" = "pass";
  if (riserInches > 7.75) {
    riserStatus = "fail_high";
    messages.push(`Riser height (${riserInches.toFixed(2)}") exceeds IRC max of 7.75".`);
  } else if (riserInches < 4.0) {
    riserStatus = "fail_low";
    messages.push(`Riser height (${riserInches.toFixed(2)}") is below standard minimum of 4.0".`);
  }

  // 2. Tread Depth Check (IRC min 10.0" / 254mm)
  let treadStatus: "pass" | "fail_low" = "pass";
  if (treadInches < 10.0) {
    treadStatus = "fail_low";
    messages.push(`Tread run (${treadInches.toFixed(2)}") is below IRC code minimum of 10.0".`);
  }

  // 3. Incline Angle Check (Comfortable residential angle: 30° to 37°, max 42°)
  let angleStatus: "pass" | "steep" | "shallow" = "pass";
  if (angleDeg > 42) {
    angleStatus = "steep";
    messages.push(`Incline angle (${angleDeg.toFixed(1)}°) is excessively steep (ideal: 30°–37°).`);
  } else if (angleDeg < 25) {
    angleStatus = "shallow";
    messages.push(`Incline angle (${angleDeg.toFixed(1)}°) is very shallow.`);
  }

  // 4. Headroom Check (IRC min 80" / 6'8")
  let headroomStatus: "pass" | "fail" = "pass";
  if (headroomInches < 80) {
    headroomStatus = "fail";
    messages.push(`Headroom (${headroomInches.toFixed(1)}") is below IRC minimum of 80" (6'8").`);
  }

  // 5. Blondel's Comfort Formula (2R + T should be 24" to 25")
  const blondelValue = 2 * riserInches + treadInches;
  let blondelStatus: "ideal" | "acceptable" | "poor" = "acceptable";
  if (blondelValue >= 24.0 && blondelValue <= 25.0) {
    blondelStatus = "ideal";
  } else if (blondelValue < 23.0 || blondelValue > 26.0) {
    blondelStatus = "poor";
    messages.push(`Comfort rule (2R + T = ${blondelValue.toFixed(1)}") is outside optimal 24"–25" range.`);
  }

  const isCompliant =
    riserStatus === "pass" &&
    treadStatus === "pass" &&
    headroomStatus === "pass" &&
    angleDeg <= 42;

  return {
    isCompliant,
    riserStatus,
    treadStatus,
    angleStatus,
    headroomStatus,
    blondelStatus,
    blondelValue,
    messages,
  };
}

// ─── Primary Stair Calculations ─────────────────────────────────────────────

export function calculateBasicStair(input: StairBasicInput): StairCalculationResult {
  const totalRiseInches = toInches(input.totalRise, input.riseUnit);
  let singleRunInches = 10; // Default 10 inches

  if (input.runMode === "one_run") {
    singleRunInches = toInches(input.runValue, input.runUnit) || 10;
  }

  // Target standard riser is ~7.5"
  const targetRiser = 7.5;
  const numberOfRisers = Math.max(1, Math.round(totalRiseInches / targetRiser));
  const exactRiserHeightInches = totalRiseInches / numberOfRisers;

  // Standard mount: top step is 1 step down from floor landing
  const numberOfTreads = Math.max(1, numberOfRisers - 1);

  let exactTreadDepthInches = singleRunInches;
  let totalRunInches = 0;

  if (input.runMode === "total_run") {
    totalRunInches = toInches(input.runValue, input.runUnit) || 100;
    exactTreadDepthInches = totalRunInches / numberOfTreads;
  } else {
    totalRunInches = exactTreadDepthInches * numberOfTreads;
  }

  const angleRad = Math.atan2(totalRiseInches, totalRunInches);
  const inclineAngleDegrees = (angleRad * 180) / Math.PI;

  const stringerLengthInches = Math.sqrt(
    Math.pow(totalRiseInches, 2) + Math.pow(totalRunInches, 2)
  );

  const compliance = evaluateStairCompliance(
    exactRiserHeightInches,
    exactTreadDepthInches,
    inclineAngleDegrees
  );

  return {
    totalRiseInches: Math.round(totalRiseInches * 100) / 100,
    totalRiseFeet: Math.round((totalRiseInches / 12) * 100) / 100,
    totalRiseCm: Math.round(totalRiseInches * 2.54 * 10) / 10,

    numberOfRisers,
    exactRiserHeightInches: Math.round(exactRiserHeightInches * 1000) / 1000,
    exactRiserHeightFraction: toCarpentryFraction(exactRiserHeightInches),
    exactRiserHeightCm: Math.round(exactRiserHeightInches * 2.54 * 10) / 10,

    numberOfTreads,
    exactTreadDepthInches: Math.round(exactTreadDepthInches * 1000) / 1000,
    exactTreadDepthFraction: toCarpentryFraction(exactTreadDepthInches),
    exactTreadDepthCm: Math.round(exactTreadDepthInches * 2.54 * 10) / 10,

    totalRunInches: Math.round(totalRunInches * 100) / 100,
    totalRunFeet: Math.round((totalRunInches / 12) * 100) / 100,
    totalRunCm: Math.round(totalRunInches * 2.54 * 10) / 10,

    inclineAngleDegrees: Math.round(inclineAngleDegrees * 10) / 10,
    stringerLengthInches: Math.round(stringerLengthInches * 100) / 100,
    stringerLengthFeet: Math.round((stringerLengthInches / 12) * 100) / 100,
    stringerHeightInches: Math.round(totalRiseInches * 100) / 100,

    treadThicknessInches: 0,
    nosingLengthInches: 0,
    effectiveTreadSurfaceInches: exactTreadDepthInches,

    mountType: "standard",
    compliance,
  };
}

export function calculateComprehensiveStair(
  input: StairComprehensiveInput
): StairCalculationResult {
  const totalRiseInches = toInches(input.totalRise, input.riseUnit);
  let numberOfRisers = 1;

  if (input.riseMode === "fixed_steps" && input.fixedStepsCount && input.fixedStepsCount > 0) {
    numberOfRisers = Math.round(input.fixedStepsCount);
  } else {
    const target = input.targetRiserHeight && input.targetRiserHeight > 0 ? input.targetRiserHeight : 7.5;
    numberOfRisers = Math.max(1, Math.round(totalRiseInches / target));
  }

  const exactRiserHeightInches = totalRiseInches / numberOfRisers;

  // Mount type determines number of treads:
  // Standard mount (top step is 1 drop down from landing) => Risers - 1
  // Flush mount (top tread is flush with the upper landing floor) => Risers
  const numberOfTreads =
    input.mountType === "flush" ? numberOfRisers : Math.max(1, numberOfRisers - 1);

  let exactTreadDepthInches = 10;
  let totalRunInches = 0;

  if (input.runMode === "total_run") {
    totalRunInches = toInches(input.runValue, input.runUnit) || 100;
    exactTreadDepthInches = totalRunInches / numberOfTreads;
  } else {
    exactTreadDepthInches = toInches(input.runValue, input.runUnit) || 10;
    totalRunInches = exactTreadDepthInches * numberOfTreads;
  }

  const angleRad = Math.atan2(totalRiseInches, totalRunInches);
  const inclineAngleDegrees = (angleRad * 180) / Math.PI;

  const stringerLengthInches = Math.sqrt(
    Math.pow(totalRiseInches, 2) + Math.pow(totalRunInches, 2)
  );

  const treadThickness = input.hasTread ? input.treadThickness || 1.0 : 0;
  const nosingLength = input.hasTread ? input.nosingLength || 0.75 : 0;
  const effectiveTreadSurfaceInches = exactTreadDepthInches + nosingLength;

  const compliance = evaluateStairCompliance(
    exactRiserHeightInches,
    exactTreadDepthInches,
    inclineAngleDegrees
  );

  return {
    totalRiseInches: Math.round(totalRiseInches * 100) / 100,
    totalRiseFeet: Math.round((totalRiseInches / 12) * 100) / 100,
    totalRiseCm: Math.round(totalRiseInches * 2.54 * 10) / 10,

    numberOfRisers,
    exactRiserHeightInches: Math.round(exactRiserHeightInches * 1000) / 1000,
    exactRiserHeightFraction: toCarpentryFraction(exactRiserHeightInches),
    exactRiserHeightCm: Math.round(exactRiserHeightInches * 2.54 * 10) / 10,

    numberOfTreads,
    exactTreadDepthInches: Math.round(exactTreadDepthInches * 1000) / 1000,
    exactTreadDepthFraction: toCarpentryFraction(exactTreadDepthInches),
    exactTreadDepthCm: Math.round(exactTreadDepthInches * 2.54 * 10) / 10,

    totalRunInches: Math.round(totalRunInches * 100) / 100,
    totalRunFeet: Math.round((totalRunInches / 12) * 100) / 100,
    totalRunCm: Math.round(totalRunInches * 2.54 * 10) / 10,

    inclineAngleDegrees: Math.round(inclineAngleDegrees * 10) / 10,
    stringerLengthInches: Math.round(stringerLengthInches * 100) / 100,
    stringerLengthFeet: Math.round((stringerLengthInches / 12) * 100) / 100,
    stringerHeightInches: Math.round(totalRiseInches * 100) / 100,

    treadThicknessInches: treadThickness,
    nosingLengthInches: nosingLength,
    effectiveTreadSurfaceInches: Math.round(effectiveTreadSurfaceInches * 100) / 100,

    mountType: input.mountType,
    compliance,
  };
}

// ─── Headroom & Stairwell Opening Calculation (Card 2) ───────────────────────

export function calculateHeadroomOpening({
  totalRiseInches,
  totalRunInches,
  riserHeightInches,
  treadDepthInches,
  floorThicknessInches = 10,
  targetHeadroomInches = 80,
  stairwellOpeningInches = 120,
}: {
  totalRiseInches: number;
  totalRunInches: number;
  riserHeightInches: number;
  treadDepthInches: number;
  floorThicknessInches: number;
  targetHeadroomInches: number;
  stairwellOpeningInches: number;
}): StairHeadroomResult {
  // Slope of the staircase
  const slope = totalRiseInches / (totalRunInches || 1);

  // Minimum opening length needed so that headroom >= targetHeadroomInches:
  // At the opening edge (distance L_open from the top landing):
  // Height of ceiling at edge = Total Rise - floorThicknessInches
  // Height of stair tread at distance x from top landing = Total Rise - (x / treadDepthInches) * riserHeightInches
  // Headroom = (Total Rise - floorThicknessInches) - [Total Rise - (L_open / treadDepthInches) * riserHeightInches]
  //          = (L_open / treadDepthInches) * riserHeightInches - floorThicknessInches
  // We require: Headroom >= targetHeadroomInches
  // => (L_open / treadDepthInches) * riserHeightInches >= targetHeadroomInches + floorThicknessInches
  // => L_open_min = ((targetHeadroomInches + floorThicknessInches) / riserHeightInches) * treadDepthInches
  const minRequiredOpeningInches =
    riserHeightInches > 0
      ? ((targetHeadroomInches + floorThicknessInches) / riserHeightInches) * treadDepthInches
      : 120;

  // Actual headroom with given stairwellOpeningInches:
  // Headroom = (stairwellOpeningInches / treadDepthInches) * riserHeightInches - floorThicknessInches
  const actualHeadroomInches =
    treadDepthInches > 0
      ? (stairwellOpeningInches / treadDepthInches) * riserHeightInches - floorThicknessInches
      : 80;

  // Number of steps under ceiling before opening starts
  const stepsUnderCeiling = Math.max(
    0,
    Math.floor((totalRunInches - stairwellOpeningInches) / (treadDepthInches || 1))
  );

  const isCompliant = actualHeadroomInches >= targetHeadroomInches;

  return {
    floorToFloorInches: totalRiseInches,
    floorThicknessInches,
    targetHeadroomInches,
    openingLengthInches: stairwellOpeningInches,
    openingLengthFeet: Math.round((stairwellOpeningInches / 12) * 100) / 100,

    actualHeadroomInches: Math.round(actualHeadroomInches * 10) / 10,
    actualHeadroomFeet: Math.round((actualHeadroomInches / 12) * 100) / 100,
    minRequiredOpeningInches: Math.round(minRequiredOpeningInches * 10) / 10,
    minRequiredOpeningFeet: Math.round((minRequiredOpeningInches / 12) * 100) / 100,
    stepsUnderCeiling,
    isCompliant,
  };
}

// ─── Material & Cost Estimator (Card 3) ──────────────────────────────────────

export function calculateStairMaterials({
  stairResult,
  materialInput,
}: {
  stairResult: StairCalculationResult;
  materialInput: StairMaterialInput;
}): StairMaterialResult {
  // Stringer count determination based on width (IRC standard: max 16" spacing for 2x stringers)
  const width = materialInput.stairWidthInches || 36;
  let stringersCount = 3;
  if (width <= 36) {
    stringersCount = 3; // Standard 3 stringers (left, center, right)
  } else if (width <= 48) {
    stringersCount = 4;
  } else {
    stringersCount = Math.max(3, Math.ceil(width / 14) + 1);
  }

  // Stringer board length in standard lumber lengths (8, 10, 12, 14, 16, 18, 20 ft)
  const neededLengthFt = (stairResult.stringerLengthInches + 12) / 12; // 1ft extra for cuts
  const standardLengths = [8, 10, 12, 14, 16, 18, 20];
  let stringerBoardLengthFt = 16;
  for (const len of standardLengths) {
    if (len >= neededLengthFt) {
      stringerBoardLengthFt = len;
      break;
    }
  }

  const stringerBoardSize = materialInput.stringerLumberSize;
  const totalTreadsCount = stairResult.numberOfTreads;
  const totalRisersCount =
    materialInput.riserMaterial !== "none" ? stairResult.numberOfRisers : 0;

  const stringerLumberCost = stringersCount * (materialInput.pricePerStringerBoard || 0);
  const treadsCost = totalTreadsCount * (materialInput.pricePerTread || 0);
  const risersCost = totalRisersCount * (materialInput.pricePerRiser || 0);
  const fastenersCost = materialInput.fastenersAndBracketsCost || 0;
  const handrailCost = materialInput.handrailCost || 0;
  const laborCost = materialInput.laborCost || 0;

  const materialsSubtotal = stringerLumberCost + treadsCost + risersCost + fastenersCost + handrailCost;
  const taxCost = materialsSubtotal * ((materialInput.taxRatePercent || 0) / 100);
  const totalEstimatedCost = materialsSubtotal + taxCost + laborCost;

  return {
    stringersCount,
    stringerBoardLengthFt,
    stringerBoardSize,
    totalTreadsCount,
    totalRisersCount,
    stringerLumberCost: Math.round(stringerLumberCost * 100) / 100,
    treadsCost: Math.round(treadsCost * 100) / 100,
    risersCost: Math.round(risersCost * 100) / 100,
    fastenersCost: Math.round(fastenersCost * 100) / 100,
    handrailCost: Math.round(handrailCost * 100) / 100,
    laborCost: Math.round(laborCost * 100) / 100,
    materialsSubtotal: Math.round(materialsSubtotal * 100) / 100,
    taxCost: Math.round(taxCost * 100) / 100,
    totalEstimatedCost: Math.round(totalEstimatedCost * 100) / 100,
  };
}
