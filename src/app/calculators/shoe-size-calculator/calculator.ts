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

  // Bilateral Handling: Use the larger foot
  let usedLengthInches = Math.max(leftInches, rightInches);
  if (usedLengthInches <= 0) usedLengthInches = 10.0; // default 10 inches (~US Men 8.5)

  let usedWidthInches = Math.max(leftWidthInches, rightWidthInches);

  const isBilateral = Math.abs(leftInches - rightInches) > 0.05;
  let bilateralNote: string | undefined = undefined;

  if (isBilateral) {
    const largerFoot = leftInches > rightInches ? "Left" : "Right";
    const diff = Math.abs(leftInches - rightInches).toFixed(2);
    bilateralNote = `Your ${largerFoot} foot is ${diff} inches longer. Recommendations are based on your larger foot to prevent toe compression.`;
  }

  const usedLengthCm = usedLengthInches * 2.54;

  const intlSizes = calculateInternationalSizes(usedLengthInches, gender);
  const widthCat = calculateFootWidthCategory(usedLengthInches, usedWidthInches, gender);

  const baseUs = gender === "women" ? intlSizes.usWomen : gender === "kids" ? intlSizes.usKids : intlSizes.usMen;
  const brandFit = calculateBrandFit(baseUs, brand);

  const growthProj = gender === "kids" ? calculateKidsGrowth(baseUs, kidAgeMonths || 36) : undefined;

  return {
    gender,
    usedFootLengthInches: parseFloat(usedLengthInches.toFixed(2)),
    usedFootLengthCm: parseFloat(usedLengthCm.toFixed(1)),
    isBilateralUsed: isBilateral,
    largerFootNote: bilateralNote,
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
