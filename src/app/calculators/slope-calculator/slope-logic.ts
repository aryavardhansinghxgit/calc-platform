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
  deltaXFormatted: string;
  deltaYFormatted: string;
  slope: number | null;
  slopeFormatted: string;
  isVertical: boolean;
  isHorizontal: boolean;
  isCoincident: boolean;
  angleDeg: number | null;
  angleDegFormatted: string;
  angleRad: number | null;
  angleRadFormatted: string;
  distance: number;
  distanceFormatted: string;
  yIntercept: number | null;
  yInterceptFormatted: string;
  xIntercept: number | null;
  xInterceptFormatted: string;
  slopeInterceptForm: string;
  pointSlopeForm: string;
  standardForm: string;
  perpSlope: number | null;
  perpSlopeFormatted: string;
  stepText: string;
  errorMessage?: string;
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

  const fmt = (v: number) => v.toFixed(precision);

  const isCoincident = Math.abs(deltaX) < 1e-9 && Math.abs(deltaY) < 1e-9;
  const isVertical = !isCoincident && Math.abs(deltaX) < 1e-9;
  const isHorizontal = !isCoincident && Math.abs(deltaY) < 1e-9;

  // Case 1: Coincident Points (P1 = P2)
  if (isCoincident) {
    const errorMsg = "Coincident points (P1 = P2) do not define a unique line.";
    return {
      x1,
      y1,
      x2,
      y2,
      deltaX: 0,
      deltaY: 0,
      deltaXFormatted: fmt(0),
      deltaYFormatted: fmt(0),
      slope: null,
      slopeFormatted: "Undefined (Coincident Points)",
      isVertical: false,
      isHorizontal: false,
      isCoincident: true,
      angleDeg: null,
      angleDegFormatted: "N/A",
      angleRad: null,
      angleRadFormatted: "N/A",
      distance: 0,
      distanceFormatted: fmt(0),
      yIntercept: null,
      yInterceptFormatted: "N/A",
      xIntercept: null,
      xInterceptFormatted: "N/A",
      slopeInterceptForm: "None — Coincident points (P1 = P2) do not define a unique line.",
      pointSlopeForm: "None",
      standardForm: "None",
      perpSlope: null,
      perpSlopeFormatted: "N/A",
      stepText: `1. Change in X (Run) Δx = ${x2} - ${x1} = 0.\n2. Change in Y (Rise) Δy = ${y2} - ${y1} = 0.\n3. Both coordinates are identical: Point 1 (${x1}, ${y1}) = Point 2 (${x2}, ${y2}).\n4. Two coincident points do not define a unique straight line (an infinite number of lines pass through a single point).\n5. Distance between the two identical points is exactly 0.`,
      errorMessage: errorMsg,
      coords: { x1, y1, x2, y2 }
    };
  }

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Case 2: Vertical Line (Δx = 0, Δy != 0)
  if (isVertical) {
    const angleRad = Math.PI / 2.0;
    const angleDeg = 90.0;
    const slopeInterceptForm = `x = ${fmt(x1)} (Vertical Line)`;
    const pointSlopeForm = `x = ${fmt(x1)}`;
    const standardForm = `1x + 0y = ${fmt(x1)}`;

    return {
      x1,
      y1,
      x2,
      y2,
      deltaX: 0,
      deltaY,
      deltaXFormatted: fmt(0),
      deltaYFormatted: fmt(deltaY),
      slope: null,
      slopeFormatted: "Undefined (Vertical Line)",
      isVertical: true,
      isHorizontal: false,
      isCoincident: false,
      angleDeg: 90.0,
      angleDegFormatted: fmt(90.0),
      angleRad,
      angleRadFormatted: fmt(angleRad),
      distance,
      distanceFormatted: fmt(distance),
      yIntercept: null,
      yInterceptFormatted: "None (Parallel to Y-axis)",
      xIntercept: x1,
      xInterceptFormatted: fmt(x1),
      slopeInterceptForm,
      pointSlopeForm,
      standardForm,
      perpSlope: 0,
      perpSlopeFormatted: fmt(0),
      stepText: `1. Change in X (Run) Δx = ${x2} - ${x1} = 0.\n2. Change in Y (Rise) Δy = ${y2} - ${y1} = ${fmt(deltaY)}.\n3. Slope m = Δy / Δx = ${fmt(deltaY)} / 0 is UNDEFINED (division by zero).\n4. Incline Angle θ = 90.0000° (perpendicular to X-axis).\n5. Distance d = √[(0)² + (${fmt(deltaY)})²] = ${fmt(distance)}.\n6. Line Equation: x = ${fmt(x1)} (all points on the line share the same X-coordinate).`,
      coords: { x1, y1, x2, y2 }
    };
  }

  // Case 3: Horizontal Line (Δy = 0, Δx != 0)
  if (isHorizontal) {
    const slope = 0;
    const angleRad = 0;
    const angleDeg = 0;
    const yIntercept = y1;
    const xIntercept = Math.abs(y1) < 1e-9 ? 0 : null; // If y=0, entire line is X-axis
    const slopeInterceptForm = `y = ${fmt(y1)}`;
    const pointSlopeForm = `y - ${fmt(y1)} = 0`;
    const standardForm = `0x + 1y = ${fmt(y1)}`;

    return {
      x1,
      y1,
      x2,
      y2,
      deltaX,
      deltaY: 0,
      deltaXFormatted: fmt(deltaX),
      deltaYFormatted: fmt(0),
      slope: 0,
      slopeFormatted: fmt(0),
      isVertical: false,
      isHorizontal: true,
      isCoincident: false,
      angleDeg: 0,
      angleDegFormatted: fmt(0),
      angleRad: 0,
      angleRadFormatted: fmt(0),
      distance,
      distanceFormatted: fmt(distance),
      yIntercept,
      yInterceptFormatted: fmt(yIntercept),
      xIntercept,
      xInterceptFormatted: xIntercept !== null ? fmt(xIntercept) : "None (Parallel to X-axis)",
      slopeInterceptForm,
      pointSlopeForm,
      standardForm,
      perpSlope: null,
      perpSlopeFormatted: "Undefined (Vertical Line)",
      stepText: `1. Change in X (Run) Δx = ${x2} - ${x1} = ${fmt(deltaX)}.\n2. Change in Y (Rise) Δy = ${y2} - ${y1} = 0.\n3. Slope m = Rise / Run = 0 / ${fmt(deltaX)} = 0 (Horizontal Line).\n4. Incline Angle θ = 0.0000°.\n5. Distance d = √[(${fmt(deltaX)})² + (0)²] = ${fmt(distance)}.\n6. Line Equation: y = ${fmt(y1)} (all points share Y = ${fmt(y1)}).`,
      coords: { x1, y1, x2, y2 }
    };
  }

  // Case 4: General Oblique Line (Δx != 0, Δy != 0)
  const slope = deltaY / deltaX;
  let angleRad = Math.atan(slope);
  let angleDeg = (angleRad * 180.0) / Math.PI;
  if (angleDeg < 0) {
    angleDeg += 180.0;
    angleRad = (angleDeg * Math.PI) / 180.0;
  }

  const yIntercept = y1 - slope * x1;
  const xIntercept = Math.abs(slope) > 1e-9 ? -yIntercept / slope : null;
  const perpSlope = -1.0 / slope;

  // Format slope-intercept y = mx + b
  const mStr = fmt(slope);
  const bSign = yIntercept >= 0 ? "+" : "-";
  const absBStr = fmt(Math.abs(yIntercept));
  const slopeInterceptForm = `y = ${mStr}x ${bSign} ${absBStr}`;

  // Format point-slope (y - y1) = m(x - x1)
  const y1Sign = y1 >= 0 ? `- ${fmt(y1)}` : `+ ${fmt(Math.abs(y1))}`;
  const x1Sign = x1 >= 0 ? `- ${fmt(x1)}` : `+ ${fmt(Math.abs(x1))}`;
  const pointSlopeForm = `(y ${y1Sign}) = ${mStr}(x ${x1Sign})`;

  // Standard Form: Ax + By = C
  const A = -slope;
  const B = 1;
  const C = yIntercept;
  const standardForm = `${fmt(A)}x + ${fmt(B)}y = ${fmt(C)}`;

  const stepText = `1. Change in X (Run) Δx = x₂ - x₁ = ${x2} - (${x1}) = ${fmt(deltaX)}.\n2. Change in Y (Rise) Δy = y₂ - y₁ = ${y2} - (${y1}) = ${fmt(deltaY)}.\n3. Slope m = Rise / Run = ${fmt(deltaY)} / ${fmt(deltaX)} = ${fmt(slope)}.\n4. Distance d = √[(Δx)² + (Δy)²] = √[(${fmt(deltaX)})² + (${fmt(deltaY)})²] = ${fmt(distance)}.\n5. Incline Angle θ = arctan(m) = arctan(${fmt(slope)}) = ${fmt(angleDeg)}° (${fmt(angleRad)} rad).\n6. Y-Intercept b = y₁ - m·x₁ = ${fmt(y1)} - (${fmt(slope)})×(${fmt(x1)}) = ${fmt(yIntercept)}.\n7. Line Equation: ${slopeInterceptForm}.`;

  return {
    x1,
    y1,
    x2,
    y2,
    deltaX,
    deltaY,
    deltaXFormatted: fmt(deltaX),
    deltaYFormatted: fmt(deltaY),
    slope,
    slopeFormatted: fmt(slope),
    isVertical: false,
    isHorizontal: false,
    isCoincident: false,
    angleDeg,
    angleDegFormatted: fmt(angleDeg),
    angleRad,
    angleRadFormatted: fmt(angleRad),
    distance,
    distanceFormatted: fmt(distance),
    yIntercept,
    yInterceptFormatted: fmt(yIntercept),
    xIntercept,
    xInterceptFormatted: xIntercept !== null ? fmt(xIntercept) : "None",
    slopeInterceptForm,
    pointSlopeForm,
    standardForm,
    perpSlope,
    perpSlopeFormatted: fmt(perpSlope),
    stepText,
    coords: { x1, y1, x2, y2 }
  };
}

