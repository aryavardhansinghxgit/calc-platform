/**
 * Pure Mathematical Kinematics Calculation Engine for Speed, Distance, Time & Pace Suite
 * Compliant with SI Kinematic Mechanics (v = d/t), IAAF/USATF race pacing standards,
 * and NIST Special Publication 811.
 */

export type SpeedCalcMode = "speed" | "distance" | "time";

export interface DistanceUnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toMeters: number;
}

export const DISTANCE_UNITS: DistanceUnitDefinition[] = [
  { id: "m", name: "Meters", symbol: "m", toMeters: 1 },
  { id: "km", name: "Kilometers", symbol: "km", toMeters: 1000 },
  { id: "mi", name: "Miles (Statute)", symbol: "mi", toMeters: 1609.344 },
  { id: "ft", name: "Feet", symbol: "ft", toMeters: 0.3048 },
  { id: "yd", name: "Yards", symbol: "yd", toMeters: 0.9144 },
  { id: "nmi", name: "Nautical Miles", symbol: "nmi", toMeters: 1852 },
  { id: "5k", name: "5K (5 km)", symbol: "5K", toMeters: 5000 },
  { id: "10k", name: "10K (10 km)", symbol: "10K", toMeters: 10000 },
  { id: "half_marathon", name: "Half Marathon", symbol: "Half-M", toMeters: 21097.5 },
  { id: "marathon", name: "Full Marathon", symbol: "Marathon", toMeters: 42195 },
];

export interface SpeedUnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toMetersPerSecond: number;
  category: "common" | "other";
  description: string;
}

export const SPEED_UNITS: SpeedUnitDefinition[] = [
  // ── Common Speed Units ──
  { id: "ms", name: "meters/second", symbol: "m/s", toMetersPerSecond: 1.0, category: "common", description: "SI Base unit of velocity" },
  { id: "kmh", name: "kilometers/hour", symbol: "km/h", toMetersPerSecond: 1 / 3.6, category: "common", description: "Global automotive standard" },
  { id: "mph", name: "miles/hour", symbol: "mph", toMetersPerSecond: 0.44704, category: "common", description: "US/UK Highway standard" },
  { id: "knots", name: "knots", symbol: "kn", toMetersPerSecond: 1852 / 3600, category: "common", description: "Maritime & aviation navigation" },
  { id: "fts", name: "feet/second", symbol: "ft/s", toMetersPerSecond: 0.3048, category: "common", description: "Ballistics & engineering" },

  // ── Other Speed Units ──
  { id: "km_min", name: "kilometers/minute", symbol: "km/min", toMetersPerSecond: 1000 / 60, category: "other", description: "High-speed rail" },
  { id: "km_s", name: "kilometers/second", symbol: "km/s", toMetersPerSecond: 1000, category: "other", description: "Orbital & spaceflight mechanics" },
  { id: "m_h", name: "meters/hour", symbol: "m/h", toMetersPerSecond: 1 / 3600, category: "other", description: "Geological & glacier movement" },
  { id: "m_min", name: "meters/minute", symbol: "m/min", toMetersPerSecond: 1 / 60, category: "other", description: "Pedestrian & walking paces" },
  { id: "cm_h", name: "centimeters/hour", symbol: "cm/h", toMetersPerSecond: 0.01 / 3600, category: "other", description: "Slow physical creep" },
  { id: "cm_min", name: "centimeters/minute", symbol: "cm/min", toMetersPerSecond: 0.01 / 60, category: "other", description: "Biological growth rates" },
  { id: "cm_s", name: "centimeters/second", symbol: "cm/s", toMetersPerSecond: 0.01, category: "other", description: "Laboratory fluidics" },
  { id: "mm_h", name: "millimeters/hour", symbol: "mm/h", toMetersPerSecond: 0.001 / 3600, category: "other", description: "Precipitation & plant growth" },
  { id: "mm_min", name: "millimeters/minute", symbol: "mm/min", toMetersPerSecond: 0.001 / 60, category: "other", description: "Mechanical tooling feed rates" },
  { id: "mm_s", name: "millimeters/second", symbol: "mm/s", toMetersPerSecond: 0.001, category: "other", description: "3D printer extrusion speed" },
  { id: "mi_min", name: "miles/minute", symbol: "mi/min", toMetersPerSecond: 1609.344 / 60, category: "other", description: "Military aviation & missiles" },
  { id: "mi_s", name: "miles/second", symbol: "mi/s", toMetersPerSecond: 1609.344, category: "other", description: "Planetary orbital velocity" },
  { id: "yd_h", name: "yards/hour", symbol: "yd/h", toMetersPerSecond: 0.9144 / 3600, category: "other", description: "Slow earthmoving operations" },
  { id: "yd_min", name: "yards/minute", symbol: "yd/min", toMetersPerSecond: 0.9144 / 60, category: "other", description: "Sports track pacing" },
  { id: "yd_s", name: "yards/second", symbol: "yd/s", toMetersPerSecond: 0.9144, category: "other", description: "Sprint kinematics" },
  { id: "ft_h", name: "feet/hour", symbol: "ft/h", toMetersPerSecond: 0.3048 / 3600, category: "other", description: "Trenching & drilling rates" },
  { id: "ft_min", name: "feet/minute", symbol: "ft/min", toMetersPerSecond: 0.3048 / 60, category: "other", description: "Aviation rate of climb / descent" },
  { id: "in_h", name: "inches/hour", symbol: "in/h", toMetersPerSecond: 0.0254 / 3600, category: "other", description: "Rainfall accumulation rates" },
  { id: "in_min", name: "inches/minute", symbol: "in/min", toMetersPerSecond: 0.0254 / 60, category: "other", description: "CNC machining feed rate" },
  { id: "in_s", name: "inches/second", symbol: "in/s", toMetersPerSecond: 0.0254, category: "other", description: "Robotics & automation" },
  { id: "mach", name: "Mach (sound speed in air at 20°C)", symbol: "Mach", toMetersPerSecond: 343.0, category: "other", description: "Supersonic aerodynamics" },
  { id: "c", name: "light speed", symbol: "c", toMetersPerSecond: 299792458.0, category: "other", description: "Universal cosmic speed of light" },
];

