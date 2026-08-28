import {
  solveVat,
  calculateSupplyChainVat,
  GLOBAL_VAT_PRESETS,
} from "../src/lib/calculator-engine/formulas/vat";

console.log("=== STARTING VAT CALCULATOR FORENSIC AUDIT ===");

// 1. BASELINE A: UNIVERSAL 4-WAY SOLVER
console.log("\n[BASELINE A: 4-WAY SOLVER]");
const test1 = solveVat({ vatRate: 20, netPrice: 1200 });
console.log("Test 1 (Rate=20, Net=1200): Net=", test1.netPrice, "Tax=", test1.taxAmount, "Gross=", test1.grossPrice);

const test2 = solveVat({ vatRate: 20, grossPrice: 1440 });
console.log("Test 2 (Rate=20, Gross=1440): Net=", test2.netPrice, "Tax=", test2.taxAmount, "Gross=", test2.grossPrice);

const test3 = solveVat({ vatRate: 20, taxAmount: 240 });
console.log("Test 3 (Rate=20, Tax=240): Net=", test3.netPrice, "Tax=", test3.taxAmount, "Gross=", test3.grossPrice);

const test4 = solveVat({ netPrice: 1200, grossPrice: 1440 });
console.log("Test 4 (Net=1200, Gross=1440): Rate=", test4.vatRate, "Tax=", test4.taxAmount);

const test5 = solveVat({ netPrice: 1200, taxAmount: 240 });
console.log("Test 5 (Net=1200, Tax=240): Rate=", test5.vatRate, "Gross=", test5.grossPrice);

const test6 = solveVat({ grossPrice: 1440, taxAmount: 240 });
console.log("Test 6 (Gross=1440, Tax=240): Rate=", test6.vatRate, "Net=", test6.netPrice);

// Check 0% VAT
const test0 = solveVat({ vatRate: 0, netPrice: 1200 });
console.log("Test 0 (Rate=0, Net=1200): Rate=", test0.vatRate, "Net=", test0.netPrice, "Tax=", test0.taxAmount, "Gross=", test0.grossPrice);

// 2. BASELINE B: SUPPLY CHAIN MAP
console.log("\n[BASELINE B: SUPPLY CHAIN MAP]");
const scRes = calculateSupplyChainVat(20, 10, 15, 15, 20);
console.log("Stages:");
scRes.stages.forEach((s) => {
  console.log(`  ${s.stageName}: ValAdd=${s.valueAdded}, NetSale=${s.saleNetPrice}, OutputVat=${s.outputVat}, InputCredit=${s.inputVatCredit}, Remitted=${s.netVatRemitted}`);
});
console.log("Total Value Added:", scRes.totalValueAdded, "Expected: 60.00");
console.log("Total VAT Remitted:", scRes.totalVatCollectedByGovt, "Expected: 12.00");
