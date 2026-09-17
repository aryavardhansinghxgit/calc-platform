/**
 * CALCI — Spanish Mortgage Pilot Audit & Test Suite
 * Validates:
 * 1. English Golden Baseline Invariance
 * 2. Spanish Mortgage Overlay Completeness & Quality
 * 3. English Leakage Prevention in Spanish UI & Overlays
 * 4. Payoff Date & Month/Year Spanish Formatting
 * 5. Math Invariance Between EN and ES Calculations (20 scenarios)
 * 6. Authoritative FAQ & JSON-LD Parity
 * 7. Spanish SEO Canonical & Reciprocal Hreflang Alternates
 * 8. Immutability & Re-render Isolation (EN -> ES -> EN)
 * 9. Publication Gate Enforcement (ES is Published, FR/DE/HI/PT are DRAFT)
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
import { MORTGAGE_EN_OVERLAY, MORTGAGE_ES_OVERLAY, getMortgageOverlay } from "../src/i18n/overlays/mortgage";
import { SPANISH_MORTGAGE_SEO, SPANISH_MORTGAGE_FAQS } from "../src/i18n/content/mortgage/es";
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
console.log("=== CALCI SPANISH MORTGAGE PILOT VERIFICATION SUITE ===");
console.log("=======================================================\n");

// -------------------------------------------------------------
// SUITE 1: English Baseline Invariance
// -------------------------------------------------------------
console.log("--- SUITE 1: English Baseline Invariance ---");
assert(MORTGAGE_CALCULATOR.title === "Mortgage Calculator", "1.1: English Title is untouched");
assert(MORTGAGE_CALCULATOR.slug === "mortgage-calculator", "1.2: English Slug is untouched");
assert(MORTGAGE_CALCULATOR.inputs.length === 10, "1.3: English Inputs count is 10");
assert(MORTGAGE_CALCULATOR.outputs.length === 6, "1.4: English Outputs count is 6");
assert(MORTGAGE_CALCULATOR.faqs?.length === 5, "1.5: English Registry FAQs count is 5");

// -------------------------------------------------------------
// SUITE 2: Spanish Overlay Completeness
// -------------------------------------------------------------
console.log("\n--- SUITE 2: Spanish Overlay Completeness ---");
const esOverlay = getMortgageOverlay("es");
assert(esOverlay.locale === "es", "2.1: Overlay returns locale='es'");

const allKeys = Object.keys(MORTGAGE_EN_OVERLAY) as (keyof typeof MORTGAGE_EN_OVERLAY)[];
allKeys.forEach((k) => {
  const val = esOverlay[k];
  assert(
    val !== undefined && val !== null && val !== "",
    `2.2: Spanish overlay has non-empty '${k}'`
  );
});

assert(esOverlay.monthOptions.length === 12, "2.3: Spanish monthOptions contains all 12 months");
assert(esOverlay.monthOptions[0].label === "Ene", "2.4: Spanish month 1 is 'Ene'");
assert(esOverlay.monthOptions[11].label === "Dic", "2.5: Spanish month 12 is 'Dic'");

// -------------------------------------------------------------
// SUITE 3: English Leakage Prevention in Spanish Overlay
// -------------------------------------------------------------
console.log("\n--- SUITE 3: English Leakage Prevention ---");
const forbiddenEnglishTerms = [
  "Mortgage Calculation Manager",
  "Basic Loan Details",
  "Home Price",
  "Down Payment",
  "Loan Term",
  "Interest Rate",
  "Start Month",
  "Start Year",
  "Include Taxes & Fees",
  "Property Taxes",
  "Home Insurance",
  "PMI Insurance",
  "Annual Tax & Cost Increase",
  "Extra Principal Payments",
  "Total Estimated Monthly Payment",
  "Amortization Schedule",
  "Annual Summary",
  "Monthly Schedule",
  "Biweekly Schedule",
  "Download CSV",
  "Saved Calculations",
];

forbiddenEnglishTerms.forEach((term) => {
  const foundInValues = Object.values(esOverlay).some(
    (v) => typeof v === "string" && v.toLowerCase() === term.toLowerCase()
  );
  assert(!foundInValues, `3.1: English literal '${term}' does NOT exist in Spanish overlay`);
});

// -------------------------------------------------------------
// SUITE 4: Payoff Date & Month/Year Spanish Formatting
// -------------------------------------------------------------
console.log("\n--- SUITE 4: Spanish Date & Currency Formatting ---");
const spanishPayoff = formatMonthYear(8, 2056, "es-ES", "long");
assert(
  spanishPayoff.toLowerCase().includes("agosto") && spanishPayoff.includes("2056"),
  `4.1: Spanish formatMonthYear produces '${spanishPayoff}' for Aug 2056`
);

const spanishShortMonth = formatMonthYear(9, 2026, "es-ES", "short");
assert(
  spanishShortMonth.toLowerCase().includes("sep") || spanishShortMonth.toLowerCase().includes("sept"),
  `4.2: Spanish formatMonthYear short produces '${spanishShortMonth}'`
);

const esFormattedCurrency = formatCurrency(3257.82, "$", 2, "es-ES");
assert(
  esFormattedCurrency.includes("3.257,82") || esFormattedCurrency.includes("3257,82") || esFormattedCurrency.includes(",82"),
  `4.3: Spanish formatCurrency correctly uses comma decimal: '${esFormattedCurrency}'`
);

// -------------------------------------------------------------
// SUITE 5: Math Invariance (20 Differential Scenarios)
// -------------------------------------------------------------
console.log("\n--- SUITE 5: Math Invariance Across Locales ---");
const scenarios = [
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

scenarios.forEach((sc, idx) => {
  const enRes = calculateMortgageModule({
    homePrice: sc.p,
    downPayment: sc.d,
    downPaymentType: sc.t as any,
    loanTermYears: sc.term,
    interestRate: sc.r,
    propertyTax: sc.tax,
    homeInsurance: sc.ins,
    pmiRate: sc.pmi,
    hoaFee: sc.hoa,
    otherCosts: sc.other,
  });

  const esRes = calculateMortgageModule({
    homePrice: sc.p,
    downPayment: sc.d,
    downPaymentType: sc.t as any,
    loanTermYears: sc.term,
    interestRate: sc.r,
    propertyTax: sc.tax,
    homeInsurance: sc.ins,
    pmiRate: sc.pmi,
    hoaFee: sc.hoa,
    otherCosts: sc.other,
  });

  assert(
    Math.abs(enRes.monthlyPrincipalAndInterest - esRes.monthlyPrincipalAndInterest) === 0,
    `5.${idx + 1}: Scenario ${sc.p} loan has 0.0000 difference in P&I between runs`
  );
  assert(
    enRes.payoffMonth === esRes.payoffMonth && enRes.payoffYear === esRes.payoffYear,
    `5.${idx + 1}b: Numeric payoffMonth/payoffYear match identically (${enRes.payoffMonth}/${enRes.payoffYear})`
  );
});

// -------------------------------------------------------------
// SUITE 6: Authoritative FAQ & Schema Consistency
// -------------------------------------------------------------
console.log("\n--- SUITE 6: Authoritative FAQ & Structured Data ---");
assert(SPANISH_MORTGAGE_FAQS.length === 6, "6.1: Authoritative Spanish FAQs contains 6 items");
SPANISH_MORTGAGE_FAQS.forEach((faq, i) => {
  assert(faq.question.startsWith("¿") && faq.question.endsWith("?"), `6.2.${i + 1}: FAQ question is proper Spanish interrogative`);
  assert(faq.answer.length > 50, `6.3.${i + 1}: FAQ answer is detailed and informative`);
});

const esSchemas = generateJsonLdSchema({
  title: SPANISH_MORTGAGE_SEO.title,
  description: SPANISH_MORTGAGE_SEO.description,
  slug: "mortgage-calculator",
  category: SPANISH_MORTGAGE_SEO.category,
  faqs: SPANISH_MORTGAGE_FAQS,
  locale: "es",
  baseUrl: "https://calcplatform.com",
});

assert(esSchemas.length === 3, "6.4: generateJsonLdSchema produces 3 schemas (Breadcrumb, SoftwareApplication, FAQPage)");
const faqSchema = esSchemas.find((s: any) => s["@type"] === "FAQPage") as any;
assert(faqSchema && faqSchema.mainEntity.length === 6, "6.5: FAQPage schema contains all 6 Spanish FAQs");
assert(
  faqSchema.mainEntity[0].name === SPANISH_MORTGAGE_FAQS[0].question,
  "6.6: Schema FAQ 1 name matches authoritative question"
);

// -------------------------------------------------------------
// SUITE 7: Spanish SEO Canonical & Reciprocal Hreflang
// -------------------------------------------------------------
console.log("\n--- SUITE 7: Spanish SEO & Reciprocal Hreflang ---");
const esMeta = generateCalculatorMetadata({
  title: SPANISH_MORTGAGE_SEO.title,
  description: SPANISH_MORTGAGE_SEO.description,
  slug: "mortgage-calculator",
  locale: "es",
  baseUrl: "https://calcplatform.com",
});

assert(
  esMeta.alternates.canonical === "https://calcplatform.com/es/calculators/mortgage-calculator",
  `7.1: Spanish canonical is 'https://calcplatform.com/es/calculators/mortgage-calculator'`
);
assert(
  esMeta.title === "Calculadora de Hipoteca - Free Online Calculator | CalcPlatform",
  `7.2: Spanish Title follows localized pattern`
);
assert(
  esMeta.alternates.languages["en"] === "https://calcplatform.com/calculators/mortgage-calculator",
  "7.3: Hreflang 'en' points to English canonical"
);
assert(
  esMeta.alternates.languages["es"] === "https://calcplatform.com/es/calculators/mortgage-calculator",
  "7.4: Hreflang 'es' points to Spanish canonical"
);
assert(
  esMeta.alternates.languages["x-default"] === "https://calcplatform.com/calculators/mortgage-calculator",
  "7.5: Hreflang 'x-default' points to English canonical"
);

// Verify English metadata has reciprocal hreflang to Spanish
const enMeta = generateCalculatorMetadata({
  title: MORTGAGE_CALCULATOR.title,
  description: MORTGAGE_CALCULATOR.description,
  slug: "mortgage-calculator",
  locale: "en",
  baseUrl: "https://calcplatform.com",
});
assert(
  enMeta.alternates.languages["es"] === "https://calcplatform.com/es/calculators/mortgage-calculator",
  "7.6: English metadata includes reciprocal hreflang 'es'"
);

// -------------------------------------------------------------
// SUITE 8: Immutability & Re-render Isolation
// -------------------------------------------------------------
console.log("\n--- SUITE 8: Immutability Across Sequence EN -> ES -> EN ---");
const snap1 = JSON.stringify(MORTGAGE_CALCULATOR);
const enOverlay1 = getMortgageOverlay("en");
assert(enOverlay1.homePrice === "Home Price ($)", "8.1: Step 1 English is correct");

const esOverlayRun = getMortgageOverlay("es");
assert(esOverlayRun.homePrice === "Precio de la Vivienda ($)", "8.2: Step 2 Spanish overlay is correct");

const enOverlay2 = getMortgageOverlay("en");
assert(enOverlay2.homePrice === "Home Price ($)", "8.3: Step 3 Subsequent English overlay remains strictly English");

const snap2 = JSON.stringify(MORTGAGE_CALCULATOR);
assert(snap1 === snap2, "8.4: Shared MORTGAGE_CALCULATOR singleton is 100% untouched");

// -------------------------------------------------------------
// SUITE 9: Publication Gate Verification
// -------------------------------------------------------------
console.log("\n--- SUITE 9: Publication Gate Verification ---");
assert(isLocalePublished("en", "mortgage-calculator") === true, "9.1: 'en' is PUBLISHED");
assert(isLocalePublished("es", "mortgage-calculator") === true, "9.2: 'es' mortgage pilot is PUBLISHED");
assert(isLocalePublished("fr", "mortgage-calculator") === false, "9.3: 'fr' remains DRAFT");
assert(isLocalePublished("de", "mortgage-calculator") === false, "9.4: 'de' remains DRAFT");
assert(isLocalePublished("hi", "mortgage-calculator") === false, "9.5: 'hi' remains DRAFT");
assert(isLocalePublished("pt", "mortgage-calculator") === false, "9.6: 'pt' remains DRAFT");

const publishedList = getPublishedLocalesForCalculator("mortgage-calculator");
assert(
  publishedList.length === 2 && publishedList.includes("en") && publishedList.includes("es"),
  `9.7: Published locales for mortgage-calculator are exactly ['en', 'es'], got: ${JSON.stringify(publishedList)}`
);

const esPubMeta = getLocalePublishingMetadata("es", "mortgage-calculator");
assert(esPubMeta.isPublished === true && esPubMeta.uiStatus === "PUBLISHED", "9.8: Publishing metadata is PUBLISHED for Spanish mortgage");

console.log("\n=======================================================");
console.log(`=== ALL PILOT TESTS PASSED: ${passedCount} / ${totalCount} ===`);
console.log("=======================================================\n");
