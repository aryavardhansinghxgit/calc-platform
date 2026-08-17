/**
 * Mathematical logic engine for Distance Calculator & Geodesic Navigation Suite
 */

export interface TwoDDistanceResult {
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
  const dx = x2 - x1;
  const dy = y2 - y1;

  const euclidean = Math.sqrt(dx * dx + dy * dy);
  const manhattan = Math.abs(dx) + Math.abs(dy);
  const chebyshev = Math.max(Math.abs(dx), Math.abs(dy));

  const midX = (x1 + x2) / 2.0;
  const midY = (y1 + y2) / 2.0;

  const isVertical = Math.abs(dx) < 1e-9;
  const slope = isVertical ? null : dy / dx;
  let angleDeg = isVertical ? 90.0 : (Math.atan(dy / dx) * 180.0) / Math.PI;
  if (angleDeg < 0) angleDeg += 180.0;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Δx = ${x2} - ${x1} = ${dx}, Δy = ${y2} - ${y1} = ${dy}.\n2. Euclidean d = √[(${dx})² + (${dy})²] = √[${dx * dx} + ${dy * dy}] = ${fmt(euclidean)}.\n3. Manhattan d_M = |${dx}| + |${dy}| = ${fmt(manhattan)}.\n4. Midpoint M = ((${x1}+${x2})/2, (${y1}+${y2})/2) = (${fmt(midX)}, ${fmt(midY)}).`;

  return {
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
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;

  const euclidean = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const midX = (x1 + x2) / 2.0;
  const midY = (y1 + y2) / 2.0;
  const midZ = (z1 + z2) / 2.0;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Δx = ${dx}, Δy = ${dy}, Δz = ${dz}.\n2. 3D Distance d = √[(${dx})² + (${dy})² + (${dz})²] = √[${dx * dx + dy * dy + dz * dz}] = ${fmt(euclidean)}.\n3. 3D Midpoint = (${fmt(midX)}, ${fmt(midY)}, ${fmt(midZ)}).`;

  return {
    euclidean: fmt(euclidean),
    midpoint: { x: fmt(midX), y: fmt(midY), z: fmt(midZ) },
    deltaX: fmt(dx),
    deltaY: fmt(dy),
    deltaZ: fmt(dz),
    stepText
  };
}

export interface HaversineResult {
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
  const R_km = 6371.0088; // Mean Earth Radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180.0;
  const toDeg = (rad: number) => (rad * 180.0) / Math.PI;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lon2 - lon1);

  const a =
    Math.sin(dPhi / 2.0) * Math.sin(dPhi / 2.0) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2.0) * Math.sin(dLambda / 2.0);

  const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1.0 - a)));

  const km = R_km * c;
  const miles = km * 0.621371192;
  const nauticalMiles = km * 0.539956803;
  const feet = miles * 5280;

  // Initial Bearing
  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  let bearingDeg = (toDeg(Math.atan2(y, x)) + 360.0) % 360.0;

  // Compass Rose Name
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const compassIdx = Math.round(bearingDeg / 22.5) % 16;
  const compassDirection = directions[compassIdx];

  // Midpoint Lat/Lon
  const Bx = Math.cos(phi2) * Math.cos(dLambda);
  const By = Math.cos(phi2) * Math.sin(dLambda);
  const midPhi = Math.atan2(
    Math.sin(phi1) + Math.sin(phi2),
    Math.sqrt((Math.cos(phi1) + Bx) * (Math.cos(phi1) + Bx) + By * By)
  );
  const midLambda = toRad(lon1) + Math.atan2(By, Math.cos(phi1) + Bx);

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Convert Lat/Lon to Radians: φ1=${fmt(phi1)}, φ2=${fmt(phi2)}, Δλ=${fmt(dLambda)}.\n2. Haversine Component a = sin²(Δφ/2) + cos(φ1)cos(phi2)sin²(Δλ/2) = ${fmt(a)}.\n3. Angular Distance c = 2 · atan2(√a, √(1-a)) = ${fmt(c)} rad.\n4. Great-Circle Distance d = R · c = 6371 × ${fmt(c)} = ${fmt(km)} km (${fmt(miles)} mi).\n5. Initial Compass Bearing = ${fmt(bearingDeg)}° (${compassDirection}).`;

  return {
    km: fmt(km),
    miles: fmt(miles),
    nauticalMiles: fmt(nauticalMiles),
    feet: fmt(feet),
    initialBearingDeg: fmt(bearingDeg),
    compassDirection,
    midpoint: { lat: fmt(toDeg(midPhi)), lon: fmt(toDeg(midLambda)) },
    stepText
  };
}

export interface SpeedDistanceTimeResult {
  distanceMiles: number;
  speedMph: number;
  timeHours: number;
  paceMinPerMile: string;
  stepText: string;
}

export function computeSpeedDistanceTime(
  mode: "distance" | "speed" | "time",
  val1: number,
  val2: number,
  precision: number = 4
): SpeedDistanceTimeResult {
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
    speed = time > 0 ? distance / time : 0;
  } else {
    distance = val1; // miles
    speed = val2;    // mph
    time = speed > 0 ? distance / speed : 0;
  }

  // Pace Calculation (min / mile)
  let paceMinPerMile = "N/A";
  if (speed > 0) {
    const paceTotalMin = 60.0 / speed;
    const paceMins = Math.floor(paceTotalMin);
    const paceSecs = Math.round((paceTotalMin - paceMins) * 60);
    paceMinPerMile = `${paceMins}m ${paceSecs < 10 ? "0" : ""}${paceSecs}s / mi`;
  }

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = mode === "distance"
    ? `1. Distance d = speed × time = ${speed} mph × ${time} hrs = ${fmt(distance)} miles.`
    : mode === "speed"
    ? `1. Speed s = distance / time = ${distance} miles / ${time} hrs = ${fmt(speed)} mph.`
    : `1. Time t = distance / speed = ${distance} miles / ${speed} mph = ${fmt(time)} hours.`;

  return {
    distanceMiles: fmt(distance),
    speedMph: fmt(speed),
    timeHours: fmt(time),
    paceMinPerMile,
    stepText
  };
}

export interface PointToLineResult {
  distance: number;
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
  const denom = Math.sqrt(A * A + B * B);
  const num = Math.abs(A * x0 + B * y0 + C);
  const distance = denom > 0 ? num / denom : 0;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Line Equation: ${A}x + ${B}y + ${C} = 0, Target Point (${x0}, ${y0}).\n2. Numerator |A·x0 + B·y0 + C| = |${A}×${x0} + ${B}×${y0} + ${C}| = ${num}.\n3. Denominator √(A² + B²) = √(${A}² + ${B}²) = ${fmt(denom)}.\n4. Distance d = ${num} / ${fmt(denom)} = ${fmt(distance)}.`;

  return {
    distance: fmt(distance),
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
    feet: fmt(meters * 3.2808399),
    inches: fmt(meters * 39.3700787),
    yards: fmt(meters * 1.0936133),
    miles: fmt(meters / 1609.344),
    nauticalMiles: fmt(meters / 1852.0)
  };
}
