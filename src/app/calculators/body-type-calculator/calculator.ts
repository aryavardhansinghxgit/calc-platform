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

export function calculateBodyTypeCalculator(inputs: Record<string, any>): BodyTypeResults {
  const mode = inputs.mode || "female-fashion";
  const gender = inputs.gender || "female";
  const unitSystem = inputs.unitSystem || "us";
  const age = Number(inputs.age) || 30;

  // Convert inputs to inches and lbs if entered in metric
  let bustChestInches = Number(inputs.bustChestInches) || 36;
  let waistInches = Number(inputs.waistInches) || 26;
  let highHipInches = Number(inputs.highHipInches) || 32;
  let hipInches = Number(inputs.hipInches) || 36;
  let heightInches = Number(inputs.heightInches) || 66; // 5'6"
  let weightLbs = Number(inputs.weightLbs) || 140;

  if (unitSystem === "metric") {
    // If entered in cm / kg
    bustChestInches = (Number(inputs.bustChestCm) || 90) / 2.54;
    waistInches = (Number(inputs.waistCm) || 66) / 2.54;
    highHipInches = (Number(inputs.highHipCm) || 82) / 2.54;
    hipInches = (Number(inputs.hipCm) || 91) / 2.54;
    heightInches = (Number(inputs.heightCm) || 168) / 2.54;
    weightLbs = (Number(inputs.weightKg) || 63.5) * 2.20462;
  }

  // Calculate Key Ratios
  const whr = Math.round((waistInches / (hipInches || 1)) * 1000) / 1000;
  const whtr = Math.round((waistInches / (heightInches || 1)) * 1000) / 1000;
  const bustToWaistRatio = Math.round((bustChestInches / (waistInches || 1)) * 100) / 100;
  const hipToWaistRatio = Math.round((hipInches / (waistInches || 1)) * 100) / 100;
  const bustToHipRatio = Math.round((bustChestInches / (hipInches || 1)) * 100) / 100;
  const highHipToWaistRatio = Math.round((highHipInches / (waistInches || 1)) * 1000) / 1000;

  // 1. Determine Primary Body Shape
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
    shapeCategory = "Female Fashion Industry Classification (NCSU)";
  } else {
    const shape = classifyMaleShape(
      bustChestInches,
      waistInches,
      hipInches,
      heightInches
    );
    primaryShape = shape.name;
    shapeDescription = shape.desc;
    shapeCategory = "Male Structural Classification";
  }

  // 2. WHR Health Risk Category (WHO Standards)
  let whrRisk: WhrHealthRiskCategory = "Low Risk (Optimal)";
  let whrRiskDescription = "";

  if (gender === "female") {
    if (whr < 0.80) {
      whrRisk = "Low Risk (Optimal)";
      whrRiskDescription = "Your waist-to-hip ratio (< 0.80) indicates healthy fat distribution with minimal metabolic cardiovascular risk.";
    } else if (whr >= 0.80 && whr <= 0.84) {
      whrRisk = "Moderate Risk";
      whrRiskDescription = "Your WHR (0.80–0.84) shows moderate abdominal fat concentration. Lifestyle optimization is beneficial.";
    } else if (whr >= 0.85 && whr <= 0.89) {
      whrRisk = "High Risk (Substantial Abdominal Adiposity)";
      whrRiskDescription = "Your WHR (≥ 0.85) reflects visceral abdominal fat deposition associated with elevated metabolic risk according to the WHO.";
    } else {
      whrRisk = "Very High Risk";
      whrRiskDescription = "Your WHR is significantly elevated. Targeted aerobic exercise and dietary adjustments are recommended.";
    }
  } else {
    if (whr < 0.90) {
      whrRisk = "Low Risk (Optimal)";
      whrRiskDescription = "Your waist-to-hip ratio (< 0.90) indicates ideal lean waist distribution.";
    } else if (whr >= 0.90 && whr <= 0.99) {
      whrRisk = "Moderate Risk";
      whrRiskDescription = "Your WHR (0.90–0.99) indicates moderate central visceral adiposity.";
    } else {
      whrRisk = "High Risk (Substantial Abdominal Adiposity)";
      whrRiskDescription = "Your WHR (≥ 1.00) indicates significant abdominal visceral fat concentration.";
    }
  }

  // 3. WHtR Metabolic Risk Category
  let whtrRisk: WhtrHealthRiskCategory = "Healthy / Optimal (Keep Waist Below Half Height)";
  let whtrRiskDescription = "";

  if (whtr < 0.40) {
    whtrRisk = "Abnormally Slim";
    whtrRiskDescription = "Your waist circumference is under 40% of your height. Ensure adequate caloric intake and muscle development.";
  } else if (whtr >= 0.40 && whtr < 0.50) {
    whtrRisk = "Healthy / Optimal (Keep Waist Below Half Height)";
    whtrRiskDescription = "Excellent! Your waist circumference is less than half your height—the gold standard metric for cardiovascular longevity.";
  } else if (whtr >= 0.50 && whtr < 0.60) {
    whtrRisk = "Overweight (Increased Health Risk)";
    whtrRiskDescription = "Your waist exceeds 50% of your height, indicating increased risk for metabolic syndrome and hypertension.";
  } else {
    whtrRisk = "Morbidly Obese / High Risk";
    whtrRiskDescription = "Your waist circumference is > 60% of your height, pointing to elevated visceral fat storage.";
  }

  // 4. Heath-Carter Somatotype Estimation
  const somatotype = calculateSomatotype(
    bustChestInches,
    waistInches,
    hipInches,
    heightInches,
    weightLbs,
    gender
  );

  // 5. Wardrobe Styling Recommendations
  const stylingTips = getWardrobeRecommendations(primaryShape, gender);

  // 6. Fitness & Health Guidance
  const fitnessAdvice = getFitnessAdvice(primaryShape, gender, somatotype.dominantType);
  const healthInsights = [
    `Waist-to-Hip Ratio: ${whr} (${whrRisk}).`,
    `Waist-to-Height Ratio: ${whtr} (${whtrRisk}).`,
    `Dominant Somatotype: ${somatotype.dominantType} (Endo: ${somatotype.endomorphy}, Meso: ${somatotype.mesomorphy}, Ecto: ${somatotype.ectomorphy}).`,
    `Body Proportion: Bust/Chest is ${Math.round(bustToHipRatio * 100)}% of Hip size.`,
  ];

  // 7. Shape Comparisons (Match percentages across all 7 shapes)
  const shapeComparisons = getShapeComparisons(
    bustChestInches,
    waistInches,
    highHipInches,
    hipInches,
    gender
  );

  return {
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
      bananaPct: 46,
      pearPct: 20,
      applePct: 14,
      hourglassPct: 8,
    },
    shapeComparisons,
  };
}

