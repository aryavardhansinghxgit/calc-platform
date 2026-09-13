import {
  calculateTip,
  calculateItemizedTip,
} from "../src/app/calculators/tip-calculator/calculator";
import { ItemizedDiner } from "../src/app/calculators/tip-calculator/types";

console.log("Starting 100,000 itemized test cases...");

let itemizedFailures = 0;
let maxDiff = 0;
const failureExamples: any[] = [];

for (let i = 0; i < 100000; i++) {
  const dinerCount = Math.floor(Math.random() * 6) + 2; // 2 to 7 diners
  const shared = Math.round((Math.random() * 50) * 100) / 100;
  const taxRate = Math.round((Math.random() * 15) * 10) / 10;
  const tipPct = Math.round(Math.random() * 30);
  const taxMode = Math.random() > 0.5 ? "pre-tax" : "post-tax";

  const diners: ItemizedDiner[] = [];
  for (let d = 0; d < dinerCount; d++) {
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items = [];
    for (let it = 0; it < itemCount; it++) {
      items.push({
        id: `item-${d}-${it}`,
        name: `Item ${it}`,
        price: Math.round((Math.random() * 40 + 1) * 100) / 100,
      });
    }
    diners.push({
      id: `diner-${d}`,
      name: `Diner ${d}`,
      items,
    });
  }

  const res = calculateItemizedTip(diners, shared, taxRate, tipPct, taxMode);
  const sumDinerTotals = Math.round(res.diners.reduce((sum, d) => sum + d.total, 0) * 100) / 100;
  const overallTotal = Math.round(res.overall.totalAmount * 100) / 100;
  const diff = Math.abs(Math.round((sumDinerTotals - overallTotal) * 100) / 100);

  if (diff > 0.001) {
    itemizedFailures++;
    if (diff > maxDiff) maxDiff = diff;
    if (failureExamples.length < 5) {
      failureExamples.push({
        i,
        dinerCount,
        shared,
        taxRate,
        tipPct,
        taxMode,
        sumDinerTotals,
        overallTotal,
        diff,
        dinerTotals: res.diners.map(d => d.total),
      });
    }
  }
}

console.log(`Completed 100,000 itemized cases.`);
console.log(`Failures (where sum(diners) != overall): ${itemizedFailures} / 100,000`);
console.log(`Max cent discrepancy: $${maxDiff}`);
if (failureExamples.length > 0) {
  console.log("Sample failure cases:", JSON.stringify(failureExamples, null, 2));
}
