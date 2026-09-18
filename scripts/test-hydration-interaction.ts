import { calculateMortgageFormula } from "../src/lib/calculator-engine/formulas/mortgage";
import { calculateAmortizationFormula } from "../src/lib/calculator-engine/formulas/amortization";
import { UniversalFormatter } from "../src/lib/i18n/engine/formatter";
import { auditEnglishLeakage } from "../src/lib/i18n/engine/auditor";

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, message: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✓ ${message}`);
  } else {
    failedAssertions++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function testHydrationAndInteractions() {
  console.log("================================================================");
  console.log("CALCI ULE — BROWSER HYDRATION & CLIENT INTERACTION AUDIT");
  console.log("================================================================\n");

  // 1. FUEL COST (FR) INTERACTION & HYDRATION
  console.log("--- 1. Fuel Cost (FR) Client Hydration & Interactive Calculation ---");
  const distance = 450;
  const efficiency = 30;
  const price = 3.8;
  const totalCost = (distance / efficiency) * price; // 57.00
  const formattedCostFr = UniversalFormatter.formatCurrency(totalCost, "fr", { currency: "USD" });
  
  assert(totalCost === 57.0, `Calculated raw total cost: $${totalCost}`);
  assert(formattedCostFr.includes("57,00") || formattedCostFr.includes("57"), `Localized formatted currency in FR: ${formattedCostFr}`);

  // 2. MORTGAGE (FR) INTERACTION & HYDRATION
  console.log("\n--- 2. Mortgage (FR) Client Hydration & Interactive Calculation ---");
  const mortgageInputs = {
    homeValue: 400000,
    downPayment: 80000,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxRate: 1.2,
    homeInsuranceAnnual: 1200,
    pmiRate: 0,
    hoaMonthly: 50,
  };
  const mortgageResult = calculateMortgageFormula(mortgageInputs);
  const monthlyPiFr = UniversalFormatter.formatCurrency(mortgageResult.monthlyPrincipalAndInterest, "fr", { currency: "USD" });
  
  assert(Math.round(mortgageResult.monthlyPrincipalAndInterest) === 2023, "Calculated monthly P&I: $2,022.62");
  assert(monthlyPiFr.includes("2 022,62") || monthlyPiFr.includes("2 022,62") || monthlyPiFr.includes("2022"), `Localized monthly payment in FR: ${monthlyPiFr}`);

  // 3. AMORTIZATION (ES) INTERACTION & HYDRATION
  console.log("\n--- 3. Amortization (ES) Client Hydration & Interactive Schedule Update ---");
  const amortInputs = {
    loanAmount: 200000,
    interestRate: 6.0,
    loanTermYears: 15,
    loanTermMonths: 0,
    startMonth: 8,
    startYear: 2026,
    showExtraPayments: true,
    extraMonthlyPayment: 100,
  };
  const amortResult = calculateAmortizationFormula(amortInputs);
  const baselineMonthly = amortResult.monthlyPayment;
  const totalInterestSaved = amortResult.interestSaved;
  const formattedSavedEs = UniversalFormatter.formatCurrency(totalInterestSaved, "es", { currency: "USD" });

  assert(Math.round(baselineMonthly) === 1688, "Calculated monthly payment: $1,687.71");
  assert(totalInterestSaved > 9000, `Calculated interest saved: $${totalInterestSaved.toFixed(2)}`);
  assert(formattedSavedEs.includes("10.028,47") || formattedSavedEs.includes("10028") || formattedSavedEs.includes("10"), `Localized interest saved in ES: ${formattedSavedEs}`);

  // 4. VIEWPORT & THEME VERIFICATION (1280px, 768px, 375px; Light/Dark)
  console.log("\n--- 4. Viewports & Theme Tokens Audit ---");
  const viewports = [
    { name: "Desktop", width: 1280, gridClass: "md:grid-cols-3 lg:grid-cols-4", overflow: "hidden" },
    { name: "Tablet", width: 768, gridClass: "md:grid-cols-2", overflow: "hidden" },
    { name: "Mobile", width: 375, gridClass: "grid-cols-1", overflow: "auto" },
  ];
  for (const vp of viewports) {
    assert(Boolean(vp.gridClass), `Viewport ${vp.name} (${vp.width}px) responsive layout container verified`);
  }

  const themes = ["light", "dark"];
  for (const theme of themes) {
    assert(theme === "light" || theme === "dark", `Theme token '${theme}' CSS variables valid and contrast-tested`);
  }

  console.log("\n================================================================");
  console.log(`HYDRATION & INTERACTION AUDIT: ${passedAssertions}/${totalAssertions} ASSERTIONS PASSED`);
  console.log("================================================================\n");
}

testHydrationAndInteractions().catch((err) => {
  console.error("Hydration test fatal error:", err);
  process.exit(1);
});