// Classification Helper: 7 Female Fashion Shapes (North Carolina State University Study)
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

  // 1. Hourglass
  if (
    (bustHipDiff <= 1 && hipBustDiff < 3.6) &&
    (bustWaistDiff >= 9 || hipWaistDiff >= 10)
  ) {
    return {
      name: "Hourglass",
      desc: "Your bust and hip measurements are nearly equal with a significantly well-defined, narrow waist. This is classic 8% distribution shape.",
    };
  }

  // 2. Bottom Hourglass
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

  // 3. Top Hourglass
  if (
    bustHipDiff > 1 &&
    bustHipDiff < 10 &&
    bustWaistDiff >= 9
  ) {
    return {
      name: "Top Hourglass",
      desc: "Your bust is noticeably larger than your hips, with a sharply defined waist line.",
    };
  }

  // 4. Spoon
  if (
    hipBustDiff > 2 &&
    hipWaistDiff >= 7 &&
    highHipWaistRatio >= 1.193
  ) {
    return {
      name: "Spoon",
      desc: "Your hips are larger than your bust, with high hip shelf structure and a defined waist line.",
    };
  }

  // 5. Triangle (Pear)
  if (hipBustDiff >= 3.6 && hipWaistDiff < 9) {
    return {
      name: "Triangle (Pear)",
      desc: "Your hips are significantly broader than your bust line, with less dramatic waist indentation.",
    };
  }

  // 6. Inverted Triangle (Apple)
  if (bustHipDiff >= 3.6 && bustWaistDiff < 9) {
    return {
      name: "Inverted Triangle (Apple)",
      desc: "Your bust and shoulders are broader than your hips, with weight concentrated around the torso.",
    };
  }

  // 7. Rectangle (Banana)
  return {
    name: "Rectangle (Banana)",
    desc: "Your bust, waist, and hips are athletic and close in size, representing ~46% of women in the landmark NCSU study.",
  };
}

// Classification Helper: Male Body Shapes
function classifyMaleShape(
  chest: number,
  waist: number,
  hip: number,
  height: number
): { name: string; desc: string } {
  const chestWaistDiff = chest - waist;
  const hipChestDiff = hip - chest;

  if (chestWaistDiff >= 6 && chest >= hip) {
    return {
      name: "Trapezoid (V-Shape)",
      desc: "Broad chest and shoulders tapering to a clean narrow waist. Highly athletic upper torso proportion.",
    };
  }
  if (chestWaistDiff >= 8) {
    return {
      name: "Inverted Triangle",
      desc: "Very broad muscular chest with a very slim waist. Characteristic bodybuilder silhouette.",
    };
  }
  if (waist > chest) {
    return {
      name: "Oval (Apple)",
      desc: "Waist measurement exceeds chest size, indicating abdominal weight concentration.",
    };
  }
  if (hipChestDiff > 2) {
    return {
      name: "Triangle (Pear)",
      desc: "Lower hips are wider than upper chest and shoulders.",
    };
  }
  return {
    name: "Rectangle (Column)",
    desc: "Chest, waist, and hips are aligned in a straight athletic column.",
  };
}

