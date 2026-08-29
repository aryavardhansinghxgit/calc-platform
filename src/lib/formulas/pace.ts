export type DistanceUnit = "miles" | "km" | "meters" | "yards" | "feet";
export type PaceUnit = "min_mile" | "min_km" | "min_400m" | "min_100m" | "mph" | "kmh" | "ms";
export type PresetEvent = "custom" | "100m" | "200m" | "400m" | "800m" | "1500m" | "1mile" | "5k" | "10k" | "half_marathon" | "marathon";
export type CalculationMode = "calculate_pace" | "calculate_time" | "calculate_distance";

export interface PaceInput {
  calcMode?: CalculationMode;
  presetEvent?: PresetEvent;
  // Time input
  timeHours?: number;
  timeMinutes?: number;
  timeSeconds?: number;
  // Distance input
  distanceValue?: number;
  distanceUnit?: DistanceUnit;
  // Pace input
  paceMinutes?: number;
  paceSeconds?: number;
  paceUnit?: PaceUnit;
  // Demographics for Heart Rate tool
  age?: number;
  restingHeartRate?: number;
}

export interface SplitSegmentInput {
  id: string;
  distanceValue: number;
  distanceUnit: DistanceUnit;
  timeHours: number;
  timeMinutes: number;
  timeSeconds: number;
}

export interface SplitSegmentResult {
  id: string;
  segmentNumber: number;
  distanceMiles: number;
  distanceKm: number;
  timeTotalSeconds: number;
  timeFormatted: string;
  pacePerMileFormatted: string;
  pacePerKmFormatted: string;
}

export interface HeartRateZoneInfo {
  zoneNumber: number;
  name: string;
  percentRange: string;
  minBpm: number;
  maxBpm: number;
  color: string;
  description: string;
}

export interface PaceResult {
  isValid: boolean;
  errorMessage?: string;
  // Primary Pace
  totalTimeSeconds: number;
  totalTimeFormatted: string;
  totalDistanceMiles: number;
  totalDistanceKm: number;
  totalDistanceMeters: number;
  paceSecondsPerMile: number;
  pacePerMileFormatted: string;
  paceSecondsPerKm: number;
  pacePerKmFormatted: string;
  speedMph: number;
  speedKmh: number;
  // Conversion equivalencies
  pace400mFormatted: string;
  pace100mFormatted: string;
  speedMs: number;
  // Race Predictor (Riegel)
  riegelPredictions: Array<{
    eventName: string;
    distanceMiles: number;
    predictedTimeSeconds: number;
    predictedTimeFormatted: string;
    predictedPacePerMileFormatted: string;
    predictedPacePerKmFormatted: string;
  }>;
  // Heart Rate Zones
  maxHeartRateFox: number;
  maxHeartRateTanaka: number;
  hrZones: HeartRateZoneInfo[];
}

