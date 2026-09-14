import {
  BodyTypeInputs,
  BodyTypeResults,
  FemaleBodyShape,
  MaleBodyShape,
  WhrHealthRiskCategory,
  WhtrHealthRiskCategory,
  SomatotypeScores,
  WardrobeRecommendation,
  ShapeComparisonItem,
} from "./types";

/**
 * Authoritative Anthropometric Body Type & Shape Calculation Engine
 * Implements:
 * 1. NCSU FFIT 4-variable female shape classification (Simmons et al., 2004)
 * 2. Structural male frame classification (Inverted Triangle, Trapezoid, Rectangle, Oval, Triangle)
 * 3. Continuous Euclidean/proportional shape similarity match matrix (0-100 score)
 * 4. WHO Waist-to-Hip Ratio (WHR) and NICE Waist-to-Height Ratio (WHtR) health risk classification
 * 5. Estimated Anthropometric Somatotype Proxy (Carter & Heath proxy via HWR and girth differentials)
 */
export function calculateBodyTypeCalculator(inputs: Record<string, any>): BodyTypeResults {
  const mode = inputs.mode || "female-fashion";
  const gender = inputs.gender === "male" ? "male" : "female";
  const unitSystem = inputs.unitSystem === "metric" ? "metric" : "us";
  const rawAge = Number(inputs.age);
  const age = !isNaN(rawAge) && rawAge > 0 ? rawAge : 30;

  // Raw measurement extraction
  let rawBust = unitSystem === "metric" ? Number(inputs.bustChestCm) : Number(inputs.bustChestInches);
  let rawWaist = unitSystem === "metric" ? Number(inputs.waistCm) : Number(inputs.waistInches);
  let rawHighHip = unitSystem === "metric" ? Number(inputs.highHipCm) : Number(inputs.highHipInches);
  let rawHip = unitSystem === "metric" ? Number(inputs.hipCm) : Number(inputs.hipInches);
  let rawHeight = unitSystem === "metric" ? Number(inputs.heightCm) : Number(inputs.heightInches);
  let rawWeight = unitSystem === "metric" ? Number(inputs.weightKg) : Number(inputs.weightLbs);

  // Fallback for unified parameter names if entered in generic tests
  if (isNaN(rawBust) && inputs.bustChest !== undefined) rawBust = Number(inputs.bustChest);
  if (isNaN(rawWaist) && inputs.waist !== undefined) rawWaist = Number(inputs.waist);
  if (isNaN(rawHip) && inputs.hip !== undefined) rawHip = Number(inputs.hip);
  if (isNaN(rawHighHip) && inputs.highHip !== undefined) rawHighHip = Number(inputs.highHip);
  if (isNaN(rawHeight) && inputs.height !== undefined) rawHeight = Number(inputs.height);
  if (isNaN(rawWeight) && inputs.weight !== undefined) rawWeight = Number(inputs.weight);

  // Strict physical dimension validation - reject 0, negatives, NaN, Infinity
  const isInvalidNum = (n: number) => isNaN(n) || !isFinite(n) || n <= 0;

  if (
    isInvalidNum(rawBust) ||
    isInvalidNum(rawWaist) ||
    isInvalidNum(rawHip) ||
    isInvalidNum(rawHighHip) ||
    isInvalidNum(rawHeight) ||
    isInvalidNum(rawWeight)
  ) {
    return {
      isValid: false,
      validationError:
        "All physical body dimensions (bust/chest, waist, high hip, low hip, height, weight) must be valid numbers strictly greater than zero.",
      mode,
      gender,
      unitSystem,
      primaryShape: "Invalid Input",
      shapeDescription: "Please provide valid positive measurements to generate body shape analytics.",
      shapeCategory: "N/A",
      bustChestInches: 0,
      waistInches: 0,
      highHipInches: 0,
      hipInches: 0,
      heightInches: 0,
      weightLbs: 0,
      whr: 0,
      whrRisk: "Low Risk (Optimal)",
      whrRiskDescription: "Invalid inputs.",
      whtr: 0,
      whtrRisk: "Healthy / Optimal (Keep Waist Below Half Height)",
      whtrRiskDescription: "Invalid inputs.",
      bustToWaistRatio: 0,
      hipToWaistRatio: 0,
      bustToHipRatio: 0,
      highHipToWaistRatio: 0,
      somatotype: {
        endomorphy: 1,
        mesomorphy: 1,
        ectomorphy: 1,
        dominantType: "Balanced",
        description: "Invalid inputs.",
      },
      stylingTips: [],
      fitnessAdvice: [],
      healthInsights: [],
      ncsuStudyStats: {
        bananaPct: 46.1,
        pearPct: 20.9,
        applePct: 13.8,
        hourglassPct: 8.4,
        spoonPct: 5.7,
        topHourglassPct: 4.1,
        bottomHourglassPct: 1.0,
      },
      shapeComparisons: [],
    };
  }

  // Convert to inches and lbs for standardized mathematical processing
  let bustChestInches = rawBust;
  let waistInches = rawWaist;
  let highHipInches = rawHighHip;
  let hipInches = rawHip;
  let heightInches = rawHeight;
  let weightLbs = rawWeight;

  if (unitSystem === "metric") {
    bustChestInches = rawBust / 2.54;
    waistInches = rawWaist / 2.54;
    highHipInches = rawHighHip / 2.54;
    hipInches = rawHip / 2.54;
    heightInches = rawHeight / 2.54;
    weightLbs = rawWeight * 2.20462;
  }

  // Calculate Key Ratios with full precision before rounding for display
  const whr = Math.round((waistInches / hipInches) * 1000) / 1000;
  const whtr = Math.round((waistInches / heightInches) * 1000) / 1000;
  const bustToWaistRatio = Math.round((bustChestInches / waistInches) * 100) / 100;
  const hipToWaistRatio = Math.round((hipInches / waistInches) * 100) / 100;
  const bustToHipRatio = Math.round((bustChestInches / hipInches) * 100) / 100;
  const highHipToWaistRatio = Math.round((highHipInches / waistInches) * 1000) / 1000;

  // 1. Authoritative Primary Shape Classification
  let primaryShape = "";
  let shapeDescription = "";
  let shapeCategory = "";

  if (gender === "female") {
    const shape = classifyFemaleShape(
      bustChestInches,
      waistInches,
      highHipInches,
      hipInches
    );
    primaryShape = shape.name;
    shapeDescription = shape.desc;
    shapeCategory = "Female Frame Classification (7-Shape Reference)";
  } else {
    const shape = classifyMaleShape(
      bustChestInches,
      waistInches,
      hipInches,
      heightInches
    );
    primaryShape = shape.name;
    shapeDescription = shape.desc;
    shapeCategory = "Male Frame Classification (5-Shape Model)";
  }

  // 2. WHR Reference Category (Informed by WHO 2008 Expert Consultation review on central adiposity cut-offs)
  let whrRisk: WhrHealthRiskCategory = "Lower Risk Reference (< 0.80)";
  let whrRiskDescription = "";

  if (gender === "female") {
    if (whr < 0.80) {
      whrRisk = "Lower Risk Reference (< 0.80)";
      whrRiskDescription =
        "Your waist-to-hip ratio (< 0.80) falls within the calculator's lower risk reference band. (WHO 2008 consultation reviewed WHR as an epidemiological risk indicator; this is a calculator reference and not a universal diagnostic classification).";
    } else if (whr >= 0.80 && whr <= 0.84) {
      whrRisk = "Moderate Risk Reference (0.80–0.84)";
      whrRiskDescription =
        "Your WHR (0.80–0.84) falls in the moderate reference band. Active lifestyle and balanced nutrition support overall cardiovascular wellness.";
    } else {
      whrRisk = "Higher Risk Reference (≥ 0.85)";
      whrRiskDescription =
        "Your WHR (≥ 0.85) meets the reference threshold that epidemiological literature associates with higher central adiposity.";
    }
  } else {
    if (whr < 0.90) {
      whrRisk = "Lower Risk Reference (< 0.90)";
      whrRiskDescription =
        "Your waist-to-hip ratio (< 0.90) falls within the calculator's lower risk reference band for men.";
    } else if (whr >= 0.90 && whr <= 0.99) {
      whrRisk = "Moderate Risk Reference (0.90–0.99)";
      whrRiskDescription =
        "Your WHR (0.90–0.99) falls in the moderate reference band. Regular exercise and balanced nutrition support cardiovascular health.";
    } else {
      whrRisk = "Higher Risk Reference (≥ 1.00)";
      whrRiskDescription =
        "Your WHR (≥ 1.00) meets the reference threshold that epidemiological literature associates with higher central adiposity.";
    }
  }

  // 3. WHtR Reference Category (Informed by NICE Public Health Guidance)
  let whtrRisk: WhtrHealthRiskCategory = "Healthy Central Adiposity (0.40–0.49)";
  let whtrRiskDescription = "";

  if (whtr < 0.40) {
    whtrRisk = "Below 0.40 Reference Point";
    whtrRiskDescription =
      "Your waist circumference is under 40% of your height, below the 0.40 reference point used in this calculator. Ensure adequate nutrition and functional strength.";
  } else if (whtr >= 0.40 && whtr < 0.50) {
    whtrRisk = "Healthy Central Adiposity (0.40–0.49)";
    whtrRiskDescription =
      "Your waist circumference is less than half your height (WHtR < 0.50), aligning with NICE's recommended public health guidance for healthy central adiposity.";
  } else if (whtr >= 0.50 && whtr < 0.60) {
    whtrRisk = "Increased Central Adiposity (0.50–0.59)";
    whtrRiskDescription =
      "Your waist is 50%–59% of your standing height, corresponding to the increased central adiposity reference band in NICE guidance.";
  } else {
    whtrRisk = "High Central Adiposity (≥ 0.60)";
    whtrRiskDescription =
      "Your waist circumference is 60% or more of your standing height, corresponding to the high central adiposity reference band in NICE guidance.";
  }

  // 4. Estimated Anthropometric Somatotype Proxy (Carter & Heath Method Proxy)
  const somatotype = calculateSomatotypeProxy(
    bustChestInches,
    waistInches,
    hipInches,
    heightInches,
    weightLbs,
    gender
  );

  // 5. Wardrobe Styling Recommendations
  const stylingTips = getWardrobeRecommendations(primaryShape, gender);

  // 6. Fitness Guidance (Framed as general lifestyle & conditioning, avoiding spot-reduction myths)
  const fitnessAdvice = getFitnessAdvice(primaryShape, gender, somatotype.dominantType);
  const healthInsights = [
    `Waist-to-Hip Ratio (Low Hip): ${whr} (${whrRisk}).`,
    `Waist-to-Height Ratio: ${whtr} (${whtrRisk}).`,
    `Estimated Somatotype Proxy: ${somatotype.dominantType} (Endo: ${somatotype.endomorphy}/7, Meso: ${somatotype.mesomorphy}/7, Ecto: ${somatotype.ectomorphy}/7).`,
    `Proportional Ratio: Bust/Chest is ${Math.round(bustToHipRatio * 100)}% of Low Hip size.`,
    `High-Hip-to-Waist Ratio: ${highHipToWaistRatio}x (Key anatomical differentiator for Spoon vs. Pear).`,
  ];

  // 7. Dynamic Shape Match / Similarity Matrix
  const shapeComparisons = calculateDynamicShapeComparisons(
    bustChestInches,
    waistInches,
    highHipInches,
    hipInches,
    gender,
    primaryShape
  );

  return {
    isValid: true,
    mode: mode as any,
    gender: gender as any,
    unitSystem: unitSystem as any,
    primaryShape,
    shapeDescription,
    shapeCategory,
    bustChestInches: Math.round(bustChestInches * 10) / 10,
    waistInches: Math.round(waistInches * 10) / 10,
    highHipInches: Math.round(highHipInches * 10) / 10,
    hipInches: Math.round(hipInches * 10) / 10,
    heightInches: Math.round(heightInches * 10) / 10,
    weightLbs: Math.round(weightLbs * 10) / 10,
    whr,
    whrRisk,
    whrRiskDescription,
    whtr,
    whtrRisk,
    whtrRiskDescription,
    bustToWaistRatio,
    hipToWaistRatio,
    bustToHipRatio,
    highHipToWaistRatio,
    somatotype,
    stylingTips,
    fitnessAdvice,
    healthInsights,
    ncsuStudyStats: {
      bananaPct: 46.1,
      pearPct: 20.9,
      applePct: 13.8,
      hourglassPct: 8.4,
      spoonPct: 5.7,
      topHourglassPct: 4.1,
      bottomHourglassPct: 1.0,
    },
    shapeComparisons,
  };
}

