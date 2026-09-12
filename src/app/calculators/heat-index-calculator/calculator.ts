import {
  TempUnit,
  HumidityInputMode,
  HeatAlertCategory,
  WorkRestSchedule,
  OSHAWorkRestPlan,
  HeatIndexResult,
} from "./types";

export function convertTempToF(temp: number, unit: TempUnit): number {
  return unit === "C" ? temp * (9 / 5) + 32 : temp;
}

export function convertTempToC(temp: number, unit: TempUnit): number {
  return unit === "F" ? (temp - 32) * (5 / 9) : temp;
}

export function calculateDewPointFromRH(tempC: number, rh: number): number {
  if (rh <= 0) return tempC - 30;
  const rhNorm = Math.min(100, Math.max(1, rh));
  const gamma = (17.27 * tempC) / (237.7 + tempC) + Math.log(rhNorm / 100);
  const dewC = (237.7 * gamma) / (17.27 - gamma);
  return parseFloat(dewC.toFixed(1));
}

export function calculateRHFromDewPoint(tempC: number, dewC: number): number {
  const effectiveDewC = Math.min(tempC, dewC);
  const rh =
    100 *
    Math.exp(
      (17.27 * effectiveDewC) / (237.7 + effectiveDewC) -
        (17.27 * tempC) / (237.7 + tempC)
    );
  return Math.min(100, Math.max(1, Math.round(rh)));
}

/**
 * 1. Simple Steadman-consistent preliminary heat index calculation.
 * Formula: HI_simple = 0.5 * { T + 61.0 + [(T - 68.0) * 1.2] + (RH * 0.094) }
 */
export function calculateSimpleHeatIndexF(tempF: number, rh: number): number {
  return 0.5 * (tempF + 61.0 + (tempF - 68.0) * 1.2 + rh * 0.094);
}

/**
 * 2. Raw 9-parameter Lans P. Rothfusz (1990) multiple regression polynomial.
 */
export function calculateRothfuszRawHeatIndexF(tempF: number, rh: number): number {
  const T = tempF;
  const R = rh;
  return (
    -42.379 +
    2.04901523 * T +
    10.14333127 * R -
    0.22475541 * T * R -
    0.00683783 * T * T -
    0.05481717 * R * R +
    0.00122874 * T * T * R +
    0.00085282 * T * R * R -
    0.00000199 * T * T * R * R
  );
}

/**
 * 3. Conditional NOAA / NWS Humidity Adjustments.
 * - Low-humidity adjustment: RH < 13% AND 80°F <= T <= 112°F
 * - High-humidity adjustment: RH > 85% AND 80°F <= T <= 87°F
 */
export function applyNwsHumidityAdjustment(
  tempF: number,
  rh: number,
  rawHI: number
): { adjustedHI: number; adjustment: number } {
  let adjustment = 0;
  if (rh < 13 && tempF >= 80 && tempF <= 112) {
    adjustment = -(((13 - rh) / 4) * Math.sqrt((17 - Math.abs(tempF - 95)) / 17));
  } else if (rh > 85 && tempF >= 80 && tempF <= 87) {
    adjustment = ((rh - 85) / 10) * ((87 - tempF) / 5);
  }
  return {
    adjustedHI: rawHI + adjustment,
    adjustment,
  };
}

/**
 * 4. Rothfusz regression with official NWS humidity adjustment applied.
 */
export function calculateRothfuszHeatIndexF(tempF: number, rh: number): number {
  const raw = calculateRothfuszRawHeatIndexF(tempF, rh);
  const { adjustedHI } = applyNwsHumidityAdjustment(tempF, rh, raw);
  return parseFloat(adjustedHI.toFixed(1));
}

/**
 * 5. Complete NOAA / National Weather Service (NWS) Operational Algorithm.
 * 
 * Flow:
 * 1. Compute preliminary Steadman simple heat index: HI_simple.
 * 2. If HI_simple < 80°F, use simple procedure directly.
 * 3. If conditions qualify (HI_simple >= 80°F), evaluate full Rothfusz equation + adjustments.
 */
export function calculateNwsHeatIndexF(
  tempF: number,
  rh: number
): {
  heatIndexF: number;
  pathway: "steadman_simple" | "rothfusz_full";
  nwsPathway: "steadman_simple" | "rothfusz_full";
  simpleHI: number;
  avgHI: number;
  rothfuszHI?: number;
  adjustment?: number;
} {
  const simpleHI = calculateSimpleHeatIndexF(tempF, rh);
  const avgHI = 0.5 * (simpleHI + tempF);

  // If preliminary / averaged heat index is below 80°F, use simple calculation
  if (avgHI < 80.0) {
    return {
      heatIndexF: parseFloat(simpleHI.toFixed(1)),
      pathway: "steadman_simple",
      nwsPathway: "steadman_simple",
      simpleHI: parseFloat(simpleHI.toFixed(2)),
      avgHI: parseFloat(avgHI.toFixed(2)),
    };
  }

  // Otherwise apply full Rothfusz regression + adjustments
  const raw = calculateRothfuszRawHeatIndexF(tempF, rh);
  const { adjustedHI, adjustment } = applyNwsHumidityAdjustment(tempF, rh, raw);

  return {
    heatIndexF: parseFloat(adjustedHI.toFixed(1)),
    pathway: "rothfusz_full",
    nwsPathway: "rothfusz_full",
    simpleHI: parseFloat(simpleHI.toFixed(2)),
    avgHI: parseFloat(avgHI.toFixed(2)),
    rothfuszHI: parseFloat(adjustedHI.toFixed(1)),
    adjustment: parseFloat(adjustment.toFixed(3)),
  };
}

