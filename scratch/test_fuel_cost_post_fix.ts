import {
  calculateFuelCost,
  convertMPGToL100km,
  convertL100kmToMPG,
} from "../src/app/calculators/fuel-cost-calculator/calculator";

// Simple smoke test for post-fix
const res = calculateFuelCost("trip", "imperial", "gasoline", 300, false, 25, 3.5);
console.log("Fuel Cost Smoke Test:", res.totalCost === 42 ? "PASS" : "FAIL");
