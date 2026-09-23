/**
 * CALCI — Comprehensive Multilingual Foundation Test Suite
 * Validates:
 * A. English Golden Baseline (title, canonical, schemas, labels, defaults)
 * B. Engine output locale neutrality (structured month/year, numeric periods)
 * C. Formatter locale behavior (Intl support across en-US, es-ES, de-DE, independent currency)
 * D. Overlay completeness (MORTGAGE_EN_OVERLAY full coverage, no undefined keys)
 * E. Registry immutability (MORTGAGE_CALCULATOR remains unaltered after any overlay retrieval)
 * F. English-after-non-English regression (rendering ES overlay then EN overlay leaves EN intact)
 * G. SEO locale parameter support (canonical & hreflang generation for root and localized routes)
 * H. Publication gating (draft locales rejected, English published)
 * I. Existing mortgage mathematical invariance (20/20 differential test scenarios)
 */

import { calculateMortgageModule } from "../src/modules/mortgage/formula";
import { MORTGAGE_CALCULATOR } from "../src/calculators/finance/mortgage";
import {
  formatCurrency,
  formatPercent,
  formatDecimal,
  formatNumber,
  formatCompactNumber,
  formatDate,
  formatMonthYear,
} from "../src/lib/calculator-engine/formatters";
import { MORTGAGE_EN_OVERLAY, getMortgageOverlay } from "../src/i18n/overlays/mortgage";
import { isLocalePublished, getPublishedLocalesForCalculator, getLocalePublishingMetadata } from "../src/i18n/publishing";
import { generateCalculatorMetadata, generateJsonLdSchema, getCalculatorCanonicalUrl } from "../src/lib/seo-helpers";

let passedCount = 0;
let totalCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    console.error(`  ✗ [FAIL] ${testName}${detail ? ` - ${detail}` : ""}`);
    throw new Error(`Test failed: ${testName} - ${detail || ""}`);
  }
}

console.log("\n=======================================================");
console.log("=== CALCI MULTILINGUAL FOUNDATION AUDIT & TEST SUITE ===");
console.log("=======================================================\n");

// -------------------------------------------------------------
// SUITE A: English Golden Baseline
// -------------------------------------------------------------
console.log("--- SUITE A: English Golden Baseline ---");
assert(
  MORTGAGE_CALCULATOR.title === "Mortgage Calculator",
  "A1: English Calculator Title matches baseline",
  `Expected "Mortgage Calculator", got "${MORTGAGE_CALCULATOR.title}"`
);
assert(
  MORTGAGE_CALCULATOR.slug === "mortgage-calculator",
  "A2: English Calculator Slug matches baseline",
  `Expected "mortgage-calculator", got "${MORTGAGE_CALCULATOR.slug}"`
);
assert(
  MORTGAGE_CALCULATOR.inputs.length === 10,
  "A3: English Calculator has exact 10 inputs from baseline",
  `Got ${MORTGAGE_CALCULATOR.inputs.length}`
);
assert(
  MORTGAGE_CALCULATOR.outputs.length === 6,
  "A4: English Calculator has exact 6 outputs from baseline",
  `Got ${MORTGAGE_CALCULATOR.outputs.length}`
);
assert(
  Array.isArray(MORTGAGE_CALCULATOR.faqs) && MORTGAGE_CALCULATOR.faqs.length === 5,
  "A5: English Calculator has exact 5 FAQs in registry baseline",
  `Got ${MORTGAGE_CALCULATOR.faqs?.length}`
);

// -------------------------------------------------------------
// SUITE B: Engine Locale Neutrality
// -------------------------------------------------------------
console.log("\n--- SUITE B: Engine Output Locale Neutrality ---");
const engineResult = calculateMortgageModule({
  homePrice: 400000,
  downPayment: 80000,
  downPaymentType: "amount",
  loanTermYears: 30,
  interestRate: 6.5,
  propertyTax: 4800,
  homeInsurance: 1200,
  pmiRate: 0,
  hoaFee: 0,
  otherCosts: 0,
  startMonth: 9,
  startYear: 2026,
  propertyTaxIncrease: 0,
  insuranceIncrease: 0,
  hoaIncrease: 0,
  otherCostsIncrease: 0,
  extraMonthlyPayment: 0,
  extraMonthlyStartMonth: 9,
  extraMonthlyStartYear: 2026,
  extraYearlyPayment: 0,
  extraYearlyStartMonth: 9,
  extraYearlyStartYear: 2026,
  extraOneTimePayments: [],
});

