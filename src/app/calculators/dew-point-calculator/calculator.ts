import {
  TempUnit,
  TargetVariable,
  PsychrometricModel,
  ComfortCategory,
  PaintingRiskAdvice,
  DewPointResult,
} from "./types";

export function getModelConstants(model: PsychrometricModel): { a: number; b: number } {
  switch (model) {
    case "magnus_tetens":
      return { a: 17.27, b: 237.7 };
    case "buck":
      return { a: 17.502, b: 240.97 };
    case "sonntag":
      return { a: 17.62, b: 243.12 };
    case "alduchov_eskridge":
    default:
      return { a: 17.625, b: 243.04 };
  }
}

export function convertToC(temp: number, unit: TempUnit): number {
  if (unit === "F") return (temp - 32) * (5 / 9);
  if (unit === "K") return temp - 273.15;
  return temp;
}

export function convertFromC(tempC: number, targetUnit: TempUnit): number {
  if (targetUnit === "F") return tempC * (9 / 5) + 32;
  if (targetUnit === "K") return tempC + 273.15;
  return tempC;
}

export function calculateSaturationVaporPressureHpa(
  tempC: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  const { a, b } = getModelConstants(model);
  const es = 6.112 * Math.exp((a * tempC) / (b + tempC));
  return es;
}

export function calculateDewPointC(
  tempC: number,
  rh: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  const { a, b } = getModelConstants(model);
  const rhNorm = Math.min(100, Math.max(0.1, rh));
  const gamma = Math.log(rhNorm / 100) + (a * tempC) / (b + tempC);
  const dewC = (b * gamma) / (a - gamma);
  return parseFloat(dewC.toFixed(2));
}

export function calculateRHFromDewPoint(
  tempC: number,
  dewC: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  const { a, b } = getModelConstants(model);
  const effectiveDewC = Math.min(tempC, dewC);
  const gammaD = (a * effectiveDewC) / (b + effectiveDewC);
  const gammaT = (a * tempC) / (b + tempC);
  const rh = 100 * Math.exp(gammaD - gammaT);
  return Math.min(100, Math.max(0.1, Math.round(rh)));
}

export function calculateTempCFromDewPointAndRH(
  dewC: number,
  rh: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  const { a, b } = getModelConstants(model);
  const rhNorm = Math.min(100, Math.max(0.1, rh));
  const gammaD = (a * dewC) / (b + dewC);
  const term = gammaD - Math.log(rhNorm / 100);
  const tempC = (b * term) / (a - term);
  return parseFloat(tempC.toFixed(2));
}

export function calculateStullWetBulbC(tempC: number, rh: number): number {
  const rhNorm = Math.min(100, Math.max(0.1, rh));
  const T = tempC;
  const RH = rhNorm;

  const tw =
    T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035;

  return parseFloat(tw.toFixed(2));
}

export function evaluateComfort(dewF: number): {
  category: ComfortCategory;
  title: string;
  description: string;
} {
  if (dewF < 50) {
    return {
      category: "dry",
      title: "Dry / Crisp / Refreshing",
      description: "Low moisture level. Air feels fresh and comfortable. Skin may dry in winter.",
    };
  } else if (dewF <= 59) {
    return {
      category: "comfortable",
      title: "Comfortable / Optimal",
      description: "Ideal atmospheric humidity balance for human comfort and physical activity.",
    };
  } else if (dewF <= 64) {
    return {
      category: "sticky",
      title: "Noticeably Humid ('Sticky')",
      description: "Humidity is noticeable. High intensity exercise feels warmer.",
    };
  } else if (dewF <= 69) {
    return {
      category: "muggy",
      title: "Uncomfortable / Muggy / Oppressive",
      description: "Sweat evaporation is significantly restricted. Air feels heavy and thick.",
    };
  } else {
    return {
      category: "severe_stress",
      title: "Severe Heat Stress / Tropical",
      description: "HIGH HAZARD: Severe thermal stress. Sweat fails to evaporate efficiently.",
    };
  }
}

export function evaluatePaintingRisk(
  surfaceTempF: number,
  dewPointF: number
): PaintingRiskAdvice {
  const marginF = surfaceTempF - dewPointF;
  const marginC = marginF * (5 / 9);

  if (marginF < 0) {
    return {
      isSafeToPaint: false,
      marginF: parseFloat(marginF.toFixed(1)),
      marginC: parseFloat(marginC.toFixed(1)),
      statusText: "CONDENSATION FORMING!",
      recommendation: "DO NOT PAINT! Surface temperature is at or below dew point. Active moisture film present.",
    };
  } else if (marginF < 5) {
    return {
      isSafeToPaint: false,
      marginF: parseFloat(marginF.toFixed(1)),
      marginC: parseFloat(marginC.toFixed(1)),
      statusText: "HIGH RISK: Below 5°F ISO Safety Margin",
      recommendation: "DO NOT PAINT! Substrate temperature must be at least 5°F (3°C) above dew point per ISO 8502-4.",
    };
  } else {
    return {
      isSafeToPaint: true,
      marginF: parseFloat(marginF.toFixed(1)),
      marginC: parseFloat(marginC.toFixed(1)),
      statusText: "SAFE FOR COATING APPLICATION",
      recommendation: "Safe to paint/apply epoxy. Substrate satisfies the 5°F (3°C) safety buffer above dew point.",
    };
  }
}

