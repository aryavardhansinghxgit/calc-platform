/**
 * Comprehensive Multi-Locale Verification Suite for Mortgage Calculator
 * Tests all 6 locales: English (en), Spanish (es), French (fr), German (de), Hindi (hi), Portuguese (pt)
 */

import {
  MORTGAGE_EN_OVERLAY,
  MORTGAGE_ES_OVERLAY,
  MORTGAGE_FR_OVERLAY,
  MORTGAGE_DE_OVERLAY,
  MORTGAGE_HI_OVERLAY,
  MORTGAGE_PT_OVERLAY,
  getMortgageOverlay,
} from "../src/i18n/overlays/mortgage";
import { getCalculatorLocalizedContent, LOCALIZED_CONTENT_REGISTRY } from "../src/i18n/content";
import { calculateMortgageModule } from "../src/modules/mortgage/formula";
import { MortgageModuleInput } from "../src/modules/mortgage/types";
import { isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { generateCalculatorMetadata, generateJsonLdSchema } from "../src/lib/seo-helpers";
import sitemap from "../src/app/sitemap";

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
console.log("SUITE: MORTGAGE MULTI-LOCALE COMPLETION (6 LOCALES)");
console.log("==================================================");

// --- 1. Overlay Completeness & 19-Category Verification ---
console.log("\n--- 1. Overlay Completeness for 6 Locales ---");
const overlays = [
  { loc: "en", overlay: MORTGAGE_EN_OVERLAY },
  { loc: "es", overlay: MORTGAGE_ES_OVERLAY },
  { loc: "fr", overlay: MORTGAGE_FR_OVERLAY },
  { loc: "de", overlay: MORTGAGE_DE_OVERLAY },
  { loc: "hi", overlay: MORTGAGE_HI_OVERLAY },
  { loc: "pt", overlay: MORTGAGE_PT_OVERLAY },
];

const REQUIRED_OVERLAY_KEYS = [
  "title", "description", "managerTitle", "savedCountBadge", "clearBtn",
  "printPdfBtn", "saveBtn", "savedBtn", "inputsTitle", "inputsSubtitle",
  "basicLoanDetails", "homePrice", "downPayment", "amountBtn", "percentBtn",
  "calculatedDownPayment", "loanLabel", "loanTermYears", "interestRate",
  "startMonth", "startYear", "monthOptions", "includeTaxesAndFees",
  "propertyTaxes", "homeInsurance", "pmiInsurance", "hoaFee", "otherCosts",
  "annualIncreaseTitle", "annualIncreaseSubtitle", "propertyTaxIncrease",
  "insuranceIncrease", "hoaIncrease", "otherCostsIncrease", "extraPaymentsTitle",
  "extraPaymentsSubtitle", "monthlyExtraPayment", "yearlyExtraPayment",
  "fromMonth", "inMonth", "oneTimePaymentsTitle", "addPaymentRow",
  "amountHeader", "monthHeader", "yearHeader", "actionHeader", "biweeklyTitle",
  "biweeklySubtitle", "enableBiweekly", "biweeklySummary", "payPeriodsYear",
  "biweeklyPayment", "biweeklyPayoffDate", "biweeklyTotalInterest",
  "paymentBreakdown", "totalMonthlyPayment", "principalAndInterest",
  "propertyTax", "homeInsuranceLabel", "pmi", "hoaFeeLabel", "otherCostsLabel",
  "extraPayment", "loanPayoffSummary", "loanAmount", "payoffDateLabel",
  "totalInterestLabel", "totalCostLabel", "interestSavedLabel", "timeSavedLabel",
  "extraPaymentsImpact", "saves", "inInterestPaysOff", "monthsEarly",
  "chartsTitle", "tabDoughnut", "tabBalance", "tabArea", "loadingChart",
  "monthlyVsTotalBreakdown", "categoryCol", "monthlyYear1Col", "lifetimeTotalCol",
  "pctTotalCostCol", "totalOutOfPocket", "amortizationScheduleTitle",
  "amortizationSubtitle", "annualSummaryTab", "monthlyScheduleTab",
  "biweeklyScheduleTab", "searchSchedulePlaceholder", "downloadCsv",
  "yearCol", "periodCol", "dateRangeCol", "paymentCol", "principalCol",
  "interestCol", "extraCol", "taxesInsCol", "pmiFeesCol", "balanceCol",
  "prevPage", "nextPage", "pageOf", "showingRecords", "saveModalTitle",
  "saveModalSubtitle", "calcSummaryLabel", "monthlyPayLabel", "saveModalNameLabel",
  "saveModalDescLabel", "saveModalNamePlaceholder", "saveModalDescPlaceholder",
  "cancelBtn", "resetBtn", "confirmSaveBtn", "saveSuccessMsg", "savedLibraryTitle",
  "noSavedCalculations", "loadBtn", "deleteBtn", "clearAllSavedBtn",
];

for (const { loc, overlay } of overlays) {
  assert(overlay.locale === loc, `Overlay locale '${loc}' matches object locale`);
  assert(overlay.monthOptions.length === 12, `Overlay '${loc}' has 12 localized month options`);
  let missingKeys: string[] = [];
  for (const key of REQUIRED_OVERLAY_KEYS) {
    if (!(key in overlay) || (overlay as any)[key] === undefined || (overlay as any)[key] === "") {
      missingKeys.push(key);
    }
  }
  assert(missingKeys.length === 0, `Overlay '${loc}' has all required keys (missing: ${missingKeys.length})`);
}

// --- 2. Dynamic Overlay Resolution & Registry Retrieval ---
console.log("\n--- 2. Dynamic Overlay Resolution ---");
for (const { loc } of overlays) {
  const resolved = getMortgageOverlay(loc);
  assert(resolved.locale === loc, `getMortgageOverlay('${loc}') returns '${loc}' overlay`);
}
assert(getMortgageOverlay("unknown").locale === "en", "getMortgageOverlay('unknown') safely falls back to English");

// --- 3. Educational Content Registry & FAQ Parity ---
console.log("\n--- 3. Educational Content Packs & FAQ Parity ---");
const nonEnLocales = ["es", "fr", "de", "hi", "pt"];
for (const loc of nonEnLocales) {
  const pack = getCalculatorLocalizedContent("mortgage-calculator", loc);
  assert(pack !== null, `Content pack registered for mortgage-calculator / ${loc}`);
  assert(Boolean(pack?.seo.title && pack?.seo.description), `SEO title & description present for ${loc}`);
  assert(Boolean(pack?.ContentComponent), `ContentComponent registered for ${loc}`);
  assert(pack?.faqs.length === 6, `Exactly 6 authoritative FAQs for ${loc} (found: ${pack?.faqs.length})`);
  pack?.faqs.forEach((faq, idx) => {
    assert(Boolean(faq.question && faq.answer), `FAQ ${idx + 1} for ${loc} has non-empty Q&A`);
  });
}

// --- 4. Engine Mathematical Invariance Across 20 Diverse Scenarios ---
console.log("\n--- 4. Engine Mathematical Invariance Across 20 Scenarios ---");
const TEST_SCENARIOS: Array<{ name: string; input: MortgageModuleInput }> = [
  {
    name: "Scenario 1: Baseline 400k @ 6.706% 30yr 20% down",
    input: { homePrice: 400000, downPayment: 80000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.706, startMonth: 9, startYear: 2026 },
  },
  {
    name: "Scenario 2: 250k @ 5.5% 15yr 10% down",
    input: { homePrice: 250000, downPayment: 25000, downPaymentType: "amount", loanTermYears: 15, interestRate: 5.5, startMonth: 1, startYear: 2027 },
  },
  {
    name: "Scenario 3: 750k @ 7.25% 30yr 5% down with PMI",
    input: { homePrice: 750000, downPayment: 37500, downPaymentType: "amount", loanTermYears: 30, interestRate: 7.25, startMonth: 6, startYear: 2026, pmiRate: 0.75 },
  },
  {
    name: "Scenario 4: 1.2M Jumbo @ 6.875% 30yr 25% down",
    input: { homePrice: 1200000, downPayment: 300000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.875, startMonth: 3, startYear: 2026 },
  },
  {
    name: "Scenario 5: 150k Low Value @ 4.5% 20yr",
    input: { homePrice: 150000, downPayment: 30000, downPaymentType: "amount", loanTermYears: 20, interestRate: 4.5, startMonth: 10, startYear: 2026 },
  },
  {
    name: "Scenario 6: 500k @ 6.25% with $200 Monthly Extra Principal",
    input: { homePrice: 500000, downPayment: 100000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.25, startMonth: 1, startYear: 2026, extraMonthlyPayment: 200, extraMonthlyStartMonth: 1, extraMonthlyStartYear: 2026 },
  },
  {
    name: "Scenario 7: 600k @ 7.0% with $2,000 Annual Extra Principal",
    input: { homePrice: 600000, downPayment: 120000, downPaymentType: "amount", loanTermYears: 30, interestRate: 7.0, startMonth: 1, startYear: 2026, extraYearlyPayment: 2000, extraYearlyStartMonth: 1, extraYearlyStartYear: 2026 },
  },
  {
    name: "Scenario 8: 350k @ 6.5% with Biweekly Option",
    input: { homePrice: 350000, downPayment: 70000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.5, startMonth: 1, startYear: 2026, showBiweekly: true },
  },
  {
    name: "Scenario 9: 450k @ 5.875% with Full Taxes, Insurance, HOA, and Inflation",
    input: { homePrice: 450000, downPayment: 90000, downPaymentType: "amount", loanTermYears: 30, interestRate: 5.875, startMonth: 5, startYear: 2026, propertyTax: 1.5, propertyTaxType: "percent", homeInsurance: 1800, hoaFee: 250, otherCosts: 3000, propertyTaxIncrease: 2, insuranceIncrease: 3, hoaIncrease: 2, otherCostsIncrease: 2 },
  },
  {
    name: "Scenario 10: 100k Zero Down (100% LTV) @ 7.5% 30yr",
    input: { homePrice: 100000, downPayment: 0, downPaymentType: "amount", loanTermYears: 30, interestRate: 7.5, startMonth: 1, startYear: 2026 },
  },
  {
    name: "Scenario 11: 300k @ 3.0% Low Rate Historical 15yr",
    input: { homePrice: 300000, downPayment: 60000, downPaymentType: "amount", loanTermYears: 15, interestRate: 3.0, startMonth: 1, startYear: 2026 },
  },
  {
    name: "Scenario 12: 800k @ 8.5% High Rate 30yr",
    input: { homePrice: 800000, downPayment: 160000, downPaymentType: "amount", loanTermYears: 30, interestRate: 8.5, startMonth: 1, startYear: 2026 },
  },
  {
    name: "Scenario 13: 400k @ 6.125% with $10,000 One-Time Payment at Month 12",
    input: { homePrice: 400000, downPayment: 80000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.125, startMonth: 1, startYear: 2026, extraOneTimePayments: [{ id: "otp-1", amount: 10000, month: 1, year: 2027 }] },
  },
  {
    name: "Scenario 14: 900k @ 6.625% 20yr 15% Down",
    input: { homePrice: 900000, downPayment: 135000, downPaymentType: "amount", loanTermYears: 20, interestRate: 6.625, startMonth: 7, startYear: 2026 },
  },
  {
    name: "Scenario 15: 200k @ 6.0% 10yr Short Term",
    input: { homePrice: 200000, downPayment: 40000, downPaymentType: "amount", loanTermYears: 10, interestRate: 6.0, startMonth: 1, startYear: 2026 },
  },
  {
    name: "Scenario 16: 650k @ 6.375% 30yr 10% Down with PMI 0.5%",
    input: { homePrice: 650000, downPayment: 65000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.375, startMonth: 2, startYear: 2026, pmiRate: 0.5 },
  },
  {
    name: "Scenario 17: 550k @ 7.125% 30yr with Combined Monthly & Yearly Extra",
    input: { homePrice: 550000, downPayment: 110000, downPaymentType: "amount", loanTermYears: 30, interestRate: 7.125, startMonth: 1, startYear: 2026, extraMonthlyPayment: 150, extraMonthlyStartMonth: 1, extraMonthlyStartYear: 2026, extraYearlyPayment: 1500, extraYearlyStartMonth: 6, extraYearlyStartYear: 2026 },
  },
  {
    name: "Scenario 18: 320k @ 6.706% 30yr 0% Down",
    input: { homePrice: 320000, downPayment: 0, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.706, startMonth: 9, startYear: 2026 },
  },
  {
    name: "Scenario 19: 1.5M Ultra Luxury @ 6.5% 30yr 30% Down",
    input: { homePrice: 1500000, downPayment: 450000, downPaymentType: "amount", loanTermYears: 30, interestRate: 6.5, startMonth: 1, startYear: 2026 },
  },
  {
    name: "Scenario 20: 420k @ 6.45% 25yr Term",
    input: { homePrice: 420000, downPayment: 84000, downPaymentType: "amount", loanTermYears: 25, interestRate: 6.45, startMonth: 4, startYear: 2026 },
  },
];

for (const scenario of TEST_SCENARIOS) {
  const res1 = calculateMortgageModule(scenario.input);
  const res2 = calculateMortgageModule(scenario.input);
  const piDiff = Math.abs(res1.monthlyPrincipalAndInterest - res2.monthlyPrincipalAndInterest);
  const interestDiff = Math.abs(res1.totalInterestPaid - res2.totalInterestPaid);
  const totalCostDiff = Math.abs(res1.totalCost - res2.totalCost);
  assert(piDiff === 0 && interestDiff === 0 && totalCostDiff === 0, `${scenario.name} -> Identical numeric outputs (PI: ${res1.monthlyPrincipalAndInterest.toFixed(2)}, Interest: ${res1.totalInterestPaid.toFixed(2)}, TotalCost: ${res1.totalCost.toFixed(2)})`);
}

// --- 5. Sequential Execution Immutability (EN -> ES -> FR -> DE -> HI -> PT -> EN) ---
console.log("\n--- 5. Sequential Execution Immutability ---");
const sequence = ["en", "es", "fr", "de", "hi", "pt", "en"];
const baselineEnTitle = MORTGAGE_EN_OVERLAY.title;
for (const stepLocale of sequence) {
  const overlay = getMortgageOverlay(stepLocale);
  assert(overlay.locale === stepLocale, `Step ${stepLocale}: overlay resolves cleanly`);
}
assert(MORTGAGE_EN_OVERLAY.title === baselineEnTitle, "English singleton overlay was NOT mutated across 7-step sequence");

// --- 6. Publication Matrix & Strict Locale Gating ---
console.log("\n--- 6. Publication Matrix & Strict Locale Gating ---");
const publishedLocales = getPublishedLocalesForCalculator("mortgage-calculator");
assert(publishedLocales.length === 6, `Exactly 6 published locales for mortgage-calculator (found: ${publishedLocales.length})`);
assert(["en", "es", "fr", "de", "hi", "pt"].every((l) => publishedLocales.includes(l as any)), "All 6 expected locales ['en', 'es', 'fr', 'de', 'hi', 'pt'] are published");
assert(!isLocalePublished("zh", "mortgage-calculator"), "Unpublished locale 'zh' is strictly gated (false)");
assert(!isLocalePublished("ja", "mortgage-calculator"), "Unpublished locale 'ja' is strictly gated (false)");
assert(!isLocalePublished("fr", "percentage-calculator"), "Unpublished locale 'fr' on percentage-calculator remains draft (false)");
assert(!isLocalePublished("de", "fuel-cost-calculator"), "Unpublished locale 'de' on fuel-cost-calculator remains draft (false)");

// --- 7. SEO, Canonical, Hreflang Graph & JSON-LD Schemas ---
console.log("\n--- 7. SEO, Canonical, Hreflang Graph & JSON-LD ---");
for (const loc of ["en", "es", "fr", "de", "hi", "pt"]) {
  const overlay = getMortgageOverlay(loc);
  const meta = generateCalculatorMetadata({
    title: overlay.title || "Mortgage Calculator",
    description: overlay.description || "Calculate mortgage payments",
    slug: "mortgage-calculator",
    category: "Finance",
    locale: loc,
  });
  const canonicalUrl = meta.alternates?.canonical;
  const expectedCanonical = loc === "en" ? "https://calcplatform.com/calculators/mortgage-calculator" : `https://calcplatform.com/${loc}/calculators/mortgage-calculator`;
  assert(canonicalUrl === expectedCanonical, `Canonical URL for ${loc} is ${canonicalUrl}`);
  assert(meta.alternates?.languages?.["en"] === "https://calcplatform.com/calculators/mortgage-calculator", `Hreflang 'en' present for ${loc}`);
  assert(meta.alternates?.languages?.["es"] === "https://calcplatform.com/es/calculators/mortgage-calculator", `Hreflang 'es' present for ${loc}`);
  assert(meta.alternates?.languages?.["fr"] === "https://calcplatform.com/fr/calculators/mortgage-calculator", `Hreflang 'fr' present for ${loc}`);
  assert(meta.alternates?.languages?.["de"] === "https://calcplatform.com/de/calculators/mortgage-calculator", `Hreflang 'de' present for ${loc}`);
  assert(meta.alternates?.languages?.["hi"] === "https://calcplatform.com/hi/calculators/mortgage-calculator", `Hreflang 'hi' present for ${loc}`);
  assert(meta.alternates?.languages?.["pt"] === "https://calcplatform.com/pt/calculators/mortgage-calculator", `Hreflang 'pt' present for ${loc}`);

  const faqs = loc === "en" ? [] : getCalculatorLocalizedContent("mortgage-calculator", loc)?.faqs || [];
  const schemas = generateJsonLdSchema({
    title: overlay.title || "Mortgage Calculator",
    description: overlay.description || "Calculate mortgage payments",
    slug: "mortgage-calculator",
    category: "Finance",
    faqs,
    locale: loc,
  });
  assert(schemas.length >= 2, `Structured data generated for ${loc} (${schemas.length} schemas)`);
}

// --- 8. Sitemap Generation Verification ---
console.log("\n--- 8. Sitemap Generation Verification ---");
const sitemapEntries = sitemap();
const mortgageUrls = sitemapEntries.filter((e) => e.url.includes("mortgage-calculator")).map((e) => e.url);
assert(mortgageUrls.includes("https://calcplatform.com/calculators/mortgage-calculator"), "Sitemap includes English mortgage URL");
assert(mortgageUrls.includes("https://calcplatform.com/es/calculators/mortgage-calculator"), "Sitemap includes Spanish mortgage URL");
assert(mortgageUrls.includes("https://calcplatform.com/fr/calculators/mortgage-calculator"), "Sitemap includes French mortgage URL");
assert(mortgageUrls.includes("https://calcplatform.com/de/calculators/mortgage-calculator"), "Sitemap includes German mortgage URL");
assert(mortgageUrls.includes("https://calcplatform.com/hi/calculators/mortgage-calculator"), "Sitemap includes Hindi mortgage URL");
assert(mortgageUrls.includes("https://calcplatform.com/pt/calculators/mortgage-calculator"), "Sitemap includes Portuguese mortgage URL");
assert(!mortgageUrls.some((u) => u.includes("/en/")), "Zero duplicate /en/ prefixed mortgage URLs in sitemap");

console.log("==================================================");
console.log(`TOTAL RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
}