export interface PointSlopeDistanceResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x2Opposite: number;
  y2Opposite: number;
  x2Formatted: string;
  y2Formatted: string;
  x2OppositeFormatted: string;
  y2OppositeFormatted: string;
  slope: number;
  slopeFormatted: string;
  angleDeg: number;
  angleDegFormatted: string;
  distance: number;
  distanceFormatted: string;
  stepText: string;
  errorMessage?: string;
}

export function computePointSlopeDistance(
  x1: number,
  y1: number,
  distance: number,
  knownType: "slope" | "angle",
  slopeOrAngleVal: number,
  precision: number = 4
): PointSlopeDistanceResult {
  const fmt = (v: number) => v.toFixed(precision);

  // Reject negative distance explicitly
  if (distance < 0) {
    const errorMsg = "Distance must be greater than or equal to 0.";
    return {
      x1,
      y1,
      x2: x1,
      y2: y1,
      x2Opposite: x1,
      y2Opposite: y1,
      x2Formatted: fmt(x1),
      y2Formatted: fmt(y1),
      x2OppositeFormatted: fmt(x1),
      y2OppositeFormatted: fmt(y1),
      slope: 0,
      slopeFormatted: fmt(0),
      angleDeg: 0,
      angleDegFormatted: fmt(0),
      distance,
      distanceFormatted: fmt(distance),
      stepText: `Validation Error: ${errorMsg}`,
      errorMessage: errorMsg
    };
  }

  // Handle d = 0 explicitly
  if (distance === 0) {
    return {
      x1,
      y1,
      x2: x1,
      y2: y1,
      x2Opposite: x1,
      y2Opposite: y1,
      x2Formatted: fmt(x1),
      y2Formatted: fmt(y1),
      x2OppositeFormatted: fmt(x1),
      y2OppositeFormatted: fmt(y1),
      slope: knownType === "slope" ? slopeOrAngleVal : Math.tan((slopeOrAngleVal * Math.PI) / 180.0),
      slopeFormatted: fmt(knownType === "slope" ? slopeOrAngleVal : Math.tan((slopeOrAngleVal * Math.PI) / 180.0)),
      angleDeg: knownType === "angle" ? slopeOrAngleVal : (Math.atan(slopeOrAngleVal) * 180.0) / Math.PI,
      angleDegFormatted: fmt(knownType === "angle" ? slopeOrAngleVal : (Math.atan(slopeOrAngleVal) * 180.0) / Math.PI),
      distance: 0,
      distanceFormatted: fmt(0),
      stepText: `1. Distance d = 0: Displacement is zero.\n2. Endpoint coincides with the initial point: (x₂, y₂) = (${x1}, ${y1}).`
    };
  }

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
  const dx = distance * Math.cos(rad);
  const dy = distance * Math.sin(rad);

  // Primary direction (along positive angle vector)
  const x2 = x1 + dx;
  const y2 = y1 + dy;

  // Collinear opposite direction
  const x2Opposite = x1 - dx;
  const y2Opposite = y1 - dy;

  const stepText = `1. Known Point (x₁, y₁) = (${x1}, ${y1}), Distance d = ${distance}, ${knownType === "slope" ? `Slope m = ${slope}` : `Incline Angle θ = ${angleDeg}°`}.\n2. Direction Vector: cos(${fmt(angleDeg)}°) = ${fmt(Math.cos(rad))}, sin(${fmt(angleDeg)}°) = ${fmt(Math.sin(rad))}.\n3. Horizontal Displacement Δx = d·cos(θ) = ${distance} × ${fmt(Math.cos(rad))} = ${fmt(dx)}.\n4. Vertical Displacement Δy = d·sin(θ) = ${distance} × ${fmt(Math.sin(rad))} = ${fmt(dy)}.\n5. Primary Endpoint (forward direction): (x₂, y₂) = (${x1} + ${fmt(dx)}, ${y1} + ${fmt(dy)}) = (${fmt(x2)}, ${fmt(y2)}).\n6. Collinear Opposite Endpoint: (x₂', y₂') = (${x1} - ${fmt(dx)}, ${y1} - ${fmt(dy)}) = (${fmt(x2Opposite)}, ${fmt(y2Opposite)}).`;

  return {
    x1,
    y1,
    x2,
    y2,
    x2Opposite,
    y2Opposite,
    x2Formatted: fmt(x2),
    y2Formatted: fmt(y2),
    x2OppositeFormatted: fmt(x2Opposite),
    y2OppositeFormatted: fmt(y2Opposite),
    slope,
    slopeFormatted: fmt(slope),
    angleDeg,
    angleDegFormatted: fmt(angleDeg),
    distance,
    distanceFormatted: fmt(distance),
    stepText
  };
}

