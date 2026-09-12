import { calculateMileage, getIRSReimbursementRate } from "../src/app/calculators/mileage-calculator/calculator";
import { LegInput, MileageCalcMode, UnitSystem } from "../src/app/calculators/mileage-calculator/types";

console.log("=== RUNNING MILEAGE ENGINE PRE-AUDIT ===");

// 1. Golden Case 1: Fuel Mileage (US MPG)
const gc1 = calculateMileage("fuel_mileage", "us_imperial", 350, 11.5, 3.50);
console.log("\n[GC1] Fuel Mileage 350 mi / 11.5 gal @ $3.50:");
console.log("  primaryValue:", gc1.primaryValue, "expected ~ 30.4");
console.log("  usMpg:", gc1.usMpg, "expected 30.4 (raw: 30.43478)");
console.log("  litersPer100km:", gc1.litersPer100km, "expected 7.73");
console.log("  ukMpg:", gc1.ukMpg, "expected 36.6");
console.log("  totalFuelCost:", gc1.totalFuelCost, "expected 40.25");
console.log("  costPerDistance:", gc1.costPerDistance, "expected 0.11 or 0.12");
console.log("  distancePerDollar:", gc1.distancePerDollar, "expected 8.7");

// 2. Golden Case 3: Multi-Leg (IN Metric km/l)
const gc3Legs: LegInput[] = [
  { id: "1", distance: 320, fuel: 10.5, pricePerUnit: 96.72 },
  { id: "2", distance: 340, fuel: 11.0, pricePerUnit: 96.72 }
];
const gc3 = calculateMileage(
  "multi_leg",
  "indian_metric",
  350, 11.5, 3.50,
  false, 0, 0,
  0, "business", undefined,
  gc3Legs
);
console.log("\n[GC3 & GC4] Multi-Leg (660 km, 21.5 L @ ₹96.72):");
console.log("  totalDistance:", gc3.totalDistance, "expected 660");
console.log("  totalFuelUsed:", gc3.totalFuelUsed, "expected 21.5");
console.log("  kmPerLiter:", gc3.kmPerLiter, "expected 30.70 (30.69767)");
console.log("  litersPer100km:", gc3.litersPer100km, "expected 3.26");
console.log("  totalFuelCost:", gc3.totalFuelCost, "expected 2079.48");

// 3. Golden Case 5: IRS Tax Claim
const gc5 = calculateMileage(
  "tax_reimbursement",
  "us_imperial",
  0, 0, 0,
  false, 0, 0,
  450, "business", 0.67
);
console.log("\n[GC5] IRS Tax Claim 450 mi @ $0.67:");
console.log("  taxReimbursementAmount:", gc5.taxReimbursementAmount, "expected 301.50");
console.log("  primaryValue:", gc5.primaryValue, "expected 301.50");

// Test rate = 0
const gc5_zeroRate = calculateMileage(
  "tax_reimbursement",
  "us_imperial",
  0, 0, 0,
  false, 0, 0,
  450, "business", 0
);
console.log("[GC5 Rate=0] taxReimbursementAmount with customRate=0:", gc5_zeroRate.taxReimbursementAmount, "rate used:", gc5_zeroRate.reimbursementRatePerMile, "expected $0.00 rate=0");

// 4. Golden Case 6: EV & MPGe
const gc6 = calculateMileage(
  "ev_mpge",
  "us_imperial",
  0, 0, 0,
  false, 0, 0,
  0, "business", undefined,
  [],
  240, 75, 0.16
);
console.log("\n[GC6] EV 240 mi / 75 kWh @ $0.16:");
console.log("  mpge:", gc6.mpge, "expected 107.8 (raw 107.84)");
console.log("  totalFuelCost:", gc6.totalFuelCost, "expected 12.00");
console.log("  costPerDistance:", gc6.costPerDistance, "expected 0.05");
console.log("  distancePerDollar:", gc6.distancePerDollar, "expected 20.00");

// 5. Golden Case 7: EV with 15% modifier
const gc7 = calculateMileage(
  "ev_mpge",
  "us_imperial",
  0, 0, 0,
  false, 0, 0,
  0, "business", undefined,
  [],
  240, 75, 0.16,
  12000,
  { cityDriving: true, towing: false, aggressiveDriving: false, coldWeather: false }
);
console.log("\n[GC7] EV + 15% city modifier:");
console.log("  mpge:", gc7.mpge, "expected 93.8 (raw 93.772)");

// 6. Test Zero Fuel Volume Bug
const zeroFuel = calculateMileage("fuel_mileage", "us_imperial", 350, 0, 3.50);
console.log("\n[ANOMALY CHECK 1: Zero Fuel]");
console.log("  totalFuelUsed for input 0:", zeroFuel.totalFuelUsed);
console.log("  usMpg for fuel=0:", zeroFuel.usMpg, "-> SILENT CLAMP to 0.1! Yields", zeroFuel.usMpg, "MPG!");

// 7. Test Reversed Odometer Readings
const revOdo = calculateMileage("fuel_mileage", "us_imperial", 0, 10, 3.50, true, 12360, 12000);
console.log("\n[ANOMALY CHECK 2: Reversed Odometer (start=12360, end=12000)]");
console.log("  totalDistance:", revOdo.totalDistance, "-> SILENT CLAMP to 0!");

// 8. Multi-Leg Empty State
const emptyLegs = calculateMileage("multi_leg", "us_imperial", 0, 0, 0, false, 0, 0, 0, "business", undefined, []);
console.log("\n[ANOMALY CHECK 3: Multi-Leg Empty State]");
console.log("  totalDistance:", emptyLegs.totalDistance, "totalFuelUsed:", emptyLegs.totalFuelUsed, "usMpg:", emptyLegs.usMpg);