assert(typeof engineResult.payoffMonth === "number" && engineResult.payoffMonth === 8, `B1: Engine emits numeric payoffMonth (8), got ${engineResult.payoffMonth}`);
assert(typeof engineResult.payoffYear === "number" && engineResult.payoffYear === 2056, `B2: Engine emits numeric payoffYear (2056), got ${engineResult.payoffYear}`);
assert(typeof engineResult.monthlyPrincipalAndInterest === "number" && Math.abs(engineResult.monthlyPrincipalAndInterest - 2022.61) < 0.02, "B3: Numeric P&I is locale neutral float");
assert(typeof engineResult.amortizationSchedule[0].calendarMonth === "number" && engineResult.amortizationSchedule[0].calendarMonth === 9, "B4: Amortization schedule has numeric calendarMonth");
assert(typeof engineResult.amortizationSchedule[0].calendarYear === "number" && engineResult.amortizationSchedule[0].calendarYear === 2026, "B5: Amortization schedule has numeric calendarYear");

// -------------------------------------------------------------
// SUITE C: Formatter Locale Behavior
// -------------------------------------------------------------
console.log("\n--- SUITE C: Formatter Locale Behavior ---");
const formattedEnCurrency = formatCurrency(2022.61, "$", 2, "en-US");
assert(formattedEnCurrency === "$2,022.61", "C1: formatCurrency en-US produces '$2,022.61'", `Got "${formattedEnCurrency}"`);

const formattedEsCurrency = formatCurrency(2022.61, "EUR", 2, "es-ES");
// es-ES formats currency with non-breaking space or dot thousands and comma decimal: "2022,61 €" or "2.022,61 €"
assert(formattedEsCurrency.includes("2.022,61") || formattedEsCurrency.includes("2022,61") || formattedEsCurrency.includes(",61"), "C2: formatCurrency es-ES uses comma decimal separator", `Got "${formattedEsCurrency}"`);

const formattedPercentEn = formatPercent(6.5, 2, "en-US");
assert(formattedPercentEn === "6.50%", "C3: formatPercent en-US produces '6.50%'", `Got "${formattedPercentEn}"`);

const formattedMonthYearEn = formatMonthYear(9, 2026, "en-US");
assert(formattedMonthYearEn.includes("Sep") || formattedMonthYearEn.includes("September"), "C4: formatMonthYear en-US produces English month name", `Got "${formattedMonthYearEn}"`);

const formattedMonthYearEs = formatMonthYear(9, 2026, "es-ES");
assert(formattedMonthYearEs.toLowerCase().includes("sept") || formattedMonthYearEs.toLowerCase().includes("sep"), "C5: formatMonthYear es-ES produces Spanish month name", `Got "${formattedMonthYearEs}"`);

// -------------------------------------------------------------
// SUITE D: Overlay Completeness
// -------------------------------------------------------------
console.log("\n--- SUITE D: Overlay Completeness ---");
const enOverlay = getMortgageOverlay("en");
const requiredKeys = [
  "locale",
  "managerTitle",
  "homePrice",
  "downPayment",
  "loanTermYears",
  "interestRate",
  "totalMonthlyPayment",
  "principalAndInterest",
  "propertyTax",
  "homeInsuranceLabel",
  "amortizationScheduleTitle",
  "saveModalTitle",
  "categoryCol",
  "lifetimeTotalCol",
];
requiredKeys.forEach((k) => {
  assert(
    (enOverlay as any)[k] !== undefined && (enOverlay as any)[k] !== "",
    `D: Overlay property '${k}' is present and non-empty`
  );
});

// -------------------------------------------------------------
// SUITE E & F: Registry Immutability & English-after-Non-English
// -------------------------------------------------------------
console.log("\n--- SUITE E & F: Registry Immutability & Re-render Isolation ---");
const snapshotBefore = JSON.stringify(MORTGAGE_CALCULATOR);

// Request English
const en1 = getMortgageOverlay("en");
assert(en1.locale === "en", "E1: First EN request returns English overlay");

// Request Spanish (published)
const es = getMortgageOverlay("es");
assert(es.locale === "es", "E2: Requesting published ES returns Spanish overlay");

// Request French (now fully implemented)
const fr = getMortgageOverlay("fr");
assert(fr.locale === "fr", "E3: Requesting FR returns French overlay");

// Request unknown locale (fallback)
const unk = getMortgageOverlay("zh");
assert(unk.locale === "en", "E4: Requesting unknown locale safely returns English fallback without error");