export interface RealWorldSpeedReference {
  name: string;
  speedMs: number;
  speedMph: number;
  speedKmh: number;
  description: string;
}

export const REAL_WORLD_SPEED_REFERENCES: RealWorldSpeedReference[] = [
  { name: "Garden Snail", speedMs: 0.001, speedMph: 0.0022, speedKmh: 0.0036, description: "Slowest terrestrial gastropod" },
  { name: "Human Walking", speedMs: 1.39, speedMph: 3.1, speedKmh: 5.0, description: "Average adult brisk walking pace" },
  { name: "Recreational Jogging", speedMs: 2.68, speedMph: 6.0, speedKmh: 9.66, description: "10-minute mile running pace" },
  { name: "City Bicycling", speedMs: 5.56, speedMph: 12.4, speedKmh: 20.0, description: "Commuter cycling velocity" },
  { name: "Usain Bolt (Peak 100m)", speedMs: 12.42, speedMph: 27.78, speedKmh: 44.72, description: "Fastest recorded human sprint (2009 Berlin)" },
  { name: "Cheetah (Full Sprint)", speedMs: 33.53, speedMph: 75.0, speedKmh: 120.7, description: "Fastest land animal" },
  { name: "Peregrine Falcon Dive", speedMs: 108.0, speedMph: 242.0, speedKmh: 389.0, description: "Fastest animal high-altitude stoop dive" },
  { name: "Boeing 747-8 Cruise", speedMs: 253.0, speedMph: 566.0, speedKmh: 911.0, description: "Commercial transcontinental airliner" },
  { name: "Speed of Sound (Mach 1)", speedMs: 343.0, speedMph: 767.3, speedKmh: 1234.8, description: "Sonic barrier in 20°C air" },
  { name: "Bullet (5.56 NATO)", speedMs: 940.0, speedMph: 2103.0, speedKmh: 3384.0, description: "Supersonic rifle muzzle velocity" },
  { name: "ISS Orbital Velocity", speedMs: 7660.0, speedMph: 17135.0, speedKmh: 27576.0, description: "Low Earth Orbit satellite velocity" },
  { name: "Earth Orbital Speed", speedMs: 29780.0, speedMph: 66616.0, speedKmh: 107208.0, description: "Earth revolution around the Sun" },
  { name: "Speed of Light (c)", speedMs: 299792458.0, speedMph: 670616629.0, speedKmh: 1079252848.8, description: "Universal cosmic speed limit" },
];