export function evaluateHeatAlert(heatIndexF: number): {
  category: HeatAlertCategory;
  title: string;
  description: string;
} {
  if (heatIndexF < 80) {
    return {
      category: "caution",
      title: "Normal Comfort / Low Risk",
      description: "Heat index is within normal comfortable bounds. Minimal thermal strain under ordinary conditions.",
    };
  } else if (heatIndexF <= 90) {
    return {
      category: "caution",
      title: "CAUTION (80°F – 90°F)",
      description: "Fatigue possible with prolonged physical activity. Conditions warrant regular hydration and monitoring.",
    };
  } else if (heatIndexF <= 103) {
    return {
      category: "extreme_caution",
      title: "EXTREME CAUTION (91°F – 103°F)",
      description: "Heat cramps and heat exhaustion possible with prolonged exertion or outdoor labor. Conditions warrant structured cooling breaks and hydration.",
    };
  } else if (heatIndexF <= 124) {
    return {
      category: "danger",
      title: "DANGER (104°F – 124°F)",
      description: "High risk of heat cramps and heat exhaustion; heat stroke risk increases significantly with continued physical exertion. Active precautions and frequent cooling breaks warranted.",
    };
  } else {
    return {
      category: "extreme_danger",
      title: "EXTREME DANGER (125°F+)",
      description: "Severe heat hazard: risk of heat stroke increases dramatically. Continued exposure warrants immediate cessation of strenuous outdoor activity and urgent cooling/medical precautions.",
    };
  }
}

export function generateWorkRestPlan(heatIndexF: number): WorkRestSchedule {
  if (heatIndexF < 80) {
    return {
      workMinutes: 60,
      restMinutes: 0,
      waterCupsPerHour: 2,
      advisory: "Standard baseline conditions. Maintain regular hydration according to thirst.",
    };
  } else if (heatIndexF <= 90) {
    return {
      workMinutes: 50,
      restMinutes: 10,
      waterCupsPerHour: 3,
      advisory: "Reference guideline for moderate labor: Take a 10-minute rest break in shade every hour. NIOSH recommends approx. 1 cup (250 mL) cool water every 15–20 minutes.",
    };
  } else if (heatIndexF <= 103) {
    return {
      workMinutes: 45,
      restMinutes: 15,
      waterCupsPerHour: 4,
      advisory: "Reference guideline for moderate labor: Take 15 minutes of rest per hour in shade or air conditioning. Regular hydration breaks recommended.",
    };
  } else if (heatIndexF <= 124) {
    return {
      workMinutes: 30,
      restMinutes: 30,
      waterCupsPerHour: 4,
      advisory: "Reference guideline for moderate labor: 30 min work / 30 min rest cycles in shade. Monitor personnel closely for signs of heat exhaustion.",
    };
  } else {
    return {
      workMinutes: 15,
      restMinutes: 45,
      waterCupsPerHour: 4,
      advisory: "Reference guideline: Suspend heavy non-essential outdoor labor if possible. Rest 45 minutes per hour under active cooling shelter.",
    };
  }
}

// Alias for legacy support
export const generateOSHAWorkRestPlan = generateWorkRestPlan;