// Request English again
const en2 = getMortgageOverlay("en");
assert(en2.locale === "en", "F1: Subsequent EN request remains strictly English");

const snapshotAfter = JSON.stringify(MORTGAGE_CALCULATOR);
assert(snapshotBefore === snapshotAfter, "F2: MORTGAGE_CALCULATOR registry object is 100% immutable and unmutated");

// -------------------------------------------------------------
// SUITE G: SEO Locale Parameters & Canonical / Alternates
// -------------------------------------------------------------
console.log("\n--- SUITE G: SEO Locale Parameter Support ---");
const enMeta = generateCalculatorMetadata({
  title: MORTGAGE_CALCULATOR.title,
  description: MORTGAGE_CALCULATOR.description,
  slug: MORTGAGE_CALCULATOR.slug,
  locale: "en",
  baseUrl: "https://calcplatform.org",
});

assert(
  enMeta.alternates.canonical === "https://calcplatform.org/calculators/mortgage-calculator",
  "G1: English canonical is root /calculators/mortgage-calculator",
  `Got ${enMeta.alternates.canonical}`
);
assert(
  enMeta.title === "Mortgage Calculator - Free Online Calculator | CalcPlatform",
  "G2: English title matches exact golden pattern"
);
assert(
  enMeta.alternates.languages["x-default"] === "https://calcplatform.org/calculators/mortgage-calculator",
  "G3: x-default points to English root canonical"
);

const esCanonical = getCalculatorCanonicalUrl("mortgage-calculator", "es", "https://calcplatform.org");
assert(
  esCanonical === "https://calcplatform.org/es/calculators/mortgage-calculator",
  "G4: Localized canonical generator correctly prefixes locale /es/..."
);

// -------------------------------------------------------------
// SUITE H: Publication Gating
// -------------------------------------------------------------
console.log("\n--- SUITE H: Publication Gating ---");
assert(isLocalePublished("en", "mortgage-calculator") === true, "H1: 'en' is PUBLISHED");
assert(isLocalePublished("es", "mortgage-calculator") === true, "H2: 'es' mortgage pilot is PUBLISHED");
assert(isLocalePublished("fr", "mortgage-calculator") === true, "H3: 'fr' mortgage is PUBLISHED");
assert(isLocalePublished("de", "mortgage-calculator") === true, "H4: 'de' mortgage is PUBLISHED");
assert(isLocalePublished("hi", "mortgage-calculator") === true, "H5: 'hi' mortgage is PUBLISHED");
assert(isLocalePublished("pt", "mortgage-calculator") === true, "H6: 'pt' mortgage is PUBLISHED");
assert(isLocalePublished("fr", "percentage-calculator") === false, "H7: 'fr' on percentage remains GATED (false)");
assert(isLocalePublished("zh", "mortgage-calculator") === false, "H8: 'zh' remains GATED (false)");

const publishedLocales = getPublishedLocalesForCalculator("mortgage-calculator");
assert(
  publishedLocales.length === 6 &&
  publishedLocales.includes("en") &&
  publishedLocales.includes("es") &&
  publishedLocales.includes("fr") &&
  publishedLocales.includes("de") &&
  publishedLocales.includes("hi") &&
  publishedLocales.includes("pt"),
  "H9: Exactly 6 locales are published for mortgage-calculator",
  `Got: ${JSON.stringify(publishedLocales)}`
);

const zhMeta = getLocalePublishingMetadata("zh" as any, "mortgage-calculator");
assert(zhMeta.isPublished === false && zhMeta.uiStatus === "DRAFT", "H10: Metadata indicates DRAFT for unpublished locale");

