import {
  TireDimensions,
  TireGeometry,
  FitmentOffsetInputs,
  FitmentOffsetResults,
  GearRatioInputs,
  GearRatioResults,
  SpeedDeltaPoint,
  TireComparisonResult,
} from "./types";

export function calculateTireGeometry(inputs: TireDimensions): TireGeometry {
  if (inputs.format === "flotation") {
    const diaIn = Math.max(15, inputs.flotationDiameterInches || 33);
    const widthIn = Math.max(5, inputs.flotationWidthInches || 12.5);
    const rimIn = Math.max(8, inputs.rimDiameterInches || 15);
    const diaMm = diaIn * 25.4;
    const widthMm = widthIn * 25.4;
    const sidewallIn = Math.max(0.5, (diaIn - rimIn) / 2);
    const sidewallMm = sidewallIn * 25.4;
    const circIn = Math.PI * diaIn;
    const circMm = Math.PI * diaMm;
    const revsPerMile = circIn > 0 ? 63360 / circIn : 0;
    const revsPerKm = circMm > 0 ? 1000000 / circMm : 0;

    return {
      diameterMm: parseFloat(diaMm.toFixed(1)),
      diameterIn: parseFloat(diaIn.toFixed(2)),
      sidewallMm: parseFloat(sidewallMm.toFixed(1)),
      sidewallIn: parseFloat(sidewallIn.toFixed(2)),
      circumferenceMm: parseFloat(circMm.toFixed(1)),
      circumferenceIn: parseFloat(circIn.toFixed(2)),
      revsPerMile: Math.round(revsPerMile),
      revsPerKm: Math.round(revsPerKm),
      widthMm: parseFloat(widthMm.toFixed(1)),
      widthIn: parseFloat(widthIn.toFixed(2)),
      rimDiameterIn: rimIn,
      formattedSize: `${diaIn}x${widthIn}R${rimIn}`,
    };
  }

  // Standard Metric Sizing
  const widthMm = Math.max(100, inputs.widthMm || 225);
  const aspect = Math.max(15, inputs.aspectRatio || 50);
  const rimIn = Math.max(8, inputs.rimDiameterInches || 17);
  const prefixStr = inputs.prefix && inputs.prefix !== "None" ? `${inputs.prefix} ` : "";

  const sidewallMm = widthMm * (aspect / 100);
  const sidewallIn = sidewallMm / 25.4;
  const diaIn = rimIn + 2 * sidewallIn;
  const diaMm = diaIn * 25.4;
  const widthIn = widthMm / 25.4;
  const circIn = Math.PI * diaIn;
  const circMm = Math.PI * diaMm;
  const revsPerMile = circIn > 0 ? 63360 / circIn : 0;
  const revsPerKm = circMm > 0 ? 1000000 / circMm : 0;

  return {
    diameterMm: parseFloat(diaMm.toFixed(1)),
    diameterIn: parseFloat(diaIn.toFixed(2)),
    sidewallMm: parseFloat(sidewallMm.toFixed(1)),
    sidewallIn: parseFloat(sidewallIn.toFixed(2)),
    circumferenceMm: parseFloat(circMm.toFixed(1)),
    circumferenceIn: parseFloat(circIn.toFixed(2)),
    revsPerMile: Math.round(revsPerMile),
    revsPerKm: Math.round(revsPerKm),
    widthMm: parseFloat(widthMm.toFixed(1)),
    widthIn: parseFloat(widthIn.toFixed(2)),
    rimDiameterIn: rimIn,
    formattedSize: `${prefixStr}${widthMm}/${aspect}R${rimIn}`,
  };
}

export function calculateOffsetFitment(
  tire1: TireGeometry,
  tire2: TireGeometry,
  inputs: FitmentOffsetInputs
): FitmentOffsetResults {
  // Backspacing formula: (Rim Width + 1") / 2 + (Offset mm / 25.4)
  const backspacingStockIn = (inputs.stockRimWidthIn + 1) / 2 + inputs.stockOffsetMm / 25.4;
  const backspacingNewIn = (inputs.newRimWidthIn + 1) / 2 + inputs.newOffsetMm / 25.4;

  // Inner clearance change: 0.5*(Width2 - Width1) + (Offset2 - Offset1)
  const widthDiffMm = tire2.widthMm - tire1.widthMm;
  const offsetDiffMm = inputs.newOffsetMm - inputs.stockOffsetMm;
  const innerClearanceMm = 0.5 * widthDiffMm + offsetDiffMm;

  // Outer poke change: 0.5*(Width2 - Width1) - (Offset2 - Offset1)
  const outerPokeMm = 0.5 * widthDiffMm - offsetDiffMm;

  return {
    innerClearanceMm: parseFloat(innerClearanceMm.toFixed(1)),
    outerPokeMm: parseFloat(outerPokeMm.toFixed(1)),
    backspacingStockIn: parseFloat(backspacingStockIn.toFixed(2)),
    backspacingNewIn: parseFloat(backspacingNewIn.toFixed(2)),
  };
}

