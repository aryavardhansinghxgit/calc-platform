import { calculateLeastCommonMultipleLCMCalculator } from "./calculator";
import { parseNumbersInput, calculateLCM, calculateGCF, computeLcmSummary, generateDivisionGridMethod } from "./lcm-logic";

export function runLeastCommonMultipleLCMCalculatorTests() {
  // Test 1: Standard 3-number LCM (12, 18, 30 -> 180)
  const res1 = calculateLeastCommonMultipleLCMCalculator({ num1: 12, num2: 18, num3: 30 });
  if (res1.lcm !== 180 || res1.gcf !== 6) {
    throw new Error(`Expected LCM(12,18,30)=180, GCF=6; got LCM=${res1.lcm}, GCF=${res1.gcf}`);
  }

  // Test 2: Pair LCM and Identity (48, 60 -> LCM 240, GCF 12)
  const summary2 = computeLcmSummary([48, 60]);
  if (summary2.lcm !== 240 || summary2.gcf !== 12 || !summary2.productEqualsLcmGcf) {
    throw new Error(`Expected LCM(48,60)=240, GCF=12, Product Identity=true; got LCM=${summary2.lcm}, GCF=${summary2.gcf}`);
  }

  // Test 3: Input parser string parsing
  const parsed = parseNumbersInput("15, 25 35; 45");
  if (parsed.length !== 4 || parsed[0] !== 15 || parsed[3] !== 45) {
    throw new Error(`Input parser failed on '15, 25 35; 45', got ${JSON.stringify(parsed)}`);
  }

  // Test 4: Coprime numbers (3, 5, 7 -> LCM 105, GCF 1)
  const lcmCoprime = calculateLCM([3, 5, 7]);
  const gcfCoprime = calculateGCF([3, 5, 7]);
  if (lcmCoprime !== 105 || gcfCoprime !== 1) {
    throw new Error(`Expected LCM(3,5,7)=105, GCF=1; got LCM=${lcmCoprime}, GCF=${gcfCoprime}`);
  }

  // Test 5: Common Division / Ladder Grid generator
  const grid = generateDivisionGridMethod([12, 18, 30]);
  if (grid.rows.length === 0) {
    throw new Error("Division grid generation failed for [12, 18, 30]");
  }

  // Test 6: Fallback and zero inputs
  const resZero = calculateLeastCommonMultipleLCMCalculator({ num1: 0, num2: 0, num3: 0 });
  if (!resZero || typeof resZero.lcm !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