/**
 * 7 Female Fashion Shapes (North Carolina State University FFIT Software, Simmons et al. 2004)
 * Priority order respects distinct high-hip shelf criteria before broad hourglass.
 */
function classifyFemaleShape(
  bust: number,
  waist: number,
  highHip: number,
  hip: number
): { name: string; desc: string } {
  const bustHipDiff = bust - hip;
  const hipBustDiff = hip - bust;
  const bustWaistDiff = bust - waist;
  const hipWaistDiff = hip - waist;
  const highHipWaistRatio = highHip / (waist || 1);

  // 1. Spoon: distinct high-hip shelf curvature with hips wider than bust
  if (
    hipBustDiff >= 2 &&
    hipWaistDiff >= 7 &&
    highHipWaistRatio >= 1.193
  ) {
    return {
      name: "Spoon",
      desc: "Your hips are broader than your bust line with a prominent high-hip shelf and defined waist.",
    };
  }

  // 2. Hourglass: bust and hips nearly balanced with dramatic waist indentation
  if (
    (bustHipDiff <= 1 && hipBustDiff < 3.6) &&
    (bustWaistDiff >= 9 || hipWaistDiff >= 10)
  ) {
    return {
      name: "Hourglass",
      desc: "Your bust and hip measurements are nearly equal with a significantly well-defined, narrow waistline.",
    };
  }

  // 3. Bottom Hourglass: hips larger than bust with waist indentation and smooth high-hip transition
  if (
    hipBustDiff >= 3.6 &&
    hipBustDiff < 10 &&
    hipWaistDiff >= 9 &&
    highHipWaistRatio < 1.193
  ) {
    return {
      name: "Bottom Hourglass",
      desc: "Your hips are larger than your bust with a clear waist indentation and gradual high-hip curvature.",
    };
  }

  // 4. Top Hourglass: bust larger than hips with defined waist
  if (
    bustHipDiff > 1 &&
    bustHipDiff < 10 &&
    bustWaistDiff >= 9
  ) {
    return {
      name: "Top Hourglass",
      desc: "Your bust is noticeably larger than your hips, accompanied by a sharply defined natural waistline.",
    };
  }

  // 5. Triangle (Pear): hips significantly broader than bust, moderate waist definition
  if (hipBustDiff >= 3.6 && hipWaistDiff < 9) {
    return {
      name: "Triangle (Pear)",
      desc: "Your hips are significantly broader than your bust line, with a less dramatic waist-to-hip drop.",
    };
  }

  // 6. Inverted Triangle (Apple): bust significantly broader than hips
  if (bustHipDiff >= 3.6 && bustWaistDiff < 9) {
    return {
      name: "Inverted Triangle (Apple)",
      desc: "Your bust and shoulders are broader than your hips, with weight concentrated through the upper torso.",
    };
  }

  // 7. Rectangle (Banana): balanced circumferences without 9-inch waist drop
  return {
    name: "Rectangle (Banana)",
    desc: "Your bust, waist, and hips are close in circumference, presenting a balanced, straight silhouette.",
  };
}

