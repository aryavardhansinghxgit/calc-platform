import { calculatePregnancyWeightGainCalculator } from "../src/app/calculators/pregnancy-weight-gain-calculator/calculator";

// Case 1: Singleton Normal Wk 20 (from screenshot)
const c1 = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  pregnancyType: "single",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 142,
  week: 20
});

console.log("=== GOLDEN CASE 1: SINGLETON NORMAL WK 20 ===");
console.log("preBmi:", c1.preBmi, "category:", c1.bmiCategory);
console.log("actualGainLbs:", c1.actualGainLbs);
console.log("targetGainWeek:", c1.targetGainWeekFormatted, `(min: ${c1.minGainWeekLbs}, max: ${c1.maxGainWeekLbs})`);
console.log("total recommended gain:", c1.recommendedGainTotalFormatted);
console.log("weeklyRateFormatted:", c1.weeklyRateFormatted);
console.log("statusKey:", c1.statusKey);
console.log("statusLabel:", c1.statusLabel);
console.log("statusSummary:", c1.statusSummary);

// Case 2: Twins Normal Wk 20
const c2 = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  pregnancyType: "twins",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 142,
  week: 20
});

console.log("\n=== GOLDEN CASE 2: TWINS NORMAL WK 20 ===");
console.log("preBmi:", c2.preBmi, "category:", c2.bmiCategory);
console.log("actualGainLbs:", c2.actualGainLbs);
console.log("targetGainWeek:", c2.targetGainWeekFormatted, `(min: ${c2.minGainWeekLbs}, max: ${c2.maxGainWeekLbs})`);
console.log("total recommended gain:", c2.recommendedGainTotalFormatted);
console.log("weeklyRateFormatted:", c2.weeklyRateFormatted);
console.log("statusKey:", c2.statusKey);
console.log("statusLabel:", c2.statusLabel);
console.log("statusSummary:", c2.statusSummary);

// Case 3: Extreme Height 3'3" Twins Wk 20 (from screenshot)
const c3 = calculatePregnancyWeightGainCalculator({
  unitSystem: "us",
  pregnancyType: "twins",
  heightFeet: 3,
  heightInches: 3,
  preWeightLbs: 130,
  currentWeightLbs: 142,
  week: 20
});
console.log("\n=== CASE 3: EXTREME HEIGHT 3'3\" TWINS WK 20 ===");
console.log("heightFeet:", c3.heightFeet, "heightInches:", c3.heightInches, "heightCm:", c3.heightCm);
console.log("preBmi:", c3.preBmi, "category:", c3.bmiCategory);
console.log("targetGainWeek:", c3.targetGainWeekFormatted);
console.log("statusKey:", c3.statusKey);
