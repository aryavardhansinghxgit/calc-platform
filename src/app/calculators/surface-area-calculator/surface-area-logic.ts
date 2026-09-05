/**
 * Mathematical logic engine for Surface Area Calculator & 3D Solids Net Suite
 */

export interface SphereSAResult {
  totalArea: number;
  lateralArea: number; // curved surface area
  baseArea: number;
  curvedHemisphereArea: number;
  closedHemisphereArea: number;
  hemisphereArea: number; // alias for backwards compatibility (closed)
  sphereVolume: number;
  hemisphereVolume: number;
  volume: number; // alias (sphere volume)
  exactPi: string;
  stepText: string;
}

export function computeSphereSurfaceArea(radius: number, precision: number = 4): SphereSAResult {
  const r = radius;
  const totalArea = 4.0 * Math.PI * r * r;
  const lateralArea = totalArea; // sphere has full curved surface
  const baseArea = 0;
  const curvedHemisphereArea = 2.0 * Math.PI * r * r;
  const closedHemisphereArea = 3.0 * Math.PI * r * r;
  const sphereVolume = (4.0 / 3.0) * Math.PI * r * r * r;
  const hemisphereVolume = (2.0 / 3.0) * Math.PI * r * r * r;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const exactPi = `${fmt(4 * r * r)}π`;

  const stepText = `1. Radius r = ${r}.\n2. Sphere Total Surface Area A = 4πr² = 4 × π × ${r}² = ${exactPi} ≈ ${fmt(totalArea)}.\n3. Curved Hemisphere Area A_curved = 2πr² ≈ ${fmt(curvedHemisphereArea)}.\n4. Closed Hemisphere Total Area A_closed = 3πr² ≈ ${fmt(closedHemisphereArea)}.\n5. Full Sphere Volume V = ⁴/₃πr³ ≈ ${fmt(sphereVolume)}.\n6. Hemisphere Volume V_hemi = ⅔πr³ ≈ ${fmt(hemisphereVolume)}.`;

  return {
    totalArea: fmt(totalArea),
    lateralArea: fmt(lateralArea),
    baseArea: 0,
    curvedHemisphereArea: fmt(curvedHemisphereArea),
    closedHemisphereArea: fmt(closedHemisphereArea),
    hemisphereArea: fmt(closedHemisphereArea),
    sphereVolume: fmt(sphereVolume),
    hemisphereVolume: fmt(hemisphereVolume),
    volume: fmt(sphereVolume),
    exactPi,
    stepText
  };
}

export interface ConeSAResult {
  totalArea: number;
  lateralArea: number;
  baseArea: number;
  topBaseArea?: number;
  bottomBaseArea?: number;
  slantHeight: number;
  volume: number;
  stepText: string;
}

export function computeConeSurfaceArea(
  r: number,
  h: number,
  isFrustum: boolean = false,
  topR: number = 0,
  precision: number = 4
): ConeSAResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isFrustum) {
    const s = Math.sqrt(r * r + h * h);
    const baseArea = Math.PI * r * r;
    const lateralArea = Math.PI * r * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * Math.PI * r * r * h;

    const stepText = `1. Radius r = ${r}, Height h = ${h}.\n2. Slant Height s = √(r² + h²) = √(${r}² + ${h}²) = ${fmt(s)}.\n3. Circular Base Area A_base = πr² = ${fmt(baseArea)}.\n4. Curved Lateral Area A_lateral = πrs = ${fmt(lateralArea)}.\n5. Total Surface Area A_total = A_base + A_lateral = ${fmt(totalArea)}.\n6. Cone Volume V = ⅓πr²h = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume),
      stepText
    };
  } else {
    // Conical Frustum: R is bottom radius, topR is top radius
    const R = r;
    const rSmall = topR;
    const s = Math.sqrt((R - rSmall) * (R - rSmall) + h * h);
    const topBase = Math.PI * rSmall * rSmall;
    const botBase = Math.PI * R * R;
    const baseArea = topBase + botBase;
    const lateralArea = Math.PI * (R + rSmall) * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * Math.PI * h * (R * R + R * rSmall + rSmall * rSmall);

    const stepText = `1. Bottom Radius R = ${R}, Top Radius r = ${rSmall}, Height h = ${h}.\n2. Slant Height s = √((R - r)² + h²) = ${fmt(s)}.\n3. Top Circular Base = πr² = ${fmt(topBase)}, Bottom Circular Base = πR² = ${fmt(botBase)} (Sum = ${fmt(baseArea)}).\n4. Curved Lateral Area A_lateral = π(R + r)s = ${fmt(lateralArea)}.\n5. Total Surface Area A_total = A_bases + A_lateral = ${fmt(totalArea)}.\n6. Frustum Volume V = ⅓πh(R² + Rr + r²) = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      topBaseArea: fmt(topBase),
      bottomBaseArea: fmt(botBase),
      slantHeight: fmt(s),
      volume: fmt(volume),
      stepText
    };
  }
}