export function formatTimeHoursMinutesSeconds(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const s = Math.max(0, Math.round(totalSeconds * 100) / 100);
  const hrs = Math.floor(s / 3600);
  const rem = s % 3600;
  const mins = Math.floor(rem / 60);
  const secs = Math.round((rem % 60) * 10) / 10;

  const hStr = hrs.toString().padStart(2, "0");
  const mStr = mins.toString().padStart(2, "0");
  const sStr = (secs < 10 ? "0" : "") + (Number.isInteger(secs) ? secs.toString() : secs.toFixed(1));

  return {
    hours: hrs,
    minutes: mins,
    seconds: secs,
    formatted: hrs > 0 ? `${hStr}:${mStr}:${sStr}` : `${mStr}:${sStr}`,
  };
}

export function formatPace(secondsPerUnit: number): string {
  if (!secondsPerUnit || !isFinite(secondsPerUnit) || secondsPerUnit <= 0) return "--:--";
  const mins = Math.floor(secondsPerUnit / 60);
  const secs = Math.round(secondsPerUnit % 60);
  const sStr = secs < 10 ? `0${secs}` : `${secs}`;
  return `${mins}:${sStr}`;
}

export function formatSpeedPrecision(val: number, precision = 4, scientific = false): string {
  if (val === 0) return "0";
  if (scientific || Math.abs(val) >= 1e9 || (Math.abs(val) < 1e-4 && Math.abs(val) > 0)) {
    return val.toExponential(precision);
  }
  const fixed = val.toFixed(precision);
  const parsed = parseFloat(fixed);
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : parsed.toString();
}

// ─── DEDICATED SPEED CONVERTER ENGINE ───────────────────────────────────────

export interface SpeedConversionResult {
  amount: number;
  fromUnit: SpeedUnitDefinition;
  toUnit: SpeedUnitDefinition;
  outputValue: number;
  speedMs: number;
  formulaDescription: string;
  allConversions: {
    unit: SpeedUnitDefinition;
    value: number;
    formatted: string;
  }[];
}

export function convertSpeedDirect(
  amount: number,
  fromUnitId: string,
  toUnitId: string,
  precision = 6,
  scientific = false
): SpeedConversionResult {
  const fromUnit = SPEED_UNITS.find((u) => u.id === fromUnitId) || SPEED_UNITS[2]; // mph
  const toUnit = SPEED_UNITS.find((u) => u.id === toUnitId) || SPEED_UNITS[0]; // m/s

  const speedMs = (amount || 0) * fromUnit.toMetersPerSecond;
  const outputValue = speedMs / toUnit.toMetersPerSecond;

  const multiplier = fromUnit.toMetersPerSecond / toUnit.toMetersPerSecond;
  const formulaDescription = `${amount} ${fromUnit.symbol} × ${formatSpeedPrecision(multiplier, 6)} = ${formatSpeedPrecision(outputValue, precision, scientific)} ${toUnit.symbol}`;

  const allConversions = SPEED_UNITS.map((u) => {
    const val = speedMs / u.toMetersPerSecond;
    return {
      unit: u,
      value: val,
      formatted: formatSpeedPrecision(val, precision, scientific),
    };
  });

  return {
    amount,
    fromUnit,
    toUnit,
    outputValue,
    speedMs,
    formulaDescription,
    allConversions,
  };
}

// ─── CARD 1: TRI-MODAL SPEED SOLVER ─────────────────────────────────────────

export interface SpeedSolverInput {
  mode: SpeedCalcMode;
  distanceValue: number;
  distanceUnit: string;
  timeHours: number;
  timeMinutes: number;
  timeSeconds: number;
  speedValue: number;
  speedUnit: string;
}

