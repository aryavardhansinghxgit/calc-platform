import {
  TempUnit,
  SpeedUnit,
  WeatherModel,
  ActivityMode,
  FrostbiteRiskLevel,
  ClothingRecommendation,
  WindChillResult,
} from "./types";

export function convertTempToF(temp: number, unit: TempUnit): number {
  return unit === "C" ? temp * (9 / 5) + 32 : temp;
}

export function convertTempToC(temp: number, unit: TempUnit): number {
  return unit === "F" ? (temp - 32) * (5 / 9) : temp;
}

export function convertSpeedToMph(speed: number, unit: SpeedUnit): number {
  switch (unit) {
    case "kmh":
      return speed * 0.621371;
    case "ms":
      return speed * 2.23694;
    case "knots":
      return speed * 1.15078;
    default:
      return speed;
  }
}

export function getActivitySpeedOffset(activity: ActivityMode): number {
  switch (activity) {
    case "walking":
      return 3;
    case "running":
      return 8;
    case "cycling":
      return 20;
    default:
      return 0;
  }
}

export function calculateJAGTIWindChillF(tempF: number, windSpeedMph: number): number {
  if (tempF > 50 || windSpeedMph <= 3.0) {
    return tempF;
  }
  const v016 = Math.pow(windSpeedMph, 0.16);
  const wc = 35.74 + 0.6215 * tempF - 35.75 * v016 + 0.4275 * tempF * v016;
  return parseFloat(wc.toFixed(1));
}

export function calculateSteadmanApparentTempC(
  tempC: number,
  windSpeedMs: number,
  humidityPct: number = 50
): number {
  const e = (humidityPct / 100) * 6.105 * Math.exp((17.27 * tempC) / (237.7 + tempC));
  const at = tempC + 0.33 * e - 0.7 * windSpeedMs - 4.0;
  return parseFloat(at.toFixed(1));
}

export function calculateSiplePasselWindChillC(tempC: number, windSpeedMs: number): number {
  if (windSpeedMs <= 1.78) return tempC;
  const v = Math.min(25, windSpeedMs);
  const h = (10.45 + 10 * Math.sqrt(v) - v) * (33 - tempC);
  const wc = 33 - h / 22;
  return parseFloat(wc.toFixed(1));
}

export function evaluateFrostbiteRisk(windChillF: number): {
  risk: FrostbiteRiskLevel;
  text: string;
  minMinutes: number;
} {
  if (windChillF > -18) {
    return {
      risk: "safe",
      text: "Low Risk / Over 60 Minutes (Normal Winter Exposure)",
      minMinutes: 60,
    };
  } else if (windChillF > -32) {
    return {
      risk: "caution",
      text: "Caution: Frostbite Possible Within 30 Minutes",
      minMinutes: 30,
    };
  } else if (windChillF > -49) {
    return {
      risk: "danger",
      text: "Danger: Frostbite Likely Within 10 Minutes",
      minMinutes: 10,
    };
  } else {
    return {
      risk: "extreme",
      text: "EXTREME DANGER: Frostbite Possible in 5 Minutes or Less!",
      minMinutes: 5,
    };
  }
}

export function generateClothingRecommendation(windChillF: number): ClothingRecommendation {
  if (windChillF > 35) {
    return {
      baseLayer: "Light moisture-wicking synthetic or merino shirt.",
      midLayer: "Light fleece jacket or sweater.",
      outerShell: "Softshell or light windbreaker.",
      headHandGear: "Light knit beanie and stretch gloves.",
      footwear: "Standard winter footwear.",
    };
  } else if (windChillF > 15) {
    return {
      baseLayer: "Thermal mid-weight merino wool or polyester base layer.",
      midLayer: "200g fleece jacket or lightweight down vest.",
      outerShell: "Windproof & water-resistant hardshell jacket.",
      headHandGear: "Thermal beanie, neck gaiter, and insulated gloves.",
      footwear: "Insulated waterproof boots with wool socks.",
    };
  } else if (windChillF > -10) {
    return {
      baseLayer: "Heavyweight thermal base layer (tops & bottoms).",
      midLayer: "Heavy down parka or thick fleece sweater.",
      outerShell: "Fully stormproof windproof shell jacket.",
      headHandGear: "Balaclava, heavy fleece beanie, and insulated ski mittens.",
      footwear: "Thermal winter boots rated to -20°F with double wool socks.",
    };
  } else {
    return {
      baseLayer: "Expedition-weight merino base layer (double layer).",
      midLayer: "High-loft 800-fill down parka.",
      outerShell: "Heavy-duty arctic windproof shell with fur hood trim.",
      headHandGear: "Full face balaclava, ski goggles, and extreme arctic mitts.",
      footwear: "Pac boots rated to -40°F with chemical toe warmers.",
    };
  }
}

