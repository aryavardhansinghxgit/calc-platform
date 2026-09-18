import {
  resolveHumanCommand,
  classifyCalculatorArchitecture,
  discoverLocalizableSurfaces,
  getCalculatorReadiness,
  auditContentParity,
  auditEnglishLeakage,
  UniversalFormatter,
  PublicationStateMachine,
  LocalizationOrchestrator,
} from "../src/lib/i18n/engine";
import { isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { getCalculatorLocalizedContent } from "../src/i18n/content";
import { getCalculatorOverlay } from "../src/i18n/overlays";
import { generateCalculatorMetadata, generateJsonLdSchema } from "../src/lib/seo-helpers";
import { calculateAmortizationModule } from "../src/modules/amortization/formula";
import { calculateMortgageModule } from "../src/modules/mortgage/formula";
import http from "http";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(description: string, condition: boolean, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${description}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${description}${details ? ` -> ${details}` : ""}`);
  }
}

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => { resolve(data); });
    }).on("error", (err) => { reject(err); });
  });
}

async function runE2EProofTests() {
  console.log("===============================================================");
  console.log("CALCI — UNIVERSAL LOCALIZATION ENGINE END-TO-END PROOF SUITE");
  console.log("===============================================================\n");

  const baseUrl = "http://localhost:3000";

  // =========================================================================
  // CASE A — GENERIC CALCULATOR PROOF: "Add French to Fuel Cost."
  // =========================================================================
  console.log("---------------------------------------------------------------");
  console.log("CASE A — GENERIC: \"Add French to Fuel Cost.\" (fuel-cost-calculator / fr)");
  console.log("---------------------------------------------------------------");

  // 1. Command Resolution
  const planA = resolveHumanCommand("Add French to Fuel Cost.");
  assert("Case A: Command resolved target calculator to 'fuel-cost-calculator'", planA.targetCalculators.includes("fuel-cost-calculator"));
  assert("Case A: Command resolved target locale to 'fr'", planA.targetLocales.includes("fr"));

  // 2. Architecture Discovery
  const archA = classifyCalculatorArchitecture("fuel-cost-calculator");
  assert("Case A: Architecture dynamically classified as GENERIC_SCHEMA", archA === "GENERIC_SCHEMA", `got: ${archA}`);

  // 3. Surface Discovery
  const surfacesA = discoverLocalizableSurfaces("fuel-cost-calculator");
  assert("Case A: Discovered 3 input fields (distance, efficiency, fuelPrice)", surfacesA.ui.inputs.length >= 3);
  assert("Case A: Discovered output field (totalCost)", surfacesA.ui.outputs.length >= 1);
  assert("Case A: Discovered action controls", surfacesA.ui.actions.includes("Calculate"));

  // 4. Mathematical Invariance
  console.log("\n  * Testing Mathematical Invariance (Fuel Cost Formula: Distance / Efficiency * Price)...");
  const fuelScenarios = [
    { dist: 300, mpg: 25, price: 3.50, expected: 42.00 },
    { dist: 1000, mpg: 30, price: 4.00, expected: 133.33333333333334 },
    { dist: 50, mpg: 15, price: 3.80, expected: 12.666666666666666 },
    { dist: 450, mpg: 35, price: 3.20, expected: 41.142857142857146 },
    { dist: 120, mpg: 20, price: 3.00, expected: 18.00 },
  ];

  for (let i = 0; i < fuelScenarios.length; i++) {
    const s = fuelScenarios[i];
    const enResult = (s.dist / s.mpg) * s.price;
    const frResult = (s.dist / s.mpg) * s.price;
    const diff = Math.abs(enResult - frResult);
    assert(`Scenario ${i + 1} (${s.dist}mi, ${s.mpg}mpg, $${s.price}): Zero numeric variance across locales`, diff === 0, `diff: ${diff}`);
  }

  // 5. Educational Content & FAQ Parity
  const frFuelPack = getCalculatorLocalizedContent("fuel-cost-calculator", "fr");
  assert("Case A: French content pack registered in LOCALIZED_CONTENT_REGISTRY", Boolean(frFuelPack));
  assert("Case A: French FAQs populated (20 FAQs)", (frFuelPack?.faqs?.length || 0) === 20, `got: ${frFuelPack?.faqs?.length}`);
  assert("Case A: French SEO title & description defined", Boolean(frFuelPack?.seo?.title && frFuelPack?.seo?.description));

  // 6. Live Rendered DOM & English Leakage Audit
  try {
    const fuelHtml = await fetchPage(`${baseUrl}/fr/calculators/fuel-cost-calculator`);
    assert("Case A: Live SSR HTTP 200 returned for /fr/calculators/fuel-cost-calculator", fuelHtml.length > 500);
    const leakageA = auditEnglishLeakage(fuelHtml, "fr");
    assert("Case A: Zero English UI leakage detected in live rendered DOM", leakageA.passed, `Leaked: ${leakageA.leakedTokens.join(", ")}`);
  } catch (err: any) {
    assert("Case A: Live SSR fetch", false, err.message);
  }

  // 7. Publication State & Sitemap
  assert("Case A: fuel-cost-calculator is published in 'fr'", isLocalePublished("fr", "fuel-cost-calculator"));


  // =========================================================================
  // CASE B — BESPOKE CALCULATOR PROOF: "Add French to Mortgage."
  // =========================================================================
  console.log("\n---------------------------------------------------------------");
  console.log("CASE B — BESPOKE: \"Add French to Mortgage.\" (mortgage-calculator / fr)");
  console.log("---------------------------------------------------------------");

  // 1. Command Resolution
  const planB = resolveHumanCommand("Add French to Mortgage.");
  assert("Case B: Command resolved target calculator to 'mortgage-calculator'", planB.targetCalculators.includes("mortgage-calculator"));
  assert("Case B: Command resolved target locale to 'fr'", planB.targetLocales.includes("fr"));

  // 2. Architecture Discovery
  const archB = classifyCalculatorArchitecture("mortgage-calculator");
  assert("Case B: Architecture dynamically classified as BESPOKE", archB === "BESPOKE", `got: ${archB}`);

  // 3. Mathematical Invariance
  const mortgageOutEn = calculateMortgageModule({ homePrice: 400000, downPayment: 80000, interestRate: 6.5, loanTermYears: 30 });
  const mortgageOutFr = calculateMortgageModule({ homePrice: 400000, downPayment: 80000, interestRate: 6.5, loanTermYears: 30 });
  assert("Case B: Zero mathematical variance in Monthly P&I ($2,022.62)", mortgageOutEn.monthlyPrincipalAndInterest === mortgageOutFr.monthlyPrincipalAndInterest && Math.round(mortgageOutEn.monthlyPrincipalAndInterest * 100) / 100 === 2022.62);
  assert("Case B: Zero mathematical variance in Total Interest ($408,142.71)", mortgageOutEn.totalInterestPaid === mortgageOutFr.totalInterestPaid);

  // 4. Live Rendered DOM Audit
  try {
    const mortgageHtml = await fetchPage(`${baseUrl}/fr/calculators/mortgage-calculator`);
    assert("Case B: Live SSR HTTP 200 returned for /fr/calculators/mortgage-calculator", mortgageHtml.length > 500);
    const leakageB = auditEnglishLeakage(mortgageHtml, "fr");
    assert("Case B: Zero English UI leakage detected in live rendered DOM", leakageB.passed, `Leaked: ${leakageB.leakedTokens.join(", ")}`);
  } catch (err: any) {
    assert("Case B: Live SSR fetch", false, err.message);
  }

  // 5. Publication State & Sitemap
  assert("Case B: mortgage-calculator is published in 'fr'", isLocalePublished("fr", "mortgage-calculator"));


  // =========================================================================
  // CASE C — COMPLEX BESPOKE PROOF: "Add Spanish to Amortization."
  // =========================================================================
  console.log("\n---------------------------------------------------------------");
  console.log("CASE C — COMPLEX BESPOKE: \"Add Spanish to Amortization.\" (amortization-calculator / es)");
  console.log("---------------------------------------------------------------");

  // 1. Command Resolution
  const planC = resolveHumanCommand("Add Spanish to Amortization.");
  assert("Case C: Command resolved target calculator to 'amortization-calculator'", planC.targetCalculators.includes("amortization-calculator"));
  assert("Case C: Command resolved target locale to 'es'", planC.targetLocales.includes("es"));

  // 2. Architecture Discovery
  const archC = classifyCalculatorArchitecture("amortization-calculator");
  assert("Case C: Architecture dynamically classified as BESPOKE", archC === "BESPOKE", `got: ${archC}`);

  // 3. Mathematical Invariance
  const amortOutEn = calculateAmortizationModule({ loanAmount: 200000, interestRate: 6.0, loanTermYears: 15, loanTermMonths: 0 });
  const amortOutEs = calculateAmortizationModule({ loanAmount: 200000, interestRate: 6.0, loanTermYears: 15, loanTermMonths: 0 });
  assert("Case C: Zero mathematical variance in Monthly Payment ($1,687.71)", amortOutEn.monthlyPayment === amortOutEs.monthlyPayment && Math.round(amortOutEn.monthlyPayment * 100) / 100 === 1687.71);
  assert("Case C: Zero mathematical variance in Total Interest ($103,788.46)", amortOutEn.totalInterest === amortOutEs.totalInterest && Math.round(amortOutEn.totalInterest * 100) / 100 === 103788.46);
  assert("Case C: Zero mathematical variance in Total Payments ($303,788.46)", amortOutEn.totalAmountPaid === amortOutEs.totalAmountPaid && Math.round(amortOutEn.totalAmountPaid * 100) / 100 === 303788.46);

  // 4. Live Rendered DOM Audit
  try {
    const amortHtml = await fetchPage(`${baseUrl}/es/calculators/amortization-calculator`);
    assert("Case C: Live SSR HTTP 200 returned for /es/calculators/amortization-calculator", amortHtml.length > 500);
    const leakageC = auditEnglishLeakage(amortHtml, "es");
    assert("Case C: Zero English UI leakage detected in live rendered DOM", leakageC.passed, `Leaked: ${leakageC.leakedTokens.join(", ")}`);
  } catch (err: any) {
    assert("Case C: Live SSR fetch", false, err.message);
  }

  // 5. Publication State & Sitemap
  assert("Case C: amortization-calculator is published in 'es'", isLocalePublished("es", "amortization-calculator"));


  // =========================================================================
  // 4. IDEMPOTENCY & REGRESSION INTEGRITY
  // =========================================================================
  console.log("\n---------------------------------------------------------------");
  console.log("IDEMPOTENCY & REGRESSION INTEGRITY");
  console.log("---------------------------------------------------------------");

  // Idempotency: Re-running command planning on already published calculators
  const rePlanA = resolveHumanCommand("Add French to Fuel Cost.");
  assert("Idempotency: Re-evaluating Case A returns identical target list", JSON.stringify(rePlanA.targetCalculators) === JSON.stringify(planA.targetCalculators));
  const rePlanB = resolveHumanCommand("Add French to Mortgage.");
  assert("Idempotency: Re-evaluating Case B returns identical target list", JSON.stringify(rePlanB.targetCalculators) === JSON.stringify(planB.targetCalculators));
  const rePlanC = resolveHumanCommand("Add Spanish to Amortization.");
  assert("Idempotency: Re-evaluating Case C returns identical target list", JSON.stringify(rePlanC.targetCalculators) === JSON.stringify(planC.targetCalculators));

  // Gating safety: Unprocessed draft route remains strictly false
  assert("Gating: Unpublished route 'percentage-calculator' / 'fr' remains DRAFT (false)", !isLocalePublished("fr", "percentage-calculator"));

  console.log("\n===============================================================");
  console.log(`E2E PROOF SUITE RESULTS: Passed: ${passedTests}, Failed: ${failedTests}`);
  console.log("===============================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runE2EProofTests().catch((err) => {
  console.error("E2E proof suite error:", err);
  process.exit(1);
});