// Helpers
export function formatTimeHHMMSS(totalSecs: number): string {
  if (isNaN(totalSecs) || totalSecs <= 0 || !isFinite(totalSecs)) return "00:00";
  const s = Math.round(totalSecs);
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${mins}:${pad(secs)}`;
}

export function convertDistanceToMeters(value: number, unit: DistanceUnit): number {
  if (isNaN(value) || value <= 0) return 0;
  switch (unit) {
    case "miles":
      return value * 1609.344;
    case "km":
      return value * 1000;
    case "meters":
      return value;
    case "yards":
      return value * 0.9144;
    case "feet":
      return value * 0.3048;
    default:
      return value * 1609.344;
  }
}

export function getPresetEventMeters(event: PresetEvent): number {
  switch (event) {
    case "100m": return 100;
    case "200m": return 200;
    case "400m": return 400;
    case "800m": return 800;
    case "1500m": return 1500;
    case "1mile": return 1609.344;
    case "5k": return 5000;
    case "10k": return 10000;
    case "half_marathon": return 21097.5;
    case "marathon": return 42195;
    default: return 0;
  }
}

export function calculatePace(input: PaceInput): PaceResult {
  const calcMode = input.calcMode || "calculate_pace";
  const presetEvent = input.presetEvent || "custom";

  const age = Math.max(10, Math.min(90, Number(input.age) || 30));
  const mhrFox = 220 - age;
  const mhrTanaka = Math.round(208 - 0.7 * age);

  const hrZones: HeartRateZoneInfo[] = [
    { zoneNumber: 1, name: "Zone 1 — Active Recovery", percentRange: "50% – 60%", minBpm: Math.round(mhrFox * 0.5), maxBpm: Math.round(mhrFox * 0.6), color: "#38bdf8", description: "Very light effort for warm-up, active recovery, and fat oxidation baseline" },
    { zoneNumber: 2, name: "Zone 2 — Aerobic / Base Endurance", percentRange: "60% – 70%", minBpm: Math.round(mhrFox * 0.6), maxBpm: Math.round(mhrFox * 0.7), color: "#34d399", description: "Comfortable conversational pace building mitochondrial density and lipid metabolism" },
    { zoneNumber: 3, name: "Zone 3 — Tempo / Aerobic Power", percentRange: "70% – 80%", minBpm: Math.round(mhrFox * 0.7), maxBpm: Math.round(mhrFox * 0.8), color: "#10b981", description: "Moderate endurance effort improving cardiovascular capacity and glycogen efficiency" },
    { zoneNumber: 4, name: "Zone 4 — Lactate Threshold / Hardcore", percentRange: "80% – 90%", minBpm: Math.round(mhrFox * 0.8), maxBpm: Math.round(mhrFox * 0.9), color: "#facc15", description: "Sustainable hard effort near lactate accumulation threshold (10K pace)" },
    { zoneNumber: 5, name: "Zone 5 — VO2 Max / Anaerobic Sprint", percentRange: "90% – 100%", minBpm: Math.round(mhrFox * 0.9), maxBpm: mhrFox, color: "#f87171", description: "Maximum exertion for short interval sprints and neuromuscular speed" },
  ];

  const emptyRiegel = [
    { eventName: "5K", distanceMiles: 3.11, predictedTimeSeconds: 0, predictedTimeFormatted: "--:--", predictedPacePerMileFormatted: "--:--", predictedPacePerKmFormatted: "--:--" },
    { eventName: "10K", distanceMiles: 6.21, predictedTimeSeconds: 0, predictedTimeFormatted: "--:--", predictedPacePerMileFormatted: "--:--", predictedPacePerKmFormatted: "--:--" },
    { eventName: "Half Marathon (13.1 mi)", distanceMiles: 13.11, predictedTimeSeconds: 0, predictedTimeFormatted: "--:--", predictedPacePerMileFormatted: "--:--", predictedPacePerKmFormatted: "--:--" },
    { eventName: "Marathon (26.2 mi)", distanceMiles: 26.22, predictedTimeSeconds: 0, predictedTimeFormatted: "--:--", predictedPacePerMileFormatted: "--:--", predictedPacePerKmFormatted: "--:--" },
  ];

  const makeInvalid = (msg: string): PaceResult => ({
    isValid: false,
    errorMessage: msg,
    totalTimeSeconds: 0,
    totalTimeFormatted: "--:--",
    totalDistanceMiles: 0,
    totalDistanceKm: 0,
    totalDistanceMeters: 0,
    paceSecondsPerMile: 0,
    pacePerMileFormatted: "--:--",
    paceSecondsPerKm: 0,
    pacePerKmFormatted: "--:--",
    speedMph: 0,
    speedKmh: 0,
    pace400mFormatted: "--:--",
    pace100mFormatted: "--:--",
    speedMs: 0,
    riegelPredictions: emptyRiegel,
    maxHeartRateFox: mhrFox,
    maxHeartRateTanaka: mhrTanaka,
    hrZones,
  });

  let totalMeters = 0;
  if (presetEvent !== "custom") {
    totalMeters = getPresetEventMeters(presetEvent);
  } else {
    const rawDist = input.distanceValue !== undefined && input.distanceValue !== null ? Number(input.distanceValue) : NaN;
    if (isNaN(rawDist) || rawDist <= 0) {
      if (calcMode !== "calculate_distance") {
        return makeInvalid("Enter a distance greater than 0");
      }
    } else {
      const distUnit = input.distanceUnit || "km";
      totalMeters = convertDistanceToMeters(rawDist, distUnit);
    }
  }

  // Time in seconds
  const inputHrs = Number(input.timeHours) || 0;
  const inputMins = Number(input.timeMinutes) || 0;
  const inputSecs = Number(input.timeSeconds) || 0;
  let totalTimeSecs = inputHrs * 3600 + inputMins * 60 + inputSecs;

  // Pace input in seconds per mile/km
  const pMins = Number(input.paceMinutes) || 0;
  const pSecs = Number(input.paceSeconds) || 0;
  const inputPaceSecs = pMins * 60 + pSecs;
  const pUnit = input.paceUnit || "min_km";

  let paceSecsPerMile = 0;

  if (calcMode === "calculate_pace") {
    if (totalMeters <= 0) return makeInvalid("Enter a distance greater than 0");
    if (totalTimeSecs <= 0) return makeInvalid("Enter a time greater than 0");
    const miles = totalMeters / 1609.344;
    paceSecsPerMile = totalTimeSecs / miles;
  } else if (calcMode === "calculate_time") {
    if (totalMeters <= 0) return makeInvalid("Enter a distance greater than 0");
    if (inputPaceSecs <= 0) return makeInvalid("Enter a pace greater than 0");

    if (pUnit === "min_mile") paceSecsPerMile = inputPaceSecs;
    else if (pUnit === "min_km") paceSecsPerMile = inputPaceSecs * 1.609344;
    else if (pUnit === "mph") paceSecsPerMile = (3600 / Math.max(0.1, Number(input.paceMinutes) || 7));
    else paceSecsPerMile = inputPaceSecs;

    const miles = totalMeters / 1609.344;
    totalTimeSecs = Math.round(paceSecsPerMile * miles);
  } else if (calcMode === "calculate_distance") {
    if (totalTimeSecs <= 0) return makeInvalid("Enter a time greater than 0");
    if (inputPaceSecs <= 0) return makeInvalid("Enter a pace greater than 0");

    if (pUnit === "min_mile") paceSecsPerMile = inputPaceSecs;
    else if (pUnit === "min_km") paceSecsPerMile = inputPaceSecs * 1.609344;
    else paceSecsPerMile = inputPaceSecs;

    const miles = totalTimeSecs / paceSecsPerMile;
    totalMeters = miles * 1609.344;
  }

  if (paceSecsPerMile <= 0 || !isFinite(paceSecsPerMile)) {
    return makeInvalid("Unable to calculate with given parameters");
  }

  const totalMiles = parseFloat((totalMeters / 1609.344).toFixed(3));
  const totalKm = parseFloat((totalMeters / 1000).toFixed(3));

  const paceSecsPerKm = paceSecsPerMile / 1.609344;
  const speedMph = parseFloat((3600 / paceSecsPerMile).toFixed(2));
  const speedKmh = parseFloat((3600 / paceSecsPerKm).toFixed(2));
  const speedMs = parseFloat((speedKmh / 3.6).toFixed(2));

  const pace400mSecs = paceSecsPerKm * 0.4;
  const pace100mSecs = paceSecsPerKm * 0.1;

  // Riegel Race Finish Time Predictor (T2 = T1 * (D2/D1)^1.06)
  const raceEvents = [
    { eventName: "5K", distM: 5000 },
    { eventName: "10K", distM: 10000 },
    { eventName: "Half Marathon (13.1 mi)", distM: 21097.5 },
    { eventName: "Marathon (26.2 mi)", distM: 42195 },
  ];

  const riegelPredictions = raceEvents.map((r) => {
    const t2 = totalTimeSecs * Math.pow(r.distM / totalMeters, 1.06);
    const rMiles = r.distM / 1609.344;
    const rPaceMile = t2 / rMiles;
    const rPaceKm = rPaceMile / 1.609344;

    return {
      eventName: r.eventName,
      distanceMiles: parseFloat(rMiles.toFixed(2)),
      predictedTimeSeconds: Math.round(t2),
      predictedTimeFormatted: formatTimeHHMMSS(t2),
      predictedPacePerMileFormatted: formatTimeHHMMSS(rPaceMile),
      predictedPacePerKmFormatted: formatTimeHHMMSS(rPaceKm),
    };
  });

  return {
    isValid: true,
    totalTimeSeconds: totalTimeSecs,
    totalTimeFormatted: formatTimeHHMMSS(totalTimeSecs),
    totalDistanceMiles: totalMiles,
    totalDistanceKm: totalKm,
    totalDistanceMeters: Math.round(totalMeters),
    paceSecondsPerMile: Math.round(paceSecsPerMile),
    pacePerMileFormatted: formatTimeHHMMSS(paceSecsPerMile),
    paceSecondsPerKm: Math.round(paceSecsPerKm),
    pacePerKmFormatted: formatTimeHHMMSS(paceSecsPerKm),
    speedMph,
    speedKmh,
    pace400mFormatted: formatTimeHHMMSS(pace400mSecs),
    pace100mFormatted: formatTimeHHMMSS(pace100mSecs),
    speedMs,
    riegelPredictions,
    maxHeartRateFox: mhrFox,
    maxHeartRateTanaka: mhrTanaka,
    hrZones,
  };
}

export function calculateMultipointSplits(splits: SplitSegmentInput[]): {
  segments: SplitSegmentResult[];
  cumulativeDistanceMiles: number;
  cumulativeDistanceKm: number;
  cumulativeTimeSeconds: number;
  cumulativeTimeFormatted: string;
  overallAveragePacePerMileFormatted: string;
  overallAveragePacePerKmFormatted: string;
} {
  let cumMeters = 0;
  let cumTimeSecs = 0;

  const segments: SplitSegmentResult[] = splits.map((s, idx) => {
    const meters = convertDistanceToMeters(Number(s.distanceValue) || 1, s.distanceUnit || "km");
    const secs = (Number(s.timeHours) || 0) * 3600 + (Number(s.timeMinutes) || 0) * 60 + (Number(s.timeSeconds) || 0);

    cumMeters += meters;
    cumTimeSecs += secs;

    const miles = meters / 1609.344;
    const km = meters / 1000;

    const pSecsMile = secs / Math.max(0.001, miles);
    const pSecsKm = secs / Math.max(0.001, km);

    return {
      id: s.id,
      segmentNumber: idx + 1,
      distanceMiles: parseFloat(miles.toFixed(2)),
      distanceKm: parseFloat(km.toFixed(2)),
      timeTotalSeconds: secs,
      timeFormatted: formatTimeHHMMSS(secs),
      pacePerMileFormatted: formatTimeHHMMSS(pSecsMile),
      pacePerKmFormatted: formatTimeHHMMSS(pSecsKm),
    };
  });

  const totalMiles = cumMeters / 1609.344;
  const totalKm = cumMeters / 1000;
  const avgPaceMileSecs = cumTimeSecs / Math.max(0.001, totalMiles);
  const avgPaceKmSecs = cumTimeSecs / Math.max(0.001, totalKm);

  return {
    segments,
    cumulativeDistanceMiles: parseFloat(totalMiles.toFixed(2)),
    cumulativeDistanceKm: parseFloat(totalKm.toFixed(2)),
    cumulativeTimeSeconds: cumTimeSecs,
    cumulativeTimeFormatted: formatTimeHHMMSS(cumTimeSecs),
    overallAveragePacePerMileFormatted: formatTimeHHMMSS(avgPaceMileSecs),
    overallAveragePacePerKmFormatted: formatTimeHHMMSS(avgPaceKmSecs),
  };
}