export interface SpeedSolverResult {
  mode: SpeedCalcMode;
  distanceMeters: number;
  distanceFormatted: string;
  totalTimeSeconds: number;
  timeFormatted: string;
  speedMs: number;
  speedKmh: number;
  speedMph: number;
  speedFts: number;
  speedKnots: number;
  speedMach: number;
  paceMinMile: string;
  paceMinKm: string;
  formulaDescription: string;
  closestReference: RealWorldSpeedReference;
  allSpeedUnits: {
    unit: SpeedUnitDefinition;
    value: number;
    formatted: string;
  }[];
}

export function calculateSpeedSolver(input: SpeedSolverInput): SpeedSolverResult {
  const dUnit = DISTANCE_UNITS.find((u) => u.id === input.distanceUnit) || DISTANCE_UNITS[0];
  const sUnit = SPEED_UNITS.find((u) => u.id === input.speedUnit) || SPEED_UNITS[0];

  let distanceMeters = (input.distanceValue || 0) * dUnit.toMeters;
  let totalTimeSeconds =
    (Math.max(0, input.timeHours || 0) * 3600) +
    (Math.max(0, input.timeMinutes || 0) * 60) +
    Math.max(0, input.timeSeconds || 0);
  let speedMs = (input.speedValue || 0) * sUnit.toMetersPerSecond;

  let formulaDesc = "";

  if (input.mode === "speed") {
    if (totalTimeSeconds > 0) {
      speedMs = distanceMeters / totalTimeSeconds;
    } else {
      speedMs = 0;
    }
    const tFormatted = formatTimeHoursMinutesSeconds(totalTimeSeconds).formatted;
    formulaDesc = `Speed = Distance / Time = ${input.distanceValue} ${dUnit.symbol} / ${tFormatted} = ${(speedMs * 2.23694).toFixed(2)} mph (${(speedMs * 3.6).toFixed(2)} km/h)`;
  } else if (input.mode === "distance") {
    distanceMeters = speedMs * totalTimeSeconds;
    const distInChosen = distanceMeters / dUnit.toMeters;
    const tFormatted = formatTimeHoursMinutesSeconds(totalTimeSeconds).formatted;
    formulaDesc = `Distance = Speed × Time = ${input.speedValue} ${sUnit.symbol} × ${tFormatted} = ${distInChosen.toFixed(3)} ${dUnit.symbol} (${(distanceMeters / 1000).toFixed(3)} km)`;
  } else {
    // Mode: Time
    if (speedMs > 0) {
      totalTimeSeconds = distanceMeters / speedMs;
    } else {
      totalTimeSeconds = 0;
    }
    const tFormatted = formatTimeHoursMinutesSeconds(totalTimeSeconds).formatted;
    formulaDesc = `Time = Distance / Speed = ${input.distanceValue} ${dUnit.symbol} / ${input.speedValue} ${sUnit.symbol} = ${tFormatted}`;
  }

  const speedKmh = speedMs * 3.6;
  const speedMph = speedMs * 2.23693629;
  const speedFts = speedMs * 3.2808399;
  const speedKnots = speedMs * 1.94384449;
  const speedMach = speedMs / 343.0;

  // Athletic Pace
  const secPerKm = speedMs > 0 ? 1000 / speedMs : 0;
  const secPerMile = speedMs > 0 ? 1609.344 / speedMs : 0;
  const paceMinKm = formatPace(secPerKm);
  const paceMinMile = formatPace(secPerMile);

  // Closest real world benchmark
  let closestRef = REAL_WORLD_SPEED_REFERENCES[0];
  let minDiff = Math.abs(Math.log10(Math.max(1e-5, speedMs)) - Math.log10(closestRef.speedMs));
  for (const ref of REAL_WORLD_SPEED_REFERENCES) {
    const diff = Math.abs(Math.log10(Math.max(1e-5, speedMs)) - Math.log10(ref.speedMs));
    if (diff < minDiff) {
      minDiff = diff;
      closestRef = ref;
    }
  }

  const allSpeedUnits = SPEED_UNITS.filter((u) => u.category === "common" || u.id === "mach").map((u) => {
    const val = speedMs / u.toMetersPerSecond;
    return {
      unit: u,
      value: val,
      formatted: val >= 1000 ? val.toLocaleString(undefined, { maximumFractionDigits: 2 }) : val.toFixed(3),
    };
  });

  return {
    mode: input.mode,
    distanceMeters,
    distanceFormatted: `${(distanceMeters / dUnit.toMeters).toLocaleString(undefined, { maximumFractionDigits: 3 })} ${dUnit.symbol}`,
    totalTimeSeconds,
    timeFormatted: formatTimeHoursMinutesSeconds(totalTimeSeconds).formatted,
    speedMs,
    speedKmh,
    speedMph,
    speedFts,
    speedKnots,
    speedMach,
    paceMinMile,
    paceMinKm,
    formulaDescription: formulaDesc,
    closestReference: closestRef,
    allSpeedUnits,
  };
}

