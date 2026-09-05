/**
 * Mathematical logic engine for Distance Calculator & Geodesic Navigation Suite
 * Strict domain validation, exact conversion factors, and robust geometry calculations.
 */

export interface TwoDDistanceResult {
  isValid: boolean;
  errorMessage?: string;
  euclidean: number;
  manhattan: number;
  chebyshev: number;
  midpoint: { x: number; y: number };
  deltaX: number;
  deltaY: number;
  slope: number | null;
  angleDeg: number;
  stepText: string;
}

export function compute2DDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  precision: number = 4
): TwoDDistanceResult {
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    return {
      isValid: false,
      errorMessage: "Coordinates must be valid real numbers.",
      euclidean: 0,
      manhattan: 0,
      chebyshev: 0,
      midpoint: { x: 0, y: 0 },
      deltaX: 0,
      deltaY: 0,
      slope: null,
      angleDeg: 0,
      stepText: "Invalid coordinates."
    };
  }

  const dx = x2 - x1;
  const dy = y2 - y1;

  const euclidean = Math.sqrt(dx * dx + dy * dy);
  const manhattan = Math.abs(dx) + Math.abs(dy);
  const chebyshev = Math.max(Math.abs(dx), Math.abs(dy));

  const midX = (x1 + x2) / 2.0;
  const midY = (y1 + y2) / 2.0;

  const isCoincident = Math.abs(dx) < 1e-12 && Math.abs(dy) < 1e-12;
  const isVertical = !isCoincident && Math.abs(dx) < 1e-12;
  const slope = (isCoincident || isVertical) ? null : dy / dx;

  // Incline angle of line relative to positive X-axis (standard geometric inclination [0°, 180°))
  let angleDeg = 0;
  if (!isCoincident) {
    if (isVertical) {
      angleDeg = 90.0;
    } else {
      angleDeg = (Math.atan(dy / dx) * 180.0) / Math.PI;
      if (angleDeg < 0) angleDeg += 180.0;
    }
  }

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Coordinate Deltas:\n   Δx = x₂ - x₁ = ${x2} - (${x1}) = ${fmt(dx)}\n   Δy = y₂ - y₁ = ${y2} - (${y1}) = ${fmt(dy)}\n\n2. 2D Euclidean Distance (L₂ Norm):\n   d = √[(Δx)² + (Δy)²] = √[(${fmt(dx)})² + (${fmt(dy)})²] = √[${fmt(dx * dx)} + ${fmt(dy * dy)}] = ${fmt(euclidean)}\n\n3. Manhattan Distance (L₁ Norm):\n   d_M = |Δx| + |Δy| = |${fmt(dx)}| + |${fmt(dy)}| = ${fmt(manhattan)}\n\n4. Chebyshev Distance (L∞ Norm):\n   d_∞ = max(|Δx|, |Δy|) = max(${fmt(Math.abs(dx))}, ${fmt(Math.abs(dy))}) = ${fmt(chebyshev)}\n\n5. Midpoint Coordinate:\n   M = ((x₁ + x₂)/2, (y₁ + y₂)/2) = (${fmt(midX)}, ${fmt(midY)})\n\n6. Line Incline Angle:\n   θ = ${fmt(angleDeg)}°${slope !== null ? ` (Slope m = ${fmt(slope)})` : isCoincident ? " (Points are coincident)" : " (Vertical line, slope undefined)"}`;

  return {
    isValid: true,
    euclidean: fmt(euclidean),
    manhattan: fmt(manhattan),
    chebyshev: fmt(chebyshev),
    midpoint: { x: fmt(midX), y: fmt(midY) },
    deltaX: fmt(dx),
    deltaY: fmt(dy),
    slope: slope !== null ? fmt(slope) : null,
    angleDeg: fmt(angleDeg),
    stepText
  };
}

export interface ThreeDDistanceResult {
  isValid: boolean;
  errorMessage?: string;
  euclidean: number;
  midpoint: { x: number; y: number; z: number };
  deltaX: number;
  deltaY: number;
  deltaZ: number;
  stepText: string;
}

export function compute3DDistance(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  precision: number = 4
): ThreeDDistanceResult {
  if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) {
    return {
      isValid: false,
      errorMessage: "3D coordinates must be valid real numbers.",
      euclidean: 0,
      midpoint: { x: 0, y: 0, z: 0 },
      deltaX: 0,
      deltaY: 0,
      deltaZ: 0,
      stepText: "Invalid coordinates."
    };
  }

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;

  const euclidean = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const midX = (x1 + x2) / 2.0;
  const midY = (y1 + y2) / 2.0;
  const midZ = (z1 + z2) / 2.0;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Spatial Deltas:\n   Δx = ${x2} - (${x1}) = ${fmt(dx)}\n   Δy = ${y2} - (${y1}) = ${fmt(dy)}\n   Δz = ${z2} - (${z1}) = ${fmt(dz)}\n\n2. 3D Euclidean Distance:\n   d = √[(Δx)² + (Δy)² + (Δz)²] = √[(${fmt(dx)})² + (${fmt(dy)})² + (${fmt(dz)})²] = √[${fmt(dx * dx + dy * dy + dz * dz)}] = ${fmt(euclidean)}\n\n3. 3D Midpoint:\n   M = (${fmt(midX)}, ${fmt(midY)}, ${fmt(midZ)})`;

  return {
    isValid: true,
    euclidean: fmt(euclidean),
    midpoint: { x: fmt(midX), y: fmt(midY), z: fmt(midZ) },
    deltaX: fmt(dx),
    deltaY: fmt(dy),
    deltaZ: fmt(dz),
    stepText
  };
}

