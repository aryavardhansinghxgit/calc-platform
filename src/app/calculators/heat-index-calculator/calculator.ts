import {
  TempUnit,
  HumidityInputMode,
  HeatAlertCategory,
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

export function calculateRothfuszHeatIndexF(tempF: number, rh: number): number {
  // If temp < 80°F, use Steadman simple baseline
  const simpleHI =
    0.5 * (tempF + 61.0 + (tempF - 68.0) * 1.2 + rh * 0.094);

  if (simpleHI < 80) {
    return parseFloat(simpleHI.toFixed(1));
  }

  // Full 9-parameter Rothfusz equation
  const T = tempF;
  const R = rh;
  let hi =
    -42.379 +
    2.04901523 * T +
    10.14333127 * R -
    0.22475541 * T * R -
    0.00683783 * T * T -
    0.05481717 * R * R +
    0.00122874 * T * T * R +
    0.00085282 * T * R * R -
    0.00000199 * T * T * R * R;

  // Low Humidity Adjustment: RH < 13% and 80 <= T <= 112
  if (R < 13 && T >= 80 && T <= 112) {
    const adjLow = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
    hi -= adjLow;
  }
  // High Humidity Adjustment: RH > 85% and 80 <= T <= 87
  else if (R > 85 && T >= 80 && T <= 87) {
    const adjHigh = ((R - 85) / 10) * ((87 - T) / 5);
    hi += adjHigh;
  }

  return parseFloat(hi.toFixed(1));
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
      description: "Heat index is within normal comfortable bounds. Minimal risk of heat illness.",
    };
  } else if (heatIndexF <= 90) {
    return {
      category: "caution",
      title: "CAUTION (80°F – 90°F)",
      description: "Fatigue possible with prolonged exposure and physical activity. Stay hydrated.",
    };
  } else if (heatIndexF <= 103) {
    return {
      category: "extreme_caution",
      title: "EXTREME CAUTION (91°F – 103°F)",
      description: "Sunstroke, heat cramps, and heat exhaustion possible with prolonged exposure or outdoor labor.",
    };
  } else if (heatIndexF <= 124) {
    return {
      category: "danger",
      title: "DANGER (104°F – 124°F)",
      description: "Heat cramps and heat exhaustion likely; heat stroke probable with continued physical activity.",
    };
  } else {
    return {
      category: "extreme_danger",
      title: "EXTREME DANGER (125°F+)",
      description: "HEAT STROKE IMMINENT! High risk of organ damage and life-threatening heat emergency.",
    };
  }
}

export function generateOSHAWorkRestPlan(heatIndexF: number): OSHAWorkRestPlan {
  if (heatIndexF < 80) {
    return {
      workMinutes: 60,
      restMinutes: 0,
      waterCupsPerHour: 2,
      advisory: "Normal outdoor activity. Maintain standard hydration.",
    };
  } else if (heatIndexF <= 90) {
    return {
      workMinutes: 50,
      restMinutes: 10,
      waterCupsPerHour: 4,
      advisory: "Take a 10-minute rest break in shaded area every hour. Drink 1 cup (250 ml) water every 20 mins.",
    };
  } else if (heatIndexF <= 103) {
    return {
      workMinutes: 45,
      restMinutes: 15,
      waterCupsPerHour: 4,
      advisory: "Take 15 minutes of rest per hour in shade or air conditioning. Mandatory hydration breaks.",
    };
  } else if (heatIndexF <= 124) {
    return {
      workMinutes: 30,
      restMinutes: 30,
      waterCupsPerHour: 4,
      advisory: "Heavy labor requires 30 min work / 30 min rest cycles in shade. Monitor workers for heat cramps.",
    };
  } else {
    return {
      workMinutes: 15,
      restMinutes: 45,
      waterCupsPerHour: 4,
      advisory: "SUSPEND HEAVY OUTDOOR LABOR if possible. Rest 45 mins per hour under active cooling.",
    };
  }
}

export function calculateHeatIndex(
  temp: number = 85,
  tempUnit: TempUnit = "F",
  humidityMode: HumidityInputMode = "rh",
  rhValue: number = 70,
  dewPointValue: number = 74,
  isDirectSun: boolean = false
): HeatIndexResult {
  const tempF = convertTempToF(temp, tempUnit);
  const tempC = convertTempToC(temp, tempUnit);

  let rh = rhValue;
  let dewF = dewPointValue;
  let dewC = convertTempToC(dewPointValue, tempUnit);

  if (humidityMode === "dewpoint") {
    dewF = convertTempToF(dewPointValue, tempUnit);
    dewC = convertTempToC(dewPointValue, tempUnit);
    rh = calculateRHFromDewPoint(tempC, dewC);
  } else {
    dewC = calculateDewPointFromRH(tempC, rh);
    dewF = convertTempToF(dewC, "C");
  }

  const baseHIF = calculateRothfuszHeatIndexF(tempF, rh);
  const baseHIC = convertTempToC(baseHIF, "F");

  // Direct sun adds +15°F radiant solar heat load
  const directSunHIF = parseFloat((baseHIF + (isDirectSun ? 15 : 0)).toFixed(1));
  const directSunHIC = convertTempToC(directSunHIF, "F");

  const effectiveHIF = isDirectSun ? directSunHIF : baseHIF;
  const alertInfo = evaluateHeatAlert(effectiveHIF);
  const oshaPlan = generateOSHAWorkRestPlan(effectiveHIF);

  // WBGT estimate: 0.76 * HI + 0.24 * DewPoint
  const wbgtF = parseFloat((0.76 * baseHIF + 0.24 * dewF).toFixed(1));
  const wbgtC = convertTempToC(wbgtF, "F");

  return {
    airTempF: parseFloat(tempF.toFixed(1)),
    airTempC: parseFloat(tempC.toFixed(1)),
    relativeHumidity: rh,
    dewPointF: parseFloat(dewF.toFixed(1)),
    dewPointC: parseFloat(dewC.toFixed(1)),
    heatIndexF: baseHIF,
    heatIndexC: parseFloat(baseHIC.toFixed(1)),
    directSunHeatIndexF: directSunHIF,
    directSunHeatIndexC: parseFloat(directSunHIC.toFixed(1)),
    isDirectSun,
    wbgtEstimateF: wbgtF,
    wbgtEstimateC: parseFloat(wbgtC.toFixed(1)),
    alertCategory: alertInfo.category,
    alertTitle: alertInfo.title,
    alertDescription: alertInfo.description,
    oshaPlan,
  };
}

export function calculateHeatIndexFromInputs(inputs: Record<string, any>): HeatIndexResult {
  const temp = Number(inputs.temperature || inputs.tempF || 85);
  const tempUnit = (inputs.tempUnit as TempUnit) || "F";
  const rh = Number(inputs.relativeHumidity || inputs.rh || 70);

  return calculateHeatIndex(temp, tempUnit, "rh", rh);
}