export function calculateGearRatioFitment(
  tire1: TireGeometry,
  tire2: TireGeometry,
  inputs: GearRatioInputs
): GearRatioResults {
  const stockRatio = inputs.stockGearRatio || 3.73;
  const diaRatio = tire1.diameterIn / (tire2.diameterIn || 1);

  const effectiveGearRatio = stockRatio * diaRatio;
  const equivalentRatioNeeded = stockRatio * (tire2.diameterIn / (tire1.diameterIn || 1));
  const ratioChangePercent = ((effectiveGearRatio - stockRatio) / stockRatio) * 100;

  return {
    effectiveGearRatio: parseFloat(effectiveGearRatio.toFixed(2)),
    equivalentRatioNeeded: parseFloat(equivalentRatioNeeded.toFixed(2)),
    ratioChangePercent: parseFloat(ratioChangePercent.toFixed(1)),
  };
}

export function calculateTireComparison(
  tire1Inputs: TireDimensions,
  tire2Inputs: TireDimensions,
  offsetInputs?: FitmentOffsetInputs,
  gearInputs?: GearRatioInputs
): TireComparisonResult {
  const tire1 = calculateTireGeometry(tire1Inputs);
  const tire2 = calculateTireGeometry(tire2Inputs);

  const diameterDiffIn = parseFloat((tire2.diameterIn - tire1.diameterIn).toFixed(2));
  const diameterDiffMm = parseFloat((tire2.diameterMm - tire1.diameterMm).toFixed(1));
  const diameterDiffPercent = parseFloat(
    (((tire2.diameterIn - tire1.diameterIn) / (tire1.diameterIn || 1)) * 100).toFixed(1)
  );

  const sidewallDiffIn = parseFloat((tire2.sidewallIn - tire1.sidewallIn).toFixed(2));
  const sidewallDiffMm = parseFloat((tire2.sidewallMm - tire1.sidewallMm).toFixed(1));
  const widthDiffIn = parseFloat((tire2.widthIn - tire1.widthIn).toFixed(2));
  const widthDiffMm = parseFloat((tire2.widthMm - tire1.widthMm).toFixed(1));

  const circumferenceDiffIn = parseFloat((tire2.circumferenceIn - tire1.circumferenceIn).toFixed(2));
  const circumferenceDiffMm = parseFloat((tire2.circumferenceMm - tire1.circumferenceMm).toFixed(1));

  const revsPerMileDiff = tire2.revsPerMile - tire1.revsPerMile;
  const revsPerKmDiff = tire2.revsPerKm - tire1.revsPerKm;

  // Speedometer error percentage
  const speedErrorPercent = diameterDiffPercent;
  const speedRatio = tire2.diameterIn / (tire1.diameterIn || 1);
  const speedAt65Mph = parseFloat((65 * speedRatio).toFixed(1));

  // Ride height change = delta radius = delta diameter / 2
  const rideHeightChangeIn = parseFloat((diameterDiffIn / 2).toFixed(2));
  const rideHeightChangeMm = parseFloat((diameterDiffMm / 2).toFixed(1));

  // Speed Delta Table across 20, 30, 45, 60, 70, 80 mph (and km/h)
  const speedPoints = [20, 30, 45, 60, 70, 80];
  const speedDeltaTable: SpeedDeltaPoint[] = speedPoints.map((indicatedMph) => {
    const actualMph = parseFloat((indicatedMph * speedRatio).toFixed(1));
    const indicatedKmh = Math.round(indicatedMph * 1.60934);
    const actualKmh = parseFloat((indicatedKmh * speedRatio).toFixed(1));
    return {
      indicatedMph,
      actualMph,
      indicatedKmh,
      actualKmh,
    };
  });

  // Offset fitment if provided
  const offsetResults = offsetInputs ? calculateOffsetFitment(tire1, tire2, offsetInputs) : null;

  // Gear ratio fitment if provided
  const gearResults = gearInputs ? calculateGearRatioFitment(tire1, tire2, gearInputs) : null;

  // Safety Classification
  const absDiff = Math.abs(diameterDiffPercent);
  let safetyRating: "safe" | "caution" | "warning" = "safe";
  let safetyMessage = `Safe: Diameter variance (${diameterDiffPercent > 0 ? "+" : ""}${diameterDiffPercent}%) is within standard 1.5% OEM safety specs.`;

  if (absDiff > 3.0) {
    safetyRating = "warning";
    safetyMessage = `Warning: Diameter variance (${diameterDiffPercent > 0 ? "+" : ""}${diameterDiffPercent}%) exceeds 3% threshold. High risk of speedometer error, transmission shift issues, and fender rubbing.`;
  } else if (absDiff > 1.5) {
    safetyRating = "caution";
    safetyMessage = `Caution: Diameter variance is ${diameterDiffPercent > 0 ? "+" : ""}${diameterDiffPercent}%. Minor speedometer error present. Check wheel well clearance.`;
  }

  return {
    tire1,
    tire2,
    diameterDiffIn,
    diameterDiffMm,
    diameterDiffPercent,
    sidewallDiffIn,
    sidewallDiffMm,
    widthDiffIn,
    widthDiffMm,
    circumferenceDiffIn,
    circumferenceDiffMm,
    revsPerMileDiff,
    revsPerKmDiff,
    speedErrorPercent,
    speedAt65Mph,
    rideHeightChangeIn,
    rideHeightChangeMm,
    speedDeltaTable,
    offsetResults,
    gearResults,
    safetyRating,
    safetyMessage,
  };
}

