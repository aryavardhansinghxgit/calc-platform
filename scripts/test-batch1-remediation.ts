import { getAllCalculatorDefinitions } from "../src/calculators";
import { isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { getCalculatorOverlay } from "../src/i18n/overlays";
import { getCalculatorLocalizedContent } from "../src/i18n/content";
import { calculatePercentageCalculator } from "../src/app/calculators/percentage-calculator/calculator";
import { calculateScientificCalculator } from "../src/app/calculators/scientific-calculator/calculator";
import { calculateBMICalculator } from "../src/app/calculators/bmi-calculator/calculator";
import { calculateDateCalculator } from "../src/app/calculators/date-calculator/calculator";
import { calculateDateDuration, calculateDateOffset } from "../src/lib/calculator-engine/formulas/date-calculator";

async function runRemediationVerification() {
  console.log("============================================================");
  console.log("CALCI - BATCH 1 LOCALIZATION REMEDIATION VERIFICATION SUITE");
  console.log("============================================================\n");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(name: string, condition: boolean, details?: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  [PASS] ${name}`);
    } else {
      failedTests++;
      console.error(`  [FAIL] ${name}${details ? ` -> ${details}` : ""}`);
    }
  }

  // -------------------------------------------------------------------------
  // 1. REGISTRY & DIRECTORY RECONCILIATION
  // -------------------------------------------------------------------------
  console.log("1. REGISTRY & DIRECTORY RECONCILIATION");
  const defs = getAllCalculatorDefinitions();
  assert("Authoritative Registry has exactly 196 calculator definitions", defs.length === 196, `Found ${defs.length}`);

  // -------------------------------------------------------------------------
  // 2. PUBLICATION MATRIX & GATEKEEPING
  // -------------------------------------------------------------------------
  console.log("\n2. PUBLICATION MATRIX & GATEKEEPING");
  const publishedBatch1 = [
    "percentage-calculator",
    "scientific-calculator",
    "bmi-calculator",
    "date-calculator",
  ];
  const gatedBatch1 = [
    "concrete-calculator",
    "currency-calculator",
    "auto-loan-calculator",
    "ohms-law-calculator",
  ];

  for (const slug of publishedBatch1) {
    assert(`${slug} is published in 'es'`, isLocalePublished("es", slug) === true);
    assert(`${slug} is gated in 'fr'`, isLocalePublished("fr", slug) === false);
    assert(`${slug} is gated in 'de'`, isLocalePublished("de", slug) === false);
    assert(`${slug} is gated in 'hi'`, isLocalePublished("hi", slug) === false);
    assert(`${slug} is gated in 'pt'`, isLocalePublished("pt", slug) === false);
  }

  assert("mortgage-calculator is published in 'es'", isLocalePublished("es", "mortgage-calculator") === true);
  assert("mortgage-calculator is published in 'fr'", isLocalePublished("fr", "mortgage-calculator") === true);
  assert("mortgage-calculator is published in 'de'", isLocalePublished("de", "mortgage-calculator") === true);
  assert("mortgage-calculator is published in 'hi'", isLocalePublished("hi", "mortgage-calculator") === true);
  assert("mortgage-calculator is published in 'pt'", isLocalePublished("pt", "mortgage-calculator") === true);

  for (const slug of gatedBatch1) {
    assert(`${slug} is gated in 'es'`, isLocalePublished("es", slug) === false);
    assert(`${slug} is gated in 'fr'`, isLocalePublished("fr", slug) === false);
  }

  // -------------------------------------------------------------------------
  // 3. DEEP LOCALE OVERLAYS VERIFICATION
  // -------------------------------------------------------------------------
  console.log("\n3. DEEP LOCALE OVERLAYS VERIFICATION");
  const repairedSlugs = [
    "percentage-calculator",
    "scientific-calculator",
    "bmi-calculator",
    "date-calculator",
  ];

  for (const slug of repairedSlugs) {
    const overlay = getCalculatorOverlay(slug, "es");
    assert(`Overlay exists for ${slug} (es)`, overlay !== null);
  }

  // Percentage specific deep contract
  const pctOverlay = getCalculatorOverlay("percentage-calculator", "es") as any;
  assert("Percentage overlay has section 1 title in Spanish", typeof pctOverlay?.s1Title === "string" && pctOverlay.s1Title.includes("Porcentajes"));
  assert("Percentage overlay has history title in Spanish", typeof pctOverlay?.historyTitle === "string" && pctOverlay.historyTitle.includes("Cálculos"));
  assert("Percentage overlay has aria accessibility labels", typeof pctOverlay?.ariaPercentage === "string" && pctOverlay.ariaPercentage.includes("Porcentaje"));

  // Scientific specific deep contract
  const sciOverlay = getCalculatorOverlay("scientific-calculator", "es") as any;
  assert("Scientific overlay has complete sidebar titles", typeof sciOverlay?.mathCalculatorsTitle === "string" && sciOverlay.mathCalculatorsTitle.includes("Calculadoras"));
  assert("Scientific overlay has features guide", typeof sciOverlay?.featKeyboardTitle === "string" && sciOverlay.featKeyboardTitle.includes("Teclado"));
  assert("Scientific overlay has quick examples", typeof sciOverlay?.examplesTitle === "string" && sciOverlay.examplesTitle.includes("Ejemplos"));
  assert("Scientific overlay has directional tooltips", typeof sciOverlay?.tooltipUp === "string" && sciOverlay.tooltipUp.includes("arriba"));

  // BMI specific deep contract
  const bmiOverlay = getCalculatorOverlay("bmi-calculator", "es") as any;
  assert("BMI overlay has title in Spanish", typeof bmiOverlay?.title === "string" && bmiOverlay.title.includes("IMC"));
  assert("BMI overlay has unit dropdown options", typeof bmiOverlay?.unitMeters === "string" && bmiOverlay.unitMeters.includes("metros"));
  assert("BMI overlay has WHO gauge classification labels", typeof bmiOverlay?.measuredBmi === "string" && bmiOverlay.measuredBmi.includes("IMC"));
  assert("BMI overlay has CDC pediatric chart labels", typeof bmiOverlay?.childChartTitle === "string" && bmiOverlay.childChartTitle.includes("Percentiles"));

  // Date specific deep contract
  const dateOverlay = getCalculatorOverlay("date-calculator", "es") as any;
  assert("Date overlay has suite title in Spanish", typeof dateOverlay?.suiteTitle === "string" && dateOverlay.suiteTitle.includes("Fechas"));
  assert("Date overlay has day names in Spanish", Array.isArray(dateOverlay?.dayNames) && dateOverlay.dayNames.length === 7 && dateOverlay.dayNames[0] === "Domingo");
  assert("Date overlay has holiday options in Spanish", typeof dateOverlay?.holidayExcludeOption === "string" && dateOverlay.holidayExcludeOption.includes("festivos"));
  assert("Date overlay has workday breakdown labels", typeof dateOverlay?.workingDaysLabel === "string" && dateOverlay.workingDaysLabel.includes("Días"));

  // -------------------------------------------------------------------------
  // 4. CONTENT PARITY & 1:1 SEMANTIC TRANSLATION
  // -------------------------------------------------------------------------
  console.log("\n4. CONTENT PARITY & 1:1 SEMANTIC TRANSLATION");
  for (const slug of repairedSlugs) {
    const pack = getCalculatorLocalizedContent(slug, "es");
    assert(`Localized content pack exists for ${slug} (es)`, pack !== null);
    if (pack) {
      assert(`${slug} has SEO metadata`, Boolean(pack.seo && pack.seo.title && pack.seo.description));
      assert(`${slug} has comprehensive FAQs (count >= 10)`, Array.isArray(pack.faqs) && pack.faqs.length >= 10, `Count: ${pack.faqs.length}`);
      assert(`${slug} has ContentComponent`, Boolean(pack.ContentComponent));
    }
  }

  // -------------------------------------------------------------------------
  // 5. ENGINE PURITY & MATHEMATICAL INVARIANCE
  // -------------------------------------------------------------------------
  console.log("\n5. ENGINE PURITY & MATHEMATICAL INVARIANCE");

  // Percentage Engine Invariance
  const pctResult = calculatePercentageCalculator({
    calcType: "what_is_x_pct_of_y",
    valueX: 18,
    valueY: 250,
  });
  assert("Percentage engine: 18% of 250 = 45", pctResult.result === 45);

  // Scientific Engine Invariance
  const sciResult1 = calculateScientificCalculator({
    value1: 30,
    operation: "sin",
    angleUnit: "deg",
  });
  assert("Scientific engine: sin(30 deg) = 0.5", sciResult1.result === 0.5 || sciResult1.result === "0.5");

  // BMI Engine Invariance
  const bmiResult = calculateBMICalculator({
    unitSystem: "metric",
    age: 25,
    gender: "male",
    heightCm: 178,
    weightKg: 75,
  });
  assert("BMI engine: 75kg / 1.78m -> 23.7", bmiResult.bmi === 23.7);

  // Date Engine Invariance & Purity
  const dateDurationRes = calculateDateDuration({
    startDate: "2026-08-24",
    endDate: "2026-09-23",
  });
  assert("Date duration engine: Pure numeric tokens returned", typeof dateDurationRes.startDayOfWeekIndex === "number" && typeof dateDurationRes.endDayOfWeekIndex === "number");
  assert("Date duration engine: 2026-08-24 to 2026-09-23 = 30 days", dateDurationRes.totalDays === 30);

  const dateOffsetRes = calculateDateOffset({
    startDate: "2026-08-24",
    operation: "add",
    years: 0,
    months: 0,
    weeks: 0,
    days: 30,
  });
  assert("Date offset engine target date: 2026-08-24 + 30 days = 2026-09-23", dateOffsetRes.targetDateStr === "2026-09-23");

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log("\n============================================================");
  console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
  console.log("============================================================");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runRemediationVerification().catch((err) => {
  console.error("Test runner failed:", err);
  process.exit(1);
});