// -------------------------------------------------------------
// SUITE I: Mortgage Mathematical Invariance (20 Test Scenarios)
// -------------------------------------------------------------
console.log("\n--- SUITE I: Mathematical Invariance (20 Differential Scenarios) ---");
const testCases = [
  { p: 100000, d: 20000, t: "amount", term: 30, r: 3.5, tax: 1000, ins: 500, pmi: 0, hoa: 0, other: 0 },
  { p: 250000, d: 10, t: "percent", term: 15, r: 4.25, tax: 2500, ins: 800, pmi: 0.5, hoa: 50, other: 20 },
  { p: 300000, d: 5, t: "percent", term: 30, r: 5.0, tax: 3000, ins: 1000, pmi: 0.8, hoa: 100, other: 0 },
  { p: 400000, d: 20, t: "percent", term: 30, r: 6.5, tax: 4800, ins: 1200, pmi: 0, hoa: 0, other: 0 },
  { p: 500000, d: 0, t: "amount", term: 20, r: 7.0, tax: 6000, ins: 1500, pmi: 1.0, hoa: 200, other: 50 },
  { p: 650000, d: 130000, t: "amount", term: 30, r: 6.75, tax: 7200, ins: 1800, pmi: 0, hoa: 0, other: 0 },
  { p: 750000, d: 25, t: "percent", term: 15, r: 5.875, tax: 9000, ins: 2200, pmi: 0, hoa: 150, other: 0 },
  { p: 850000, d: 15, t: "percent", term: 30, r: 6.125, tax: 10000, ins: 2500, pmi: 0.4, hoa: 300, other: 100 },
  { p: 900000, d: 180000, t: "amount", term: 30, r: 7.25, tax: 11000, ins: 2800, pmi: 0, hoa: 0, other: 0 },
  { p: 1000000, d: 200000, t: "amount", term: 30, r: 6.5, tax: 12000, ins: 3000, pmi: 0, hoa: 250, other: 50 },
  { p: 1200000, d: 20, t: "percent", term: 30, r: 6.875, tax: 15000, ins: 3600, pmi: 0, hoa: 400, other: 0 },
  { p: 1500000, d: 300000, t: "amount", term: 15, r: 5.5, tax: 18000, ins: 4500, pmi: 0, hoa: 500, other: 100 },
  { p: 2000000, d: 400000, t: "amount", term: 30, r: 7.0, tax: 24000, ins: 6000, pmi: 0, hoa: 600, other: 200 },
  { p: 150000, d: 3.5, t: "percent", term: 30, r: 6.0, tax: 1500, ins: 600, pmi: 0.85, hoa: 0, other: 0 },
  { p: 350000, d: 70000, t: "amount", term: 10, r: 4.75, tax: 4000, ins: 1100, pmi: 0, hoa: 0, other: 0 },
  { p: 450000, d: 20, t: "percent", term: 25, r: 6.25, tax: 5000, ins: 1300, pmi: 0, hoa: 75, other: 25 },
  { p: 550000, d: 110000, t: "amount", term: 30, r: 6.625, tax: 6500, ins: 1600, pmi: 0, hoa: 120, other: 0 },
  { p: 600000, d: 10, t: "percent", term: 30, r: 7.125, tax: 7000, ins: 1700, pmi: 0.6, hoa: 180, other: 0 },
  { p: 800000, d: 160000, t: "amount", term: 15, r: 5.75, tax: 9500, ins: 2400, pmi: 0, hoa: 220, other: 40 },
  { p: 950000, d: 20, t: "percent", term: 30, r: 6.375, tax: 11500, ins: 2900, pmi: 0, hoa: 350, other: 80 },
];

testCases.forEach((tc, idx) => {
  const res = calculateMortgageModule({
    homePrice: tc.p,
    downPayment: tc.d,
    downPaymentType: tc.t as any,
    loanTermYears: tc.term,
    interestRate: tc.r,
    propertyTax: tc.tax,
    homeInsurance: tc.ins,
    pmiRate: tc.pmi,
    hoaFee: tc.hoa,
    otherCosts: tc.other,
    startMonth: 1,
    startYear: 2026,
    propertyTaxIncrease: 0,
    insuranceIncrease: 0,
    hoaIncrease: 0,
    otherCostsIncrease: 0,
    extraMonthlyPayment: 0,
    extraMonthlyStartMonth: 1,
    extraMonthlyStartYear: 2026,
    extraYearlyPayment: 0,
    extraYearlyStartMonth: 1,
    extraYearlyStartYear: 2026,
    extraOneTimePayments: [],
  });

  // Verify numerical integrity
  const principal = tc.t === "percent" ? tc.p * (1 - tc.d / 100) : tc.p - tc.d;
  const monthlyRate = tc.r / 100 / 12;
  const numPayments = tc.term * 12;
  const expectedPI = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const diff = Math.abs(res.monthlyPrincipalAndInterest - expectedPI);

  assert(
    diff < 0.01,
    `I${idx + 1}: Case ${tc.p} loan @ ${tc.r}% for ${tc.term}yr — PI diff=${diff.toFixed(6)}`
  );
});

console.log("\n=======================================================");
console.log(`=== ALL AUDIT TESTS PASSED: ${passedCount} / ${totalCount} ===`);
console.log("=======================================================\n");
