/**
 * Mathematical logic engine for Surface Area Calculator & 3D Solids Net Suite
 */

export interface SphereSAResult {
  totalArea: number;
  lateralArea: number; // curved surface area
  baseArea: number;
  hemisphereArea: number;
  volume: number;
  exactPi: string;
  stepText: string;
}

export function computeSphereSurfaceArea(radius: number, precision: number = 4): SphereSAResult {
  const r = Math.max(0.000001, radius);
  const totalArea = 4.0 * Math.PI * r * r;
  const lateralArea = totalArea; // sphere has full curved surface
  const baseArea = 0;
  const hemisphereArea = 3.0 * Math.PI * r * r;
  const volume = (4.0 / 3.0) * Math.PI * r * r * r;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const exactPi = `${fmt(4 * r * r)}π`;

  const stepText = `1. Radius r = ${r}.\n2. Total Surface Area A = 4πr² = 4 × π × ${r}² = ${exactPi} ≈ ${fmt(totalArea)}.\n3. Hemisphere Area A_hemi = 3πr² ≈ ${fmt(hemisphereArea)}.\n4. Volume V = ⁴/₃πr³ ≈ ${fmt(volume)}.`;

  return {
    totalArea: fmt(totalArea),
    lateralArea: fmt(lateralArea),
    baseArea: 0,
    hemisphereArea: fmt(hemisphereArea),
    volume: fmt(volume),
    exactPi,
    stepText
  };
}

export interface ConeSAResult {
  totalArea: number;
  lateralArea: number;
  baseArea: number;
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
  const safeR = Math.max(0.000001, r);
  const safeH = Math.max(0.000001, h);

  if (!isFrustum) {
    const s = Math.sqrt(safeR * safeR + safeH * safeH);
    const baseArea = Math.PI * safeR * safeR;
    const lateralArea = Math.PI * safeR * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * Math.PI * safeR * safeR * safeH;

    const fmt = (v: number) => parseFloat(v.toFixed(precision));

    const stepText = `1. Radius r = ${safeR}, Height h = ${safeH}.\n2. Slant Height s = √(r² + h²) = √(${safeR}² + ${safeH}²) = ${fmt(s)}.\n3. Base Area A_base = πr² = ${fmt(baseArea)}.\n4. Lateral Area A_lateral = πrs = ${fmt(lateralArea)}.\n5. Total Surface Area A_total = A_base + A_lateral = ${fmt(totalArea)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume),
      stepText
    };
  } else {
    // Conical Frustum
    const R = Math.max(safeR, topR);
    const rSmall = Math.min(safeR, topR);
    const s = Math.sqrt((R - rSmall) * (R - rSmall) + safeH * safeH);
    const topBase = Math.PI * rSmall * rSmall;
    const botBase = Math.PI * R * R;
    const baseArea = topBase + botBase;
    const lateralArea = Math.PI * (R + rSmall) * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * Math.PI * safeH * (R * R + R * rSmall + rSmall * rSmall);

    const fmt = (v: number) => parseFloat(v.toFixed(precision));

    const stepText = `1. Bottom Radius R = ${R}, Top Radius r = ${rSmall}, Height h = ${safeH}.\n2. Slant Height s = √((R - r)² + h²) = ${fmt(s)}.\n3. Top Base = ${fmt(topBase)}, Bottom Base = ${fmt(botBase)} (Sum = ${fmt(baseArea)}).\n4. Lateral Surface Area A_lateral = π(R + r)s = ${fmt(lateralArea)}.\n5. Total Surface Area A_total = ${fmt(totalArea)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume),
      stepText
    };
  }
}

export interface CylinderSAResult {
  totalArea: number;
  lateralArea: number;
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
  const safeR = Math.max(0.000001, r);
  const safeH = Math.max(0.000001, h);

