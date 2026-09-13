import {
  calculateTip,
  calculateItemizedTip,
  COUNTRY_TIPPING_DATABASE,
} from "../src/app/calculators/tip-calculator/calculator";
import { ItemizedDiner } from "../src/app/calculators/tip-calculator/types";

console.log("=== 1. GOLDEN CASE A: QUICK EQUAL SPLIT ===");
// Subtotal: $50, Tax: 8.5%, Tip: 18%, Party: 2, Pre-tax, No rounding
const resA = calculateTip(50, 8.5, 18, 2, "pre-tax", "none", "US");
console.log("Golden Case A Result:", resA);
console.log("Reconciliation Check A:");
console.log("Subtotal:", resA.subtotal);
console.log("Tax:", resA.taxAmount, "Expected:", (50 * 0.085).toFixed(2));
console.log("Tip:", resA.tipAmount, "Expected:", (50 * 0.18).toFixed(2));
console.log("Grand Total:", resA.totalAmount, "Expected:", (50 + 4.25 + 9.00).toFixed(2));
console.log("Tip Per Person:", resA.tipPerPerson, "Expected: 4.50");
console.log("Total Per Person:", resA.totalPerPerson, "Expected: 31.63 (or 31.625 raw)");
console.log("Sum of person shares:", resA.totalPerPerson * 2, "Grand total:", resA.totalAmount);
console.log("Diff:", (resA.totalPerPerson * 2 - resA.totalAmount).toFixed(4));

console.log("\n=== 2. GOLDEN CASE B: ITEMIZED GROUP SPLITTER ===");
// Shared: 12, Alex: 18 + 4 = 22, Sam: 22 + 10 = 32. Tax: 8.5%, Tip: 18% pre-tax
const dinersB: ItemizedDiner[] = [
  {
    id: "1",
    name: "Alex",
    items: [
      { id: "i1", name: "Burger", price: 18 },
      { id: "i2", name: "Soda", price: 4 },
    ],
  },
  {
    id: "2",
    name: "Sam",
    items: [
      { id: "i3", name: "Pasta", price: 22 },
      { id: "i4", name: "Wine", price: 10 },
    ],
  },
];
const resB = calculateItemizedTip(dinersB, 12, 8.5, 18, "pre-tax");
console.log("Overall B:", resB.overall);
console.log("Diners B:", resB.diners);

const dinerTotalSum = resB.diners.reduce((acc, d) => acc + d.total, 0);
const dinerTipSum = resB.diners.reduce((acc, d) => acc + d.tipShare, 0);
const dinerTaxSum = resB.diners.reduce((acc, d) => acc + d.taxShare, 0);
const dinerSharedSum = resB.diners.reduce((acc, d) => acc + d.sharedAppetizerShare, 0);

console.log("Sum of diner totals:", dinerTotalSum.toFixed(2), "Overall total:", resB.overall.totalAmount);
console.log("Diner total reconciliation diff:", (dinerTotalSum - resB.overall.totalAmount).toFixed(4));
console.log("Sum of diner tips:", dinerTipSum.toFixed(2), "Overall tip:", resB.overall.tipAmount);
console.log("Sum of diner taxes:", dinerTaxSum.toFixed(2), "Overall tax:", resB.overall.taxAmount);
console.log("Sum of shared shares:", dinerSharedSum.toFixed(2), "Shared appetizers:", 12);
console.log("Displayed overall totalPerPerson:", resB.overall.totalPerPerson, "x 2 =", (resB.overall.totalPerPerson * 2).toFixed(2));

console.log("\n=== 3. PRE-TAX VS POST-TAX COMPARISON ===");
// Subtotal = 100, Tax = 10%, Tip = 20%, Party = 1
const resPre = calculateTip(100, 10, 20, 1, "pre-tax", "none", "US");
const resPost = calculateTip(100, 10, 20, 1, "post-tax", "none", "US");
console.log("Pre-tax: Tax =", resPre.taxAmount, "Tip =", resPre.tipAmount, "Grand Total =", resPre.totalAmount);
console.log("Post-tax: Tax =", resPost.taxAmount, "Tip =", resPost.tipAmount, "Grand Total =", resPost.totalAmount);

console.log("\n=== 4. AWKWARD SPLITS & CENT-ALLOCATION INVESTIGATION ===");
const awkwardTests = [
  { subtotal: 10.01, tax: 0, tip: 0, party: 3 },
  { subtotal: 10.02, tax: 0, tip: 0, party: 3 },
  { subtotal: 10.03, tax: 0, tip: 0, party: 3 },
  { subtotal: 10.04, tax: 0, tip: 0, party: 3 },
  { subtotal: 10.05, tax: 0, tip: 0, party: 3 },
  { subtotal: 83.49, tax: 0, tip: 0, party: 2 },
  { subtotal: 100.00, tax: 0, tip: 0, party: 6 },
  { subtotal: 99.99, tax: 0, tip: 0, party: 7 },
  { subtotal: 63.25, tax: 0, tip: 0, party: 2 },
];

for (const t of awkwardTests) {
  const r = calculateTip(t.subtotal, t.tax, t.tip, t.party, "pre-tax", "none");
  const sumPerPerson = parseFloat((r.totalPerPerson * t.party).toFixed(2));
  const diff = parseFloat((sumPerPerson - r.totalAmount).toFixed(2));
  console.log(`Subtotal $${t.subtotal} / ${t.party} people: totalPerPerson = $${r.totalPerPerson}, sum = $${sumPerPerson}, diff = $${diff}`);
}
