import { calculateTip } from "../src/app/calculators/tip-calculator/calculator";

console.log("Starting 100,000 Quick Equal Split randomized cases...");

let failures = 0;
let maxDiff = 0;

for (let i = 0; i < 100000; i++) {
  const subtotal = Math.round((Math.random() * 500 + 1) * 100) / 100;
  const taxRate = Math.round((Math.random() * 15) * 10) / 10;
  const tipPct = Math.round(Math.random() * 30);
  const partySize = Math.floor(Math.random() * 10) + 1;
  const taxMode = Math.random() > 0.5 ? "pre-tax" : "post-tax";
  const roundingModes = ["none", "tip", "total", "person"] as const;
  const roundingMode = roundingModes[Math.floor(Math.random() * roundingModes.length)];

  const res = calculateTip(subtotal, taxRate, tipPct, partySize, taxMode, roundingMode);

  // Check sum of allocatedShares
  const sumShares = Math.round(res.allocatedShares.reduce((a, b) => a + b, 0) * 100) / 100;
  const total = res.totalAmount;
  const diff = Math.abs(Math.round((sumShares - total) * 100) / 100);

  // Invariant: subtotal + tax + tip + roundingAdjustment = totalAmount
  const expectedTotal = Math.round((res.subtotal + res.taxAmount + res.tipAmount) * 100) / 100;
  const totalDiff = Math.abs(Math.round((total - expectedTotal) * 100) / 100);

  if (diff > 0.0001 || totalDiff > 0.0001) {
    failures++;
    if (diff > maxDiff) maxDiff = diff;
    if (totalDiff > maxDiff) maxDiff = totalDiff;
  }
}

console.log(`Quick Equal Split 100,000 cases completed.`);
console.log(`Failures: ${failures} / 100,000`);
console.log(`Max discrepancy: $${maxDiff}`);