  if (!isHollow) {
    const baseArea = 2.0 * Math.PI * safeR * safeR; // 2 bases
    const lateralArea = 2.0 * Math.PI * safeR * safeH;
    const totalArea = baseArea + lateralArea;
    const volume = Math.PI * safeR * safeR * safeH;

    const fmt = (v: number) => parseFloat(v.toFixed(precision));

    const stepText = `1. Radius r = ${safeR}, Height h = ${safeH}.\n2. Two Circular Bases Area = 2 × πr² = 2 × π × ${safeR}² = ${fmt(baseArea)}.\n3. Curved Lateral Area = 2πrh = 2 × π × ${safeR} × ${safeH} = ${fmt(lateralArea)}.\n4. Total Surface Area A = 2πr(r + h) = ${fmt(totalArea)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      volume: fmt(volume),
      stepText
    };
  } else {
    // Hollow Pipe
    const R = Math.max(safeR, innerR);
    const rSmall = Math.min(safeR, innerR);
    const outerLateral = 2.0 * Math.PI * R * safeH;
    const innerLateral = 2.0 * Math.PI * rSmall * safeH;
    const lateralArea = outerLateral + innerLateral;
    const endRings = 2.0 * Math.PI * (R * R - rSmall * rSmall);
    const totalArea = lateralArea + endRings;
    const volume = Math.PI * (R * R - rSmall * rSmall) * safeH;

    const fmt = (v: number) => parseFloat(v.toFixed(precision));

    const stepText = `1. Outer R = ${R}, Inner r = ${rSmall}, Height h = ${safeH}.\n2. Outer Lateral = ${fmt(outerLateral)}, Inner Lateral = ${fmt(innerLateral)}.\n3. Two End Rings = 2π(R² - r²) = ${fmt(endRings)}.\n4. Total Surface Area A = ${fmt(totalArea)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
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
  stepText: string;
}

export function computeBoxSurfaceArea(
  l: number,
  w: number,
  h: number,
  precision: number = 4
): BoxSAResult {
  const safeL = Math.max(0.000001, l);
  const safeW = Math.max(0.000001, w);
  const safeH = Math.max(0.000001, h);

  const baseArea = 2.0 * safeL * safeW;
  const lateralArea = 2.0 * (safeL + safeW) * safeH;
  const totalArea = 2.0 * (safeL * safeW + safeL * safeH + safeW * safeH);
  const openTopArea = safeL * safeW + 2.0 * (safeL * safeH + safeW * safeH);
  const volume = safeL * safeW * safeH;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Length l = ${safeL}, Width w = ${safeW}, Height h = ${safeH}.\n2. Top & Bottom Bases = 2 × (${safeL} × ${safeW}) = ${fmt(baseArea)}.\n3. 4 Side Walls (Lateral Area) = 2 × (l + w) × h = ${fmt(lateralArea)}.\n4. Total Surface Area A = 2(lw + lh + wh) = ${fmt(totalArea)}.\n5. Open-Top Tank Area = lw + 2(lh + wh) = ${fmt(openTopArea)}.`;

  return {
    totalArea: fmt(totalArea),
    lateralArea: fmt(lateralArea),
    baseArea: fmt(baseArea),
    openTopArea: fmt(openTopArea),
    volume: fmt(volume),
    stepText
  };
}

export interface PyramidSAResult {
  totalArea: number;
  lateralArea: number;
  baseArea: number;
  slantHeight: number;
  volume: number;
  stepText: string;
}

export function computePyramidSurfaceArea(
  a: number,
  h: number,
  isTetrahedron: boolean = false,
  precision: number = 4
): PyramidSAResult {
  const safeA = Math.max(0.000001, a);
  const safeH = Math.max(0.000001, h);

  if (!isTetrahedron) {
    // Square Pyramid
    const s = Math.sqrt((safeA / 2.0) * (safeA / 2.0) + safeH * safeH);
    const baseArea = safeA * safeA;
    const lateralArea = 2.0 * safeA * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * baseArea * safeH;

    const fmt = (v: number) => parseFloat(v.toFixed(precision));

    const stepText = `1. Base Edge a = ${safeA}, Height h = ${safeH}.\n2. Slant Height s = √((a/2)² + h²) = ${fmt(s)}.\n3. Base Area A_base = a² = ${fmt(baseArea)}.\n4. 4 Triangular Faces (Lateral) = 2as = ${fmt(lateralArea)}.\n5. Total Surface Area A = a² + 2as = ${fmt(totalArea)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume),
      stepText
    };
  } else {
    // Regular Tetrahedron (Edge a)
    const baseArea = (Math.sqrt(3) / 4.0) * safeA * safeA;
    const lateralArea = 3.0 * baseArea;
    const totalArea = Math.sqrt(3) * safeA * safeA;
    const volume = (safeA * safeA * safeA) / (6.0 * Math.sqrt(2));
    const slantHeight = (Math.sqrt(3) / 2.0) * safeA;

    const fmt = (v: number) => parseFloat(v.toFixed(precision));

    const stepText = `1. Tetrahedron Edge a = ${safeA}.\n2. Base Equilateral Triangle Area = (√3/4)a² = ${fmt(baseArea)}.\n3. Total Surface Area (4 Faces) = √3 a² = ${fmt(totalArea)}.`;

    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(slantHeight),
      volume: fmt(volume),
      stepText
    };
  }
}

