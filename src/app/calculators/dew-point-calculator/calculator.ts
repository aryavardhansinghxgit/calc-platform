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

/**
 * Saturation vapor pressure in hPa over liquid water using the selected model.
 * Full IEEE 754 precision.
 */
export function calculateSaturationVaporPressureHpa(
  tempC: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  const { a, b } = getModelConstants(model);
  return 6.112 * Math.exp((a * tempC) / (b + tempC));
}

/**
 * Calculates Dew Point in °C from air temperature (°C) and Relative Humidity (0-100%)
 * using the Alduchov & Eskridge (1996) improved empirical Magnus approximation.
 * Note: While high-precision over meteorological bounds (-40°C to 50°C), this is an
 * empirical approximation and not a universal exact thermodynamic equation.
 * Full IEEE 754 precision internally.
 */
export function calculateDewPointC(
  tempC: number,
  rh: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  if (rh <= 0) {
    const { b } = getModelConstants(model);
    return -b; // theoretical limit as RH -> 0
  }
  const { a, b } = getModelConstants(model);
  const rhRatio = rh / 100;
  const gamma = Math.log(rhRatio) + (a * tempC) / (b + tempC);
  return (b * gamma) / (a - gamma);
}

/**
 * Inverts Dew Point (°C) and Air Temperature (°C) to find Relative Humidity (%).
 * Analytical inverse of calculateDewPointC. Full IEEE 754 precision.
 */
export function calculateRHFromDewPoint(
  tempC: number,
  dewC: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  const { a, b } = getModelConstants(model);
  const gammaD = (a * dewC) / (b + dewC);
  const gammaT = (a * tempC) / (b + tempC);
  return 100 * Math.exp(gammaD - gammaT);
}

/**
 * Inverts Dew Point (°C) and Relative Humidity (%) to find Air Temperature (°C).
 * Analytical inverse of calculateDewPointC. Full IEEE 754 precision.
 */
export function calculateTempCFromDewPointAndRH(
  dewC: number,
  rh: number,
  model: PsychrometricModel = "alduchov_eskridge"
): number {
  if (rh <= 0) return 100;
  const { a, b } = getModelConstants(model);
  const gammaD = (a * dewC) / (b + dewC);
  const term = gammaD - Math.log(rh / 100);
  return (b * term) / (a - term);
}

/**
 * Wet-bulb temperature in °C estimated via the Stull (2011) empirical approximation.
 * Methodology Note: Wet-bulb temperature is estimated using the Stull (2011) empirical
 * approximation, developed for standard sea-level pressure. The published approximation is
 * intended for roughly -20°C to 50°C and 5% to 99% RH, with larger errors possible outside
 * or near the edges of its validated conditions. It is not an exact psychrometric instrument
 * measurement.
 */
export function calculateStullWetBulbC(tempC: number, rh: number): number {
  const T = tempC;
  const RH = Math.max(0.01, Math.min(100, rh));

  const tw =
    T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035;

  return tw;
}

/**
 * Evaluates human comfort ("Muggy Index") from dew point in °F.
 * Strict boundary conditions with zero gaps:
 * < 50: Dry / Crisp / Refreshing
 * [50, 60): Comfortable / Optimal (e.g. 59.9°F)
 * [60, 65): Noticeably Humid ('Sticky') (e.g. 64.9°F)
 * [65, 70): Uncomfortable / Muggy / Oppressive (e.g. 69.9°F)
 * >= 70: Severe Heat Stress / Tropical
 */
export function evaluateComfort(dewF: number): {
  category: ComfortCategory;
  title: string;
  description: string;
} {
  if (dewF < 50) {
    return {
      category: "dry",
      title: "Dry / Crisp / Refreshing",
      description: "Low atmospheric moisture. Air feels fresh and crisp; skin and mucous membranes may dry during prolonged exposure.",
    };
  } else if (dewF < 60) {
    return {
      category: "comfortable",
      title: "Comfortable / Optimal",
      description: "Ideal atmospheric humidity balance for human comfort, indoor thermal standards (ASHRAE 55), and physical activity.",
    };
  } else if (dewF < 65) {
    return {
      category: "sticky",
      title: "Noticeably Humid ('Sticky')",
      description: "Moisture becomes noticeable on skin during exertion. Evaporative sweat cooling begins to slow down.",
    };
  } else if (dewF < 70) {
    return {
      category: "muggy",
      title: "Uncomfortable / Muggy / Oppressive",
      description: "Sweat evaporation is significantly restricted. Air feels heavy, thick, and oppressive with elevated cardiovascular demand.",
    };
  } else {
    return {
      category: "severe_stress",
      title: "Severe Heat Stress / Tropical",
      description: "HIGH HAZARD: Severe thermal stress. Evaporative cooling largely fails; dangerous conditions for strenuous outdoor labor.",
    };
  }
}