/**
 * Male Body Shape Classification
 * Corrected evaluation order eliminates dead code: Inverted Triangle (>=8" drop) checked before Trapezoid (>=6" drop).
 */
function classifyMaleShape(
  chest: number,
  waist: number,
  hip: number,
  height: number
): { name: string; desc: string } {
  const chestWaistDiff = chest - waist;
  const hipChestDiff = hip - chest;

  // 1. Inverted Triangle: dramatic V-taper (chest-to-waist drop of 8 inches or greater)
  if (chestWaistDiff >= 8 && chest >= hip) {
    return {
      name: "Inverted Triangle",
      desc: "Very broad muscular chest and shoulders tapering to a slim waist. Characteristic athletic V-taper physique.",
    };
  }

  // 2. Trapezoid (V-Shape): moderate athletic taper (chest-to-waist drop of 6 to 7.9 inches)
  if (chestWaistDiff >= 6 && chest >= hip) {
    return {
      name: "Trapezoid (V-Shape)",
      desc: "Broad chest and shoulders tapering to a clean narrow waist. Classic tailored athletic torso proportion.",
    };
  }

  // 3. Oval (Apple): waist measurement exceeds chest size
  if (waist > chest) {
    return {
      name: "Oval (Apple)",
      desc: "Natural waist circumference exceeds chest size, reflecting abdominal weight concentration.",
    };
  }

  // 4. Triangle (Pear): hips wider than chest and shoulders
  if (hipChestDiff > 2) {
    return {
      name: "Triangle (Pear)",
      desc: "Lower hips and pelvic girth are broader than upper chest and shoulders.",
    };
  }

  // 5. Rectangle (Column): chest, waist, and hips aligned
  return {
    name: "Rectangle (Column)",
    desc: "Chest, waist, and hips are aligned in a straight athletic column with minimal taper.",
  };
}