// ─── CARD 2: ATHLETIC PACE & SPLIT CALCULATOR ───────────────────────────────

export interface RacePaceSplit {
  splitName: string;
  distanceKm: number;
  distanceMiles: number;
  cumulativeTimeFormatted: string;
  splitTimeFormatted: string;
}

export interface RacePaceResult {
  distanceMeters: number;
  totalTimeSeconds: number;
  paceMinKm: string;
  paceMinMile: string;
  speedMph: number;
  speedKmh: number;
  splits: RacePaceSplit[];
}

export function calculateRacePace(
  distanceMeters: number,
  totalTimeSeconds: number,
  splitIntervalKm = 1
): RacePaceResult {
  const d = Math.max(1, distanceMeters);
  const t = Math.max(1, totalTimeSeconds);

  const speedMs = d / t;
  const speedKmh = speedMs * 3.6;
  const speedMph = speedMs * 2.23694;

  const secPerKm = 1000 / speedMs;
  const secPerMile = 1609.344 / speedMs;

  const paceMinKm = formatPace(secPerKm);
  const paceMinMile = formatPace(secPerMile);

  const totalKm = d / 1000;
  const splits: RacePaceSplit[] = [];

  const step = Math.max(1, splitIntervalKm);
  for (let k = step; k < totalKm; k += step) {
    const splitSecs = (k * 1000) / speedMs;
    splits.push({
      splitName: `KM ${k}`,
      distanceKm: k,
      distanceMiles: Math.round((k * 0.621371) * 100) / 100,
      cumulativeTimeFormatted: formatTimeHoursMinutesSeconds(splitSecs).formatted,
      splitTimeFormatted: formatTimeHoursMinutesSeconds(secPerKm * step).formatted,
    });
  }

  // Final Finish Split
  splits.push({
    splitName: `Finish (${(totalKm).toFixed(2)} km)`,
    distanceKm: totalKm,
    distanceMiles: Math.round((totalKm * 0.621371) * 100) / 100,
    cumulativeTimeFormatted: formatTimeHoursMinutesSeconds(t).formatted,
    splitTimeFormatted: formatTimeHoursMinutesSeconds(t - (splits.length > 0 ? (splits[splits.length - 1].distanceKm * 1000) / speedMs : 0)).formatted,
  });

  return {
    distanceMeters: d,
    totalTimeSeconds: t,
    paceMinKm,
    paceMinMile,
    speedMph,
    speedKmh,
    splits: splits.slice(0, 10),
  };
}

// ─── CARD 3: MULTI-SEGMENT AVERAGE SPEED ────────────────────────────────────

export interface JourneyLeg {
  id: string;
  distanceKm: number;
  timeMinutes: number;
}

export interface MultiSegmentResult {
  totalDistanceKm: number;
  totalTimeMinutes: number;
  averageSpeedKmh: number;
  averageSpeedMph: number;
}

export function calculateMultiSegmentSpeed(legs: JourneyLeg[]): MultiSegmentResult {
  let totDist = 0;
  let totTimeMin = 0;

  for (const leg of legs) {
    totDist += Math.max(0, leg.distanceKm || 0);
    totTimeMin += Math.max(0, leg.timeMinutes || 0);
  }

  const totHours = totTimeMin / 60;
  const avgKmh = totHours > 0 ? totDist / totHours : 0;
  const avgMph = avgKmh * 0.621371;

  return {
    totalDistanceKm: totDist,
    totalTimeMinutes: totTimeMin,
    averageSpeedKmh: Math.round(avgKmh * 100) / 100,
    averageSpeedMph: Math.round(avgMph * 100) / 100,
  };
}