export function parseTireCodeString(code: string): TireDimensions | null {
  if (!code || typeof code !== "string") return null;
  const clean = code.trim().toUpperCase().replace(/,/g, ".");

  // Check Flotation format: e.g. 33X12.50R15, 33 12.5 15, 35X12.5R17
  const flotationMatch = clean.match(/^(\d{2,3}(?:\.\d+)?)\s*(?:X|\/|\s+)\s*(\d{1,2}(?:\.\d+)?)\s*(?:R|R-|\s+)?\s*(\d{2})$/i);
  if (flotationMatch) {
    const dia = parseFloat(flotationMatch[1]);
    const width = parseFloat(flotationMatch[2]);
    const rim = parseInt(flotationMatch[3], 10);
    if (dia >= 20 && dia <= 50 && width >= 6 && width <= 20 && rim >= 10 && rim <= 30) {
      return {
        format: "flotation",
        flotationDiameterInches: dia,
        flotationWidthInches: width,
        rimDiameterInches: rim,
        widthMm: Math.round(width * 25.4),
        aspectRatio: 50,
      };
    }
  }

  // Check Metric format: e.g. P225/50R17, 225/50/17, 225 50 17, 275-40-19
  const metricMatch = clean.match(/^(P|LT|ST|T)?\s*(\d{3})\s*[\/\-\s]\s*(\d{2})\s*(?:R|D|B|\-|\s)?\s*(\d{2})$/i);
  if (metricMatch) {
    const prefix = (metricMatch[1] as any) || "None";
    const width = parseInt(metricMatch[2], 10);
    const aspect = parseInt(metricMatch[3], 10);
    const rim = parseInt(metricMatch[4], 10);
    if (width >= 125 && width <= 405 && aspect >= 20 && aspect <= 95 && rim >= 10 && rim <= 32) {
      return {
        format: "metric",
        prefix,
        widthMm: width,
        aspectRatio: aspect,
        rimDiameterInches: rim,
        flotationDiameterInches: 33,
        flotationWidthInches: 12.5,
      };
    }
  }

  return null;
}

export function calculateTireSizeFromInputs(inputs: Record<string, any>): TireComparisonResult {
  const w1 = Number(inputs.widthMm || inputs.width1 || 225);
  const a1 = Number(inputs.aspectRatio || inputs.aspect1 || 50);
  const r1 = Number(inputs.rimDiameterInches || inputs.rim1 || 17);

  const w2 = Number(inputs.width2 || 245);
  const a2 = Number(inputs.aspect2 || 45);
  const r2 = Number(inputs.rim2 || 18);

  const t1: TireDimensions = { format: "metric", widthMm: w1, aspectRatio: a1, rimDiameterInches: r1, flotationDiameterInches: 33, flotationWidthInches: 12.5 };
  const t2: TireDimensions = { format: "metric", widthMm: w2, aspectRatio: a2, rimDiameterInches: r2, flotationDiameterInches: 33, flotationWidthInches: 12.5 };

  return calculateTireComparison(t1, t2);
}