export function calculateWindChill(
  temp: number = 20,
  tempUnit: TempUnit = "F",
  windSpeed: number = 15,
  speedUnit: SpeedUnit = "mph",
  humidityPct: number = 50,
  model: WeatherModel = "jag_ti",
  activity: ActivityMode = "stationary",
  isWetClothing: boolean = false,
  isVulnerableGroup: boolean = false
): WindChillResult {
  const tempF = convertTempToF(temp, tempUnit);
  const tempC = convertTempToC(temp, tempUnit);

  const baseWindSpeedMph = convertSpeedToMph(windSpeed, speedUnit);
  const activityOffsetMph = getActivitySpeedOffset(activity);
  const effectiveWindSpeedMph = baseWindSpeedMph + activityOffsetMph;
  const effectiveWindSpeedMs = effectiveWindSpeedMph / 2.23694;

  let windChillF = tempF;
  let windChillC = tempC;

  if (model === "steadman") {
    const atC = calculateSteadmanApparentTempC(tempC, effectiveWindSpeedMs, humidityPct);
    windChillC = atC;
    windChillF = convertTempToF(atC, "C");
  } else if (model === "siple_passel") {
    const spC = calculateSiplePasselWindChillC(tempC, effectiveWindSpeedMs);
    windChillC = spC;
    windChillF = convertTempToF(spC, "C");
  } else {
    // Default JAG/TI
    windChillF = calculateJAGTIWindChillF(tempF, effectiveWindSpeedMph);
    windChillC = convertTempToC(windChillF, "F");
  }

  // Risk Vulnerability Offset (Wet clothing or vulnerable groups increase effective cold perception)
  let riskEvalTempF = windChillF;
  let warningNote: string | undefined = undefined;

  if (isWetClothing) {
    riskEvalTempF -= 15; // Wet clothing accelerates conductive heat loss by 25x
    warningNote = "CRITICAL WARNING: Wet clothing accelerates conductive heat loss up to 25x faster, dramatically increasing hypothermia risk!";
  } else if (isVulnerableGroup) {
    riskEvalTempF -= 10; // Children & seniors have lower thermoregulatory reserves
    warningNote = "VULNERABILITY NOTICE: Children and seniors experience faster core body cooling.";
  }

  const frostbiteInfo = evaluateFrostbiteRisk(riskEvalTempF);
  const clothing = generateClothingRecommendation(windChillF);

  const apparentTempC = calculateSteadmanApparentTempC(tempC, effectiveWindSpeedMs, humidityPct);
  const apparentTempF = convertTempToF(apparentTempC, "C");

  return {
    airTempF: parseFloat(tempF.toFixed(1)),
    airTempC: parseFloat(tempC.toFixed(1)),
    windSpeedMph: parseFloat(baseWindSpeedMph.toFixed(1)),
    effectiveWindSpeedMph: parseFloat(effectiveWindSpeedMph.toFixed(1)),
    windChillF: parseFloat(windChillF.toFixed(1)),
    windChillC: parseFloat(windChillC.toFixed(1)),
    apparentTempF: parseFloat(apparentTempF.toFixed(1)),
    apparentTempC: parseFloat(apparentTempC.toFixed(1)),
    frostbiteRisk: frostbiteInfo.risk,
    frostbiteMinutesText: frostbiteInfo.text,
    frostbiteMinutesMin: frostbiteInfo.minMinutes,
    clothing,
    warningNote,
  };
}

export function calculateWindChillFromInputs(inputs: Record<string, any>): WindChillResult {
  const temp = Number(inputs.temperature || inputs.temp || 20);
  const tempUnit = (inputs.tempUnit as TempUnit) || "F";
  const windSpeed = Number(inputs.windSpeed || inputs.speed || 15);
  const speedUnit = (inputs.speedUnit as SpeedUnit) || "mph";

  return calculateWindChill(temp, tempUnit, windSpeed, speedUnit);
}
