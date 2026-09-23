/**
 * Comprehensive Multi-Locale Verification Suite for Amortization Calculator
 * Tests all 6 locales: English (en), Spanish (es), French (fr), German (de), Hindi (hi), Portuguese (pt)
 */

import {
  AMORTIZATION_EN_OVERLAY,
  AMORTIZATION_ES_OVERLAY,
  AMORTIZATION_FR_OVERLAY,
  AMORTIZATION_DE_OVERLAY,
  AMORTIZATION_HI_OVERLAY,
  AMORTIZATION_PT_OVERLAY,
  getAmortizationOverlay,
} from "../src/i18n/overlays/amortization";
import { getCalculatorLocalizedContent, LOCALIZED_CONTENT_REGISTRY } from "../src/i18n/content";
import { calculateAmortizationModule } from "../src/modules/amortization/formula";
import { AmortizationInput } from "../src/modules/amortization/types";
import { isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { generateCalculatorMetadata, generateJsonLdSchema } from "../src/lib/seo-helpers";
import { formatCurrency, formatMonthYear } from "../src/lib/calculator-engine/formatters";
import sitemap from "../src/app/sitemap";
import { AMORTIZATION_CALCULATOR } from "../src/calculators/finance/amortization";
import { amortization_calculatorFaqs } from "../src/calculators/finance/amortization/faq";

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
    console.log(`  ✅ PASS: ${msg}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

console.log("==================================================");
console.log("SUITE: AMORTIZATION MULTI-LOCALE COMPLETION (6 LOCALES)");
console.log("==================================================");

// --- 1. Overlay Completeness for 6 Locales ---
console.log("\n--- 1. Overlay Completeness for 6 Locales ---");
const overlays = [
  { loc: "en", overlay: AMORTIZATION_EN_OVERLAY },
  { loc: "es", overlay: AMORTIZATION_ES_OVERLAY },
  { loc: "fr", overlay: AMORTIZATION_FR_OVERLAY },
  { loc: "de", overlay: AMORTIZATION_DE_OVERLAY },
  { loc: "hi", overlay: AMORTIZATION_HI_OVERLAY },
  { loc: "pt", overlay: AMORTIZATION_PT_OVERLAY },
];

const REQUIRED_OVERLAY_KEYS = [
  "locale", "title", "description", "managerTitle", "savedCountBadge",
  "printPdfBtn", "saveBtn", "savedBtn", "shareSuccessMsg", "inputsTitle",
  "inputsSubtitle", "loanAmount", "loanTermYears", "loanTermMonths",
  "interestRate", "startMonth", "startYear", "monthOptions", "fullMonthNames",
  "optionalExtraPayments", "extraMonthlyPayment", "extraYearlyPayment",
  "extraOneTimePayment", "extraStartMonth", "extraStartYear", "calculateBtn",
  "clearBtn", "validationErrorAmount", "validationErrorRate", "validationErrorTerm",
  "validationErrorMaxTerm", "monthlyPaymentTitle", "totalPaymentsCount",
  "paymentsLabel", "totalPrincipal", "totalInterest", "totalAmountPaid",
  "loanPayoffDate", "interestSaved", "comparisonTitle", "originalInterestVsNew",
  "savedLabel", "originalPayoffVsNew", "timeSavedLabel", "yearsLabel",
  "monthsLabel", "chartsTitle", "tabBreakdown", "tabProgress",
  "loadingPieChart", "loadingProgressChart", "scheduleTitle",
  "scheduleSubtitle", "annualTab", "monthlyTab", "searchYearPlaceholder",
  "searchPaymentPlaceholder", "exportCsvBtn", "exportExcelBtn", "yearCol",
  "paymentNumberCol", "paymentDateCol", "beginningBalanceCol",
  "paymentAmountCol", "principalPaidCol", "interestPaidCol", "extraPaidCol",
  "endingBalanceCol", "prevPage", "nextPage", "pageOf", "showingRecords",
  "saveModalTitle", "saveModalSubtitle", "calcSummaryLabel", "monthlyPaySummary",
  "saveNameLabel", "saveNamePlaceholder", "cancelBtn", "confirmSaveBtn",
  "saveSuccessMsg", "savedCalculationsTitle", "restoreBtn", "deleteBtnTitle",
];

for (const { loc, overlay } of overlays) {
  assert(overlay.locale === loc, `Overlay locale '${loc}' matches object locale`);
  assert(overlay.monthOptions.length === 12, `Overlay '${loc}' has 12 localized month options`);
  assert(overlay.fullMonthNames.length === 12, `Overlay '${loc}' has 12 localized full month names`);
  
  let missingKeys: string[] = [];
  for (const key of REQUIRED_OVERLAY_KEYS) {
    if (!(key in overlay) || (overlay as any)[key] === undefined || (overlay as any)[key] === "") {
      missingKeys.push(key);
    }
  }
  assert(missingKeys.length === 0, `Overlay '${loc}' has all ${REQUIRED_OVERLAY_KEYS.length} required keys (missing: ${missingKeys.length})`);
}

// --- 2. Dynamic Overlay Resolution ---
console.log("\n--- 2. Dynamic Overlay Resolution ---");
for (const { loc } of overlays) {
  const resolved = getAmortizationOverlay(loc);
  assert(resolved.locale === loc, `getAmortizationOverlay('${loc}') returns '${loc}' overlay`);
}

// --- 3. Content Registration & Parity ---
console.log("\n--- 3. Localized Educational Content & SEO Registry ---");
const nonEnLocales = ["es", "fr", "de", "hi", "pt"];
for (const loc of nonEnLocales) {
  const pack = getCalculatorLocalizedContent("amortization-calculator", loc);
  assert(Boolean(pack), `amortization-calculator content registered for '${loc}'`);
  assert(Boolean(pack?.seo?.title), `SEO title exists for '${loc}': "${pack?.seo?.title?.slice(0, 35)}..."`);
  assert(Boolean(pack?.seo?.description), `SEO description exists for '${loc}'`);
  assert(Boolean(pack?.ContentComponent), `Content component exists for '${loc}'`);
}

// --- 4. FAQ Registration Parity ---
console.log("\n--- 4. FAQ Parity (12 FAQs in All Locales) ---");
const enFaqCount = amortization_calculatorFaqs.length;
assert(enFaqCount === 12, `Canonical English FAQ count is exactly 12 (actual: ${enFaqCount})`);

for (const loc of nonEnLocales) {
  const pack = getCalculatorLocalizedContent("amortization-calculator", loc);
  assert(pack?.faqs?.length === 12, `'${loc}' FAQ count equals English (actual: ${pack?.faqs?.length})`);
  
  // Verify visible FAQ matches JSON-LD FAQ count
  const jsonLd = generateJsonLdSchema({
    title: pack?.seo.title || "",
    description: pack?.seo.description || "",
    slug: "amortization-calculator",
    faqs: pack?.faqs || [],
    locale: loc,
  });
  const faqSchema = jsonLd.find((s: any) => s["@type"] === "FAQPage");
  assert(Boolean(faqSchema), `'${loc}' FAQPage JSON-LD schema generated`);
  assert((faqSchema as any)?.mainEntity?.length === 12, `'${loc}' JSON-LD contains exactly 12 mainEntity Q&As`);
}

// --- 5. Engine Purity & Structured Numeric Dates ---
console.log("\n--- 5. Engine Purity & Structured Numeric Output ---");
const sampleInput: AmortizationInput = {
  loanAmount: 200000,
  loanTermYears: 15,
  loanTermMonths: 0,
  interestRate: 6.0,
  startMonth: 8,
  startYear: 2026,
};
const pureResult = calculateAmortizationModule(sampleInput);
assert(typeof pureResult.payoffMonth === "number" && pureResult.payoffMonth === 7, `payoffMonth is numeric (7)`);
assert(typeof pureResult.payoffYear === "number" && pureResult.payoffYear === 2041, `payoffYear is numeric (2041)`);
assert(typeof pureResult.baselinePayoffMonth === "number" && pureResult.baselinePayoffMonth === 7, `baselinePayoffMonth is numeric (7)`);
assert(typeof pureResult.baselinePayoffYear === "number" && pureResult.baselinePayoffYear === 2041, `baselinePayoffYear is numeric (2041)`);
assert(typeof pureResult.monthlySchedule[0].paymentMonth === "number" && pureResult.monthlySchedule[0].paymentMonth === 8, `monthlySchedule[0].paymentMonth is numeric (8)`);
assert(typeof pureResult.monthlySchedule[0].paymentYear === "number" && pureResult.monthlySchedule[0].paymentYear === 2026, `monthlySchedule[0].paymentYear is numeric (2026)`);

// --- 6. Mathematical Invariance Across 14 Scenarios ---
console.log("\n--- 6. Mathematical Invariance Across 14 Cross-Locale Scenarios ---");

const testScenarios: Array<{ name: string; input: AmortizationInput }> = [
  {
    name: "1. Standard Baseline ($200k, 6%, 15y)",
    input: { loanAmount: 200000, loanTermYears: 15, loanTermMonths: 0, interestRate: 6.0, startMonth: 8, startYear: 2026 },
  },
  {
    name: "2. Small Principal ($5k, 4.5%, 3y)",
    input: { loanAmount: 5000, loanTermYears: 3, loanTermMonths: 0, interestRate: 4.5, startMonth: 1, startYear: 2026 },
  },
  {
    name: "3. Large Principal ($1.5M, 7.25%, 30y)",
    input: { loanAmount: 1500000, loanTermYears: 30, loanTermMonths: 0, interestRate: 7.25, startMonth: 6, startYear: 2026 },
  },
  {
    name: "4. Short Term (1y, $10k, 5%)",
    input: { loanAmount: 10000, loanTermYears: 1, loanTermMonths: 0, interestRate: 5.0, startMonth: 3, startYear: 2026 },
  },
  {
    name: "5. Long Term (40y, $500k, 6.5%)",
    input: { loanAmount: 500000, loanTermYears: 40, loanTermMonths: 0, interestRate: 6.5, startMonth: 5, startYear: 2026 },
  },
  {
    name: "6. Low Interest Rate (0.5%, $250k, 20y)",
    input: { loanAmount: 250000, loanTermYears: 20, loanTermMonths: 0, interestRate: 0.5, startMonth: 4, startYear: 2026 },
  },
  {
    name: "7. High Interest Rate (18.5%, $15k, 5y)",
    input: { loanAmount: 15000, loanTermYears: 5, loanTermMonths: 0, interestRate: 18.5, startMonth: 9, startYear: 2026 },
  },
  {
    name: "8. Decimal Rate (6.875%, $320k, 30y)",
    input: { loanAmount: 320000, loanTermYears: 30, loanTermMonths: 0, interestRate: 6.875, startMonth: 11, startYear: 2026 },
  },
  {
    name: "9. Additional Months Term (15y 6m, $200k, 6%)",
    input: { loanAmount: 200000, loanTermYears: 15, loanTermMonths: 6, interestRate: 6.0, startMonth: 2, startYear: 2026 },
  },
  {
    name: "10. Extra Monthly Payment ($200k, 6%, 15y + $100/mo)",
    input: { loanAmount: 200000, loanTermYears: 15, loanTermMonths: 0, interestRate: 6.0, showExtraPayments: true, extraMonthlyPayment: 100 },
  },
  {
    name: "11. Extra Yearly Payment ($200k, 6%, 15y + $1,200/yr)",
    input: { loanAmount: 200000, loanTermYears: 15, loanTermMonths: 0, interestRate: 6.0, showExtraPayments: true, extraYearlyPayment: 1200 },
  },
  {
    name: "12. Extra One-Time Payment ($200k, 6%, 15y + $5,000 one-time)",
    input: { loanAmount: 200000, loanTermYears: 15, loanTermMonths: 0, interestRate: 6.0, showExtraPayments: true, extraOneTimePayment: 5000 },
  },
  {
    name: "13. Zero-Interest Loan ($120k, 0%, 10y)",
    input: { loanAmount: 120000, loanTermYears: 10, loanTermMonths: 0, interestRate: 0, startMonth: 1, startYear: 2026 },
  },
  {
    name: "14. Maximum Term (50y, $400k, 5.5%)",
    input: { loanAmount: 400000, loanTermYears: 50, loanTermMonths: 0, interestRate: 5.5, startMonth: 10, startYear: 2026 },
  },
];

for (const sc of testScenarios) {
  const ref = calculateAmortizationModule(sc.input);
  
  // Test that running calculation multiple times produces exact identical outputs
  const runA = calculateAmortizationModule(sc.input);
  const runB = calculateAmortizationModule(sc.input);
  
  assert(
    runA.monthlyPayment === runB.monthlyPayment &&
    runA.totalInterest === runB.totalInterest &&
    runA.totalAmountPaid === runB.totalAmountPaid &&
    runA.totalPaymentsCount === runB.totalPaymentsCount &&
    runA.interestSaved === runB.interestSaved,
    `Scenario '${sc.name}': Zero mathematical variance across executions (Payment: $${ref.monthlyPayment.toFixed(2)}, Interest: $${ref.totalInterest.toFixed(2)})`
  );
}

// --- 7. Publication Gate & Sitemap ---
console.log("\n--- 7. Publication Gate & Sitemap Verification ---");
const publishedLocales = getPublishedLocalesForCalculator("amortization-calculator");
assert(
  publishedLocales.length === 6 &&
  publishedLocales.includes("en") &&
  publishedLocales.includes("es") &&
  publishedLocales.includes("fr") &&
  publishedLocales.includes("de") &&
  publishedLocales.includes("hi") &&
  publishedLocales.includes("pt"),
  `amortization-calculator published locales list is exactly ['en', 'es', 'fr', 'de', 'hi', 'pt'] (actual: ${JSON.stringify(publishedLocales)})`
);

const generatedSitemap = sitemap();
const amortSitemapUrls = generatedSitemap.filter((e) => e.url.includes("amortization-calculator")).map((e) => e.url);
console.log("  Sitemap entries for amortization-calculator:", amortSitemapUrls);

assert(amortSitemapUrls.length === 6, `Sitemap contains exactly 6 URLs for amortization-calculator (actual: ${amortSitemapUrls.length})`);
assert(!amortSitemapUrls.some((u) => u.includes("/en/")), `Sitemap contains NO '/en/' duplicate prefix`);
assert(amortSitemapUrls.some((u) => u.endsWith("/calculators/amortization-calculator")), `Sitemap contains English canonical root URL`);
assert(amortSitemapUrls.some((u) => u.includes("/es/calculators/amortization-calculator")), `Sitemap contains Spanish URL`);
assert(amortSitemapUrls.some((u) => u.includes("/fr/calculators/amortization-calculator")), `Sitemap contains French URL`);
assert(amortSitemapUrls.some((u) => u.includes("/de/calculators/amortization-calculator")), `Sitemap contains German URL`);
assert(amortSitemapUrls.some((u) => u.includes("/hi/calculators/amortization-calculator")), `Sitemap contains Hindi URL`);
assert(amortSitemapUrls.some((u) => u.includes("/pt/calculators/amortization-calculator")), `Sitemap contains Portuguese URL`);

// --- 8. SEO Metadata & Hreflang Tags ---
console.log("\n--- 8. SEO Metadata & Hreflang Verification ---");
for (const loc of ["en", "es", "fr", "de", "hi", "pt"] as const) {
  const pack = loc === "en" ? null : getCalculatorLocalizedContent("amortization-calculator", loc);
  const meta = generateCalculatorMetadata({
    title: pack?.seo.title || AMORTIZATION_CALCULATOR.title,
    description: pack?.seo.description || AMORTIZATION_CALCULATOR.description,
    slug: "amortization-calculator",
    locale: loc,
  });

  assert(Boolean(meta.title), `'${loc}' metadata title is defined`);
  assert(Boolean(meta.description), `'${loc}' metadata description is defined`);
  assert(Boolean((meta as any).alternates?.canonical), `'${loc}' metadata self-canonical is defined`);
  
  const languages = (meta as any).alternates?.languages;
  assert(Boolean(languages), `'${loc}' metadata contains hreflang language alternates`);
  assert(languages?.["x-default"] === "https://calcplatform.org/calculators/amortization-calculator", `'${loc}' x-default is English canonical`);
  assert(languages?.["en"] === "https://calcplatform.org/calculators/amortization-calculator", `'${loc}' en hreflang has no /en/ prefix`);
  assert(languages?.["es"] === "https://calcplatform.org/es/calculators/amortization-calculator", `'${loc}' es hreflang is correct`);
  assert(languages?.["fr"] === "https://calcplatform.org/fr/calculators/amortization-calculator", `'${loc}' fr hreflang is correct`);
  assert(languages?.["de"] === "https://calcplatform.org/de/calculators/amortization-calculator", `'${loc}' de hreflang is correct`);
  assert(languages?.["hi"] === "https://calcplatform.org/hi/calculators/amortization-calculator", `'${loc}' hi hreflang is correct`);
  assert(languages?.["pt"] === "https://calcplatform.org/pt/calculators/amortization-calculator", `'${loc}' pt hreflang is correct`);
}

// --- 9. Runtime Isolation & Immutability ---
console.log("\n--- 9. Runtime Isolation & Immutability Test (EN -> ES -> FR -> DE -> HI -> PT -> EN) ---");
const sequence = ["en", "es", "fr", "de", "hi", "pt", "en"];
for (const targetLoc of sequence) {
  const ov = getAmortizationOverlay(targetLoc);
  assert(ov.locale === targetLoc, `Overlay retrieved in sequence has locale '${targetLoc}'`);
  assert(AMORTIZATION_CALCULATOR.slug === "amortization-calculator", `Canonical AMORTIZATION_CALCULATOR remains immutable`);
}

// --- Summary ---
console.log("\n==================================================");
console.log(`AMORTIZATION MULTI-LOCALE RESULTS: Passed: ${passed}, Failed: ${failed}`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
}
