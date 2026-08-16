/**
 * Mathematical logic engine for Slope Calculator & Coordinate Geometry Suite
 */

export interface TwoPointSlopeResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  deltaX: number;
  deltaY: number;
  slope: number;
  isVertical: boolean;
  isHorizontal: boolean;
  angleDeg: number;
  angleRad: number;
  distance: number;
  yIntercept: number | null;
  xIntercept: number | null;
  slopeInterceptForm: string;
  pointSlopeForm: string;
  standardForm: string;
  perpSlope: number | null;
  stepText: string;
  coords: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export function computeTwoPointSlope(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  precision: number = 4
): TwoPointSlopeResult {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  const isVertical = Math.abs(deltaX) < 1e-9;
  const isHorizontal = Math.abs(deltaY) < 1e-9;

  let slope = 0;
  let angleRad = 0;
  let angleDeg = 0;
  let yIntercept: number | null = null;
  let xIntercept: number | null = null;
  let perpSlope: number | null = null;

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (!isVertical) {
    slope = deltaY / deltaX;
    angleRad = Math.atan(slope);
    angleDeg = (angleRad * 180.0) / Math.PI;
    if (angleDeg < 0) angleDeg += 180.0;

    yIntercept = y1 - slope * x1;
    if (Math.abs(slope) > 1e-9) {
      xIntercept = -yIntercept / slope;
      perpSlope = -1.0 / slope;
    }
  } else {
    angleDeg = 90.0;
    angleRad = Math.PI / 2.0;
    xIntercept = x1;
    perpSlope = 0;
  }

  const fmt = (v: number) => v.toFixed(precision);

  // Line Equation Strings
  let slopeInterceptForm = "";
  let pointSlopeForm = "";
  let standardForm = "";

  if (isVertical) {
    slopeInterceptForm = `x = ${fmt(x1)} (Undefined Slope)`;
    pointSlopeForm = `x = ${fmt(x1)}`;
    standardForm = `1x + 0y = ${fmt(x1)}`;
  } else {
    const mStr = fmt(slope);
    const bVal = yIntercept || 0;
    const bSign = bVal >= 0 ? "+" : "-";
    const absBStr = fmt(Math.abs(bVal));

    slopeInterceptForm = `y = ${mStr}x ${bSign} ${absBStr}`;
    pointSlopeForm = `(y - ${fmt(y1)}) = ${mStr}(x - ${fmt(x1)})`;

    // Standard Form: Ax + By = C
    const A = -slope;
    const B = 1;
    const C = bVal;
    standardForm = `${fmt(A)}x + ${fmt(B)}y = ${fmt(C)}`;
  }

  const stepText = isVertical
    ? `1. Δx = ${x2} - ${x1} = 0 (Vertical Line).\n2. Slope m = Δy/Δx is UNDEFINED.\n3. Distance d = √[(0)² + (${deltaY})²] = ${fmt(distance)}.\n4. Angle of Incline θ = 90°.`
    : `1. Change in X (Run) Δx = ${x2} - ${x1} = ${fmt(deltaX)}.\n2. Change in Y (Rise) Δy = ${y2} - ${y1} = ${fmt(deltaY)}.\n3. Slope m = Rise/Run = ${fmt(deltaY)} / ${fmt(deltaX)} = ${fmt(slope)}.\n4. Distance d = √[(${fmt(deltaX)})² + (${fmt(deltaY)})²] = ${fmt(distance)}.\n5. Incline Angle θ = arctan(${fmt(slope)}) = ${fmt(angleDeg)}°.\n6. Y-Intercept b = ${fmt(yIntercept!)}. Line Equation: ${slopeInterceptForm}.`;

  return {
    x1,
    y1,
    x2,
    y2,
    deltaX: parseFloat(fmt(deltaX)),
    deltaY: parseFloat(fmt(deltaY)),
    slope: parseFloat(fmt(slope)),
    isVertical,
    isHorizontal,
    angleDeg: parseFloat(fmt(angleDeg)),
    angleRad: parseFloat(fmt(angleRad)),
    distance: parseFloat(fmt(distance)),
    yIntercept: yIntercept !== null ? parseFloat(fmt(yIntercept)) : null,
    xIntercept: xIntercept !== null ? parseFloat(fmt(xIntercept)) : null,
    slopeInterceptForm,
    pointSlopeForm,
    standardForm,
    perpSlope: perpSlope !== null ? parseFloat(fmt(perpSlope)) : null,
    stepText,
    coords: { x1, y1, x2, y2 }
  };
}