export function calculateHeatIndex(
  temp: number = 85,
  tempUnit: TempUnit = "F",
  humidityMode: HumidityInputMode = "rh",
  rhValue: number = 70,
  dewPointValue: number = 74,
  isDirectSun: boolean = false
): HeatIndexResult {
  const safeTemp = isNaN(temp) ? 85 : temp;
  const tempF = convertTempToF(safeTemp, tempUnit);
  const tempC = convertTempToC(safeTemp, tempUnit);

  let rh = isNaN(rhValue) ? 50 : Math.max(0, Math.min(100, rhValue));
  let dewF = dewPointValue;
  let dewC = convertTempToC(dewPointValue, tempUnit);
  let domainNotice: string | undefined = undefined;
  let warningNote: string | undefined = undefined;
  let isSupersaturated = false;

  if (humidityMode === "dewpoint") {
    dewF = convertTempToF(dewPointValue, tempUnit);
    dewC = convertTempToC(dewPointValue, tempUnit);
    if (dewF > tempF) {
      isSupersaturated = true;
      warningNote = "Dew point cannot exceed air temperature for this atmospheric input.";
      return {
        airTempF: parseFloat(tempF.toFixed(1)),
        airTempC: parseFloat(tempC.toFixed(1)),
        relativeHumidity: NaN,
        dewPointF: parseFloat(dewF.toFixed(1)),
        dewPointC: parseFloat(dewC.toFixed(1)),
        heatIndexF: NaN,
        heatIndexC: NaN,
        directSunHeatIndexF: NaN,
        directSunHeatIndexC: NaN,
        isDirectSun,
        heatStressEstimateF: NaN,
        heatStressEstimateC: NaN,
        wbgtEstimateF: NaN,
        wbgtEstimateC: NaN,
        alertCategory: "caution",
        alertTitle: "Invalid Atmospheric State",
        alertDescription: "Physically inconsistent atmospheric state: entered dew point exceeds ambient dry-bulb temperature.",
        workRestPlan: {
          workMinutes: 0,
          restMinutes: 0,
          waterCupsPerHour: 0,
          advisory: "Input validation error: Dew point cannot exceed air temperature.",
        },
        oshaPlan: {
          workMinutes: 0,
          restMinutes: 0,
          waterCupsPerHour: 0,
          advisory: "Input validation error: Dew point cannot exceed air temperature.",
        },
        isSupersaturated: true,
        isInvalid: true,
        warningNote,
      };
    }
    rh = calculateRHFromDewPoint(tempC, dewC);
  } else {
    dewC = calculateDewPointFromRH(tempC, rh);
    dewF = convertTempToF(dewC, "C");
  }

  if (tempF < 50) {
    domainNotice = "Heat Index is not meteorologically applicable below 50°F (10°C), where convective wind chill dominates thermal sensation. Apparent temperature shown uses Steadman linear extrapolation.";
  } else if (tempF < 80) {
    domainNotice = "The NOAA/NWS Rothfusz regression is calibrated for ambient air temperatures ≥ 80°F (26.7°C). Below 80°F, apparent temperature is calculated using the official NWS preliminary Steadman procedure.";
  } else if (tempF > 130) {
    domainNotice = "Air temperatures exceeding 130°F (54.4°C) exceed standard NOAA biometeorological regression bounds. Apparent values represent numerical mathematical extrapolation.";
  }

  const nwsResult = calculateNwsHeatIndexF(tempF, rh);
  const baseHIF = nwsResult.heatIndexF;
  const nwsPathway = nwsResult.pathway;
  const baseHIC = convertTempToC(baseHIF, "F");

  // Direct sun conservative estimate (+15°F / +8.3°C solar load)
  const directSunHIF = parseFloat((baseHIF + (isDirectSun ? 15 : 0)).toFixed(1));
  const directSunHIC = convertTempToC(directSunHIF, "F");

  const effectiveHIF = isDirectSun ? directSunHIF : baseHIF;
  const alertInfo = evaluateHeatAlert(effectiveHIF);
  const workRestPlan = generateWorkRestPlan(effectiveHIF);

  const safeDewF = parseFloat(dewF.toFixed(1));
  const safeDewC = parseFloat(dewC.toFixed(1));

  // Moisture-weighted heat stress estimate (0.76 * HI + 0.24 * DewPoint)
  // Note: This is an empirical ambient moisture-weighted heat stress indicator, NOT an on-site WBGT measurement.
  const heatStressF = parseFloat((0.76 * baseHIF + 0.24 * safeDewF).toFixed(1));
  const heatStressC = convertTempToC(heatStressF, "F");

  return {
    airTempF: parseFloat(tempF.toFixed(1)),
    airTempC: parseFloat(tempC.toFixed(1)),
    relativeHumidity: rh,
    dewPointF: safeDewF,
    dewPointC: safeDewC,
    heatIndexF: baseHIF,
    heatIndexC: parseFloat(baseHIC.toFixed(1)),
    directSunHeatIndexF: directSunHIF,
    directSunHeatIndexC: parseFloat(directSunHIC.toFixed(1)),
    isDirectSun,
    heatStressEstimateF: heatStressF,
    heatStressEstimateC: parseFloat(heatStressC.toFixed(1)),
    wbgtEstimateF: heatStressF,
    wbgtEstimateC: parseFloat(heatStressC.toFixed(1)),
    alertCategory: alertInfo.category,
    alertTitle: alertInfo.title,
    alertDescription: alertInfo.description,
    workRestPlan,
    oshaPlan: workRestPlan,
    nwsPathway,
    pathway: nwsPathway,
    simpleHI: nwsResult.simpleHI,
    avgHI: nwsResult.avgHI,
    adjustment: nwsResult.adjustment,
    isSupersaturated,
    isInvalid: false,
    domainNotice,
    warningNote,
  };
}

export function calculateHeatIndexFromInputs(inputs: Record<string, any>): HeatIndexResult {
  const temp = Number(inputs.temperature || inputs.tempF || 85);
  const tempUnit = (inputs.tempUnit as TempUnit) || "F";
  const rh = Number(inputs.relativeHumidity || inputs.rh || 70);

  return calculateHeatIndex(temp, tempUnit, "rh", rh);
}