export interface ParallelPerpLineResult {
  slope: number | null;
  parallelEq: string;
  perpSlope: number | null;
  perpSlopeFormatted: string;
  perpEq: string;
  isOriginalVertical: boolean;
  isOriginalHorizontal: boolean;
  stepText: string;
}

export function computeParallelPerpLine(
  m: number | null,
  targetX: number,
  targetY: number,
  precision: number = 4
): ParallelPerpLineResult {
  const fmt = (v: number) => v.toFixed(precision);

  // Case 1: Original line is vertical (m is null or infinite)
  if (m === null || !isFinite(m)) {
    const parallelEq = `x = ${fmt(targetX)} (Vertical Line)`;
    const perpEq = `y = ${fmt(targetY)} (Horizontal Line)`;
    const perpSlope = 0;

    const stepText = `1. Original Line is Vertical (Slope is Undefined), Target Point (${targetX}, ${targetY}).\n2. Parallel Line: Shares undefined slope and passes through (${targetX}, ${targetY}) → ${parallelEq}.\n3. Perpendicular Line: Perpendicular to a vertical line is a HORIZONTAL line (slope m⊥ = 0) passing through Y = ${targetY} → ${perpEq}.`;

    return {
      slope: null,
      parallelEq,
      perpSlope: 0,
      perpSlopeFormatted: fmt(0),
      perpEq,
      isOriginalVertical: true,
      isOriginalHorizontal: false,
      stepText
    };
  }

  // Case 2: Original line is horizontal (m = 0)
  if (Math.abs(m) < 1e-9) {
    const parallelEq = `y = ${fmt(targetY)}`;
    const perpEq = `x = ${fmt(targetX)} (Vertical Line)`;

    const stepText = `1. Original Line is Horizontal (Slope m = 0), Target Point (${targetX}, ${targetY}).\n2. Parallel Line (same slope m = 0): y = ${fmt(targetY)} → ${parallelEq}.\n3. Perpendicular Line: Perpendicular to a horizontal line is a VERTICAL line with UNDEFINED slope passing through X = ${targetX} → ${perpEq}.`;

    return {
      slope: 0,
      parallelEq,
      perpSlope: null,
      perpSlopeFormatted: "Undefined (Vertical Line)",
      perpEq,
      isOriginalVertical: false,
      isOriginalHorizontal: true,
      stepText
    };
  }

  // Case 3: Oblique line (m is non-zero, non-vertical)
  const bParallel = targetY - m * targetX;
  const bParSign = bParallel >= 0 ? "+" : "-";
  const parallelEq = `y = ${fmt(m)}x ${bParSign} ${fmt(Math.abs(bParallel))}`;

  // Perpendicular slope mPerp = -1 / m
  const mPerp = -1.0 / m;
  const bPerp = targetY - mPerp * targetX;
  const bPerpSign = bPerp >= 0 ? "+" : "-";
  const perpEq = `y = ${fmt(mPerp)}x ${bPerpSign} ${fmt(Math.abs(bPerp))}`;

  const stepText = `1. Original Slope m = ${fmt(m)}, Target Point (${targetX}, ${targetY}).\n2. Parallel Line (same slope m = ${fmt(m)}): b = y₀ - m·x₀ = ${targetY} - (${fmt(m)})×(${targetX}) = ${fmt(bParallel)} → ${parallelEq}.\n3. Perpendicular Slope: m⊥ = -1 / m = -1 / (${fmt(m)}) = ${fmt(mPerp)}.\n4. Perpendicular Y-intercept: b⊥ = y₀ - m⊥·x₀ = ${targetY} - (${fmt(mPerp)})×(${targetX}) = ${fmt(bPerp)} → ${perpEq}.`;

  return {
    slope: m,
    parallelEq,
    perpSlope: mPerp,
    perpSlopeFormatted: fmt(mPerp),
    perpEq,
    isOriginalVertical: false,
    isOriginalHorizontal: false,
    stepText
  };
}

