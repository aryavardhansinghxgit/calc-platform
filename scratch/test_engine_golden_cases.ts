import { calculateEngineHorsepower, calculateSAECorrectionFactor } from "../src/app/calculators/engine-horsepower-calculator/calculator";

console.log("=== GOLDEN CASES INDEPENDENT VERIFICATION ===");

// 1. Golden Case — Torque / RPM
const g1 = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, 400, "lbft", 5252);
console.log("1. 400 lb-ft @ 5252 RPM:", {
  crankBHP: g1.crankBHP, // Expected 400
  wheelWHP: g1.wheelWHP, // Expected 344
  kilowatts: g1.kilowatts, // Expected 298.3
  metricPS: g1.metricPS, // Expected 406
});

// 2. Exact 5,252.113 Intersection
const g2_400 = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, 400, "lbft", 5252.113122);
const g2_200 = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, 200, "lbft", 5252.113122);
const g2_600 = calculateEngineHorsepower("torque_rpm", "rwd_manual", "fox", 12, 115, 3500, 180, 600, "lbft", 5252.113122);
console.log("2. Exact 5252.113 intersections:", {
  at400: g2_400.crankBHP, // Expected 400
  at200: g2_200.crankBHP, // Expected 200
  at600: g2_600.crankBHP, // Expected 600
});

// 3. 3500 lb / 12 sec Hale
const g3_hale = calculateEngineHorsepower("et_mode", "rwd_manual", "hale", 12, 115, 3500, 0);
console.log("3. 3500 lb / 12 sec Hale:", {
  crankBHP: g3_hale.crankBHP, // Expected ~400
});

// 4. 3500 lb / 12 sec Fox
const g4_fox = calculateEngineHorsepower("et_mode", "rwd_manual", "fox", 12, 115, 3500, 0);
console.log("4. 3500 lb / 12 sec Fox:", {
  crankBHP: g4_fox.crankBHP, // Expected ~377
});

// 5. 3500 lb / 114 mph Fox
const g5_trap = calculateEngineHorsepower("trap_speed", "rwd_manual", "fox", 12, 114, 3500, 0);
console.log("5. 3500 lb / 114 mph:", {
  crankBHP: g5_trap.crankBHP, // Expected ~405
});

// 6. 3500 lb / 4.2 sec 0-60 RWD Auto
const g6_060 = calculateEngineHorsepower("zero_to_sixty", "rwd_auto", "fox", 12, 115, 3500, 0, 400, "lbft", 5252, 5, 10, 85, 9.5, undefined, 4.2);
console.log("6. 3500 lb / 4.2 sec (0-60):", {
  crankBHP: g6_060.crankBHP, // Expected ~1503
  wheelWHP: g6_060.wheelWHP, // Expected ~1240
});

// 7. Boost & CC: 5 L / 10 PSI / 85% VE / 9.5 CR
const g7_boost = calculateEngineHorsepower("displacement_boost", "rwd_manual", "fox", 12, 115, 3500, 0, 400, "lbft", 5252, 5.0, 10, 85, 9.5);
console.log("7. 5L / 10 PSI / 85% VE / 9.5 CR:", {
  crankBHP: g7_boost.crankBHP, // Expected ~960
  effectiveCR: g7_boost.effectiveCompressionRatio, // Expected ~12.31
  airflowCFM: g7_boost.airflowCFM,
});

// 8. SAE Reference: 77°F / 29.92 inHg
const cf = calculateSAECorrectionFactor({ enabled: true, tempF: 77, pressureInHg: 29.92, humidityPercent: 0 });
console.log("8. SAE 77°F / 29.92 inHg:", {
  cf, // Expected 1.000
});
