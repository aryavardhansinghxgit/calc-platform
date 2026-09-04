/**
 * Core mathematical engine for Volume Calculator & 3D Shape Suite
 */

export interface UnitConversionMap {
  cubicMeters: number;
  cubicCentimeters: number;
  cubicMillimeters: number;
  liters: number;
  milliliters: number;
  usGallons: number;
  usFluidOunces: number;
  usQuarts: number;
  impGallons: number;
  cubicFeet: number;
  cubicInches: number;
  cubicYards: number;
}

// Format numbers with thousands separators and fixed decimal precision (preserving trailing zeros)
export function formatNumber(val: number, precision: number = 4): string {
  if (isNaN(val) || !isFinite(val)) return "0";
  const fixed = val.toFixed(precision);
  const parts = fixed.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.length > 1 ? parts.join(".") : parts[0];
}

// Convert linear length to meters
export function toMeters(val: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd"): number {
  switch (unit) {
    case "cm": return val / 100.0;
    case "mm": return val / 1000.0;
    case "ft": return val * 0.3048;
    case "in": return val * 0.0254;
    case "yd": return val * 0.9144;
    default: return val;
  }
}

export type FullUnitConversionResult = UnitConversionMap & {
  raw: UnitConversionMap;
  formatted: Record<keyof UnitConversionMap, string>;
};

// Convert volume in cubic meters to all target volume units
export function convertVolumeFromCubicMeters(vM3: number, precision: number = 4): FullUnitConversionResult {
  const safeM3 = Math.max(0, vM3);
  const raw: UnitConversionMap = {
    cubicMeters: safeM3,
    cubicCentimeters: safeM3 * 1e6,
    cubicMillimeters: safeM3 * 1e9,
    liters: safeM3 * 1000.0,
    milliliters: safeM3 * 1e6,
    usGallons: safeM3 * (1000.0 / 3.785411784),
    usFluidOunces: safeM3 * (1000.0 / (3.785411784 / 128.0)),
    usQuarts: safeM3 * (1000.0 / (3.785411784 / 4.0)),
    impGallons: safeM3 * (1000.0 / 4.54609),
    cubicFeet: safeM3 / 0.028316846592,
    cubicInches: safeM3 / 0.000016387064,
    cubicYards: safeM3 / 0.764554857984
  };

  const formatted: Record<keyof UnitConversionMap, string> = {
    cubicMeters: formatNumber(raw.cubicMeters, precision),
    cubicCentimeters: formatNumber(raw.cubicCentimeters, precision),
    cubicMillimeters: formatNumber(raw.cubicMillimeters, precision),
    liters: formatNumber(raw.liters, precision),
    milliliters: formatNumber(raw.milliliters, precision),
    usGallons: formatNumber(raw.usGallons, precision),
    usFluidOunces: formatNumber(raw.usFluidOunces, precision),
    usQuarts: formatNumber(raw.usQuarts, precision),
    impGallons: formatNumber(raw.impGallons, precision),
    cubicFeet: formatNumber(raw.cubicFeet, precision),
    cubicInches: formatNumber(raw.cubicInches, precision),
    cubicYards: formatNumber(raw.cubicYards, precision)
  };

  return {
    ...raw,
    raw,
    formatted
  };
}

export interface ShapeVolumeResult {
  shapeName: string;
  volume: number;
  formattedVolume: string;
  surfaceArea?: number;
  formattedSurfaceArea?: string;
  lateralArea?: number;
  formattedLateralArea?: string;
  slantHeight?: number;
  formattedSlantHeight?: string;
  diagonal?: number;
  formattedDiagonal?: string;
  capacityLiters?: number;
  formattedCapacityLiters?: string;
  capacityUsGallons?: number;
  formattedCapacityUsGallons?: string;
  conversions: UnitConversionMap;
  formattedConversions: Record<keyof UnitConversionMap, string>;
  stepText: string;
  formula: string;
  error?: string;
}

