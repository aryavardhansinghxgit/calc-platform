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

// Convert length to meters
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

// Convert volume in cubic meters to all target volume units
export function convertVolumeFromCubicMeters(vM3: number, precision: number = 4): UnitConversionMap {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    cubicMeters: fmt(vM3),
    cubicCentimeters: fmt(vM3 * 1e6),
    cubicMillimeters: fmt(vM3 * 1e9),
    liters: fmt(vM3 * 1000.0),
    milliliters: fmt(vM3 * 1e6),
    usGallons: fmt(vM3 * 264.172052),
    usFluidOunces: fmt(vM3 * 33814.0227),
    usQuarts: fmt(vM3 * 1056.68821),
    impGallons: fmt(vM3 * 219.969248),
    cubicFeet: fmt(vM3 * 35.3146667),
    cubicInches: fmt(vM3 * 61023.7441),
    cubicYards: fmt(vM3 * 1.30795062)
  };
}

export interface ShapeVolumeResult {
  shapeName: string;
  volume: number;
  surfaceArea?: number;
  lateralArea?: number;
  slantHeight?: number;
  diagonal?: number;
  capacityLiters?: number;
  capacityUsGallons?: number;
  conversions: UnitConversionMap;
  stepText: string;
  formula: string;
}

// 1. Sphere (Radius r)
export function computeSphereVolume(r: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const radius = Math.max(0.0001, r);
  const vol = (4.0 / 3.0) * Math.PI * Math.pow(radius, 3);
  const area = 4.0 * Math.PI * Math.pow(radius, 2);

  const rM = toMeters(radius, unit);
  const volM3 = (4.0 / 3.0) * Math.PI * Math.pow(rM, 3);

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Sphere",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(area)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = (4/3)·π·r³",
    stepText: `1. Volume V = (4/3) × π × (${radius})³ = (4/3) × π × ${(Math.pow(radius, 3)).toFixed(precision)} = ${fmt(vol)} ${unit}³.\n2. Surface Area A = 4 × π × (${radius})² = ${fmt(area)} ${unit}².`
  };
}

// 2. Cone (Radius r, Height h)
export function computeConeVolume(r: number, h: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const radius = Math.max(0.0001, r);
  const height = Math.max(0.0001, h);

  const vol = (1.0 / 3.0) * Math.PI * radius * radius * height;
  const slant = Math.sqrt(radius * radius + height * height);
  const latArea = Math.PI * radius * slant;
  const surfArea = Math.PI * radius * (radius + slant);

  const rM = toMeters(radius, unit);
  const hM = toMeters(height, unit);
  const volM3 = (1.0 / 3.0) * Math.PI * rM * rM * hM;

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Cone",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(surfArea)),
    lateralArea: parseFloat(fmt(latArea)),
    slantHeight: parseFloat(fmt(slant)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = (1/3)·π·r²·h",
    stepText: `1. Volume V = (1/3) × π × (${radius})² × (${height}) = ${fmt(vol)} ${unit}³.\n2. Slant Height s = √(${radius}² + ${height}²) = ${fmt(slant)} ${unit}.\n3. Lateral Area = π·r·s = ${fmt(latArea)} ${unit}² | Total Surface Area = ${fmt(surfArea)} ${unit}².`
  };
}

// 3. Cylinder (Radius r, Height h)
export function computeCylinderVolume(r: number, h: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const radius = Math.max(0.0001, r);
  const height = Math.max(0.0001, h);

  const vol = Math.PI * radius * radius * height;
  const latArea = 2.0 * Math.PI * radius * height;
  const surfArea = 2.0 * Math.PI * radius * (radius + height);

  const rM = toMeters(radius, unit);
  const hM = toMeters(height, unit);
  const volM3 = Math.PI * rM * rM * hM;

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Cylinder",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(surfArea)),
    lateralArea: parseFloat(fmt(latArea)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = π·r²·h",
    stepText: `1. Volume V = π × (${radius})² × (${height}) = ${fmt(vol)} ${unit}³.\n2. Lateral Area = 2·π·r·h = ${fmt(latArea)} ${unit}².\n3. Total Surface Area = 2·π·r·(r + h) = ${fmt(surfArea)} ${unit}².`
  };
}

