import { calculateTireGeometry, calculateOffsetFitment, calculateTireComparison } from "../src/app/calculators/tire-size-calculator/calculator";

const t1 = calculateTireGeometry({ format: "metric", widthMm: 225, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 32, flotationWidthInches: 11.5 });
const t2 = calculateTireGeometry({ format: "metric", widthMm: 245, aspectRatio: 45, rimDiameterInches: 18, flotationDiameterInches: 33, flotationWidthInches: 12.5 });

console.log("Stock Tire (225/50R17):", {
  diameterIn: t1.diameterIn, // Expected 25.86
  diameterMm: t1.diameterMm, // Expected 656.8
  sidewallIn: t1.sidewallIn, // Expected 4.43
  circumferenceIn: t1.circumferenceIn, // Expected 81.24
  revsPerMile: t1.revsPerMile, // Expected 780
});

console.log("Target Tire (245/45R18):", {
  diameterIn: t2.diameterIn, // Expected 26.68
  diameterMm: t2.diameterMm, // Expected 677.7
  sidewallIn: t2.sidewallIn, // Expected 4.34
  circumferenceIn: t2.circumferenceIn, // Expected 83.82
  revsPerMile: t2.revsPerMile, // Expected 756
});

const comp = calculateTireComparison(
  { format: "metric", widthMm: 225, aspectRatio: 50, rimDiameterInches: 17, flotationDiameterInches: 32, flotationWidthInches: 11.5 },
  { format: "metric", widthMm: 245, aspectRatio: 45, rimDiameterInches: 18, flotationDiameterInches: 33, flotationWidthInches: 12.5 },
  { stockRimWidthIn: 7.5, stockOffsetMm: 45, newRimWidthIn: 8.5, newOffsetMm: 35 },
  { stockGearRatio: 3.73 }
);

console.log("Comparison Differentials:", {
  diameterDiffIn: comp.diameterDiffIn, // Expected +0.82
  diameterDiffPercent: comp.diameterDiffPercent, // Expected +3.2%
  circumferenceDiffIn: comp.circumferenceDiffIn, // Expected +2.58
  revsPerMileDiff: comp.revsPerMileDiff, // Expected -24
  speedAt65Mph: comp.speedAt65Mph, // Expected 67.1
  rideHeightChangeIn: comp.rideHeightChangeIn, // Expected +0.41
  rideHeightChangeMm: comp.rideHeightChangeMm, // Expected +10.4
});

console.log("Offset Fitment Results (7.5 ET+45 -> 8.5 ET+35):", comp.offsetResults);
// Expected: innerClearanceMm = 2.7 mm, outerPokeMm = 22.7 mm, backspacingStockIn = 6.02 in, backspacingNewIn = 6.13 in

console.log("Gear Ratio Results:", comp.gearResults);
// Expected: effectiveGearRatio ~ 3.62