export interface CapsuleSAResult {
  totalArea: number;
  sphereEndsArea: number;
  cylinderLateralArea: number;
  volume: number;
  stepText: string;
}

export function computeCapsuleSurfaceArea(r: number, h: number, precision: number = 4): CapsuleSAResult {
  const safeR = Math.max(0.000001, r);
  const safeH = Math.max(0.000001, h);

  const sphereEndsArea = 4.0 * Math.PI * safeR * safeR;
  const cylinderLateralArea = 2.0 * Math.PI * safeR * safeH;
  const totalArea = sphereEndsArea + cylinderLateralArea;
  const volume = Math.PI * safeR * safeR * safeH + (4.0 / 3.0) * Math.PI * safeR * safeR * safeR;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Radius r = ${safeR}, Cylinder Height h = ${safeH}.\n2. Two Hemispherical Ends Area = 4πr² = ${fmt(sphereEndsArea)}.\n3. Cylinder Side Walls Area = 2πrh = ${fmt(cylinderLateralArea)}.\n4. Total Surface Area A = 2πr(2r + h) = ${fmt(totalArea)}.`;

  return {
    totalArea: fmt(totalArea),
    sphereEndsArea: fmt(sphereEndsArea),
    cylinderLateralArea: fmt(cylinderLateralArea),
    volume: fmt(volume),
    stepText
  };
}

export interface EllipsoidSAResult {
  surfaceArea: number;
  volume: number;
  stepText: string;
}

export function computeEllipsoidSurfaceArea(a: number, b: number, c: number, precision: number = 4): EllipsoidSAResult {
  const safeA = Math.max(0.000001, a);
  const safeB = Math.max(0.000001, b);
  const safeC = Math.max(0.000001, c);

  const p = 1.6075;
  const term1 = Math.pow(safeA * safeB, p);
  const term2 = Math.pow(safeA * safeC, p);
  const term3 = Math.pow(safeB * safeC, p);

  const surfaceArea = 4.0 * Math.PI * Math.pow((term1 + term2 + term3) / 3.0, 1.0 / p);
  const volume = (4.0 / 3.0) * Math.PI * safeA * safeB * safeC;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Semi-axes a = ${safeA}, b = ${safeB}, c = ${safeC}.\n2. Knud Thomsen Formula (p = 1.6075): A ≈ 4π · [((ab)^p + (ac)^p + (bc)^p)/3]^(1/p) = ${fmt(surfaceArea)}.\n3. Ellipsoid Volume V = ⁴/₃π abc = ${fmt(volume)}.`;

  return {
    surfaceArea: fmt(surfaceArea),
    volume: fmt(volume),
    stepText
  };
}

export function convertSurfaceAreaUnits(sqMeters: number, precision: number = 4) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const m2 = sqMeters;

  return {
    sqMeters: fmt(m2),
    sqCm: fmt(m2 * 10000.0),
    sqMm: fmt(m2 * 1000000.0),
    sqFeet: fmt(m2 * 10.7639104),
    sqInches: fmt(m2 * 1550.0031),
    sqYards: fmt(m2 * 1.19599005),
    acres: fmt(m2 / 4046.85642),
    hectares: fmt(m2 / 10000.0)
  };
}