export interface TankVolumeResult extends ShapeVolumeResult {
  totalTankVolume: number;
  formattedTotalTankVolume: string;
  liquidVolume: number;
  formattedLiquidVolume: string;
  remainingAirVolume: number;
  formattedRemainingAirVolume: string;
  totalCapacityLiters: number;
  formattedTotalCapacityLiters: string;
  liquidCapacityLiters: number;
  formattedLiquidCapacityLiters: string;
  totalCapacityUsGallons: number;
  formattedTotalCapacityUsGallons: string;
  liquidCapacityUsGallons: number;
  formattedLiquidCapacityUsGallons: string;
  filledVolume?: number;
  emptyVolume?: number;
}

// 1. Sphere (Radius r)
export function computeSphereVolume(
  r: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(r) || r < 0) {
    return {
      shapeName: "Sphere",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (4/3)·π·r³",
      stepText: "Radius must be a non-negative number.",
      error: "Radius must be a non-negative number."
    };
  }

  const vol = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);
  const area = 4.0 * Math.PI * Math.pow(r, 2);

  const rM = toMeters(r, unit);
  const volM3 = (4.0 / 3.0) * Math.PI * Math.pow(rM, 3);
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Sphere",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: area,
    formattedSurfaceArea: formatNumber(area, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = (4/3)·π·r³",
    stepText: `1. Volume V = (4/3) × π × (${r})³ = ${formatNumber(vol, precision)} ${unit}³.\n2. Surface Area A = 4 × π × (${r})² = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 2. Cone (Radius r, Height h)
export function computeConeVolume(
  r: number,
  h: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(r) || r < 0 || isNaN(h) || h < 0) {
    return {
      shapeName: "Cone",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (1/3)·π·r²·h",
      stepText: "Radius and height must be non-negative numbers.",
      error: "Radius and height must be non-negative numbers."
    };
  }

  const vol = (1.0 / 3.0) * Math.PI * r * r * h;
  const slant = Math.sqrt(r * r + h * h);
  const latArea = Math.PI * r * slant;
  const surfArea = Math.PI * r * (r + slant);

  const rM = toMeters(r, unit);
  const hM = toMeters(h, unit);
  const volM3 = (1.0 / 3.0) * Math.PI * rM * rM * hM;
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Cone",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: surfArea,
    formattedSurfaceArea: formatNumber(surfArea, precision),
    lateralArea: latArea,
    formattedLateralArea: formatNumber(latArea, precision),
    slantHeight: slant,
    formattedSlantHeight: formatNumber(slant, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = (1/3)·π·r²·h",
    stepText: `1. Volume V = (1/3) × π × (${r})² × (${h}) = ${formatNumber(vol, precision)} ${unit}³.\n2. Slant Height s = √(${r}² + ${h}²) = ${formatNumber(slant, precision)} ${unit}.\n3. Lateral Area = π·r·s = ${formatNumber(latArea, precision)} ${unit}² | Total Surface Area = ${formatNumber(surfArea, precision)} ${unit}².`
  };
}

// 3. Cylinder (Radius r, Height h)
export function computeCylinderVolume(
  r: number,
  h: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(r) || r < 0 || isNaN(h) || h < 0) {
    return {
      shapeName: "Cylinder",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = π·r²·h",
      stepText: "Radius and height must be non-negative numbers.",
      error: "Radius and height must be non-negative numbers."
    };
  }

  const vol = Math.PI * r * r * h;
  const latArea = 2.0 * Math.PI * r * h;
  const surfArea = 2.0 * Math.PI * r * (r + h);

  const rM = toMeters(r, unit);
  const hM = toMeters(h, unit);
  const volM3 = Math.PI * rM * rM * hM;
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Cylinder",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: surfArea,
    formattedSurfaceArea: formatNumber(surfArea, precision),
    lateralArea: latArea,
    formattedLateralArea: formatNumber(latArea, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = π·r²·h",
    stepText: `1. Volume V = π × (${r})² × (${h}) = ${formatNumber(vol, precision)} ${unit}³.\n2. Lateral Area = 2·π·r·h = ${formatNumber(latArea, precision)} ${unit}².\n3. Total Surface Area = 2·π·r·(r + h) = ${formatNumber(surfArea, precision)} ${unit}².`
  };
}

// 4. Cube (Edge a)
export function computeCubeVolume(
  a: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(a) || a < 0) {
    return {
      shapeName: "Cube",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = a³",
      stepText: "Edge length must be a non-negative number.",
      error: "Edge length must be a non-negative number."
    };
  }

  const vol = Math.pow(a, 3);
  const area = 6.0 * a * a;
  const diag = a * Math.sqrt(3);

  const aM = toMeters(a, unit);
  const volM3 = Math.pow(aM, 3);
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Cube",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: area,
    formattedSurfaceArea: formatNumber(area, precision),
    diagonal: diag,
    formattedDiagonal: formatNumber(diag, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = a³",
    stepText: `1. Volume V = (${a})³ = ${formatNumber(vol, precision)} ${unit}³.\n2. Surface Area A = 6 × (${a})² = ${formatNumber(area, precision)} ${unit}².\n3. Space Diagonal d = ${a} × √3 = ${formatNumber(diag, precision)} ${unit}.`
  };
}

// 5. Rectangular Prism / Tank (Length l, Width w, Height h, Fill Depth fillH)
export function computePrismVolume(
  l: number,
  w: number,
  h: number,
  fillH?: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): TankVolumeResult {
  const emptyConv = convertVolumeFromCubicMeters(0, precision);

  if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
    return {
      shapeName: "Rectangular Prism / Tank",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      totalTankVolume: 0,
      formattedTotalTankVolume: formatNumber(0, precision),
      liquidVolume: 0,
      formattedLiquidVolume: formatNumber(0, precision),
      remainingAirVolume: 0,
      formattedRemainingAirVolume: formatNumber(0, precision),
      totalCapacityLiters: 0,
      formattedTotalCapacityLiters: formatNumber(0, precision),
      liquidCapacityLiters: 0,
      formattedLiquidCapacityLiters: formatNumber(0, precision),
      totalCapacityUsGallons: 0,
      formattedTotalCapacityUsGallons: formatNumber(0, precision),
      liquidCapacityUsGallons: 0,
      formattedLiquidCapacityUsGallons: formatNumber(0, precision),
      conversions: emptyConv.raw,
      formattedConversions: emptyConv.formatted,
      formula: "V = l·w·h",
      stepText: "Length, width, and height must be positive numbers.",
      error: "Length, width, and height must be positive numbers."
    };
  }

  if (fillH !== undefined) {
    if (isNaN(fillH) || fillH < 0) {
      return {
        shapeName: "Rectangular Prism / Tank",
        volume: 0,
        formattedVolume: formatNumber(0, precision),
        totalTankVolume: 0,
        formattedTotalTankVolume: formatNumber(0, precision),
        liquidVolume: 0,
        formattedLiquidVolume: formatNumber(0, precision),
        remainingAirVolume: 0,
        formattedRemainingAirVolume: formatNumber(0, precision),
        totalCapacityLiters: 0,
        formattedTotalCapacityLiters: formatNumber(0, precision),
        liquidCapacityLiters: 0,
        formattedLiquidCapacityLiters: formatNumber(0, precision),
        totalCapacityUsGallons: 0,
        formattedTotalCapacityUsGallons: formatNumber(0, precision),
        liquidCapacityUsGallons: 0,
        formattedLiquidCapacityUsGallons: formatNumber(0, precision),
        conversions: emptyConv.raw,
        formattedConversions: emptyConv.formatted,
        formula: "V = l·w·h",
        stepText: "Liquid fill depth cannot be negative.",
        error: "Liquid fill depth cannot be negative."
      };
    }
    if (fillH > h) {
      return {
        shapeName: "Rectangular Prism / Tank",
        volume: 0,
        formattedVolume: formatNumber(0, precision),
        totalTankVolume: 0,
        formattedTotalTankVolume: formatNumber(0, precision),
        liquidVolume: 0,
        formattedLiquidVolume: formatNumber(0, precision),
        remainingAirVolume: 0,
        formattedRemainingAirVolume: formatNumber(0, precision),
        totalCapacityLiters: 0,
        formattedTotalCapacityLiters: formatNumber(0, precision),
        liquidCapacityLiters: 0,
        formattedLiquidCapacityLiters: formatNumber(0, precision),
        totalCapacityUsGallons: 0,
        formattedTotalCapacityUsGallons: formatNumber(0, precision),
        liquidCapacityUsGallons: 0,
        formattedLiquidCapacityUsGallons: formatNumber(0, precision),
        conversions: emptyConv.raw,
        formattedConversions: emptyConv.formatted,
        formula: "V = l·w·h",
        stepText: `Liquid fill depth (${fillH} ${unit}) cannot exceed total tank height (${h} ${unit}).`,
        error: `Liquid fill depth (${fillH} ${unit}) cannot exceed total tank height (${h} ${unit}).`
      };
    }
  }

  const totalVol = l * w * h;
  const area = 2.0 * (l * w + l * h + w * h);
  const diag = Math.sqrt(l * l + w * w + h * h);

  const lM = toMeters(l, unit);
  const wM = toMeters(w, unit);
  const hM = toMeters(h, unit);
  const totalVolM3 = lM * wM * hM;
  const totalConvs = convertVolumeFromCubicMeters(totalVolM3, precision);

  const actualFillH = fillH !== undefined ? fillH : h;
  const liquidVol = l * w * actualFillH;
  const remainingAir = Math.max(0, totalVol - liquidVol);

  const fillHM = toMeters(actualFillH, unit);
  const liquidVolM3 = lM * wM * fillHM;
  const liquidConvs = convertVolumeFromCubicMeters(liquidVolM3, precision);

  return {
    shapeName: "Rectangular Prism / Tank",
    volume: totalVol,
    formattedVolume: formatNumber(totalVol, precision),
    surfaceArea: area,
    formattedSurfaceArea: formatNumber(area, precision),
    diagonal: diag,
    formattedDiagonal: formatNumber(diag, precision),

    // Separate Tank & Liquid metrics
    totalTankVolume: totalVol,
    formattedTotalTankVolume: formatNumber(totalVol, precision),
    liquidVolume: liquidVol,
    formattedLiquidVolume: formatNumber(liquidVol, precision),
    remainingAirVolume: remainingAir,
    formattedRemainingAirVolume: formatNumber(remainingAir, precision),

    totalCapacityLiters: totalConvs.raw.liters,
    formattedTotalCapacityLiters: totalConvs.formatted.liters,
    totalCapacityUsGallons: totalConvs.raw.usGallons,
    formattedTotalCapacityUsGallons: totalConvs.formatted.usGallons,

    liquidCapacityLiters: liquidConvs.raw.liters,
    formattedLiquidCapacityLiters: liquidConvs.formatted.liters,
    liquidCapacityUsGallons: liquidConvs.raw.usGallons,
    formattedLiquidCapacityUsGallons: liquidConvs.formatted.usGallons,

    // Backward-compatibility aliases
    capacityLiters: totalConvs.raw.liters,
    formattedCapacityLiters: totalConvs.formatted.liters,
    capacityUsGallons: totalConvs.raw.usGallons,
    formattedCapacityUsGallons: totalConvs.formatted.usGallons,
    filledVolume: liquidVol,
    emptyVolume: remainingAir,

    conversions: totalConvs.raw,
    formattedConversions: totalConvs.formatted,
    formula: "V = l·w·h",
    stepText: `1. Total Tank Volume V = ${l} × ${w} × ${h} = ${formatNumber(totalVol, precision)} ${unit}³.\n2. Filled Liquid Volume = ${l} × ${w} × ${actualFillH} = ${formatNumber(liquidVol, precision)} ${unit}³ (${liquidConvs.formatted.liters} Liters, ${liquidConvs.formatted.usGallons} US Gal).\n3. Remaining Air Volume = ${formatNumber(remainingAir, precision)} ${unit}³.\n4. Total Tank Capacity = ${totalConvs.formatted.liters} Liters (${totalConvs.formatted.usGallons} US Gal).`
  };
}

// 6. Capsule (Radius r, Height h)
export function computeCapsuleVolume(
  r: number,
  h: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(r) || r < 0 || isNaN(h) || h < 0) {
    return {
      shapeName: "Capsule",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = π·r²·h + (4/3)·π·r³",
      stepText: "Radius and cylinder height must be non-negative numbers.",
      error: "Radius and cylinder height must be non-negative numbers."
    };
  }

  const volCylinder = Math.PI * r * r * h;
  const volSphere = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);
  const vol = volCylinder + volSphere;
  const surfArea = 2.0 * Math.PI * r * h + 4.0 * Math.PI * r * r;

  const rM = toMeters(r, unit);
  const hM = toMeters(h, unit);
  const volM3 = Math.PI * rM * rM * hM + (4.0 / 3.0) * Math.PI * Math.pow(rM, 3);
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Capsule",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: surfArea,
    formattedSurfaceArea: formatNumber(surfArea, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = π·r²·h + (4/3)·π·r³",
    stepText: `1. Cylindrical Volume = π × (${r})² × ${h} = ${formatNumber(volCylinder, precision)} ${unit}³.\n2. Hemispherical Ends Volume = (4/3) × π × (${r})³ = ${formatNumber(volSphere, precision)} ${unit}³.\n3. Total Volume V = ${formatNumber(vol, precision)} ${unit}³ | Surface Area = ${formatNumber(surfArea, precision)} ${unit}².`
  };
}

// 7. Spherical Cap (Base radius r, Ball radius R, Height h)
export function computeSphericalCapVolume(
  r: number,
  R: number,
  h: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(h) || h < 0) {
    return {
      shapeName: "Spherical Cap",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (1/3)·π·h²·(3R - h)",
      stepText: "Cap height must be a non-negative number.",
      error: "Cap height must be a non-negative number."
    };
  }

  let ballR = R;
  const baseR = r;

  if (!ballR || ballR <= 0) {
    if (h <= 0) {
      ballR = 0;
    } else {
      ballR = (baseR * baseR + h * h) / (2.0 * h);
    }
  }

  if (ballR > 0 && h > 2.0 * ballR) {
    return {
      shapeName: "Spherical Cap",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (1/3)·π·h²·(3R - h)",
      stepText: `Cap height (${h} ${unit}) cannot exceed sphere diameter (${2.0 * ballR} ${unit}).`,
      error: `Cap height (${h} ${unit}) cannot exceed sphere diameter (${2.0 * ballR} ${unit}).`
    };
  }

  const vol = (1.0 / 3.0) * Math.PI * h * h * (3.0 * ballR - h);
  const surfCapArea = 2.0 * Math.PI * ballR * h;

  const hM = toMeters(h, unit);
  const RM = toMeters(ballR, unit);
  const volM3 = (1.0 / 3.0) * Math.PI * hM * hM * (3.0 * RM - hM);
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Spherical Cap",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: surfCapArea,
    formattedSurfaceArea: formatNumber(surfCapArea, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = (1/3)·π·h²·(3R - h)",
    stepText: `1. Ball Radius R = ${formatNumber(ballR, precision)} ${unit}.\n2. Volume V = (1/3) × π × (${h})² × (3 × ${formatNumber(ballR, precision)} - ${h}) = ${formatNumber(vol, precision)} ${unit}³.\n3. Cap Surface Area = 2·π·R·h = ${formatNumber(surfCapArea, precision)} ${unit}².`
  };
}

// 8. Conical Frustum (Top r, Bottom R, Height h)
export function computeFrustumVolume(
  topR: number,
  botR: number,
  h: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(topR) || topR < 0 || isNaN(botR) || botR < 0 || isNaN(h) || h <= 0) {
    return {
      shapeName: "Conical Frustum",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (1/3)·π·h·(r² + rR + R²)",
      stepText: "Radii must be non-negative and height must be positive.",
      error: "Radii must be non-negative and height must be positive."
    };
  }

  const r = topR;
  const R = botR;
  const vol = (1.0 / 3.0) * Math.PI * h * (r * r + r * R + R * R);
  const slant = Math.sqrt(Math.pow(R - r, 2) + h * h);
  const latArea = Math.PI * (r + R) * slant;

  const rM = toMeters(r, unit);
  const RM = toMeters(R, unit);
  const hM = toMeters(h, unit);
  const volM3 = (1.0 / 3.0) * Math.PI * hM * (rM * rM + rM * RM + RM * RM);
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Conical Frustum",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    slantHeight: slant,
    formattedSlantHeight: formatNumber(slant, precision),
    lateralArea: latArea,
    formattedLateralArea: formatNumber(latArea, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = (1/3)·π·h·(r² + r·R + R²)",
    stepText: `1. Volume V = (1/3) × π × ${h} × (${r}² + ${r}·${R} + ${R}²) = ${formatNumber(vol, precision)} ${unit}³.\n2. Slant Height s = √((${R} - ${r})² + ${h}²) = ${formatNumber(slant, precision)} ${unit}.\n3. Lateral Area = π·(r + R)·s = ${formatNumber(latArea, precision)} ${unit}².`
  };
}

// 9. Ellipsoid (Semi-axes a, b, c)
export function computeEllipsoidVolume(
  a: number,
  b: number,
  c: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(a) || a < 0 || isNaN(b) || b < 0 || isNaN(c) || c < 0) {
    return {
      shapeName: "Ellipsoid",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (4/3)·π·a·b·c",
      stepText: "Semi-axes must be non-negative numbers.",
      error: "Semi-axes must be non-negative numbers."
    };
  }

  const vol = (4.0 / 3.0) * Math.PI * a * b * c;

  // Knud Thomsen's formula for approximate ellipsoid surface area (p ≈ 1.6075)
  const p = 1.6075;
  let area = 0;
  if (a > 0 || b > 0 || c > 0) {
    const term = (Math.pow(a * b, p) + Math.pow(a * c, p) + Math.pow(b * c, p)) / 3.0;
    area = 4.0 * Math.PI * Math.pow(term, 1.0 / p);
  }

  const aM = toMeters(a, unit);
  const bM = toMeters(b, unit);
  const cM = toMeters(c, unit);
  const volM3 = (4.0 / 3.0) * Math.PI * aM * bM * cM;
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Ellipsoid",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: area,
    formattedSurfaceArea: formatNumber(area, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = (4/3)·π·a·b·c",
    stepText: `1. Volume V = (4/3) × π × ${a} × ${b} × ${c} = ${formatNumber(vol, precision)} ${unit}³.\n2. Surface Area (Knud Thomsen formula) ≈ ${formatNumber(area, precision)} ${unit}².`
  };
}

// 10. Square Pyramid (Base edge a, Height h)
export function computePyramidVolume(
  a: number,
  h: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult {
  if (isNaN(a) || a <= 0 || isNaN(h) || h <= 0) {
    return {
      shapeName: "Square Pyramid",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      conversions: convertVolumeFromCubicMeters(0, precision).raw,
      formattedConversions: convertVolumeFromCubicMeters(0, precision).formatted,
      formula: "V = (1/3)·a²·h",
      stepText: "Base edge and height must be positive numbers.",
      error: "Base edge and height must be positive numbers."
    };
  }

  const vol = (1.0 / 3.0) * a * a * h;
  const slant = Math.sqrt(Math.pow(a / 2.0, 2) + h * h);
  const latArea = 2.0 * a * slant;
  const surfArea = a * a + latArea;

  const aM = toMeters(a, unit);
  const hM = toMeters(h, unit);
  const volM3 = (1.0 / 3.0) * aM * aM * hM;
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Square Pyramid",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    surfaceArea: surfArea,
    formattedSurfaceArea: formatNumber(surfArea, precision),
    lateralArea: latArea,
    formattedLateralArea: formatNumber(latArea, precision),
    slantHeight: slant,
    formattedSlantHeight: formatNumber(slant, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = (1/3)·a²·h",
    stepText: `1. Volume V = (1/3) × (${a})² × ${h} = ${formatNumber(vol, precision)} ${unit}³.\n2. Slant Height s = √((${a}/2)² + ${h}²) = ${formatNumber(slant, precision)} ${unit}.\n3. Lateral Area = 2·a·s = ${formatNumber(latArea, precision)} ${unit}² | Total Surface Area = ${formatNumber(surfArea, precision)} ${unit}².`
  };
}

// 11. Hollow Tube / Cylinder (Outer d1, Inner d2, Length l)
export function computeTubeVolume(
  d1: number,
  d2: number,
  l: number,
  unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m",
  precision: number = 4
): ShapeVolumeResult & { wallThickness: number; formattedWallThickness: string } {
  const emptyConv = convertVolumeFromCubicMeters(0, precision);

  if (isNaN(d1) || d1 <= 0 || isNaN(d2) || d2 < 0 || isNaN(l) || l <= 0) {
    return {
      shapeName: "Hollow Tube / Cylinder",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      wallThickness: 0,
      formattedWallThickness: formatNumber(0, precision),
      conversions: emptyConv.raw,
      formattedConversions: emptyConv.formatted,
      formula: "V = [π·(d1² - d2²)·l] / 4",
      stepText: "Dimensions must be positive numbers (inner diameter >= 0).",
      error: "Dimensions must be positive numbers (inner diameter >= 0)."
    };
  }

  if (d2 >= d1) {
    return {
      shapeName: "Hollow Tube / Cylinder",
      volume: 0,
      formattedVolume: formatNumber(0, precision),
      wallThickness: 0,
      formattedWallThickness: formatNumber(0, precision),
      conversions: emptyConv.raw,
      formattedConversions: emptyConv.formatted,
      formula: "V = [π·(d1² - d2²)·l] / 4",
      stepText: `Inner diameter (${d2} ${unit}) must be strictly less than outer diameter (${d1} ${unit}).`,
      error: `Inner diameter (${d2} ${unit}) must be strictly less than outer diameter (${d1} ${unit}).`
    };
  }

  const vol = (Math.PI * (d1 * d1 - d2 * d2) * l) / 4.0;
  const thickness = (d1 - d2) / 2.0;

  const d1M = toMeters(d1, unit);
  const d2M = toMeters(d2, unit);
  const lM = toMeters(l, unit);
  const volM3 = (Math.PI * (d1M * d1M - d2M * d2M) * lM) / 4.0;
  const conv = convertVolumeFromCubicMeters(volM3, precision);

  return {
    shapeName: "Hollow Tube / Cylinder",
    volume: vol,
    formattedVolume: formatNumber(vol, precision),
    wallThickness: thickness,
    formattedWallThickness: formatNumber(thickness, precision),
    conversions: conv.raw,
    formattedConversions: conv.formatted,
    formula: "V = [π·(d1² - d2²)·l] / 4",
    stepText: `1. Wall Thickness = (${d1} - ${d2}) / 2 = ${formatNumber(thickness, precision)} ${unit}.\n2. Material Volume V = [π × (${d1}² - ${d2}²) × ${l}] / 4 = ${formatNumber(vol, precision)} ${unit}³.`
  };
}