export function calculateDewPoint(
  targetVar: TargetVariable = "dew_point",
  airTempInput: number = 70,
  rhInput: number = 65,
  dewPointInput: number = 57.7,
  unit: TempUnit = "F",
  model: PsychrometricModel = "alduchov_eskridge",
  surfaceTempInput: number = 75
): DewPointResult {
  let tempC = convertToC(airTempInput, unit);
  let rh = rhInput;
  let dewC = convertToC(dewPointInput, unit);

  if (targetVar === "dew_point") {
    dewC = calculateDewPointC(tempC, rh, model);
  } else if (targetVar === "relative_humidity") {
    rh = calculateRHFromDewPoint(tempC, dewC, model);
  } else if (targetVar === "air_temp") {
    tempC = calculateTempCFromDewPointAndRH(dewC, rh, model);
  }

  const tempF = convertFromC(tempC, "F");
  const tempK = convertFromC(tempC, "K");

  const dewF = convertFromC(dewC, "F");
  const dewK = convertFromC(dewC, "K");

  const wetBulbC = calculateStullWetBulbC(tempC, rh);
  const wetBulbF = convertFromC(wetBulbC, "F");

  // Frost point calculation for T < 0°C
  let frostC = dewC;
  if (tempC < 0) {
    const tk = tempC + 273.15;
    const es = calculateSaturationVaporPressureHpa(tempC, model);
    const e = es * (rh / 100);
    const frostK = tk / (1 - (tk / 273.16) * (Math.log(e / 6.11) / 22.5));
    frostC = parseFloat((frostK - 273.15).toFixed(2));
  }
  const frostF = convertFromC(frostC, "F");

  // Vapor Pressures
  const esHpa = calculateSaturationVaporPressureHpa(tempC, model);
  const eHpa = esHpa * (rh / 100);
  const eInHg = eHpa * 0.02953;

  // Absolute Humidity in g/m³ = 216.7 * e / (T + 273.15)
  const ahGM3 = (216.7 * eHpa) / (tempC + 273.15);
  const ahGrainsFt3 = ahGM3 * 0.437;

  // Specific humidity g/kg approx = 622 * e / (1013.25 - 0.378 * e)
  const specHumGKg = (622 * eHpa) / (1013.25 - 0.378 * eHpa);

  // Aviation Cloud Base in Feet = (T_F - Td_F) / 4.4 * 1000
  const cloudBaseFt = Math.max(0, Math.round(((tempF - dewF) / 4.4) * 1000));
  const cloudBaseM = Math.round(cloudBaseFt * 0.3048);

  const comfort = evaluateComfort(dewF);

  const surfaceTempF = convertFromC(convertToC(surfaceTempInput, unit), "F");
  const paintingRisk = evaluatePaintingRisk(surfaceTempF, dewF);

  return {
    airTempF: parseFloat(tempF.toFixed(1)),
    airTempC: parseFloat(tempC.toFixed(1)),
    airTempK: parseFloat(tempK.toFixed(1)),
    relativeHumidity: rh,
    dewPointF: parseFloat(dewF.toFixed(1)),
    dewPointC: parseFloat(dewC.toFixed(1)),
    dewPointK: parseFloat(dewK.toFixed(1)),
    wetBulbF: parseFloat(wetBulbF.toFixed(1)),
    wetBulbC: parseFloat(wetBulbC.toFixed(1)),
    frostPointF: parseFloat(frostF.toFixed(1)),
    frostPointC: parseFloat(frostC.toFixed(1)),
    actualVaporPressureHpa: parseFloat(eHpa.toFixed(2)),
    actualVaporPressureInHg: parseFloat(eInHg.toFixed(3)),
    saturationVaporPressureHpa: parseFloat(esHpa.toFixed(2)),
    absoluteHumidityGM3: parseFloat(ahGM3.toFixed(2)),
    absoluteHumidityGrainsFt3: parseFloat(ahGrainsFt3.toFixed(2)),
    specificHumidityGKg: parseFloat(specHumGKg.toFixed(2)),
    cloudBaseFt,
    cloudBaseM,
    comfortCategory: comfort.category,
    comfortTitle: comfort.title,
    comfortDescription: comfort.description,
    paintingRisk,
    targetVariable: targetVar,
    model,
  };
}

export function calculateDewPointFromInputs(inputs: Record<string, any>): DewPointResult {
  const temp = Number(inputs.airTemp || inputs.temp || 70);
  const rh = Number(inputs.relativeHumidity || inputs.rh || 65);
  const unit = (inputs.unit as TempUnit) || "F";

  return calculateDewPoint("dew_point", temp, rh, 57.7, unit);
}
