import {
  BraUnit,
  RegionStandard,
  BreastShape,
  SisterSize,
  BraStyleRecommendation,
  MultiSystemResult,
  BraSizeCalculationResult,
} from "./types";

const US_CUPS = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J", "K", "L", "M"];
const UK_CUPS = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J"];
const EU_CUPS = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

const AU_BAND_MAP: Record<number, number> = {
  28: 6,
  30: 8,
  32: 10,
  34: 12,
  36: 14,
  38: 16,
  40: 18,
  42: 20,
  44: 22,
  46: 24,
  48: 26,
  50: 28,
  52: 30,
};

const EU_BAND_MAP: Record<number, number> = {
  28: 60,
  30: 65,
  32: 70,
  34: 75,
  36: 80,
  38: 85,
  40: 90,
  42: 95,
  44: 100,
  46: 105,
  48: 110,
  50: 115,
  52: 120,
};

export function calculateBraSize(
  underbust: number,
  bust: number,
  unit: BraUnit = "in",
  region: RegionStandard = "US",
  shape: BreastShape = "even"
): BraSizeCalculationResult {
  // Input sanitization: ensure valid finite non-negative numbers
  const safeUnderbust = Number.isFinite(underbust) && underbust > 0 ? underbust : 30;
  const safeBust = Number.isFinite(bust) && bust > 0 ? bust : 34;

  // Convert inputs to inches for calculation
  const underbustInches = unit === "cm" ? safeUnderbust / 2.54 : safeUnderbust;
  const bustInches = unit === "cm" ? safeBust / 2.54 : safeBust;

  // Detect inverted measurements
  const isBustSmallerThanUnderbust = bustInches < underbustInches;
  const warning = isBustSmallerThanUnderbust
    ? "Bust measurement is smaller than underbust. Please verify tape placement (bust should be measured around the fullest point of the breasts)."
    : undefined;

  // Band Size calculation (round to nearest even number)
  let roundedUnderbust = Math.round(underbustInches);
  let bandSizeInches = roundedUnderbust % 2 === 0 ? roundedUnderbust : roundedUnderbust + 1;
  if (bandSizeInches < 28) bandSizeInches = 28;
  if (bandSizeInches > 52) bandSizeInches = 52;

  // Difference calculation
  let diffInches = bustInches - underbustInches;
  if (diffInches < 0) diffInches = 0;

  // Base cup index calculation: Strictly derived from measured bust difference (shape does not alter base size)
  const cupIndex = Math.min(Math.round(diffInches), US_CUPS.length - 1);

  // Breast shape fit advice
  let shapeAdvice = "Standard even distribution. Most bra styles will fit comfortably.";
  if (shape === "shallow") {
    shapeAdvice = "Shallow breast roots spread tissue over a broader chest area. Balconette, demi, and plunge cuts help prevent upper-cup gaping.";
  } else if (shape === "projected") {
    shapeAdvice = "Projected breasts feature forward projection requiring deeper cups. Unlined, multi-seam bras offer optimal room and natural shape.";
  } else if (shape === "asymmetrical") {
    shapeAdvice = "Fit your bra to the larger breast for comfort. Adjust the shoulder strap or insert a removable pad ('cookie') on the smaller side.";
  } else if (shape === "bell") {
    shapeAdvice = "Bell shapes are fuller at the bottom. T-shirt bras, balconettes, and plunge styles prevent empty space at the top of the cup.";
  } else if (shape === "teardrop") {
    shapeAdvice = "Teardrop breasts maintain gentle, balanced slope. Most styles fit naturally, with demi and plunge styles offering flattering lift.";
  }

  // Cup letters per region
  const cupUS = US_CUPS[cupIndex] || "D";
  const cupUK = UK_CUPS[cupIndex] || "D";
  const cupEU = EU_CUPS[cupIndex] || "D";

  // Band sizes per region
  const euBand = EU_BAND_MAP[bandSizeInches] || Math.round(((bandSizeInches - 30) / 2) * 5 + 65);
  const frBand = euBand + 15;
  const auBand = AU_BAND_MAP[bandSizeInches] || bandSizeInches - 22;

  const multiSystem: MultiSystemResult = {
    us: `${bandSizeInches}${cupUS}`,
    uk: `${bandSizeInches}${cupUK}`,
    eu: `${euBand}${cupEU}`,
    fr: `${frBand}${cupEU}`,
    au: `${auBand}${cupUK}`,
    in: `${bandSizeInches}${cupUK}`,
    bandSizeInches,
    cupLetterUS: cupUS,
    cupLetterUK: cupUK,
    cupLetterEU: cupEU,
  };

  // Primary size based on selected region
  let primarySize = multiSystem.us;
  if (region === "UK") primarySize = multiSystem.uk;
  else if (region === "EU") primarySize = multiSystem.eu;
  else if (region === "FR") primarySize = multiSystem.fr;
  else if (region === "AU") primarySize = multiSystem.au;
  else if (region === "IN") primarySize = multiSystem.in;

  // Calculate Sister Sizes
  const sisterSizes: SisterSize[] = [];

  // Helper function to format sister size by region
  const formatRegionalSister = (bandInches: number, cIdx: number, reg: RegionStandard): string => {
    const cUS = US_CUPS[cIdx];
    const cUK = UK_CUPS[cIdx];
    const cEU = EU_CUPS[cIdx];
    const eBand = EU_BAND_MAP[bandInches] || Math.round(((bandInches - 30) / 2) * 5 + 65);
    const fBand = eBand + 15;
    const aBand = AU_BAND_MAP[bandInches] || bandInches - 22;

    switch (reg) {
      case "UK":
      case "IN":
        return `${bandInches}${cUK}`;
      case "EU":
        return `${eBand}${cEU}`;
      case "FR":
        return `${fBand}${cEU}`;
      case "AU":
        return `${aBand}${cUK}`;
      case "US":
      default:
        return `${bandInches}${cUS}`;
    }
  };

  // Sister Size 1: Sister Down (Smaller Band, Larger Cup Volume)
  if (bandSizeInches > 28 && cupIndex < US_CUPS.length - 1) {
    const sBand = bandSizeInches - 2;
    const sizeStr = formatRegionalSister(sBand, cupIndex + 1, region);

    sisterSizes.push({
      size: sizeStr,
      bandAdjustment: "2 inches tighter band",
      cupAdjustment: "1 cup size larger",
      fitGuidance: "Ideal if your current band rides up your back or feels loose, but the cup volume feels correct.",
    });
  }

  // Sister Size 2: Sister Up (Larger Band, Smaller Cup Volume)
  if (bandSizeInches < 52 && cupIndex > 0) {
    const sBand = bandSizeInches + 2;
    const sizeStr = formatRegionalSister(sBand, cupIndex - 1, region);

    sisterSizes.push({
      size: sizeStr,
      bandAdjustment: "2 inches looser band",
      cupAdjustment: "1 cup size smaller",
      fitGuidance: "Ideal if your current band digs uncomfortably into your ribcage, but cup coverage is comfortable.",
    });
  }

  // Recommended Bra Styles
  const recommendedStyles: BraStyleRecommendation[] = [
    {
      styleName: "T-Shirt & Contour Bra",
      description: "Smooth, molded cups that remain invisible under thin clothing and light tops.",
      idealFor: "Everyday wear, smooth silhouette, bell & teardrop shapes.",
      supportLevel: "Medium to High",
    },
    {
      styleName: "Balconette / Demi Bra",
      description: "Slightly lower cut cups with wider-set straps that lift from the bottom.",
      idealFor: "Shallow roots, low-cut tops, open necklines.",
      supportLevel: "High Lift",
    },
    {
      styleName: "Unlined Multi-Seam Bra",
      description: "Soft fabric cups constructed with 3 or 4 structural seams for maximum depth.",
      idealFor: "Fuller cups (DD+), projected tissue, maximum breathability.",
      supportLevel: "Maximum Support",
    },
    {
      styleName: "Wireless Comfort / Bralette",
      description: "Soft structure without metal underwires for pressure-free support.",
      idealFor: "Lounging, sleep, post-surgery, pregnancy & sensitive skin.",
      supportLevel: "Light to Medium",
    },
  ];

  return {
    primarySize,
    bandSizeInches,
    underbustInches: parseFloat(underbustInches.toFixed(1)),
    bustInches: parseFloat(bustInches.toFixed(1)),
    diffInches: parseFloat(diffInches.toFixed(1)),
    multiSystem,
    sisterSizes,
    recommendedStyles,
    shapeAdvice,
    isBustSmallerThanUnderbust,
    warning,
  };
}

export function calculateBraSizeFromInputs(inputs: Record<string, any>): BraSizeCalculationResult {
  const rawUnderbust = inputs.underbust !== undefined && inputs.underbust !== null && inputs.underbust !== ""
    ? Number(inputs.underbust)
    : 30;
  const rawBust = inputs.bust !== undefined && inputs.bust !== null && inputs.bust !== ""
    ? Number(inputs.bust)
    : 34;

  const underbust = Number.isFinite(rawUnderbust) && rawUnderbust > 0 ? rawUnderbust : 30;
  const bust = Number.isFinite(rawBust) && rawBust > 0 ? rawBust : 34;
  const unit = (inputs.unit as BraUnit) || "in";
  const region = (inputs.region as RegionStandard) || "US";
  const shape = (inputs.shape as BreastShape) || "even";

  return calculateBraSize(underbust, bust, unit, region, shape);
}