export interface CylinderSAResult {
  totalArea: number;
  lateralArea: number;
  outerLateralArea?: number;
  innerLateralArea?: number;
  baseArea: number;
  volume: number;
  stepText: string;
}

export function computeCylinderSurfaceArea(
  r: number,
  h: number,
  isHollow: boolean = false,
  innerR: number = 0,
  precision: number = 4
): CylinderSAResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isHollow) {
    const baseArea = 2.0 * Math.PI * r * r; // 2 circular bases
    const lateralArea = 2.0 * Math.PI * r * h;
    const totalArea = baseArea + lateralArea;
    const volume = Math.PI * r * r * h;

    const stepText = `1. Radius r = ${r}, Height h = ${h}.\n2. Two Circular Bases Area = 2 × πr² = 2 × π × ${r}² = ${fmt(baseArea)}.\n3. Curved Lateral Area = 2πrh = 2 × π × ${r} × ${h} = ${fmt(lateralArea)}.\n4. Total Surface Area A = 2πr(r + h) = ${fmt(totalArea)}.\n5. Cylinder Volume V = πr²h = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      volume: fmt(volume),
      stepText
    };
  } else {
    // Hollow Pipe / Tube: R is outer radius, innerR is inner radius
    const R = r;
    const rSmall = innerR;
    const outerLateral = 2.0 * Math.PI * R * h;
    const innerLateral = 2.0 * Math.PI * rSmall * h;
    const lateralArea = outerLateral + innerLateral;
    const endRings = 2.0 * Math.PI * (R * R - rSmall * rSmall);
    const totalArea = lateralArea + endRings;
    const volume = Math.PI * (R * R - rSmall * rSmall) * h;

    const stepText = `1. Outer Radius R = ${R}, Inner Radius r = ${rSmall}, Height h = ${h}.\n2. Outer Curved Wall = 2πRh = ${fmt(outerLateral)}, Inner Curved Wall = 2πrh = ${fmt(innerLateral)} (Total Lateral = ${fmt(lateralArea)}).\n3. Two Annular End Rings = 2π(R² - r²) = ${fmt(endRings)}.\n4. Total Surface Area A = 2πRh + 2πrh + 2π(R² - r²) = ${fmt(totalArea)}.\n5. Solid Wall Material Volume V = π(R² - r²)h = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      outerLateralArea: fmt(outerLateral),
      innerLateralArea: fmt(innerLateral),
      baseArea: fmt(endRings),
      volume: fmt(volume),
      stepText
    };
  }
}

export interface BoxSAResult {
  totalArea: number;
  lateralArea: number;
  baseArea: number;
  openTopArea: number;
  volume: number;
  isCube?: boolean;
  stepText: string;
}

