import { calculateGasMileage } from "../src/app/calculators/gas-mileage-calculator/calculator";

async function main() {
  console.log("--- AUDITING SSR PAGE ---");
  const res = await fetch("http://localhost:3000/calculators/gas-mileage-calculator");
  console.log("HTTP status:", res.status);
  const html = await res.text();

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log("Title:", titleMatch ? titleMatch[1] : "NONE");

  // H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`H1 #${i + 1}:`, h.replace(/<[^>]*>/g, "").trim()));

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NONE");

  // Corrupt tokens
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  for (const token of ["NaN", "Infinity", "undefined", "null"]) {
    const matches = cleanHtml.match(new RegExp(`\\b${token}\\b`, "g"));
    console.log(`Corrupt '${token}' count in visible HTML:`, matches ? matches.length : 0);
  }

  console.log("\n--- AUDITING GOLDEN CASES IN ENGINE ---");
  // Golden Case 1: Odometer Log
  // Start = 12000, End = 12360, Fuel = 12 gal, Price = $3.50, Annual = 15000, Tank = 15 gal
  const gc1 = calculateGasMileage("odometer", "us", "gasoline", 12000, 12360, 360, 12, 3.5, 15, 15000);
  console.log("Golden Case 1 (Odometer US):");
  console.log("  usMPG:", gc1.usMPG, "(expected: 30)");
  console.log("  l100km:", gc1.l100km, "(expected: ~7.84)");
  console.log("  kmL:", gc1.kmL, "(expected: ~12.75 / 12.8)");
  console.log("  costPerDistanceUnit:", gc1.costPerDistanceUnit, "(expected: $0.12)");
  console.log("  distancePerCurrencyUnit:", gc1.distancePerCurrencyUnit, "(expected: 8.6)");
  console.log("  totalTankRange:", gc1.totalTankRange, "(expected: 450)");
  console.log("  costToFillTank:", gc1.costToFillTank, "(expected: $52.50)");
  console.log("  annualFuelCost:", gc1.annualFuelCost, "(expected: $1750)");
  console.log("  carbonFootprintTons:", gc1.carbonFootprintTons, "(expected: ~4.44)");

  // Golden Case 2: Multi-Tank Log
  // Tank 1: 340 mi, 11.8 gal, $3.45
  // Tank 2: 355 mi, 12.1 gal, $3.52
  // Tank 3: 330 mi, 11.5 gal, $3.48
  const multiTanks = [
    { id: 1, distance: 340, fuelAdded: 11.8, pricePerUnit: 3.45 },
    { id: 2, distance: 355, fuelAdded: 12.1, pricePerUnit: 3.52 },
    { id: 3, distance: 330, fuelAdded: 11.5, pricePerUnit: 3.48 },
  ];
  const gc2 = calculateGasMileage("multi_tank", "us", "gasoline", 0, 0, 0, 0, 3.5, 15, 15000, multiTanks);
  console.log("\nGolden Case 2 (Multi-Tank US):");
  console.log("  Weighted MPG:", gc2.usMPG, "(expected: 28.9548... -> 29.0)");
  console.log("  effectiveMPG:", gc2.effectiveMPG);
  console.log("  costPerDistanceUnit:", gc2.costPerDistanceUnit);

  // Golden Case 3: Single Trip Indian Mode
  // Distance = 360 km, Fuel = 12 L, Price = ₹96.72, Annual = 15000 km, Tank = 15 L
  const gc3 = calculateGasMileage("trip", "indian", "gasoline", 0, 0, 360, 12, 96.72, 15, 15000);
  console.log("\nGolden Case 3 (Indian Single Trip):");
  console.log("  kmL:", gc3.kmL, "(expected: 30 km/L)");
  console.log("  l100km:", gc3.l100km, "(expected: 3.333... L/100km)");
  console.log("  usMPG equivalent:", gc3.usMPG, "(expected: ~70.56 US MPG)");
  console.log("  costPerDistanceUnit:", gc3.costPerDistanceUnit, "(expected: ₹3.22/km)");
  console.log("  totalTankRange:", gc3.totalTankRange, "(expected: 450 km)");
  console.log("  costToFillTank:", gc3.costToFillTank, "(expected: ₹1,450.80)");
  console.log("  annualFuelCost:", gc3.annualFuelCost, "(expected: ₹48,360)");
  console.log("  carbonFootprintTons:", gc3.carbonFootprintTons, "(expected: 1.17 Tons)");

  // Edge cases
  console.log("\n--- AUDITING EDGE CASES ---");
  // 1. Reversed odometer
  const rev = calculateGasMileage("odometer", "us", "gasoline", 12360, 12000, 360, 12, 3.5);
  console.log("Reversed Odometer (End < Start):", "distance:", rev.totalTankRange, "MPG:", rev.usMPG);

  // 2. Zero fuel
  const zeroFuel = calculateGasMileage("trip", "us", "gasoline", 0, 0, 360, 0, 3.5);
  console.log("Zero fuel added with 360 distance:", "MPG:", zeroFuel.usMPG);

  // 3. Zero distance
  const zeroDist = calculateGasMileage("trip", "us", "gasoline", 0, 0, 0, 12, 3.5);
  console.log("Zero distance with 12 fuel:", "MPG:", zeroDist.usMPG);

  // 4. Zero fuel price
  const zeroPrice = calculateGasMileage("trip", "us", "gasoline", 0, 0, 360, 12, 0);
  console.log("Zero price:", "costPerDistanceUnit:", zeroPrice.costPerDistanceUnit, "annualCost:", zeroPrice.annualFuelCost);

  // 5. Zero annual mileage
  const zeroAnnual = calculateGasMileage("trip", "us", "gasoline", 0, 0, 360, 12, 3.5, 15, 0);
  console.log("Zero annual mileage input:", "annualFuelCost:", zeroAnnual.annualFuelCost, "annualFuelVol:", zeroAnnual.annualFuelVolume);
}

main().catch(console.error);