// 4. Cube (Edge a)
export function computeCubeVolume(a: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const edge = Math.max(0.0001, a);

  const vol = Math.pow(edge, 3);
  const area = 6.0 * edge * edge;
  const diag = edge * Math.sqrt(3);

  const aM = toMeters(edge, unit);
  const volM3 = Math.pow(aM, 3);

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Cube",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(area)),
    diagonal: parseFloat(fmt(diag)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = a³",
    stepText: `1. Volume V = (${edge})³ = ${fmt(vol)} ${unit}³.\n2. Surface Area A = 6 × (${edge})² = ${fmt(area)} ${unit}².\n3. Space Diagonal d = ${edge} × √3 = ${fmt(diag)} ${unit}.`
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
): ShapeVolumeResult & { filledVolume?: number; emptyVolume?: number } {
  const length = Math.max(0.0001, l);
  const width = Math.max(0.0001, w);
  const height = Math.max(0.0001, h);

  const vol = length * width * height;
  const area = 2.0 * (length * width + length * height + width * height);
  const diag = Math.sqrt(length * length + width * width + height * height);

  const lM = toMeters(length, unit);
  const wM = toMeters(width, unit);
  const hM = toMeters(height, unit);
  const volM3 = lM * wM * hM;
  const convs = convertVolumeFromCubicMeters(volM3, precision);

  const fmt = (v: number) => v.toFixed(precision);

  let filledVolume: number | undefined;
  let emptyVolume: number | undefined;

  if (fillH !== undefined && fillH > 0) {
    const clampedFill = Math.min(height, fillH);
    filledVolume = parseFloat(fmt(length * width * clampedFill));
    emptyVolume = parseFloat(fmt(vol - (filledVolume || 0)));
  }

  return {
    shapeName: "Rectangular Prism / Tank",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(area)),
    diagonal: parseFloat(fmt(diag)),
    capacityLiters: convs.liters,
    capacityUsGallons: convs.usGallons,
    filledVolume,
    emptyVolume,
    conversions: convs,
    formula: "V = l·w·h",
    stepText: `1. Volume V = ${length} × ${width} × ${height} = ${fmt(vol)} ${unit}³.\n2. Total Surface Area = 2 × (${length}·${width} + ${length}·${height} + ${width}·${height}) = ${fmt(area)} ${unit}².\n3. Liquid Capacity = ${convs.liters} Liters = ${convs.usGallons} US Gallons.`
  };
}

// 6. Capsule (Radius r, Height h)
export function computeCapsuleVolume(r: number, h: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const radius = Math.max(0.0001, r);
  const height = Math.max(0.0001, h);

  // V = π r² h + (4/3) π r³
  const volCylinder = Math.PI * radius * radius * height;
  const volSphere = (4.0 / 3.0) * Math.PI * Math.pow(radius, 3);
  const vol = volCylinder + volSphere;

  const surfArea = 2.0 * Math.PI * radius * height + 4.0 * Math.PI * radius * radius;

  const rM = toMeters(radius, unit);
  const hM = toMeters(height, unit);
  const volM3 = Math.PI * rM * rM * hM + (4.0 / 3.0) * Math.PI * Math.pow(rM, 3);

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Capsule",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(surfArea)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = π·r²·h + (4/3)·π·r³",
    stepText: `1. Cylindrical Volume = π × (${radius})² × ${height} = ${fmt(volCylinder)}.\n2. Hemispherical Ends Volume = (4/3) × π × (${radius})³ = ${fmt(volSphere)}.\n3. Total Volume V = ${fmt(vol)} ${unit}³ | Surface Area = ${fmt(surfArea)} ${unit}².`
  };
}

// 7. Spherical Cap (Base radius r, Ball radius R, Height h)
export function computeSphericalCapVolume(r: number, R: number, h: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const height = Math.max(0.0001, h);
  let ballR = R;
  let baseR = r;

  // If R not provided, calculate R from r and h: R = (r² + h²) / (2h)
  if (!ballR || ballR <= 0) {
    ballR = (baseR * baseR + height * height) / (2.0 * height);
  }

  const vol = (1.0 / 3.0) * Math.PI * height * height * (3.0 * ballR - height);
  const surfCapArea = 2.0 * Math.PI * ballR * height;

  const hM = toMeters(height, unit);
  const RM = toMeters(ballR, unit);
  const volM3 = (1.0 / 3.0) * Math.PI * hM * hM * (3.0 * RM - hM);

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Spherical Cap",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(surfCapArea)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = (1/3)·π·h²·(3R - h)",
    stepText: `1. Ball Radius R = ${fmt(ballR)} ${unit}.\n2. Volume V = (1/3) × π × (${height})² × (3 × ${fmt(ballR)} - ${height}) = ${fmt(vol)} ${unit}³.\n3. Cap Surface Area = 2·π·R·h = ${fmt(surfCapArea)} ${unit}².`
  };
}