export function computeBoxSurfaceArea(
  l: number,
  w: number,
  h: number,
  isCube: boolean = false,
  precision: number = 4
): BoxSAResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (isCube) {
    const a = l;
    const baseArea = 2.0 * a * a; // top and bottom
    const lateralArea = 4.0 * a * a; // 4 side walls
    const totalArea = 6.0 * a * a;
    const openTopArea = 5.0 * a * a;
    const volume = a * a * a;

    const stepText = `1. Cube Side Length a = ${a}.\n2. Single Face Area = a² = ${a}² = ${fmt(a * a)}.\n3. Total Surface Area (6 Faces) A = 6a² = 6 × ${a}² = ${fmt(totalArea)}.\n4. Open-Top Box Area (5 Faces) = 5a² = ${fmt(openTopArea)}.\n5. Cube Volume V = a³ = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      openTopArea: fmt(openTopArea),
      volume: fmt(volume),
      isCube: true,
      stepText
    };
  }

  const baseArea = 2.0 * l * w;
  const lateralArea = 2.0 * (l + w) * h;
  const totalArea = 2.0 * (l * w + l * h + w * h);
  const openTopArea = l * w + 2.0 * (l * h + w * h);
  const volume = l * w * h;

  const stepText = `1. Length l = ${l}, Width w = ${w}, Height h = ${h}.\n2. Top & Bottom Bases = 2 × (${l} × ${w}) = ${fmt(baseArea)}.\n3. 4 Side Walls (Lateral Area) = 2(lh + wh) = ${fmt(lateralArea)}.\n4. Total Surface Area A = 2(lw + lh + wh) = ${fmt(totalArea)}.\n5. Open-Top Tank Area = lw + 2(lh + wh) = ${fmt(openTopArea)}.\n6. Prism Volume V = lwh = ${fmt(volume)}.`;

  return {
    totalArea: fmt(totalArea),
    lateralArea: fmt(lateralArea),
    baseArea: fmt(baseArea),
    openTopArea: fmt(openTopArea),
    volume: fmt(volume),
    isCube: false,
    stepText
  };
}

export interface PyramidSAResult {
  totalArea: number;
  lateralArea: number;
  baseArea: number;
  slantHeight: number;
  volume: number;
  isTetrahedron?: boolean;
  stepText: string;
}

export function computePyramidSurfaceArea(
  a: number,
  h: number,
  isTetrahedron: boolean = false,
  precision: number = 4
): PyramidSAResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isTetrahedron) {
    // Square Pyramid
    const s = Math.sqrt((a / 2.0) * (a / 2.0) + h * h);
    const baseArea = a * a;
    const lateralArea = 2.0 * a * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * baseArea * h;

    const stepText = `1. Base Edge a = ${a}, Vertical Height h = ${h}.\n2. Slant Height s = √((a/2)² + h²) = √(${fmt(a / 2)}² + ${h}²) = ${fmt(s)}.\n3. Square Base Area A_base = a² = ${fmt(baseArea)}.\n4. 4 Triangular Faces (Lateral) = 2as = ${fmt(lateralArea)}.\n5. Total Surface Area A = a² + 2as = ${fmt(totalArea)}.\n6. Pyramid Volume V = ⅓a²h = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume),
      isTetrahedron: false,
      stepText
    };
  } else {
    // Regular Tetrahedron (Edge a)
    const baseArea = (Math.sqrt(3) / 4.0) * a * a;
    const lateralArea = 3.0 * baseArea;
    const totalArea = Math.sqrt(3) * a * a;
    const volume = (a * a * a) / (6.0 * Math.sqrt(2));
    const slantHeight = (Math.sqrt(3) / 2.0) * a;

    const stepText = `1. Regular Tetrahedron Edge a = ${a}.\n2. Single Equilateral Face Area = (√3/4)a² = ${fmt(baseArea)}.\n3. Slant Height (Face Altitude) s = (√3/2)a = ${fmt(slantHeight)}.\n4. Total Surface Area (4 Faces) = √3 a² = ${fmt(totalArea)}.\n5. Regular Tetrahedron Volume V = a³ / (6√2) = ${fmt(volume)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(slantHeight),
      volume: fmt(volume),
      isTetrahedron: true,
      stepText
    };
  }
}

export interface CapsuleSAResult {
  totalArea: number;
  sphereEndsArea: number;
  cylinderLateralArea: number;
  totalLength: number;
  volume: number;
  stepText: string;
}

export function computeCapsuleSurfaceArea(r: number, h: number, precision: number = 4): CapsuleSAResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const sphereEndsArea = 4.0 * Math.PI * r * r;
  const cylinderLateralArea = 2.0 * Math.PI * r * h;
  const totalArea = sphereEndsArea + cylinderLateralArea;
  const totalLength = h + 2.0 * r;
  const volume = Math.PI * r * r * h + (4.0 / 3.0) * Math.PI * r * r * r;

  const stepText = `1. Radius r = ${r}, Cylindrical Section Height h = ${h}.\n2. Total Capsule Length L = h + 2r = ${h} + 2(${r}) = ${fmt(totalLength)}.\n3. Two Hemispherical Ends Surface Area = 4πr² = 4 × π × ${r}² = ${fmt(sphereEndsArea)}.\n4. Cylindrical Side Walls Area = 2πrh = 2 × π × ${r} × ${h} = ${fmt(cylinderLateralArea)}.\n5. Total Capsule Surface Area A = 2πr(2r + h) = ${fmt(totalArea)}.\n6. Capsule Volume V = πr²h + ⁴/₃πr³ = ${fmt(volume)}.`;

  return {
    totalArea: fmt(totalArea),
    sphereEndsArea: fmt(sphereEndsArea),
    cylinderLateralArea: fmt(cylinderLateralArea),
    totalLength: fmt(totalLength),
    volume: fmt(volume),
    stepText
  };
}

export interface EllipsoidSAResult {
  surfaceArea: number;
  volume: number;
  isApproximate: boolean;
  stepText: string;
}

export function computeEllipsoidSurfaceArea(a: number, b: number, c: number, precision: number = 4): EllipsoidSAResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  // Knud Thomsen formula with p ≈ 1.6075 gives relative error < 1.061%
  const p = 1.6075;
  const term1 = Math.pow(a * b, p);
  const term2 = Math.pow(a * c, p);
  const term3 = Math.pow(b * c, p);

  const surfaceArea = 4.0 * Math.PI * Math.pow((term1 + term2 + term3) / 3.0, 1.0 / p);
  const volume = (4.0 / 3.0) * Math.PI * a * b * c;

  const stepText = `1. Semi-axes a = ${a}, b = ${b}, c = ${c}.\n2. Knud Thomsen Approximation (p = 1.6075):\n   A ≈ 4π · [((ab)^p + (ac)^p + (bc)^p) / 3]^(1/p) ≈ ${fmt(surfaceArea)}.\n3. Ellipsoid Volume V = ⁴/₃π abc = ⁴/₃ × π × ${a} × ${b} × ${c} = ${fmt(volume)}.`;

  return {
    surfaceArea: fmt(surfaceArea),
    volume: fmt(volume),
    isApproximate: true,
    stepText
  };
}

// Exact conversion constants relative to square meters
const SQ_METERS_PER_UNIT: Record<string, number> = {
  sqMeters: 1.0,
  sqCm: 0.0001,
  sqMm: 0.000001,
  sqFeet: 0.09290304, // exact (0.3048^2)
  sqInches: 0.00064516, // exact (0.0254^2)
  sqYards: 0.83612736, // exact (0.9144^2)
  acres: 4046.8564224, // exact (43560 * 0.09290304)
  hectares: 10000.0 // exact
};

export function convertFromUnitToSqMeters(val: number, unit: string): number {
  const factor = SQ_METERS_PER_UNIT[unit] ?? 1.0;
  return val * factor;
}

export function convertSurfaceAreaUnits(sqMeters: number, precision: number = 4) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const m2 = sqMeters;

  return {
    sqMeters: fmt(m2),
    sqCm: fmt(m2 / SQ_METERS_PER_UNIT.sqCm),
    sqMm: fmt(m2 / SQ_METERS_PER_UNIT.sqMm),
    sqFeet: fmt(m2 / SQ_METERS_PER_UNIT.sqFeet),
    sqInches: fmt(m2 / SQ_METERS_PER_UNIT.sqInches),
    sqYards: fmt(m2 / SQ_METERS_PER_UNIT.sqYards),
    acres: fmt(m2 / SQ_METERS_PER_UNIT.acres),
    hectares: fmt(m2 / SQ_METERS_PER_UNIT.hectares)
  };
}