export interface PointSlopeDistanceResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  slope: number;
  angleDeg: number;
  distance: number;
  stepText: string;
}

export function computePointSlopeDistance(
  x1: number,
  y1: number,
  distance: number,
  knownType: "slope" | "angle",
  slopeOrAngleVal: number,
  precision: number = 4
): PointSlopeDistanceResult {
  const d = Math.max(0.0001, distance);
  let slope = 0;
  let angleDeg = 0;

  if (knownType === "angle") {
    angleDeg = slopeOrAngleVal;
    const rad = (angleDeg * Math.PI) / 180.0;
    slope = Math.tan(rad);
  } else {
    slope = slopeOrAngleVal;
    angleDeg = (Math.atan(slope) * 180.0) / Math.PI;
    if (angleDeg < 0) angleDeg += 180.0;
  }

  const rad = (angleDeg * Math.PI) / 180.0;
  const x2 = x1 + d * Math.cos(rad);
  const y2 = y1 + d * Math.sin(rad);

  const fmt = (v: number) => v.toFixed(precision);

  const stepText = `1. Known Point (x1, y1) = (${x1}, ${y1}), Distance d = ${d}, ${knownType === "slope" ? `Slope m = ${slope}` : `Angle θ = ${angleDeg}°`}.\n2. x2 = x1 + d·cos(θ) = ${x1} + ${d} × cos(${fmt(angleDeg)}°) = ${fmt(x2)}.\n3. y2 = y1 + d·sin(θ) = ${y1} + ${d} × sin(${fmt(angleDeg)}°) = ${fmt(y2)}.\n4. Endpoint (x2, y2) = (${fmt(x2)}, ${fmt(y2)}).`;

  return {
    x1,
    y1,
    x2: parseFloat(fmt(x2)),
    y2: parseFloat(fmt(y2)),
    slope: parseFloat(fmt(slope)),
    angleDeg: parseFloat(fmt(angleDeg)),
    distance: parseFloat(fmt(d)),
    stepText
  };
}

export interface ParallelPerpLineResult {
  slope: number;
  parallelEq: string;
  perpSlope: number;
  perpEq: string;
  stepText: string;
}

export function computeParallelPerpLine(
  m: number,
  targetX: number,
  targetY: number,
  precision: number = 4
): ParallelPerpLineResult {
  const fmt = (v: number) => v.toFixed(precision);

  // Parallel Line: same slope m
  const bParallel = targetY - m * targetX;
  const parallelEq = `y = ${fmt(m)}x ${bParallel >= 0 ? "+" : "-"} ${fmt(Math.abs(bParallel))}`;

  // Perpendicular Line: slope -1/m
  const mPerp = Math.abs(m) < 1e-9 ? 1e9 : -1.0 / m;
  const bPerp = targetY - mPerp * targetX;
  const perpEq = `y = ${fmt(mPerp)}x ${bPerp >= 0 ? "+" : "-"} ${fmt(Math.abs(bPerp))}`;

  const stepText = `1. Original Slope m = ${m}, Target Point (${targetX}, ${targetY}).\n2. Parallel Line (same slope m = ${m}): b = ${targetY} - ${m}×${targetX} = ${fmt(bParallel)} → ${parallelEq}.\n3. Perpendicular Line (m⊥ = -1/m = ${fmt(mPerp)}): b = ${targetY} - (${fmt(mPerp)})×${targetX} = ${fmt(bPerp)} → ${perpEq}.`;

  return {
    slope: m,
    parallelEq,
    perpSlope: parseFloat(fmt(mPerp)),
    perpEq,
    stepText
  };
}