// 8. Conical Frustum (Top r, Bottom R, Height h)
export function computeFrustumVolume(topR: number, botR: number, h: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const r = Math.max(0, topR);
  const R = Math.max(0.0001, botR);
  const height = Math.max(0.0001, h);

  const vol = (1.0 / 3.0) * Math.PI * height * (r * r + r * R + R * R);
  const slant = Math.sqrt(Math.pow(R - r, 2) + height * height);
  const latArea = Math.PI * (r + R) * slant;

  const rM = toMeters(r, unit);
  const RM = toMeters(R, unit);
  const hM = toMeters(height, unit);
  const volM3 = (1.0 / 3.0) * Math.PI * hM * (rM * rM + rM * RM + RM * RM);

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Conical Frustum",
    volume: parseFloat(fmt(vol)),
    slantHeight: parseFloat(fmt(slant)),
    lateralArea: parseFloat(fmt(latArea)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = (1/3)·π·h·(r² + rR + R²)",
    stepText: `1. Volume V = (1/3) × π × ${height} × (${r}² + ${r}·${R} + ${R}²) = ${fmt(vol)} ${unit}³.\n2. Slant Height s = √((${R} - ${r})² + ${height}²) = ${fmt(slant)} ${unit}.\n3. Lateral Area = π·(r + R)·s = ${fmt(latArea)} ${unit}².`
  };
}

// 9. Ellipsoid (Semi-axes a, b, c)
export function computeEllipsoidVolume(a: number, b: number, c: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const sa = Math.max(0.0001, a);
  const sb = Math.max(0.0001, b);
  const sc = Math.max(0.0001, c);

  const vol = (4.0 / 3.0) * Math.PI * sa * sb * sc;

  // Knud Thomsen's formula for approximate ellipsoid surface area (p ≈ 1.6075)
  const p = 1.6075;
  const term = (Math.pow(sa * sb, p) + Math.pow(sa * sc, p) + Math.pow(sb * sc, p)) / 3.0;
  const area = 4.0 * Math.PI * Math.pow(term, 1.0 / p);

  const aM = toMeters(sa, unit);
  const bM = toMeters(sb, unit);
  const cM = toMeters(sc, unit);
  const volM3 = (4.0 / 3.0) * Math.PI * aM * bM * cM;

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Ellipsoid",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(area)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = (4/3)·π·a·b·c",
    stepText: `1. Volume V = (4/3) × π × ${sa} × ${sb} × ${sc} = ${fmt(vol)} ${unit}³.\n2. Approx Surface Area (Knud Thomsen formula) = ${fmt(area)} ${unit}².`
  };
}

// 10. Square Pyramid (Base edge a, Height h)
export function computePyramidVolume(a: number, h: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult {
  const baseEdge = Math.max(0.0001, a);
  const height = Math.max(0.0001, h);

  const vol = (1.0 / 3.0) * baseEdge * baseEdge * height;
  const slant = Math.sqrt(Math.pow(baseEdge / 2.0, 2) + height * height);
  const latArea = 2.0 * baseEdge * slant;
  const surfArea = baseEdge * baseEdge + latArea;

  const aM = toMeters(baseEdge, unit);
  const hM = toMeters(height, unit);
  const volM3 = (1.0 / 3.0) * aM * aM * hM;

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Square Pyramid",
    volume: parseFloat(fmt(vol)),
    surfaceArea: parseFloat(fmt(surfArea)),
    lateralArea: parseFloat(fmt(latArea)),
    slantHeight: parseFloat(fmt(slant)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = (1/3)·a²·h",
    stepText: `1. Volume V = (1/3) × (${baseEdge})² × ${height} = ${fmt(vol)} ${unit}³.\n2. Slant Height s = √((${baseEdge}/2)² + ${height}²) = ${fmt(slant)} ${unit}.\n3. Lateral Area = 2·a·s = ${fmt(latArea)} ${unit}² | Total Surface Area = ${fmt(surfArea)} ${unit}².`
  };
}

// 11. Hollow Tube / Cylinder (Outer d1, Inner d2, Length l)
export function computeTubeVolume(d1: number, d2: number, l: number, unit: "m" | "cm" | "mm" | "ft" | "in" | "yd" = "m", precision: number = 4): ShapeVolumeResult & { wallThickness: number } {
  const outerD = Math.max(0.0002, d1);
  const innerD = Math.max(0.0001, Math.min(outerD - 0.0001, d2));
  const len = Math.max(0.0001, l);

  const vol = (Math.PI * (outerD * outerD - innerD * innerD) * len) / 4.0;
  const thickness = (outerD - innerD) / 2.0;

  const d1M = toMeters(outerD, unit);
  const d2M = toMeters(innerD, unit);
  const lM = toMeters(len, unit);
  const volM3 = (Math.PI * (d1M * d1M - d2M * d2M) * lM) / 4.0;

  const fmt = (v: number) => v.toFixed(precision);

  return {
    shapeName: "Hollow Tube / Cylinder",
    volume: parseFloat(fmt(vol)),
    wallThickness: parseFloat(fmt(thickness)),
    conversions: convertVolumeFromCubicMeters(volM3, precision),
    formula: "V = [π·(d1² - d2²)·l] / 4",
    stepText: `1. Wall Thickness = (${outerD} - ${innerD}) / 2 = ${fmt(thickness)} ${unit}.\n2. Material Volume V = [π × (${outerD}² - ${innerD}²) × ${len}] / 4 = ${fmt(vol)} ${unit}³.`
  };
}