/**
 * Evaluates coating condensation risk against a 5°F (approx. 2.8°C) screening benchmark.
 * Note: This calculation serves solely as a conservative thermal screening benchmark for condensation risk.
 * It is not a declaration of ISO 8502-4 compliance or a substitute for the coating manufacturer's application
 * requirements, surface cleanliness (ISO 8501-1), or professional site-specific inspection.
 */
export function evaluatePaintingRisk(
  surfaceTempF: number,
  dewPointF: number
): PaintingRiskAdvice {
  const marginF = surfaceTempF - dewPointF;
  const marginC = marginF * (5 / 9);

  if (marginF <= 0) {
    return {
      isSafeToPaint: false,
      marginF: parseFloat(marginF.toFixed(1)),
      marginC: parseFloat(marginC.toFixed(1)),
      statusText: "CONDENSATION RISK: Surface at or below dew point",
      recommendation:
        "Condensation risk detected. Substrate surface temperature is at or below the calculated dew point. Moisture condensation is active or imminent on the surface.",
    };
  } else if (marginF < 5) {
    return {
      isSafeToPaint: false,
      marginF: parseFloat(marginF.toFixed(1)),
      marginC: parseFloat(marginC.toFixed(1)),
      statusText: "HIGH RISK / BELOW SELECTED 5°F SCREENING MARGIN",
      recommendation:
        "Substrate temperature is above dew point but fails to satisfy the selected 5°F (approx. 2.8°C) screening margin, indicating elevated risk of localized micro-condensation.",
    };
  } else {
    return {
      isSafeToPaint: true,
      marginF: parseFloat(marginF.toFixed(1)),
      marginC: parseFloat(marginC.toFixed(1)),
      statusText: "SCREENING CONDITION SATISFIED (5°F Margin)",
      recommendation:
        "5°F surface-to-dew-point screening margin satisfied. This conservative screening benchmark indicates lower moisture condensation risk. It is not a declaration of ISO 8502-4 compliance or a substitute for manufacturer application requirements or job-site inspection.",
    };
  }
}

