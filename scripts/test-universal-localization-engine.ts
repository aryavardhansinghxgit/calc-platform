import {
  classifyCalculatorArchitecture,
  discoverLocalizableSurfaces,
  getCalculatorReadiness,
  resolveTargetCalculators,
  UniversalFormatter,
  TerminologyMemory,
  auditContentParity,
  auditEnglishLeakage,
  PublicationStateMachine,
  resolveHumanCommand,
  LocalizationOrchestrator,
} from "../src/lib/i18n/engine";
import { ALL_CALCULATORS, getCalculatorDefinition } from "../src/calculators";
import { isLocalePublished, PUBLISHED_MATRIX } from "../src/i18n/publishing";
import { getCalculatorLocalizedContent } from "../src/i18n/content";

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

async function runUniversalLocalizationEngineTests() {
  console.log("==================================================");
  console.log("CALCI — UNIVERSAL LOCALIZATION ENGINE TEST SUITE");
  console.log("==================================================\n");

  // -------------------------------------------------------------
  // 1. Architecture Discovery & Dynamic Classification
  // -------------------------------------------------------------
  console.log("--- 1. Architecture Discovery & Dynamic Classification ---");
  const fuelCostArch = classifyCalculatorArchitecture("fuel-cost-calculator");
  assert("Classifies 'fuel-cost-calculator' as GENERIC_SCHEMA", fuelCostArch === "GENERIC_SCHEMA", `got: ${fuelCostArch}`);

  const mortgageArch = classifyCalculatorArchitecture("mortgage-calculator");
  assert("Classifies 'mortgage-calculator' as BESPOKE", mortgageArch === "BESPOKE", `got: ${mortgageArch}`);

  const amortArch = classifyCalculatorArchitecture("amortization-calculator");
  assert("Classifies 'amortization-calculator' as BESPOKE", amortArch === "BESPOKE", `got: ${amortArch}`);

  const bmiArch = classifyCalculatorArchitecture("bmi-calculator");
  assert("Classifies 'bmi-calculator' as GENERIC_SCHEMA or HYBRID", bmiArch === "GENERIC_SCHEMA" || bmiArch === "HYBRID", `got: ${bmiArch}`);

  // -------------------------------------------------------------
  // 2. Localizable Surface Discovery
  // -------------------------------------------------------------
  console.log("\n--- 2. Localizable Surface Discovery ---");
  const amortSurfaces = discoverLocalizableSurfaces("amortization-calculator");
  assert("Discovers page title and description", Boolean(amortSurfaces.page.title && amortSurfaces.page.description));
  assert("Discovers UI action controls (Calculate, Reset, Export)", amortSurfaces.ui.actions.includes("Calculate"));
  assert("Discovers child components (Schedule, Result Panel)", amortSurfaces.childComponents.length >= 2);
  assert("Discovers educational content baseline", amortSurfaces.content.sectionsCount > 0);
  assert("Discovers FAQ questions", amortSurfaces.faq.count > 0);

  const fuelCostSurfaces = discoverLocalizableSurfaces("fuel-cost-calculator");
  assert("Discovers inputs for generic calculator", fuelCostSurfaces.ui.inputs.length >= 2);

  // -------------------------------------------------------------
  // 3. Calculator Readiness Scorecard
  // -------------------------------------------------------------
  console.log("\n--- 3. Calculator Readiness Scorecard ---");
  const mortgageReadiness = getCalculatorReadiness("mortgage-calculator");
  assert("Mortgage readiness score >= 90", mortgageReadiness.score >= 90, `Score: ${mortgageReadiness.score}`);
  assert("Mortgage readiness is READY", mortgageReadiness.overallReadiness === "READY");

  const amortReadiness = getCalculatorReadiness("amortization-calculator");
  assert("Amortization readiness is READY", amortReadiness.overallReadiness === "READY");

  // -------------------------------------------------------------
  // 4. Universal Formatter Layer (Language !== Currency)
  // -------------------------------------------------------------
  console.log("\n--- 4. Universal Formatter Layer (Language !== Currency) ---");
  const esUsd = UniversalFormatter.formatCurrency(1687.71, "es", { currency: "USD" });
  assert("Formats USD in Spanish with European separator", esUsd.includes("1.687,71") || esUsd.includes("1687,71"), `got: ${esUsd}`);

  const frEur = UniversalFormatter.formatCurrency(2500.5, "fr", { currency: "EUR" });
  assert("Formats EUR in French", frEur.includes("2 500,50") || frEur.includes("2 500,50") || frEur.includes("2500,50"), `got: ${frEur}`);

  const hiUsd = UniversalFormatter.formatCurrency(100000, "hi", { currency: "USD" });
  assert("Formats USD in Hindi locale without error", hiUsd.length > 0, `got: ${hiUsd}`);

  const percentFormat = UniversalFormatter.formatPercent(6.5, "en");
  assert("Formats percentage as '6.50%'", percentFormat === "6.50%", `got: ${percentFormat}`);

  const monthYearFormat = UniversalFormatter.formatMonthYear(7, 2041, "es");
  assert("Formats month/year in Spanish (e.g. 'jul 2041' or 'jul. 2041')", monthYearFormat.toLowerCase().includes("jul"), `got: ${monthYearFormat}`);

  // -------------------------------------------------------------
  // 5. Terminology Memory Consistency
  // -------------------------------------------------------------
  console.log("\n--- 5. Terminology Memory Consistency ---");
  const termPrincipalEs = TerminologyMemory.getTerm("principal", "es");
  assert("Translates 'principal' to 'Capital' in Spanish", termPrincipalEs === "Capital", `got: ${termPrincipalEs}`);

  const termPrincipalDe = TerminologyMemory.getTerm("principal", "de");
  assert("Translates 'principal' appropriately in German", termPrincipalDe.includes("Tilgung") || termPrincipalDe.includes("Darlehen"), `got: ${termPrincipalDe}`);

  const termCalculateFr = TerminologyMemory.getTerm("calculate", "fr");
  assert("Translates 'calculate' to 'Calculer' in French", termCalculateFr === "Calculer", `got: ${termCalculateFr}`);

  // -------------------------------------------------------------
  // 6. Content Parity Engine
  // -------------------------------------------------------------
  console.log("\n--- 6. Content Parity Engine ---");
  const enMortgagePack = getCalculatorLocalizedContent("mortgage-calculator", "en");
  const esMortgagePack = getCalculatorLocalizedContent("mortgage-calculator", "es");
  const parityResult = auditContentParity(enMortgagePack, esMortgagePack, "es");
  assert("Content parity check passes for Spanish Mortgage", parityResult.substantiveParityPass, `Missing: ${parityResult.missingBlocks.join(", ")}`);
  assert("Identifies equal FAQ count (6)", parityResult.faqsCount === 6, `got: ${parityResult.faqsCount}`);

  // -------------------------------------------------------------
  // 7. Universal DOM Leakage Auditor
  // -------------------------------------------------------------
  console.log("\n--- 7. Universal DOM Leakage Auditor ---");
  const cleanSpanishHtml = "<div><h1>Calculadora de Amortización</h1><p>Monto del Préstamo</p></div>";
  const auditClean = auditEnglishLeakage(cleanSpanishHtml, "es");
  assert("Audit passes on clean Spanish markup", auditClean.passed);

  const leakedSpanishHtml = "<div><h1>Calculadora de Amortización</h1><p>Monthly Payment (P&I)</p></div>";
  const auditLeaked = auditEnglishLeakage(leakedSpanishHtml, "es");
  assert("Audit flags leaked 'Monthly Payment (P&I)' token", !auditLeaked.passed && auditLeaked.leakedTokens.includes("Monthly Payment (P&I)"));

  // -------------------------------------------------------------
  // 8. Publication State Machine & Registry Safety
  // -------------------------------------------------------------
  console.log("\n--- 8. Publication State Machine & Registry Safety ---");
  assert("State machine allows DRAFT -> DISCOVERED", PublicationStateMachine.canTransition("DRAFT", "DISCOVERED"));
  assert("State machine blocks DRAFT -> PUBLISHED directly", !PublicationStateMachine.canTransition("DRAFT", "PUBLISHED"));
  assert("State machine allows VERIFIED -> PUBLISHED", PublicationStateMachine.canTransition("VERIFIED", "PUBLISHED"));
  assert("State machine allows transition back to DRAFT from any state", PublicationStateMachine.canTransition("VERIFIED", "DRAFT"));

  // -------------------------------------------------------------
  // 9. Natural Language Command Resolution & Batch Simulation
  // -------------------------------------------------------------
  console.log("\n--- 9. Natural Language Command Resolution & Batch Simulation ---");

  // Request A: "Add French to Fuel Cost."
  const planA = resolveHumanCommand("Add French to Fuel Cost.");
  assert("Request A: Targets 'fuel-cost-calculator'", planA.targetCalculators.includes("fuel-cost-calculator"), `got: ${planA.targetCalculators.join(",")}`);
  assert("Request A: Targets locale 'fr'", planA.targetLocales.includes("fr"));
  assert("Request A: Identifies GENERIC_SCHEMA architecture", planA.architectureSummary.GENERIC_SCHEMA.includes("fuel-cost-calculator"));

  // Request B: "Add German to Mortgage."
  const planB = resolveHumanCommand("Add German to Mortgage.");
  assert("Request B: Targets 'mortgage-calculator'", planB.targetCalculators.includes("mortgage-calculator"));
  assert("Request B: Targets locale 'de'", planB.targetLocales.includes("de"));
  assert("Request B: Identifies BESPOKE architecture", planB.architectureSummary.BESPOKE.includes("mortgage-calculator"));

  // Request C: "Add Hindi to Amortization."
  const planC = resolveHumanCommand("Add Hindi to Amortization.");
  assert("Request C: Targets 'amortization-calculator'", planC.targetCalculators.includes("amortization-calculator"));
  assert("Request C: Targets locale 'hi'", planC.targetLocales.includes("hi"));

  // Request D: "Add Portuguese to Percentage."
  const planD = resolveHumanCommand("Add Portuguese to Percentage.");
  assert("Request D: Targets 'percentage-calculator'", planD.targetCalculators.includes("percentage-calculator"));
  assert("Request D: Targets locale 'pt'", planD.targetLocales.includes("pt"));

  // Request E: "Add French to Mortgage, Amortization, BMI and Percentage."
  const planE = resolveHumanCommand("Add French to Mortgage, Amortization, BMI and Percentage.");
  assert("Request E: Targets all 4 requested calculators", planE.targetCalculators.length === 4);
  assert("Request E: Targets locale 'fr'", planE.targetLocales.includes("fr"));

  // -------------------------------------------------------------
  // 10. Batch Evaluation Safety & Independence
  // -------------------------------------------------------------
  console.log("\n--- 10. Batch Evaluation Safety & Independence ---");
  const batchResults = LocalizationOrchestrator.evaluateBatch(
    ["mortgage-calculator", "amortization-calculator", "percentage-calculator", "bmi-calculator"],
    ["fr"]
  );
  assert("Evaluates batch of 4 calculators independently", batchResults.length === 4);
  const mortgageResult = batchResults.find((r) => r.slug === "mortgage-calculator");
  assert("Mortgage is in PUBLISHED state", mortgageResult?.state === "PUBLISHED");
  const amortResult = batchResults.find((r) => r.slug === "amortization-calculator");
  assert("Amortization is in PUBLISHED state", amortResult?.state === "PUBLISHED");
  const percentageResult = batchResults.find((r) => r.slug === "percentage-calculator");
  assert("Percentage is in DRAFT/VERIFIED state without crashing Mortgage", percentageResult?.state !== "PUBLISHED");

  console.log("\n==================================================");
  console.log(`UNIVERSAL LOCALIZATION ENGINE RESULTS: Passed: ${passedTests}, Failed: ${failedTests}`);
  console.log("==================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runUniversalLocalizationEngineTests().catch((err) => {
  console.error("Test suite threw an unhandled exception:", err);
  process.exit(1);
});
