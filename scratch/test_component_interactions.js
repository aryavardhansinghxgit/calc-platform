// End-to-end component interaction and state transition validation

function getModelConstants(model) {
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

function convertToC(temp, unit) {
  if (unit === "F") return (temp - 32) * (5 / 9);
  if (unit === "K") return temp - 273.15;
  return temp;
}

function convertFromC(tempC, targetUnit) {
  if (targetUnit === "F") return tempC * (9 / 5) + 32;
  if (targetUnit === "K") return tempC + 273.15;
  return tempC;
}

function calculateSaturationVaporPressureHpa(tempC, model = "alduchov_eskridge") {
  const { a, b } = getModelConstants(model);
  return 6.112 * Math.exp((a * tempC) / (b + tempC));
}

function calculateDewPointC(tempC, rh, model = "alduchov_eskridge") {
  if (rh <= 0) {
    const { b } = getModelConstants(model);
    return -b;
  }
  const { a, b } = getModelConstants(model);
  const rhRatio = rh / 100;
  const gamma = Math.log(rhRatio) + (a * tempC) / (b + tempC);
  return (b * gamma) / (a - gamma);
}

function calculateRHFromDewPoint(tempC, dewC, model = "alduchov_eskridge") {
  const { a, b } = getModelConstants(model);
  const gammaD = (a * dewC) / (b + dewC);
  const gammaT = (a * tempC) / (b + tempC);
  return 100 * Math.exp(gammaD - gammaT);
}

function calculateTempCFromDewPointAndRH(dewC, rh, model = "alduchov_eskridge") {
  if (rh <= 0) return 100;
  const { a, b } = getModelConstants(model);
  const gammaD = (a * dewC) / (b + dewC);
  const term = gammaD - Math.log(rh / 100);
  return (b * term) / (a - term);
}

function calculateStullWetBulbC(tempC, rh) {
  const T = tempC;
  const RH = Math.max(0.01, Math.min(100, rh));
  return (
    T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035
  );
}

function evaluateComfort(dewF) {
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

function evaluatePaintingRisk(surfaceTempF, dewPointF) {
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

function calculateDewPoint(
  targetVar = "dew_point",
  airTempInput = 70,
  rhInput = 65,
  dewPointInput = 57.7,
  unit = "F",
  model = "alduchov_eskridge",
  surfaceTempInput = 75
) {
  if (
    !Number.isFinite(airTempInput) ||
    !Number.isFinite(rhInput) ||
    !Number.isFinite(dewPointInput) ||
    !Number.isFinite(surfaceTempInput)
  ) {
    return {
      isValid: false,
      errorMessage: "Invalid input: all parameters must be finite real numbers.",
      paintingRisk: { isSafeToPaint: false, statusText: "INVALID" }
    };
  }

  let tempC = convertToC(airTempInput, unit);
  let dewC = convertToC(dewPointInput, unit);
  let rh = rhInput;

  if (tempC < -273.15) {
    return { isValid: false, errorMessage: "Air temperature cannot be below absolute zero." };
  }

  if (targetVar === "relative_humidity") {
    if (dewC > tempC + 1e-6) {
      return {
        isValid: false,
        errorMessage: "Dew point cannot exceed air temperature for this atmospheric input.",
        paintingRisk: { isSafeToPaint: false, statusText: "INVALID" }
      };
    }
    rh = calculateRHFromDewPoint(tempC, dewC, model);
  } else if (targetVar === "air_temp") {
    if (rh < 0 || rh > 100) {
      return { isValid: false, errorMessage: "Relative humidity must be between 0% and 100%." };
    }
    tempC = calculateTempCFromDewPointAndRH(dewC, rh, model);
  } else {
    if (rh < 0 || rh > 100) {
      return { isValid: false, errorMessage: "Relative humidity must be between 0% and 100%." };
    }
    dewC = calculateDewPointC(tempC, rh, model);
  }

  const tempF = convertFromC(tempC, "F");
  const tempK = convertFromC(tempC, "K");
  const dewF = convertFromC(dewC, "F");
  const dewK = convertFromC(dewC, "K");

  let wetBulbC = calculateStullWetBulbC(tempC, rh);
  if (rh >= 99.9) wetBulbC = tempC;
  else wetBulbC = Math.max(dewC, Math.min(tempC, wetBulbC));
  const wetBulbF = convertFromC(wetBulbC, "F");

  const esHpa = calculateSaturationVaporPressureHpa(tempC, model);
  const eHpa = esHpa * (rh / 100);
  const ahGM3 = (216.7 * eHpa) / (tempC + 273.15);
  const cloudBaseFt = Math.max(0, Math.round(((tempF - dewF) / 4.4) * 1000));
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
    actualVaporPressureHpa: parseFloat(eHpa.toFixed(2)),
    absoluteHumidityGM3: parseFloat(ahGM3.toFixed(2)),
    cloudBaseFt,
    comfortCategory: comfort.category,
    comfortTitle: comfort.title,
    comfortDescription: comfort.description,
    paintingRisk,
    targetVariable: targetVar,
    model,
  };
}


function runComponentInteractionsTest() {
  console.log("=== RUNNING DEW POINT CALCULATOR COMPONENT LOGIC & INTERACTION TESTS ===");

  // 1. Initial State: Air = 70°F, RH = 65%, Target = dew_point, Unit = F, Model = alduchov_eskridge, Surface = 75°F
  let state = {
    targetVar: "dew_point",
    unit: "F",
    airTemp: 70,
    rh: 65,
    dewPointInput: 57.7,
    model: "alduchov_eskridge",
    surfaceTemp: 75,
  };

  let res = calculateDewPoint(
    state.targetVar,
    state.airTemp,
    state.rh,
    state.dewPointInput,
    state.unit,
    state.model,
    state.surfaceTemp
  );

  console.log("1. Default Golden State Render:");
  console.log(`   Dew Point: ${res.dewPointF}°F (Expected: 57.7°F)`);
  console.log(`   Wet Bulb: ${res.wetBulbF}°F (Expected: 62.0°F)`);
  console.log(`   Absolute Humidity: ${res.absoluteHumidityGM3} g/m³ (Expected: 11.97 g/m³)`);
  console.log(`   Actual Vapor Pressure: ${res.actualVaporPressureHpa} hPa (Expected: 16.25 hPa)`);
  console.log(`   Cloud Base: ${res.cloudBaseFt} ft (Expected: 2,795 ft)`);
  console.log(`   Comfort: ${res.comfortTitle}`);
  console.log(`   Painting Advisory: ${res.paintingRisk.statusText} (Margin: ${res.paintingRisk.marginF}°F)`);

  if (
    Math.abs(res.dewPointF - 57.7) > 0.1 ||
    Math.abs(res.wetBulbF - 62.0) > 0.2 ||
    Math.abs(res.absoluteHumidityGM3 - 11.97) > 0.05 ||
    Math.abs(res.actualVaporPressureHpa - 16.25) > 0.05 ||
    Math.abs(res.cloudBaseFt - 2795) > 2 ||
    !res.paintingRisk.isSafeToPaint
  ) {
    throw new Error("Initial state check failed!");
  }
  console.log("   ✓ Initial Golden State PASSED");

  // 2. Solve Target Tab Switching
  console.log("\n2. Testing Solve Target Tabs:");
  // A. Switch to Humidity target: Air = 70°F, Known Dew Point = 57.7°F -> Solve RH
  state.targetVar = "relative_humidity";
  res = calculateDewPoint(state.targetVar, 70, 65, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   Target 'relative_humidity': Solved RH = ${res.relativeHumidity}% (Expected: ~65%)`);
  if (Math.abs(res.relativeHumidity - 65) > 0.5) throw new Error("Humidity solver failed!");

  // B. Switch to Air Temp target: Known Dew Point = 57.7°F, RH = 65% -> Solve Air Temp
  state.targetVar = "air_temp";
  res = calculateDewPoint(state.targetVar, 70, 65, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   Target 'air_temp': Solved Air Temp = ${res.airTempF}°F (Expected: ~70°F)`);
  if (Math.abs(res.airTempF - 70) > 0.5) throw new Error("Air Temp solver failed!");

  // Return to dew_point
  state.targetVar = "dew_point";
  res = calculateDewPoint(state.targetVar, 70, 65, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   Target 'dew_point' restored: ${res.dewPointF}°F`);
  console.log("   ✓ All 3 Solve Target Tabs PASSED");

  // 3. Unit Toggle: °F -> °C -> K -> °F
  console.log("\n3. Testing Temperature Unit Toggle (°F -> °C -> K -> °F):");
  // In °C: 70°F is 21.1111°C, 57.7°F is 14.28°C
  res = calculateDewPoint("dew_point", 21.1111, 65, 14.2756, "C", "alduchov_eskridge", 23.8889);
  console.log(`   Unit 'C': Dew Point = ${res.dewPointC}°C (Expected: ~14.3°C)`);
  if (Math.abs(res.dewPointC - 14.3) > 0.1) throw new Error("Celsius unit failed!");

  // In K: 70°F is 294.2611 K
  res = calculateDewPoint("dew_point", 294.2611, 65, 287.4256, "K", "alduchov_eskridge", 297.0389);
  console.log(`   Unit 'K': Dew Point = ${res.dewPointK} K (Expected: ~287.43 K)`);
  if (Math.abs(res.dewPointK - 287.43) > 0.2) throw new Error("Kelvin unit failed!");

  console.log("   ✓ Unit Toggling PASSED (No numerical distortion)");

  // 4. Model Selector Switching
  console.log("\n4. Testing Psychrometric Model Selector:");
  const models = ["alduchov_eskridge", "magnus_tetens", "buck", "sonntag"];
  for (const m of models) {
    const mRes = calculateDewPoint("dew_point", 70, 65, 57.7, "F", m, 75);
    console.log(`   Model '${m}': Td = ${mRes.dewPointF}°F, VP = ${mRes.actualVaporPressureHpa} hPa`);
    if (Math.abs(mRes.dewPointF - 57.7) > 1.0) throw new Error(`Model ${m} out of bounds!`);
  }
  console.log("   ✓ Model Switching PASSED");

  // 5. Surface Temperature & ISO 8502-4 Painting Advisory
  console.log("\n5. Testing ISO 8502-4 Painting Check:");
  // A. Safe (75°F - 57.7°F = 17.3°F margin)
  let coat = calculateDewPoint("dew_point", 70, 65, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   Substrate 75°F: Margin = ${coat.paintingRisk.marginF}°F -> Safe = ${coat.paintingRisk.isSafeToPaint}`);
  if (!coat.paintingRisk.isSafeToPaint) throw new Error("75°F substrate should be safe!");

  // B. High Risk (60°F - 57.7°F = 2.3°F margin < 5°F)
  coat = calculateDewPoint("dew_point", 70, 65, 57.7, "F", "alduchov_eskridge", 60);
  console.log(`   Substrate 60°F: Margin = ${coat.paintingRisk.marginF}°F -> Status = ${coat.paintingRisk.statusText}`);
  if (coat.paintingRisk.isSafeToPaint || !coat.paintingRisk.statusText.includes("HIGH RISK")) {
    throw new Error("60°F substrate should trigger HIGH RISK!");
  }

  // C. Condensation (55°F - 57.7°F = -2.7°F margin <= 0)
  coat = calculateDewPoint("dew_point", 70, 65, 57.7, "F", "alduchov_eskridge", 55);
  console.log(`   Substrate 55°F: Margin = ${coat.paintingRisk.marginF}°F -> Status = ${coat.paintingRisk.statusText}`);
  if (coat.paintingRisk.isSafeToPaint || !coat.paintingRisk.statusText.includes("CONDENSATION RISK")) {
    throw new Error("55°F substrate should trigger CONDENSATION RISK!");
  }
  console.log("   ✓ ISO 8502-4 Painting Advisory Logic PASSED");

  // 6. Invalid Input Tests
  console.log("\n6. Testing Invalid Atmospheric & Numeric Inputs:");
  // A. Td > Tair under Humidity target
  let inv = calculateDewPoint("relative_humidity", 70, 65, 80, "F", "alduchov_eskridge", 75);
  console.log(`   Td (80°F) > Tair (70°F): isValid = ${inv.isValid}, Error = "${inv.errorMessage}"`);
  if (inv.isValid || inv.errorMessage !== "Dew point cannot exceed air temperature for this atmospheric input.") {
    throw new Error("Td > Tair was not rejected properly!");
  }

  // B. RH < 0
  inv = calculateDewPoint("dew_point", 70, -5, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   RH = -5%: isValid = ${inv.isValid}, Error = "${inv.errorMessage}"`);
  if (inv.isValid) throw new Error("Negative RH was not rejected!");

  // C. RH > 100
  inv = calculateDewPoint("dew_point", 70, 105, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   RH = 105%: isValid = ${inv.isValid}, Error = "${inv.errorMessage}"`);
  if (inv.isValid) throw new Error("RH > 100% was not rejected!");

  // D. NaN inputs
  inv = calculateDewPoint("dew_point", NaN, 65, 57.7, "F", "alduchov_eskridge", 75);
  console.log(`   NaN Air Temp: isValid = ${inv.isValid}, Error = "${inv.errorMessage}"`);
  if (inv.isValid) throw new Error("NaN was not rejected!");

  console.log("   ✓ Invalid Inputs & Physical Constraint Enforcement PASSED");

  // 7. Heat-Map Active Cell Tracking
  console.log("\n7. Testing Heat-Map Active Cell Selection:");
  const activeT = 70;
  const activeRH = 60;
  const activeRes = calculateDewPoint("dew_point", activeT, activeRH, 57.7, "F");
  // For each cell in the 5x7 matrix, check if active cell is correctly identified
  const matrixTemps = [60, 70, 80, 90, 100];
  const matrixRHs = [30, 40, 50, 60, 70, 80, 90];
  let highlightedCount = 0;
  let activeCoord = null;

  for (const rhVal of matrixRHs) {
    for (const tF of matrixTemps) {
      const isUserCell =
        Math.abs(activeRes.airTempF - tF) <= 4.9 &&
        Math.abs(activeRes.relativeHumidity - rhVal) <= 5.0;
      if (isUserCell) {
        highlightedCount++;
        activeCoord = { tF, rhVal };
      }
    }
  }
  console.log(`   At T=70°F, RH=60%: Exactly ${highlightedCount} active cell highlighted at ${JSON.stringify(activeCoord)}`);
  if (highlightedCount !== 1 || activeCoord.tF !== 70 || activeCoord.rhVal !== 60) {
    throw new Error("Active cell tracking failed!");
  }
  console.log("   ✓ Heat-Map Active Cell Selection PASSED");

  console.log("\n>>> ALL COMPONENT & INTERACTION CHECKS PASSED! <<<");
}

runComponentInteractionsTest();