function createInvalidResult(
  errorMessage: string,
  targetVar: TargetVariable,
  model: PsychrometricModel
): DewPointResult {
  return {
    isValid: false,
    errorMessage,
    airTempF: 0,
    airTempC: 0,
    airTempK: 0,
    relativeHumidity: 0,
    dewPointF: 0,
    dewPointC: 0,
    dewPointK: 0,
    wetBulbF: 0,
    wetBulbC: 0,
    frostPointF: 0,
    frostPointC: 0,
    actualVaporPressureHpa: 0,
    actualVaporPressureInHg: 0,
    saturationVaporPressureHpa: 0,
    absoluteHumidityGM3: 0,
    absoluteHumidityGrainsFt3: 0,
    specificHumidityGKg: 0,
    cloudBaseFt: 0,
    cloudBaseM: 0,
    comfortCategory: "dry",
    comfortTitle: "Invalid State",
    comfortDescription: errorMessage,
    paintingRisk: {
      isSafeToPaint: false,
      marginF: 0,
      marginC: 0,
      statusText: "INVALID INPUT",
      recommendation: errorMessage,
    },
    targetVariable: targetVar,
    model,
  };
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
  // 1. Strict numeric sanity validation
  if (
    !Number.isFinite(airTempInput) ||
    !Number.isFinite(rhInput) ||
    !Number.isFinite(dewPointInput) ||
    !Number.isFinite(surfaceTempInput)
  ) {
    return createInvalidResult("Invalid input: all parameters must be finite real numbers.", targetVar, model);
  }

  let tempC = convertToC(airTempInput, unit);
  let dewC = convertToC(dewPointInput, unit);
  let rh = rhInput;

  // Domain checks
  if (tempC < -273.15) {
    return createInvalidResult("Air temperature cannot be below absolute zero (-273.15°C / -459.67°F).", targetVar, model);
  }

  if (targetVar === "relative_humidity") {
    if (dewC < -273.15) {
      return createInvalidResult("Dew point cannot be below absolute zero (-273.15°C / -459.67°F).", targetVar, model);
    }
    // Physical relationship: dew point cannot exceed air temperature
    if (dewC > tempC + 1e-6) {
      return createInvalidResult(
        "Dew point cannot exceed air temperature for this atmospheric input.",
        targetVar,
        model
      );
    }
    rh = calculateRHFromDewPoint(tempC, dewC, model);
    if (rh > 100) rh = 100;
    if (rh < 0) rh = 0;
  } else if (targetVar === "air_temp") {
    if (rh < 0 || rh > 100) {
      return createInvalidResult("Relative humidity must be between 0% and 100%.", targetVar, model);
    }
    if (rh === 0) {
      return createInvalidResult(
        "At 0% relative humidity, moisture content is zero and air temperature cannot be determined from dew point.",
        targetVar,
        model
      );
    }
    tempC = calculateTempCFromDewPointAndRH(dewC, rh, model);
  } else {
    // targetVar === "dew_point"
    if (rh < 0 || rh > 100) {
      return createInvalidResult("Relative humidity must be between 0% and 100%.", targetVar, model);
    }
    if (rh === 0) {
      dewC = -243.04; // theoretical limit as rh -> 0
    } else {
      dewC = calculateDewPointC(tempC, rh, model);
    }
  }

  // Preserve full precision in raw metrics
  const rawAirTempC = tempC;
  const rawDewPointC = dewC;
  const rawRH = rh;

  const tempF = convertFromC(tempC, "F");
  const tempK = convertFromC(tempC, "K");

  const dewF = convertFromC(dewC, "F");
  const dewK = convertFromC(dewC, "K");

  // Wet-bulb calculation
  const rawWetBulbC = calculateStullWetBulbC(tempC, rh);
  // Guarantee physical bounds: Td <= Tw <= Tair for unsaturated air
  let wetBulbC = rawWetBulbC;
  if (rh >= 99.9) {
    wetBulbC = tempC;
  } else {
    wetBulbC = Math.max(dewC, Math.min(tempC, wetBulbC));
  }
  const wetBulbF = convertFromC(wetBulbC, "F");

  // Frost point calculation
  // Over ice: Magnus formula for saturation over ice (Sonntag 1990)
  let frostC = dewC;
  if (tempC < 0 || dewC < 0) {
    const a_ice = 22.46;
    const b_ice = 272.62;
    const es = calculateSaturationVaporPressureHpa(tempC, model);
    const e = Math.max(1e-6, es * (rh / 100));
    const gammaIce = Math.log(e / 6.112);
    frostC = (b_ice * gammaIce) / (a_ice - gammaIce);
  }
  const frostF = convertFromC(frostC, "F");

  // Vapor Pressures
  const rawEsHpa = calculateSaturationVaporPressureHpa(tempC, model);
  const rawEHpa = rawEsHpa * (rh / 100);
  const eInHg = rawEHpa * 0.0295299830714;

  // Absolute Humidity in g/m³ = 216.7 * e / (T + 273.15)
  const rawAhGM3 = (216.7 * rawEHpa) / (tempC + 273.15);
  const ahGrainsFt3 = rawAhGM3 * 0.4369957;

  // Specific humidity g/kg approx = 622 * e / (1013.25 - 0.378 * e)
  const specHumGKg = (622 * rawEHpa) / Math.max(1, 1013.25 - 0.378 * rawEHpa);

  // Aviation Cumulus Cloud Base in Feet = (T_F - Td_F) / 4.4 * 1000
  const cloudBaseFt = Math.max(0, Math.round(((tempF - dewF) / 4.4) * 1000));
  const cloudBaseM = Math.round(cloudBaseFt * 0.3048);

  const comfort = evaluateComfort(dewF);

  const surfaceTempF = convertFromC(convertToC(surfaceTempInput, unit), "F");
  const paintingRisk = evaluatePaintingRisk(surfaceTempF, dewF);

  return {
    isValid: true,
    airTempF: parseFloat(tempF.toFixed(1)),
    airTempC: parseFloat(tempC.toFixed(1)),
    airTempK: parseFloat(tempK.toFixed(2)),
    relativeHumidity: parseFloat(rh.toFixed(1)),
    dewPointF: parseFloat(dewF.toFixed(1)),
    dewPointC: parseFloat(dewC.toFixed(1)),
    dewPointK: parseFloat(dewK.toFixed(2)),
    wetBulbF: parseFloat(wetBulbF.toFixed(1)),
    wetBulbC: parseFloat(wetBulbC.toFixed(1)),
    frostPointF: parseFloat(frostF.toFixed(1)),
    frostPointC: parseFloat(frostC.toFixed(1)),
    actualVaporPressureHpa: parseFloat(rawEHpa.toFixed(2)),
    actualVaporPressureInHg: parseFloat(eInHg.toFixed(3)),
    saturationVaporPressureHpa: parseFloat(rawEsHpa.toFixed(2)),
    absoluteHumidityGM3: parseFloat(rawAhGM3.toFixed(2)),
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
    raw: {
      airTempC: rawAirTempC,
      dewPointC: rawDewPointC,
      relativeHumidity: rawRH,
      wetBulbC: rawWetBulbC,
      actualVaporPressureHpa: rawEHpa,
      saturationVaporPressureHpa: rawEsHpa,
      absoluteHumidityGM3: rawAhGM3,
    },
  };
}

export function calculateDewPointFromInputs(inputs: Record<string, any>): DewPointResult {
  const temp = Number(inputs.airTemp ?? inputs.temp ?? 70);
  const rh = Number(inputs.relativeHumidity ?? inputs.rh ?? 65);
  const unit = (inputs.unit as TempUnit) || "F";
  const model = (inputs.model as PsychrometricModel) || "alduchov_eskridge";
  const surfaceTemp = Number(inputs.surfaceTemp ?? 75);

  return calculateDewPoint("dew_point", temp, rh, 57.7, unit, model, surfaceTemp);
}