export interface AngleBetweenLinesResult {
  m1: number;
  m2: number;
  acuteDeg: number;
  obtuseDeg: number;
  acuteDegFormatted: string;
  obtuseDegFormatted: string;
  acuteRad: number;
  obtuseRad: number;
  acuteRadFormatted: string;
  obtuseRadFormatted: string;
  tanThetaStr: string;
  isPerpendicular: boolean;
  isParallel: boolean;
  stepText: string;
}

export function computeAngleBetweenLines(
  m1: number,
  m2: number,
  precision: number = 4
): AngleBetweenLinesResult {
  const fmt = (v: number) => v.toFixed(precision);

  const denom = 1 + m1 * m2;
  const isPerpendicular = Math.abs(denom) < 1e-9;
  const isParallel = Math.abs(m1 - m2) < 1e-9;

  let acuteRad = 0;
  let acuteDeg = 0;
  let tanThetaStr = "";

  if (isPerpendicular) {
    acuteRad = Math.PI / 2.0;
    acuteDeg = 90.0;
    tanThetaStr = "Undefined (90°)";
  } else if (isParallel) {
    acuteRad = 0;
    acuteDeg = 0;
    tanThetaStr = fmt(0);
  } else {
    const tanTheta = Math.abs((m2 - m1) / denom);
    acuteRad = Math.atan(tanTheta);
    acuteDeg = (acuteRad * 180.0) / Math.PI;
    tanThetaStr = fmt(tanTheta);
  }

  const obtuseDeg = 180.0 - acuteDeg;
  const obtuseRad = Math.PI - acuteRad;

  const stepText = isPerpendicular
    ? `1. Slopes: m₁ = ${fmt(m1)}, m₂ = ${fmt(m2)}.\n2. Denominator 1 + m₁·m₂ = 1 + (${fmt(m1)})×(${fmt(m2)}) = 0.\n3. The lines are orthogonal/perpendicular: Intersection angle is exactly 90.0000° (π/2 rad).`
    : isParallel
    ? `1. Slopes: m₁ = ${fmt(m1)}, m₂ = ${fmt(m2)}.\n2. m₁ = m₂: The lines are parallel.\n3. Intersection angle is 0.0000° (or supplementary 180.0000°).`
    : `1. Slopes: m₁ = ${fmt(m1)}, m₂ = ${fmt(m2)}.\n2. Formula: tan(θ) = |(m₂ - m₁) / (1 + m₁·m₂)| = |(${fmt(m2)} - ${fmt(m1)}) / (1 + (${fmt(m1)})×(${fmt(m2)}))| = ${tanThetaStr}.\n3. Acute Angle θ = arctan(${tanThetaStr}) = ${fmt(acuteDeg)}° (${fmt(acuteRad)} rad).\n4. Obtuse Supplementary Angle = 180° - ${fmt(acuteDeg)}° = ${fmt(obtuseDeg)}° (${fmt(obtuseRad)} rad).`;

  return {
    m1,
    m2,
    acuteDeg,
    obtuseDeg,
    acuteDegFormatted: fmt(acuteDeg),
    obtuseDegFormatted: fmt(obtuseDeg),
    acuteRad,
    obtuseRad,
    acuteRadFormatted: fmt(acuteRad),
    obtuseRadFormatted: fmt(obtuseRad),
    tanThetaStr,
    isPerpendicular,
    isParallel,
    stepText
  };
}
