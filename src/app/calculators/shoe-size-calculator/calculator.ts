import {
  ShoeGender,
  ShoeBrand,
  UnitSystem,
  FootWidthCategory,
  InternationalSizes,
  BrandFitDetails,
  KidsGrowthProjection,
  ShoeSizeConversionResult,
} from "./types";

export function convertToInches(val: number, unit: UnitSystem): number {
  if (unit === "cm") return val / 2.54;
  if (unit === "mm") return val / 25.4;
  return val;
}

export function convertToCm(val: number, unit: UnitSystem): number {
  if (unit === "in") return val * 2.54;
  if (unit === "mm") return val / 10;
  return val;
}

export function calculateInternationalSizes(
  lengthInches: number,
  gender: ShoeGender
): InternationalSizes {
  const lengthCm = lengthInches * 2.54;
  const lengthMm = lengthCm * 10;

  // Base Barleycorn formula: US Men = 3 * L_in - 22
  let rawUsMen = 3 * lengthInches - 21.5;
  if (rawUsMen < 1) rawUsMen = 1;
  const usMen = Math.round(rawUsMen * 2) / 2;

  let usWomen = usMen + 1.5;
  if (gender === "women") {
    // Standard women scale alignment
    usWomen = Math.round((3 * lengthInches - 20) * 2) / 2;
  }

  // Kids size scale (for smaller foot lengths)
  let rawUsKids = 3 * lengthInches - 9.5;
  if (rawUsKids < 1) rawUsKids = 1;
  const usKids = Math.round(rawUsKids * 2) / 2;

  // UK = US Men - 1
  const uk = Math.max(0.5, Math.round((usMen - 1) * 2) / 2);

  // India (IND) shoe size is identical to UK sizing standard
  const india = uk;

  // EU (Paris Point) = 1.5 * (lengthCm + 1.5 cm last allowance)
  const eu = Math.round(1.5 * (lengthCm + 1.5));

  // Japan / East Asia = length in cm
  const japanCm = Math.round(lengthCm * 2) / 2;

  // Mondopoint = mm
  const mondopointMm = Math.round(lengthMm);

  // Mexico = US Men - 1 (or cm measurement)
  const mexico = Math.max(1, Math.round((usMen - 1) * 2) / 2);

  // Australia = Same as UK for Men, Same as US Women for Women
  const australia = gender === "women" ? usWomen : uk;

  return {
    usMen,
    usWomen,
    usKids,
    uk,
    india,
    eu,
    japanCm,
    mondopointMm,
    mexico,
    australia,
  };
}

export function calculateFootWidthCategory(
  lengthInches: number,
  widthInches: number,
  gender: ShoeGender
): FootWidthCategory {
  if (!widthInches || widthInches <= 0) return "Standard / Medium (D / M)";

  // Standard ratio of length to width
  const ratio = lengthInches / widthInches;

  if (gender === "women") {
    if (ratio > 2.9) return "Narrow (A / 2A / B)";
    if (ratio >= 2.6) return "Standard / Medium (D / M)";
    if (ratio >= 2.4) return "Wide (E / 2E / W)";
    return "Extra Wide (4E / 6E / XW)";
  } else {
    if (ratio > 2.8) return "Narrow (A / 2A / B)";
    if (ratio >= 2.5) return "Standard / Medium (D / M)";
    if (ratio >= 2.3) return "Wide (E / 2E / W)";
    return "Extra Wide (4E / 6E / XW)";
  }
}

export function calculateBrandFit(
  baseUsSize: number,
  brand: ShoeBrand
): BrandFitDetails {
  let offset = 0;
  let note = "Fits true to size.";
  let brandName = "Standard";

  switch (brand) {
    case "nike":
      offset = 0.5;
      note = "Nike shoes tend to run 0.5 size small and narrow. Size up +0.5 for optimal comfort.";
      brandName = "Nike";
      break;
    case "adidas":
      offset = 0;
      note = "Adidas shoes generally fit true to size, though soccer/running models can feel snug.";
      brandName = "Adidas";
      break;
    case "converse":
      offset = -0.5;
      note = "Converse Chuck Taylors run 0.5 size large. Size down -0.5 for a proper fit.";
      brandName = "Converse";
      break;
    case "hoka":
      offset = 0;
      note = "Hoka running shoes fit true to size with generous toe box clearance.";
      brandName = "Hoka";
      break;
    case "vans":
      offset = 0;
      note = "Vans skate shoes fit true to size.";
      brandName = "Vans";
      break;
    case "asics":
      offset = 0.5;
      note = "ASICS running shoes run slightly small. Consider sizing up +0.5.";
      brandName = "ASICS";
      break;
    case "doc_martens":
      offset = -0.5;
      note = "Doc Martens boots run large and do not come in half sizes. Size down if in between.";
      brandName = "Doc Martens";
      break;
    default:
      offset = 0;
      note = "Standard sizing standard.";
      brandName = "Standard";
      break;
  }

  const recSize = Math.round((baseUsSize + offset) * 2) / 2;

  return {
    brand,
    brandName,
    recommendedSizeUs: recSize,
    fitNote: note,
  };
}

