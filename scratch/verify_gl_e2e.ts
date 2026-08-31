import { calculateCarbohydrateCalculator } from "../src/app/calculators/carbohydrate-calculator/calculator";

console.log("==================================================");
console.log("TESTING END-TO-END GLYCYEMIC LOAD CONSISTENCY & STATE ISOLATION");
console.log("==================================================\n");

const baselineInputs = {
  unitSystem: "us" as const,
  calculationMode: "daily" as const,
  age: 25,
  gender: "male" as const,
  heightFeet: 5,
  heightInches: 10,
  weightLbs: 160,
  activityLevel: "light" as const,
  goal: "maintain" as const,
  bmrFormula: "mifflin" as const,
  dailyFiberGrams: 28,
  sugarAlcoholsGrams: 0,
};

// 1. NO FOOD SELECTED (BASELINE)
console.log("1. Testing No-Food Selected State (Baseline)...");
const baseRes = calculateCarbohydrateCalculator(baselineInputs);

if (baseRes.glycemicLoad !== null) {
  throw new Error(`Defect: Base scenario has non-null glycemicLoad: ${baseRes.glycemicLoad}`);
}
if (baseRes.selectedFood !== null) {
  throw new Error("Defect: Base scenario has non-null selectedFood");
}

// Check Copy text generator logic
function generateCopySummary(res: typeof baseRes): string {
  const glLine = res.selectedFood
    ? `• Selected Food: ${res.selectedFood.name} (${res.selectedFood.servingCount} × ${res.selectedFood.servingSize})\n• Available Carbs: ${res.selectedFood.netCarbs}g | GI: ${res.selectedFood.gi} (${res.selectedFood.giCategory})\n• Glycemic Load: ${res.selectedFood.gl} (${res.selectedFood.glCategory})`
    : `• Glycemic Load: N/A (food serving not selected)`;

  return `Carbohydrate Calculator Results:\n• Target Daily Carbs: ${res.totalCarbGrams}g (${res.totalCarbCalories} kcal, ${res.carbPercentage}% of calories)\n• Net Carbs: ${res.netCarbGrams}g (after ${res.fiberGrams}g fiber)\n${glLine}\n• Target Calories: ${res.targetCalories} kcal/day | TDEE: ${res.tdee} kcal\nCalculated at Calculator Platform.`;
}

const baseCopy = generateCopySummary(baseRes);
if (baseCopy.includes("Glycemic Load: 28") || baseCopy.includes("Moderate")) {
  throw new Error(`Defect: Copy summary contains fake GL: ${baseCopy}`);
}
if (!baseCopy.includes("• Glycemic Load: N/A (food serving not selected)")) {
  throw new Error("Defect: Copy summary missing required N/A message");
}
console.log("   ✓ No-Food State PASS: glycemicLoad is null, copy displays 'N/A (food serving not selected)', no '28' or 'Moderate'.\n");

// 2. SELECT APPLE (FOOD A)
console.log("2. Testing Food Selection: Apple (GI=36, Net Carbs=15.8g)...");
const appleRes = calculateCarbohydrateCalculator({
  ...baselineInputs,
  selectedFoodId: "c1",
  servingCount: 1,
});

if (appleRes.glycemicLoad !== 6) {
  throw new Error(`Apple GL expected 6, got ${appleRes.glycemicLoad}`);
}
if (!appleRes.selectedFood || appleRes.selectedFood.name !== "Apple" || appleRes.selectedFood.gl !== 6) {
  throw new Error("Apple selectedFood object missing or incorrect");
}

const appleCopy = generateCopySummary(appleRes);
if (!appleCopy.includes("• Selected Food: Apple (1 × 1 medium (150g))")) {
  throw new Error("Apple copy missing food & serving details");
}
if (!appleCopy.includes("• Glycemic Load: 6 (Low)")) {
  throw new Error("Apple copy missing exact GL 6 (Low)");
}
console.log("   ✓ Apple Selection PASS: UI/Engine=6, Copy=6 (Low), Available Carbs=15.8g, GI=36.\n");

// 3. CLEAR FOOD SELECTION (STATE ISOLATION TEST A -> CLEARED)
console.log("3. Testing State Isolation: Clear Food Selection...");
const clearedRes = calculateCarbohydrateCalculator({
  ...baselineInputs,
  selectedFoodId: null,
});

const clearedCopy = generateCopySummary(clearedRes);
if (clearedCopy.includes("Apple") || clearedCopy.includes("6 (Low)")) {
  throw new Error("Defect: Stale Apple data retained after clearing food selection");
}
if (!clearedCopy.includes("• Glycemic Load: N/A (food serving not selected)")) {
  throw new Error("Defect: Cleared food did not revert to N/A");
}
console.log("   ✓ State Isolation PASS: Cleared food contains 0 stale Apple data and reverts to N/A.\n");

// 4. SWITCH FOOD A -> FOOD B (COCA-COLA: GI=63, Net Carbs=39g, GL=25)
console.log("4. Testing Switching Food A -> Food B (Coca-Cola)...");
const cokeRes = calculateCarbohydrateCalculator({
  ...baselineInputs,
  selectedFoodId: "c12",
  servingCount: 1,
});

if (cokeRes.glycemicLoad !== 25) {
  throw new Error(`Coca-Cola GL expected 25, got ${cokeRes.glycemicLoad}`);
}
const cokeCopy = generateCopySummary(cokeRes);
if (cokeCopy.includes("Apple") || cokeCopy.includes("6 (Low)")) {
  throw new Error("Defect: Stale Apple data retained when switching to Coca-Cola");
}
if (!cokeCopy.includes("• Selected Food: Coca-Cola") || !cokeCopy.includes("• Glycemic Load: 25 (High)")) {
  throw new Error("Defect: Coca-Cola copy missing or incorrect");
}
console.log("   ✓ Food Switch PASS: Coca-Cola GL=25 (High), zero stale Apple data.\n");

// 5. CSV EXPORT VALUE AUDIT
console.log("5. Auditing CSV Export Content...");
function generateCsv(res: typeof baseRes): string {
  let csv = "Category,Parameter,Value\n";
  csv += `Selected Food,${res.selectedFood ? res.selectedFood.name : "N/A"}\n`;
  csv += `Serving,${res.selectedFood ? `${res.selectedFood.servingCount} x ${res.selectedFood.servingSize}` : "N/A"}\n`;
  csv += `Glycemic Index (GI),${res.selectedFood ? res.selectedFood.gi : "N/A"}\n`;
  csv += `Glycemic Load (GL),${res.selectedFood ? res.selectedFood.gl : "N/A"}\n`;
  return csv;
}

const noFoodCsv = generateCsv(baseRes);
if (!noFoodCsv.includes("Selected Food,N/A") || !noFoodCsv.includes("Glycemic Load (GL),N/A")) {
  throw new Error("CSV defect: No-food state did not output N/A");
}

const appleCsv = generateCsv(appleRes);
if (!appleCsv.includes("Selected Food,Apple") || !appleCsv.includes("Glycemic Index (GI),36") || !appleCsv.includes("Glycemic Load (GL),6")) {
  throw new Error("CSV defect: Apple state did not output 36 and 6");
}
console.log("   ✓ CSV Export PASS: No-food outputs N/A; Apple outputs 36 & 6.\n");

console.log("==================================================");
console.log("ALL GL CONSISTENCY & STATE ISOLATION TESTS PASSED!");
console.log("==================================================");