export interface HaversineResult {
  isValid: boolean;
  errorMessage?: string;
  km: number;
  miles: number;
  nauticalMiles: number;
  feet: number;
  initialBearingDeg: number;
  compassDirection: string;
  midpoint: { lat: number; lon: number };
  stepText: string;
}

export function computeHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  precision: number = 4
): HaversineResult {
  // Domain validation
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return {
      isValid: false,
      errorMessage: "Latitude and Longitude must be valid numerical values.",
      km: 0,
      miles: 0,
      nauticalMiles: 0,
      feet: 0,
      initialBearingDeg: 0,
      compassDirection: "N",
      midpoint: { lat: 0, lon: 0 },
      stepText: "Invalid geographical coordinates."
    };
  }

  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
    return {
      isValid: false,
      errorMessage: "Latitude must be between -90° and +90°.",
      km: 0,
      miles: 0,
      nauticalMiles: 0,
      feet: 0,
      initialBearingDeg: 0,
      compassDirection: "N",
      midpoint: { lat: 0, lon: 0 },
      stepText: "Latitude out of valid geographic range [-90°, 90°]."
    };
  }

  if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
    return {
      isValid: false,
      errorMessage: "Longitude must be between -180° and +180°.",
      km: 0,
      miles: 0,
      nauticalMiles: 0,
      feet: 0,
      initialBearingDeg: 0,
      compassDirection: "N",
      midpoint: { lat: 0, lon: 0 },
      stepText: "Longitude out of valid geographic range [-180°, 180°]."
    };
  }

  // WGS-84 / IUGG Mean Earth Radius in km
  const R_km = 6371.0088;
  const toRad = (deg: number) => (deg * Math.PI) / 180.0;
  const toDeg = (rad: number) => (rad * 180.0) / Math.PI;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lon2 - lon1);

  // Coincident points check
  if (Math.abs(lat1 - lat2) < 1e-9 && Math.abs(lon1 - lon2) < 1e-9) {
    return {
      isValid: true,
      km: 0,
      miles: 0,
      nauticalMiles: 0,
      feet: 0,
      initialBearingDeg: 0,
      compassDirection: "N",
      midpoint: { lat: lat1, lon: lon1 },
      stepText: "Identical start and destination coordinates. Great-Circle distance is 0."
    };
  }

  const sinHalfDphi = Math.sin(dPhi / 2.0);
  const sinHalfDlambda = Math.sin(dLambda / 2.0);

  const a =
    sinHalfDphi * sinHalfDphi +
    Math.cos(phi1) * Math.cos(phi2) * sinHalfDlambda * sinHalfDlambda;

  const clampedA = Math.max(0, Math.min(1.0, a));
  const c = 2.0 * Math.atan2(Math.sqrt(clampedA), Math.sqrt(Math.max(0, 1.0 - clampedA)));

  const km = R_km * c;
  const miles = km / 1.609344; // Exact SI statute mile
  const nauticalMiles = km / 1.852; // Exact international nautical mile
  const feet = miles * 5280.0;

  // Initial Great-Circle Bearing
  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  let bearingDeg = (toDeg(Math.atan2(y, x)) + 360.0) % 360.0;

  // 16-Wind Compass Rose Direction
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const compassIdx = Math.round(bearingDeg / 22.5) % 16;
  const compassDirection = directions[compassIdx];

  // Spherical Geodesic Midpoint (using Cartesian intermediate vectors)
  const Bx = Math.cos(phi2) * Math.cos(dLambda);
  const By = Math.cos(phi2) * Math.sin(dLambda);
  const midPhi = Math.atan2(
    Math.sin(phi1) + Math.sin(phi2),
    Math.sqrt((Math.cos(phi1) + Bx) * (Math.cos(phi1) + Bx) + By * By)
  );
  let midLambda = toRad(lon1) + Math.atan2(By, Math.cos(phi1) + Bx);
  // Normalize lon to [-180, 180]
  let midLonDeg = (toDeg(midLambda) + 540.0) % 360.0 - 180.0;
  let midLatDeg = toDeg(midPhi);

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Convert Lat/Lon to Radians:\n   φ₁ = ${fmt(phi1)} rad, φ₂ = ${fmt(phi2)} rad\n   Δφ = ${fmt(dPhi)} rad, Δλ = ${fmt(dLambda)} rad\n\n2. Haversine Metric Formula:\n   a = sin²(Δφ/2) + cos(φ₁)·cos(φ₂)·sin²(Δλ/2) = ${fmt(a)}\n   c = 2 · atan2(√a, √(1-a)) = ${fmt(c)} rad\n\n3. Great-Circle Distance (R = ${R_km} km):\n   d = R · c = ${fmt(km)} km\n   = ${fmt(miles)} Statute Miles\n   = ${fmt(nauticalMiles)} Nautical Miles (NM)\n   = ${fmt(feet)} Feet\n\n4. Initial Great-Circle Compass Bearing:\n   θ = ${fmt(bearingDeg)}° (${compassDirection})\n\n5. Geodesic Midpoint:\n   Lat ${fmt(midLatDeg)}°, Lon ${fmt(midLonDeg)}°`;

  return {
    isValid: true,
    km: fmt(km),
    miles: fmt(miles),
    nauticalMiles: fmt(nauticalMiles),
    feet: fmt(feet),
    initialBearingDeg: fmt(bearingDeg),
    compassDirection,
    midpoint: { lat: fmt(midLatDeg), lon: fmt(midLonDeg) },
    stepText
  };
}

export interface SpeedDistanceTimeResult {
  isValid: boolean;
  errorMessage?: string;
  distanceMiles: number;
  speedMph: number;
  timeHours: number;
  paceMinPerMile: string;
  paceMinPerKm: string;
  stepText: string;
}

export function computeSpeedDistanceTime(
  mode: "distance" | "speed" | "time",
  val1: number,
  val2: number,
  precision: number = 4
): SpeedDistanceTimeResult {
  if (isNaN(val1) || isNaN(val2)) {
    return {
      isValid: false,
      errorMessage: "Input values must be valid numbers.",
      distanceMiles: 0,
      speedMph: 0,
      timeHours: 0,
      paceMinPerMile: "N/A",
      paceMinPerKm: "N/A",
      stepText: "Invalid inputs."
    };
  }

  if (val1 < 0 || val2 < 0) {
    return {
      isValid: false,
      errorMessage: "Distance, speed, and time cannot be negative in standard kinematics.",
      distanceMiles: 0,
      speedMph: 0,
      timeHours: 0,
      paceMinPerMile: "N/A",
      paceMinPerKm: "N/A",
      stepText: "Negative inputs are not permitted."
    };
  }

  let distance = 0;
  let speed = 0;
  let time = 0;

  if (mode === "distance") {
    speed = val1; // mph
    time = val2;  // hours
    distance = speed * time;
  } else if (mode === "speed") {
    distance = val1; // miles
    time = val2;     // hours
    if (time <= 0) {
      return {
        isValid: false,
        errorMessage: "Time must be strictly greater than zero to solve for speed (division by zero).",
        distanceMiles: distance,
        speedMph: 0,
        timeHours: time,
        paceMinPerMile: "N/A",
        paceMinPerKm: "N/A",
        stepText: "Division by zero: time must be greater than zero."
      };
    }
    speed = distance / time;
  } else {
    distance = val1; // miles
    speed = val2;    // mph
    if (speed <= 0) {
      return {
        isValid: false,
        errorMessage: "Speed must be strictly greater than zero to solve for time (division by zero).",
        distanceMiles: distance,
        speedMph: speed,
        timeHours: 0,
        paceMinPerMile: "N/A",
        paceMinPerKm: "N/A",
        stepText: "Division by zero: speed must be greater than zero."
      };
    }
    time = distance / speed;
  }

  // Pace Calculations (min/mile and min/km)
  let paceMinPerMile = "N/A";
  let paceMinPerKm = "N/A";
  if (speed > 0) {
    const paceTotalMinMi = 60.0 / speed;
    const paceMinsMi = Math.floor(paceTotalMinMi);
    const paceSecsMi = Math.round((paceTotalMinMi - paceMinsMi) * 60);
    paceMinPerMile = `${paceMinsMi}m ${paceSecsMi < 10 ? "0" : ""}${paceSecsMi}s / mi`;

    const speedKmH = speed * 1.609344;
    const paceTotalMinKm = 60.0 / speedKmH;
    const paceMinsKm = Math.floor(paceTotalMinKm);
    const paceSecsKm = Math.round((paceTotalMinKm - paceMinsKm) * 60);
    paceMinPerKm = `${paceMinsKm}m ${paceSecsKm < 10 ? "0" : ""}${paceSecsKm}s / km`;
  }

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = mode === "distance"
    ? `1. Kinematics Formula: d = s × t\n2. Calculation: d = ${fmt(speed)} mph × ${fmt(time)} hrs = ${fmt(distance)} miles (${fmt(distance * 1.609344)} km).\n3. Pace: ${paceMinPerMile} (${paceMinPerKm}).`
    : mode === "speed"
    ? `1. Kinematics Formula: s = d / t\n2. Calculation: s = ${fmt(distance)} miles / ${fmt(time)} hrs = ${fmt(speed)} mph (${fmt(speed * 1.609344)} km/h).\n3. Pace: ${paceMinPerMile} (${paceMinPerKm}).`
    : `1. Kinematics Formula: t = d / s\n2. Calculation: t = ${fmt(distance)} miles / ${fmt(speed)} mph = ${fmt(time)} hours (${fmt(time * 60)} minutes).\n3. Pace: ${paceMinPerMile} (${paceMinPerKm}).`;

  return {
    isValid: true,
    distanceMiles: fmt(distance),
    speedMph: fmt(speed),
    timeHours: fmt(time),
    paceMinPerMile,
    paceMinPerKm,
    stepText
  };
}

export interface PointToLineResult {
  isValid: boolean;
  errorMessage?: string;
  distance: number;
  projectionPoint: { x: number; y: number };
  stepText: string;
}

export function computePointToLineDistance(
  x0: number,
  y0: number,
  A: number,
  B: number,
  C: number,
  precision: number = 4
): PointToLineResult {
  if (isNaN(x0) || isNaN(y0) || isNaN(A) || isNaN(B) || isNaN(C)) {
    return {
      isValid: false,
      errorMessage: "Point coordinates and line coefficients must be valid numbers.",
      distance: 0,
      projectionPoint: { x: 0, y: 0 },
      stepText: "Invalid coefficients."
    };
  }

  const denomSq = A * A + B * B;
  if (denomSq < 1e-12) {
    return {
      isValid: false,
      errorMessage: "Line coefficients A and B cannot both be zero (0x + 0y + C = 0 does not define a line).",
      distance: 0,
      projectionPoint: { x: 0, y: 0 },
      stepText: "Degenerate equation: A and B cannot both be zero."
    };
  }

  const denom = Math.sqrt(denomSq);
  const num = Math.abs(A * x0 + B * y0 + C);
  const distance = num / denom;

  // Orthogonal projection foot point (xp, yp) on the line Ax + By + C = 0
  const xp = (B * (B * x0 - A * y0) - A * C) / denomSq;
  const yp = (A * (-B * x0 + A * y0) - B * C) / denomSq;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Line Standard Form: ${A}x + ${B}y + ${C} = 0, Point P₀(${x0}, ${y0})\n2. Numerator |A·x₀ + B·y₀ + C| = |${A}(${x0}) + ${B}(${y0}) + (${C})| = |${A * x0 + B * y0 + C}| = ${fmt(num)}\n3. Denominator √(A² + B²) = √(${A}² + ${B}²) = √(${fmt(denomSq)}) = ${fmt(denom)}\n4. Orthogonal Distance d = ${fmt(num)} / ${fmt(denom)} = ${fmt(distance)}\n5. Nearest Point on Line (Projection Foot): P_proj = (${fmt(xp)}, ${fmt(yp)})`;

  return {
    isValid: true,
    distance: fmt(distance),
    projectionPoint: { x: fmt(xp), y: fmt(yp) },
    stepText
  };
}

export function convertDistanceFromMeters(meters: number, precision: number = 4) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  return {
    meters: fmt(meters),
    kilometers: fmt(meters / 1000.0),
    centimeters: fmt(meters * 100.0),
    millimeters: fmt(meters * 1000.0),
    feet: fmt(meters / 0.3048),
    inches: fmt(meters / 0.0254),
    yards: fmt(meters / 0.9144),
    miles: fmt(meters / 1609.344),
    nauticalMiles: fmt(meters / 1852.0)
  };
}