export function calculateKidsGrowth(
  currentUsSize: number,
  ageMonths: number = 24
): KidsGrowthProjection {
  let proj3 = currentUsSize + 0.5;
  let proj6 = currentUsSize + 1.0;
  let note = "Toddlers grow rapidly (approx. +1 full size every 3–4 months).";

  if (ageMonths > 36 && ageMonths <= 96) {
    proj3 = currentUsSize + 0.5;
    proj6 = currentUsSize + 0.5;
    note = "Children ages 4–8 typically grow +0.5 size every 4–6 months.";
  } else if (ageMonths > 96) {
    proj3 = currentUsSize;
    proj6 = currentUsSize + 0.5;
    note = "Kids over 8 grow approx. +0.5 to +1 size per year.";
  }

  return {
    currentAgeMonths: ageMonths,
    projected3MonthsSizeUs: Math.round(proj3 * 2) / 2,
    projected6MonthsSizeUs: Math.round(proj6 * 2) / 2,
    growthNote: note,
  };
}

export function calculateShoeSize(
  leftLength: number,
  rightLength: number,
  leftWidth: number = 0,
  rightWidth: number = 0,
  unit: UnitSystem = "in",
  gender: ShoeGender = "men",
  brand: ShoeBrand = "standard",
  kidAgeMonths?: number
): ShoeSizeConversionResult {
  // Convert lengths & widths to inches
  const leftInches = convertToInches(leftLength, unit);
  const rightInches = convertToInches(rightLength, unit);
  const leftWidthInches = convertToInches(leftWidth, unit);
  const rightWidthInches = convertToInches(rightWidth, unit);

  // Validation: foot lengths must be positive, finite numbers
  if (
    !leftLength ||
    !rightLength ||
    isNaN(leftInches) ||
    isNaN(rightInches) ||
    leftInches <= 0 ||
    rightInches <= 0 ||
    !isFinite(leftInches) ||
    !isFinite(rightInches)
  ) {
    return {
      gender,
      isValid: false,
      errorMessage: "Please enter a valid positive foot length greater than 0.",
      usedFootLengthInches: 0,
      usedFootLengthCm: 0,
      isBilateralUsed: false,
      internationalSizes: {
        usMen: 0,
        usWomen: 0,
        usKids: 0,
        uk: 0,
        india: 0,
        eu: 0,
        japanCm: 0,
        mondopointMm: 0,
        mexico: 0,
        australia: 0,
      },
      widthCategory: "Standard / Medium (D / M)",
    };
  }

  // Bilateral Handling: Use the larger foot length
  const usedLengthInches = Math.max(leftInches, rightInches);
  const usedWidthInches = Math.max(leftWidthInches, rightWidthInches);

  const lengthDiff = Math.abs(leftInches - rightInches);
  const isLengthBilateral = lengthDiff > 0.05;
  let bilateralNote: string | undefined = undefined;

  if (isLengthBilateral) {
    const largerFoot = leftInches > rightInches ? "Left" : "Right";
    const diffFormatted = lengthDiff.toFixed(2);
    bilateralNote = `Your ${largerFoot} foot is ${diffFormatted} inches longer. Recommendations are based on your larger foot to prevent toe compression.`;
  }

  // Width Asymmetry Check
  let widthAsymNote: string | undefined = undefined;
  if (leftWidthInches > 0 && rightWidthInches > 0) {
    const widthDiff = Math.abs(leftWidthInches - rightWidthInches);
    if (widthDiff >= 0.15) {
      const widerFoot = leftWidthInches > rightWidthInches ? "Left" : "Right";
      const wDiffFormatted = widthDiff.toFixed(2);
      widthAsymNote = `Your ${widerFoot} foot is wider by ${wDiffFormatted} inches across the joint. Fit recommendations use the wider dimension.`;
    }
  }

  const usedLengthCm = usedLengthInches * 2.54;

  const intlSizes = calculateInternationalSizes(usedLengthInches, gender);
  const widthCat = calculateFootWidthCategory(usedLengthInches, usedWidthInches, gender);

  const baseUs = gender === "women" ? intlSizes.usWomen : gender === "kids" ? intlSizes.usKids : intlSizes.usMen;
  const brandFit = calculateBrandFit(baseUs, brand);

  const growthProj = gender === "kids" ? calculateKidsGrowth(baseUs, kidAgeMonths || 36) : undefined;

  // Kids sizing domain check
  let kidsNote: string | undefined = undefined;
  if (gender === "kids" && usedLengthInches > 8.5) {
    kidsNote = `Entered foot length (${usedLengthInches.toFixed(1)} in / ${usedLengthCm.toFixed(1)} cm) exceeds standard children's sizing (up to ~8.5 in / 21.6 cm). Please select Men's or Women's mode for youth and adult sizing.`;
  }

  return {
    gender,
    isValid: true,
    usedFootLengthInches: parseFloat(usedLengthInches.toFixed(2)),
    usedFootLengthCm: parseFloat(usedLengthCm.toFixed(1)),
    isBilateralUsed: isLengthBilateral || Boolean(widthAsymNote),
    largerFootNote: bilateralNote,
    widthAsymmetryNote: widthAsymNote,
    kidsTransitionNote: kidsNote,
    internationalSizes: intlSizes,
    widthCategory: widthCat,
    brandFit,
    growthProjection: growthProj,
  };
}

export function calculateShoeSizeFromInputs(inputs: Record<string, any>): ShoeSizeConversionResult {
  const len = Number(inputs.footLength || inputs.length || 10);
  const width = Number(inputs.footWidth || inputs.width || 0);
  const unit = (inputs.unit as UnitSystem) || "in";
  const gender = (inputs.gender as ShoeGender) || "men";

  return calculateShoeSize(len, len, width, width, unit, gender);
}