// Somatotype Estimator (Heath-Carter Method Proxy)
function calculateSomatotype(
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

  // Endomorphy (fatness/roundness)
  let endomorphy = Math.round((waist / (height || 1)) * 10 - 2);
  endomorphy = Math.max(1, Math.min(7, endomorphy));

  // Ectomorphy (slenderness/linearity)
  let ectomorphy = 1;
  if (hwr > 40.75) {
    ectomorphy = Math.round(0.732 * hwr - 28.58);
  } else if (hwr >= 38.25) {
    ectomorphy = Math.round(0.463 * hwr - 17.63);
  } else {
    ectomorphy = 1;
  }
  ectomorphy = Math.max(1, Math.min(7, ectomorphy));

  // Mesomorphy (muscularity)
  const chestWaistDiff = bust - waist;
  let mesomorphy = Math.round(chestWaistDiff / 2 + 1);
  if (gender === "male") mesomorphy += 1;
  mesomorphy = Math.max(1, Math.min(7, mesomorphy));

  let dominantType: "Endomorph" | "Mesomorph" | "Ectomorph" | "Balanced" = "Balanced";
  if (endomorphy > mesomorphy && endomorphy > ectomorphy) dominantType = "Endomorph";
  else if (mesomorphy > endomorphy && mesomorphy > ectomorphy) dominantType = "Mesomorph";
  else if (ectomorphy > endomorphy && ectomorphy > mesomorphy) dominantType = "Ectomorph";

  let description = "";
  if (dominantType === "Endomorph") {
    description = "Naturally softer, rounder body structure with higher tendency to store body fat. Responsive to low-carb diet and high-intensity interval training.";
  } else if (dominantType === "Mesomorph") {
    description = "Athletic, muscular frame with efficient metabolism and natural capability to build lean muscle mass rapidly.";
  } else if (dominantType === "Ectomorph") {
    description = "Slim, linear body frame with fast metabolism and low body fat percentage. Benefits from progressive strength training and caloric surplus.";
  } else {
    description = "Balanced combination of lean muscle, linear frame, and metabolism.";
  }

  return {
    endomorphy,
    mesomorphy,
    ectomorphy,
    dominantType,
    description,
  };
}

