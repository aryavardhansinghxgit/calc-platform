import {
  calculateGravelCost,
  calculateMultiZoneGravel,
  calculateDrainageTrench,
  GravelType,
  GravelShape,
} from "../src/lib/calculator-engine/formulas/gravel";

console.log("=== RANDOMIZED TESTING FOR COST, MULTI-ZONE, AND FRENCH DRAIN ===");

// 1. Cost test (2,000 cases)
let costPass = 0;
let costFail = 0;
for (let i = 0; i < 2000; i++) {
  const tons = Math.random() * 500 + 0.1;
  const yds = Math.random() * 300 + 0.1;
  const price = Math.random() * 100 + 1;
  const delivery = Math.random() * 200;
  const labor = Math.random() * 50;
  const tax = Math.random() * 15;
  const basis: "per_ton" | "per_yard" = Math.random() > 0.5 ? "per_ton" : "per_yard";

  const res = calculateGravelCost({
    totalTons: tons,
    totalCuYards: yds,
    pricingBasis: basis,
    materialUnitPrice: price,
    deliveryFlatFee: delivery,
    salesTaxPct: tax,
    laborCostPerTon: labor,
    totalSqFt: 500,
  });

  const expMaterial = basis === "per_yard" ? yds * price : tons * price;
  const expTax = expMaterial * (tax / 100);
  const expLabor = tons * labor;
  const expTotal = expMaterial + delivery + expLabor + expTax;

  const diff = Math.abs(res.grandTotalCost - expTotal);
  if (diff < 1.0 && !isNaN(res.grandTotalCost) && isFinite(res.grandTotalCost)) {
    costPass++;
  } else {
    costFail++;
  }
}
console.log(`Cost Cases (2,000): ${costPass} passed, ${costFail} failed.`);

// 2. Multi-Zone test (2,000 cases)
let multiPass = 0;
let multiFail = 0;
for (let i = 0; i < 2000; i++) {
  const zoneCount = Math.floor(Math.random() * 5) + 1;
  const zones = [];
  let expArea = 0;
  for (let z = 0; z < zoneCount; z++) {
    const d1 = Math.random() * 100 + 5;
    const d2 = Math.random() * 50 + 5;
    zones.push({
      id: `${z}`,
      name: `Z${z}`,
      shape: "rectangle" as GravelShape,
      dim1: d1,
      dim2: d2,
      depthInches: 4,
      gravelType: "crushed_stone_57" as GravelType,
    });
    expArea += d1 * d2;
  }

  const res = calculateMultiZoneGravel({
    zones,
    compactionPct: 10,
    wastePct: 5,
    pricePerTon: 45,
    deliveryFee: 75,
  });

  if (Math.abs(res.totalSqFt - expArea) < 1.0 && !isNaN(res.totalShortTons) && isFinite(res.totalShortTons)) {
    multiPass++;
  } else {
    multiFail++;
  }
}
console.log(`Multi-Zone Cases (2,000): ${multiPass} passed, ${multiFail} failed.`);

// 3. French Drain test (2,000 cases)
let trenchPass = 0;
let trenchFail = 0;
for (let i = 0; i < 2000; i++) {
  const len = Math.random() * 200 + 10;
  const w = Math.random() * 24 + 6;
  const d = Math.random() * 36 + 12;
  const pipe = Math.random() > 0.3 ? 4 : 6;

  const res = calculateDrainageTrench({
    trenchLengthFt: len,
    trenchWidthInches: w,
    totalDepthInches: d,
    pipeDiameterInches: pipe,
    gravelBeddingDepthInches: d,
    gravelType: "crushed_stone_57",
  });

  const grossCuFt = len * (w / 12) * (d / 12);
  const pipeCuFt = Math.PI * Math.pow((pipe / 2) / 12, 2) * len;
  const expNetYds = (grossCuFt - pipeCuFt) / 27 * 1.10;

  if (Math.abs(res.netGravelCuYards - expNetYds) < 0.1 && !isNaN(res.netGravelCuYards) && isFinite(res.netGravelCuYards)) {
    trenchPass++;
  } else {
    trenchFail++;
  }
}
console.log(`French Drain Cases (2,000): ${trenchPass} passed, ${trenchFail} failed.`);