/**
 * Dynamic Shape Similarity Score Matrix
 * Computes deterministic 0-100 similarity scores using normalized Euclidean feature distances
 * from documented category boundaries.
 * 
 * METHODOLOGY DOCUMENTATION:
 * - Features: Bust-to-hip difference, bust-to-waist difference, hip-to-waist difference, and high-hip-to-waist ratio.
 * - Normalization: Scaled by characteristic tolerance factors (e.g. 3.0" - 4.0" variance divisors; 12x shelf ratio scaling).
 * - Distance Function: Multi-dimensional Euclidean distance sqrt(sum(d_i^2)).
 * - Scaling Constants: 100 / (1 + distance * 1.25).
 * - Score Bounds: Primary classified shape bounded to 88-98; non-primary shapes bounded to 12-84.
 * - Sorting Rule: Sorted descending by similarity score.
 * 
 * IMPORTANT DISCLOSURE:
 * The distance scaling constants and bounds are application-defined heuristics designed to provide a continuous,
 * transparent similarity comparison across silhouettes. They do NOT represent statistical probabilities,
 * clinical certainty, or empirical classification accuracy.
 */
function calculateDynamicShapeComparisons(
  bust: number,
  waist: number,
  highHip: number,
  hip: number,
  gender: string,
  primaryShape: string
): ShapeComparisonItem[] {
  const bustHipDiff = bust - hip; // >0 = top heavy, <0 = bottom heavy
  const hipBustDiff = hip - bust;
  const bustWaistDiff = bust - waist;
  const hipWaistDiff = hip - waist;
  const highHipWaistRatio = highHip / (waist || 1);

  if (gender === "female") {
    // Distance metrics for each female shape
    // 1. Hourglass: |bust - hip| <= 1 (scale 3.0), max(bustWaist, hipWaist - 1) >= 9 (scale 4.0)
    const hgBalanceDist = Math.max(0, Math.abs(bust - hip) - 1.0) / 3.0;
    const hgWaistDrop = Math.max(bustWaistDiff, hipWaistDiff - 1.0);
    const hgWaistDist = Math.max(0, 9.0 - hgWaistDrop) / 3.5;
    const hgTotalDist = Math.sqrt(hgBalanceDist * hgBalanceDist + hgWaistDist * hgWaistDist);

    // 2. Bottom Hourglass: hip - bust in [3.6, 10], hip - waist >= 9, highHipWaistRatio < 1.193
    const bhgHipDist = (hipBustDiff < 3.6 ? 3.6 - hipBustDiff : hipBustDiff > 10 ? hipBustDiff - 10 : 0) / 3.0;
    const bhgWaistDist = Math.max(0, 9.0 - hipWaistDiff) / 3.5;
    const bhgShelfDist = Math.max(0, highHipWaistRatio - 1.193) * 10;
    const bhgTotalDist = Math.sqrt(bhgHipDist * bhgHipDist + bhgWaistDist * bhgWaistDist + bhgShelfDist * bhgShelfDist);

    // 3. Top Hourglass: bust - hip in [1, 10], bust - waist >= 9
    const thgBustDist = (bustHipDiff < 1.0 ? 1.0 - bustHipDiff : bustHipDiff > 10 ? bustHipDiff - 10 : 0) / 3.0;
    const thgWaistDist = Math.max(0, 9.0 - bustWaistDiff) / 3.5;
    const thgTotalDist = Math.sqrt(thgBustDist * thgBustDist + thgWaistDist * thgWaistDist);

    // 4. Spoon: hip - bust >= 2, hip - waist >= 7, highHipWaistRatio >= 1.193
    const spoonHipDist = Math.max(0, 2.0 - hipBustDiff) / 3.0;
    const spoonWaistDist = Math.max(0, 7.0 - hipWaistDiff) / 3.0;
    const spoonShelfDist = Math.max(0, 1.193 - highHipWaistRatio) * 12;
    const spoonTotalDist = Math.sqrt(spoonHipDist * spoonHipDist + spoonWaistDist * spoonWaistDist + spoonShelfDist * spoonShelfDist);

    // 5. Triangle (Pear): hip - bust >= 3.6, hip - waist < 9
    const pearHipDist = Math.max(0, 3.6 - hipBustDiff) / 3.0;
    const pearWaistDist = Math.max(0, hipWaistDiff - 9.0) / 4.0;
    const pearTotalDist = Math.sqrt(pearHipDist * pearHipDist + pearWaistDist * pearWaistDist);

    // 6. Inverted Triangle (Apple): bust - hip >= 3.6, bust - waist < 9
    const appleBustDist = Math.max(0, 3.6 - bustHipDiff) / 3.0;
    const appleWaistDist = Math.max(0, bustWaistDiff - 9.0) / 4.0;
    const appleTotalDist = Math.sqrt(appleBustDist * appleBustDist + appleWaistDist * appleWaistDist);

    // 7. Rectangle (Banana): |bust - hip| < 3.6, bust - waist < 9, hip - waist < 10
    const rectBalanceDist = Math.max(0, Math.abs(bust - hip) - 3.6) / 3.0;
    const rectBustWaistDist = Math.max(0, bustWaistDiff - 9.0) / 4.0;
    const rectHipWaistDist = Math.max(0, hipWaistDiff - 10.0) / 4.0;
    const rectTotalDist = Math.sqrt(rectBalanceDist * rectBalanceDist + rectBustWaistDist * rectBustWaistDist + rectHipWaistDist * rectHipWaistDist);

    const calcPct = (dist: number, isWinner: boolean) => {
      const raw = Math.round(100 / (1 + dist * 1.25));
      return isWinner ? Math.max(88, Math.min(98, raw)) : Math.max(12, Math.min(84, raw));
    };

    const items: ShapeComparisonItem[] = [
      {
        shapeName: "Hourglass",
        matchPercentage: calcPct(hgTotalDist, primaryShape === "Hourglass"),
        description: "Bust & hips nearly equal with narrow, well-defined waistline.",
      },
      {
        shapeName: "Bottom Hourglass",
        matchPercentage: calcPct(bhgTotalDist, primaryShape === "Bottom Hourglass"),
        description: "Hips larger than bust with clear waist curve and gradual high-hip contour.",
      },
      {
        shapeName: "Top Hourglass",
        matchPercentage: calcPct(thgTotalDist, primaryShape === "Top Hourglass"),
        description: "Bust noticeably larger than hips with a sharply defined natural waistline.",
      },
      {
        shapeName: "Spoon",
        matchPercentage: calcPct(spoonTotalDist, primaryShape === "Spoon"),
        description: "High-hip shelf structure with lower hips broader than bust.",
      },
      {
        shapeName: "Triangle (Pear)",
        matchPercentage: calcPct(pearTotalDist, primaryShape.includes("Triangle (Pear)")),
        description: "Hips noticeably broader than shoulders and bust with moderate waist curve.",
      },
      {
        shapeName: "Inverted Triangle (Apple)",
        matchPercentage: calcPct(appleTotalDist, primaryShape.includes("Inverted Triangle (Apple)")),
        description: "Broad bust and shoulders with narrower lower body circumference.",
      },
      {
        shapeName: "Rectangle (Banana)",
        matchPercentage: calcPct(rectTotalDist, primaryShape.includes("Rectangle (Banana)")),
        description: "Balanced proportions with minimal waist indentation (straight athletic silhouette).",
      },
    ];

    // Sort descending by match percentage so top match is at index 0
    return items.sort((a, b) => b.matchPercentage - a.matchPercentage);
  } else {
    // Male frame distance metrics
    const chestWaistDiff = bust - waist;
    const hipChestDiff = hip - bust;

    // 1. Inverted Triangle: chest - waist >= 8, chest >= hip
    const invTriDropDist = Math.max(0, 8.0 - chestWaistDiff) / 3.0;
    const invTriHipDist = Math.max(0, hip - bust) / 3.0;
    const invTriDist = Math.sqrt(invTriDropDist * invTriDropDist + invTriHipDist * invTriHipDist);

    // 2. Trapezoid: chest - waist in [6, 8], chest >= hip
    const trapDropDist = (chestWaistDiff < 6.0 ? 6.0 - chestWaistDiff : chestWaistDiff > 8.0 ? chestWaistDiff - 8.0 : 0) / 3.0;
    const trapHipDist = Math.max(0, hip - bust) / 3.0;
    const trapDist = Math.sqrt(trapDropDist * trapDropDist + trapHipDist * trapHipDist);

    // 3. Rectangle: |chest - waist| < 6, chest >= hip - 2
    const rectDropDist = Math.max(0, chestWaistDiff - 6.0) / 3.0;
    const rectHipDist = Math.max(0, hipChestDiff - 2.0) / 3.0;
    const rectDist = Math.sqrt(rectDropDist * rectDropDist + rectHipDist * rectHipDist);

    // 4. Oval (Apple): waist > chest
    const ovalDist = Math.max(0, bust - waist) / 3.0;

    // 5. Triangle (Pear): hip - chest > 2
    const pearDist = Math.max(0, 2.0 - hipChestDiff) / 3.0;

    const calcMalePct = (dist: number, isWinner: boolean) => {
      const raw = Math.round(100 / (1 + dist * 1.3));
      return isWinner ? Math.max(88, Math.min(98, raw)) : Math.max(15, Math.min(84, raw));
    };

    const items: ShapeComparisonItem[] = [
      {
        shapeName: "Inverted Triangle",
        matchPercentage: calcMalePct(invTriDist, primaryShape === "Inverted Triangle"),
        description: "Dramatic muscular V-taper (chest-to-waist drop ≥ 8 inches).",
      },
      {
        shapeName: "Trapezoid (V-Shape)",
        matchPercentage: calcMalePct(trapDist, primaryShape === "Trapezoid (V-Shape)"),
        description: "Athletic broad shoulders tapering to a natural lean waist (6–7.9 inch drop).",
      },
      {
        shapeName: "Rectangle (Column)",
        matchPercentage: calcMalePct(rectDist, primaryShape === "Rectangle (Column)"),
        description: "Balanced chest and waist dimensions in a straight athletic column.",
      },
      {
        shapeName: "Oval (Apple)",
        matchPercentage: calcMalePct(ovalDist, primaryShape === "Oval (Apple)"),
        description: "Midsection-dominant girth where waist circumference exceeds chest.",
      },
      {
        shapeName: "Triangle (Pear)",
        matchPercentage: calcMalePct(pearDist, primaryShape === "Triangle (Pear)"),
        description: "Lower body pelvic width exceeds upper chest and shoulder girth.",
      },
    ];

    return items.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
}

/**
 * Estimated Anthropometric Somatotype Proxy
 * Methodological note: Carter & Heath (1990) anthropometric somatotyping requires caliper skinfolds,
 * bone breadths, and flexed girths. This function generates a simplified anthropometric proxy.
 */
function calculateSomatotypeProxy(
  bust: number,
  waist: number,
  hip: number,
  height: number,
  weight: number,
  gender: string
): SomatotypeScores {
  // Height-Weight Ratio (HWR) = height (cm) / cbrt(weight kg)
  const heightCm = height * 2.54;
  const weightKg = weight * 0.453592;
  const hwr = heightCm / Math.cbrt(weightKg || 1);

  // Endomorphy proxy (relative adiposity from waist-to-height ratio)
  let endomorphy = Math.round((waist / (height || 1)) * 10 - 2);
  endomorphy = Math.max(1, Math.min(7, endomorphy));

  // Ectomorphy proxy (linearity from Heath-Carter HWR equations)
  let ectomorphy = 1;
  if (hwr > 40.75) {
    ectomorphy = Math.round(0.732 * hwr - 28.58);
  } else if (hwr >= 38.25) {
    ectomorphy = Math.round(0.463 * hwr - 17.63);
  } else {
    ectomorphy = 1;
  }
  ectomorphy = Math.max(1, Math.min(7, ectomorphy));

  // Mesomorphy proxy (musculoskeletal robusticity from chest-to-waist drop)
  const chestWaistDiff = bust - waist;
  let mesomorphy = Math.round(chestWaistDiff / 2.5 + 2);
  if (gender === "male") mesomorphy += 1;
  mesomorphy = Math.max(1, Math.min(7, mesomorphy));

  let dominantType: "Endomorph" | "Mesomorph" | "Ectomorph" | "Balanced" = "Balanced";
  if (endomorphy > mesomorphy && endomorphy > ectomorphy) dominantType = "Endomorph";
  else if (mesomorphy > endomorphy && mesomorphy > ectomorphy) dominantType = "Mesomorph";
  else if (ectomorphy > endomorphy && ectomorphy > mesomorphy) dominantType = "Ectomorph";

  let description = "";
  if (dominantType === "Endomorph") {
    description =
      "Relative adiposity dominance. Tends to carry higher natural soft tissue volume; benefits from consistent aerobic energy expenditure and progressive resistance training.";
  } else if (dominantType === "Mesomorph") {
    description =
      "Relative musculoskeletal robusticity dominance. Athletic skeletal frame responsive to progressive resistance training.";
  } else if (dominantType === "Ectomorph") {
    description =
      "Relative linearity and slenderness dominance. Lean skeletal frame with lower subcutaneous fat and muscle volume; benefits from progressive resistance training and adequate caloric intake.";
  } else {
    description = "Balanced central distribution across linearity, muscular robusticity, and adiposity proxies.";
  }

  return {
    endomorphy,
    mesomorphy,
    ectomorphy,
    dominantType,
    description,
  };
}

/**
 * Wardrobe Styling Recommendations (Framed as practical aesthetics rather than objective physiological laws)
 */
function getWardrobeRecommendations(shape: string, gender: string): WardrobeRecommendation[] {
  if (gender === "female") {
    if (shape.includes("Hourglass")) {
      return [
        {
          category: "Tops & Blouses",
          recommendedStyles: ["Wrap tops", "V-neck tops", "Fitted blouses", "Sweetheart necklines"],
          stylesToAvoid: ["Boxy oversized shapeless tunics", "High bulky unshaped turtlenecks"],
          fabricGuidance: "Draping fabrics with slight elastane or stretch that follow natural torso contours.",
        },
        {
          category: "Dresses & Skirts",
          recommendedStyles: ["A-line skirts", "Pencil skirts", "Wrap dresses", "Belted shirt dresses"],
          stylesToAvoid: ["Shapeless shift dresses", "Unstructured empire waists"],
          fabricGuidance: "Structured woven fabrics or medium-weight knits that highlight natural waist definition.",
        },
        {
          category: "Pants & Jeans",
          recommendedStyles: ["High-waisted tailored trousers", "Contoured-waist wide leg pants", "Bootcut denim"],
          stylesToAvoid: ["Low-rise trousers that create waist gaping"],
          fabricGuidance: "Stretch denim blends and tailored suiting wools.",
        },
      ];
    } else if (shape.includes("Triangle") || shape.includes("Pear") || shape.includes("Spoon")) {
      return [
        {
          category: "Tops & Jackets",
          recommendedStyles: ["Statement sleeves", "Boat necklines", "Structured shoulder pads", "Cropped waist jackets"],
          stylesToAvoid: ["Tops that terminate exactly across the widest pelvic swell"],
          fabricGuidance: "Textured, patterned, or brighter fabrics across the upper torso to draw visual attention upward.",
        },
        {
          category: "Skirts & Dresses",
          recommendedStyles: ["A-line silhouettes", "Fit-and-flare dresses", "Flowing midis with fitted waist"],
          stylesToAvoid: ["Pleated skirts with bulky hip-level pockets", "Rigid horizontal stripes across hips"],
          fabricGuidance: "Fluid draped fabrics for the lower body such as crepe, rayon, and lightweight wool.",
        },
        {
          category: "Pants & Trousers",
          recommendedStyles: ["Straight-leg trousers", "Dark-wash bootcut jeans", "Flat-front contoured trousers"],
          stylesToAvoid: ["Cargo trousers with side flap pockets at thigh level"],
          fabricGuidance: "Medium-to-heavyweight dark neutral fabrics with vertical drape.",
        },
      ];
    } else if (shape.includes("Inverted Triangle") || shape.includes("Apple")) {
      return [
        {
          category: "Tops & Jackets",
          recommendedStyles: ["V-necklines", "Scoop necklines", "Unbuttoned longline cardigans", "Peplum silhouettes"],
          stylesToAvoid: ["Exaggerated shoulder pads", "Double-breasted boxy blazers", "Horizontal boat necks"],
          fabricGuidance: "Soft, flowing matte fabrics that soften upper torso lines without adding bulk.",
        },
        {
          category: "Bottoms & Skirts",
          recommendedStyles: ["Pleated A-line skirts", "Wide-leg trousers", "Patterned or lighter colored trousers"],
          stylesToAvoid: ["Extreme peg-leg skinny trousers that over-emphasize upper-to-lower disproportion"],
          fabricGuidance: "Textured fabrics, houndstooth, or subtle pleating on the lower body.",
        },
      ];
    } else {
      // Rectangle (Banana)
      return [
        {
          category: "Tops & Dresses",
          recommendedStyles: ["Ruffled tops", "Belted blazers", "Fit-and-flare dresses", "Cowl necklines"],
          stylesToAvoid: ["Stiff boxy vertical shirts"],
          fabricGuidance: "Fabrics that create dimension and visual texture such as tweed, ribbed knits, and jacquard.",
        },
        {
          category: "Bottoms & Jeans",
          recommendedStyles: ["Curvy-fit jeans", "Pleated trousers", "Tiered maxi skirts", "Paperbag-waist trousers"],
          stylesToAvoid: ["Plain rigid straight garments without waist demarcation"],
          fabricGuidance: "Structured cottons and printed denims.",
        },
      ];
    }
  } else {
    // Male frame styling guidance
    return [
      {
        category: "Suits & Tailoring",
        recommendedStyles: ["Two-button single-breasted jackets", "Natural shoulder tailoring", "Tapered trouser cuffs"],
        stylesToAvoid: ["Heavy boxy unvented blazers", "Excessively padded 1980s-style shoulders"],
        fabricGuidance: "Medium-weight worsted wool and breathable cotton-linen blends.",
      },
      {
        category: "Casual Tops & Shirts",
        recommendedStyles: ["Fitted polo shirts", "V-neck and crewneck t-shirts with athletic taper", "Tailored oxford shirts"],
        stylesToAvoid: ["Oversized baggy dress shirts that billow at the waist"],
        fabricGuidance: "Comfort stretch oxford cloth and breathable piqué cotton.",
      },
    ];
  }
}

/**
 * Fitness & Body Composition Guidance
 * Formulated around evidence-based whole-body training; explicitly removes spot-reduction myths.
 */
function getFitnessAdvice(shape: string, gender: string, somatotype: string): string[] {
  return [
    `Structural Conditioning for ${shape}: Focus on progressive multi-joint compound exercises to develop functional muscular symmetry.`,
    `Cardiovascular Health: Accumulate 150–300 minutes of moderate-intensity aerobic activity per week to support metabolic and cardiovascular health.`,
    `Targeted Muscular Symmetry: Resistance training can build specific muscle groups (such as shoulders or gluteals) to aesthetically complement your natural skeletal frame.`,
    `Evidence-Based Fat Loss: Note that localized spot reduction is not physiologically possible; fat loss occurs systemically through sustained energy balance.`,
  ];
}