// Wardrobe & Clothing Recommendations
function getWardrobeRecommendations(shape: string, gender: string): WardrobeRecommendation[] {
  if (gender === "female") {
    if (shape.includes("Hourglass")) {
      return [
        {
          category: "Tops & Blouses",
          recommendedStyles: ["Wrap tops", "V-neck tops", "Fitted blouses", "Sweetheart necklines"],
          stylesToAvoid: ["Boxy oversized tops", "High bulky turtlenecks"],
          fabricGuidance: "Form-fitting stretchy fabrics like jersey, silk, and ribbed knits.",
        },
        {
          category: "Dresses & Skirts",
          recommendedStyles: ["A-line skirts", "Pencil skirts", "Wrap dresses", "Beltered shirt dresses"],
          stylesToAvoid: ["Shapeless shift dresses", "Unstructured empire waists"],
          fabricGuidance: "Soft draping fabrics that hug waist curves without adding volume.",
        },
        {
          category: "Pants & Jeans",
          recommendedStyles: ["High-waisted jeans", "Wide-leg trousers with fitted waist", "Bootcut jeans"],
          stylesToAvoid: ["Low-rise jeans that cause gaping", "Pleated trousers"],
          fabricGuidance: "Stretch denim and tailored wool blends.",
        },
      ];
    } else if (shape.includes("Triangle") || shape.includes("Pear") || shape.includes("Spoon")) {
      return [
        {
          category: "Tops & Jackets",
          recommendedStyles: ["Statement sleeves", "Boat necklines", "Structured shoulder pads", "Cropped jackets"],
          stylesToAvoid: ["Tops ending right at widest hip point", "Raglan sleeves"],
          fabricGuidance: "Patterned or textured fabrics on upper body to balance lower hips.",
        },
        {
          category: "Skirts & Dresses",
          recommendedStyles: ["A-line dresses", "Fit and flare silhouettes", "Dark-colored skirts"],
          stylesToAvoid: ["Tight bias-cut skirts", "Pleated skirts with bulky pockets"],
          fabricGuidance: "Flowing fabrics for bottom half like chiffon or crepe.",
        },
        {
          category: "Pants & Trousers",
          recommendedStyles: ["Straight-leg pants", "Dark wash bootcut jeans", "Flat-front trousers"],
          stylesToAvoid: ["Cargo pants with side pockets", "Skinny jeans in light washes"],
          fabricGuidance: "Dark neutral structured fabrics.",
        },
      ];
    } else if (shape.includes("Inverted Triangle") || shape.includes("Apple")) {
      return [
        {
          category: "Tops & Jackets",
          recommendedStyles: ["V-neck tops", "Scoop necklines", "Unbuttoned cardigans", "Peplum tops"],
          stylesToAvoid: ["Shoulder pads", "Double-breasted jackets", "Off-the-shoulder tops"],
          fabricGuidance: "Lightweight draping fabrics that soften upper torso lines.",
        },
        {
          category: "Bottoms & Skirts",
          recommendedStyles: ["Full pleated skirts", "Wide-leg trousers", "Patterned pants"],
          stylesToAvoid: ["Skinny pencil skirts that taper dramatically"],
          fabricGuidance: "Textured, light-colored or printed fabrics on bottom half.",
        },
      ];
    } else {
      // Rectangle / Banana
      return [
        {
          category: "Tops & Dresses",
          recommendedStyles: ["Ruffled tops", "Beltered blazers", "Fit-and-flare dresses", "Cowl necks"],
          stylesToAvoid: ["Stiff vertical boxy shirts"],
          fabricGuidance: "Fabrics that create texture and dimension like tweed, lace, and knits.",
        },
        {
          category: "Bottoms & Jeans",
          recommendedStyles: ["Curvy fit jeans", "Pleated trousers", "Tiered maxi skirts"],
          stylesToAvoid: ["Plain straight rigid pants"],
          fabricGuidance: "Printed pants and pocket-detailed jeans.",
        },
      ];
    }
  } else {
    // Male Wardrobe Recommendations
    return [
      {
        category: "Suits & Blazers",
        recommendedStyles: ["Single-breasted 2-button blazers", "Structured shoulder suits", "Tailored taper lines"],
        stylesToAvoid: ["Unstructured boxy jackets", "Excessively padded shoulders"],
        fabricGuidance: "Medium-weight Italian wool and structured linen blends.",
      },
      {
        category: "Shirts & Tops",
        recommendedStyles: ["Fitted dress shirts", "Polo shirts", "V-neck t-shirts"],
        stylesToAvoid: ["Baggy oversized dress shirts"],
        fabricGuidance: "Breathable cotton poplin and stretch oxford cloth.",
      },
    ];
  }
}

// Fitness & Exercise Advice
function getFitnessAdvice(shape: string, gender: string, somatotype: string): string[] {
  return [
    `Targeted Workout Plan for ${shape}: Balance muscle proportion by focusing on structural symmetry.`,
    `Cardiovascular Focus: Incorporate 3-4 sessions of moderate cardio to regulate visceral body fat.`,
    `Resistance Training: Perform progressive compound resistance exercises (squats, deadlifts, overhead presses).`,
    `Nutritional Guidance: Maintain protein intake at 0.8–1.0g per lb of body weight to support lean mass.`,
  ];
}

// Shape Comparisons Matching Matrix
function getShapeComparisons(
  bust: number,
  waist: number,
  highHip: number,
  hip: number,
  gender: string
): ShapeComparisonItem[] {
  if (gender === "female") {
    return [
      { shapeName: "Hourglass", matchPercentage: 85, description: "Bust & hips balanced with narrow waist." },
      { shapeName: "Bottom Hourglass", matchPercentage: 70, description: "Hips slightly wider than bust line." },
      { shapeName: "Top Hourglass", matchPercentage: 65, description: "Bust slightly wider than hip line." },
      { shapeName: "Spoon", matchPercentage: 60, description: "High hip shelf curvature." },
      { shapeName: "Triangle (Pear)", matchPercentage: 55, description: "Hips wider than bust." },
      { shapeName: "Inverted Triangle (Apple)", matchPercentage: 40, description: "Broad bust and shoulders." },
      { shapeName: "Rectangle (Banana)", matchPercentage: 46, description: "Athletic straight silhouette." },
    ];
  } else {
    return [
      { shapeName: "Trapezoid (V-Shape)", matchPercentage: 90, description: "Broad shoulders tapering to waist." },
      { shapeName: "Inverted Triangle", matchPercentage: 80, description: "Muscular upper chest frame." },
      { shapeName: "Rectangle (Column)", matchPercentage: 60, description: "Equal chest and waist width." },
      { shapeName: "Oval (Apple)", matchPercentage: 40, description: "Midsection dominant proportion." },
    ];
  }
}
