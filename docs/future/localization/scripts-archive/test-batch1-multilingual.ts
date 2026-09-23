import { PUBLISHED_MATRIX, isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { getCalculatorOverlay } from "../src/i18n/overlays";
import { getCalculatorLocalizedContent, LOCALIZED_CONTENT_REGISTRY } from "../src/i18n/content";
import { generateCalculatorMetadata, generateJsonLdSchema } from "../src/lib/seo-helpers";
import { formatCurrency, formatPercent, formatMonthYear } from "../src/lib/calculator-engine/formatters";

// Math engines for invariance verification
import { solvePercentageOf } from "../src/lib/calculator-engine/formulas/percentage";
import { calculateBmi } from "../src/lib/formulas/bmi";
import { calculateDateDuration, calculateDateOffset } from "../src/lib/calculator-engine/formulas/date-calculator";
import { calculateSlabVolume, calculateColumnVolume } from "../src/lib/calculator-engine/formulas/concrete";
import { convertCurrency } from "../src/app/calculators/currency-calculator/calculator";
import { calculateAutoLoanFormula } from "../src/lib/calculator-engine/formulas/auto-loan";
import { calculateOhmsLawCalculator } from "../src/app/calculators/ohms-law-calculator/calculator";

// Calculator configurations (English baselines)
import { MORTGAGE_CALCULATOR } from "../src/calculators/finance/mortgage";
import { percentage_calculatorConfig } from "../src/app/calculators/percentage-calculator/config";
import { bmi_calculatorConfig } from "../src/app/calculators/bmi-calculator/config";
import { scientific_calculatorConfig } from "../src/app/calculators/scientific-calculator/config";
import { date_calculatorConfig } from "../src/app/calculators/date-calculator/config";
import { concrete_calculatorConfig } from "../src/app/calculators/concrete-calculator/config";
import { currency_calculatorConfig } from "../src/app/calculators/currency-calculator/config";
import { AUTO_LOAN_CONFIG } from "../src/app/calculators/auto-loan-calculator/config";
import { ohms_law_calculatorConfig } from "../src/app/calculators/ohms-law-calculator/config";

const BATCH_1_SLUGS = [
  "percentage-calculator",
  "bmi-calculator",
  "scientific-calculator",
  "date-calculator",
  "concrete-calculator",
  "currency-calculator",
  "auto-loan-calculator",
  "ohms-law-calculator",
];

const TARGET_LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ [FAIL] ${testName} ${detail ? `(${detail})` : ""}`);
  }
}

async function runBatch1TestSuite() {
  console.log("===============================================================");
  console.log("=== CALCI BATCH 1 MULTILINGUAL AUDIT & PRODUCTION VERIFICATION ===");
  console.log("===============================================================\n");

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE A: Batch 1 Scope & Registration
  // ───────────────────────────────────────────────────────────────────────────
  console.log("--- SUITE A: Batch 1 Inventory & Scope ---");
  assert(BATCH_1_SLUGS.length === 8, "A1: Exactly 8 calculators in Batch 1 scope");

  for (const slug of BATCH_1_SLUGS) {
    assert(slug in PUBLISHED_MATRIX, `A2: Calculator '${slug}' registered in publication matrix`);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE B: 40 Published Localized Routes & Publication Gating
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE B: 40 Localized Routes & Publication Gating ---");
  let routeCount = 0;
  for (const slug of BATCH_1_SLUGS) {
    for (const locale of TARGET_LOCALES) {
      const published = isLocalePublished(locale, slug);
      assert(published, `B: Route /${locale}/calculators/${slug} is PUBLISHED`, `slug=${slug}, locale=${locale}`);
      if (published) routeCount++;
    }
  }
  assert(routeCount === 40, `B_TOTAL: Expected 40 new localized published routes, got ${routeCount}`);

  // Gating safety for unpublished locales (e.g. Italian 'it' or Japanese 'ja' or mortgage fr/de/hi/pt)
  assert(!isLocalePublished("it", "percentage-calculator"), "B_GATE: Unsupported locale 'it' is gated");
  assert(!isLocalePublished("fr", "mortgage-calculator"), "B_GATE: Mortgage pilot 'fr' remains gated");
  assert(!isLocalePublished("de", "mortgage-calculator"), "B_GATE: Mortgage pilot 'de' remains gated");
  assert(!isLocalePublished("hi", "mortgage-calculator"), "B_GATE: Mortgage pilot 'hi' remains gated");
  assert(!isLocalePublished("pt", "mortgage-calculator"), "B_GATE: Mortgage pilot 'pt' remains gated");

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE C: UI Overlays Completeness
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE C: UI Overlay Completeness ---");
  for (const slug of BATCH_1_SLUGS) {
    for (const locale of TARGET_LOCALES) {
      const overlay = getCalculatorOverlay(slug, locale);
      assert(overlay !== null && typeof overlay === "object", `C1: Overlay exists for ${slug} (${locale})`);
      assert(overlay.locale === locale, `C2: Overlay locale matches ${locale}`);

      // Verify non-empty key values
      const keys = Object.keys(overlay);
      assert(keys.length >= 8, `C3: Overlay for ${slug} (${locale}) has sufficient properties (${keys.length})`);
      for (const k of keys) {
        const val = (overlay as any)[k];
        if (typeof val === "string") {
          assert(val.trim().length > 0, `C4: Property '${k}' in ${slug} (${locale}) is non-empty`);
        }
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE D: Educational Content Completeness
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE D: Educational Content & SEO Completeness ---");
  for (const slug of BATCH_1_SLUGS) {
    for (const locale of TARGET_LOCALES) {
      const pack = getCalculatorLocalizedContent(slug, locale);
      assert(pack !== null, `D1: Content pack exists for ${slug} (${locale})`);
      if (pack) {
        assert(typeof pack.seo.title === "string" && pack.seo.title.length > 5, `D2: SEO Title valid for ${slug} (${locale})`);
        assert(typeof pack.seo.description === "string" && pack.seo.description.length > 15, `D3: SEO Description valid for ${slug} (${locale})`);
        assert(typeof pack.ContentComponent === "function", `D4: ContentComponent is a valid React component for ${slug} (${locale})`);
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE E: FAQ Parity (Visible FAQ == JSON-LD FAQ)
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE E: FAQ Parity & Structured Data ---");
  for (const slug of BATCH_1_SLUGS) {
    for (const locale of TARGET_LOCALES) {
      const pack = getCalculatorLocalizedContent(slug, locale);
      assert(pack !== null && Array.isArray(pack.faqs), `E1: FAQs exist for ${slug} (${locale})`);
      if (pack && Array.isArray(pack.faqs)) {
        assert(pack.faqs.length >= 2, `E2: Sufficient FAQs for ${slug} (${locale}) (count: ${pack.faqs.length})`);
        for (const faq of pack.faqs) {
          assert(typeof faq.question === "string" && faq.question.length > 5, `E3: FAQ question non-empty for ${slug} (${locale})`);
          assert(typeof faq.answer === "string" && faq.answer.length > 10, `E4: FAQ answer non-empty for ${slug} (${locale})`);
        }

        // Test Schema Generator with this FAQ pack
        const schemas = generateJsonLdSchema({
          title: pack.seo.title,
          description: pack.seo.description,
          slug,
          category: "general",
          faqs: pack.faqs,
          locale,
        });
        const faqSchema = schemas.find((s: any) => s["@type"] === "FAQPage") as any;
        assert(faqSchema !== undefined, `E5: FAQPage JSON-LD schema generated for ${slug} (${locale})`);
        if (faqSchema && faqSchema.mainEntity) {
          assert(faqSchema.mainEntity.length === pack.faqs.length, `E6: Schema mainEntity count matches visible FAQs (${faqSchema.mainEntity.length})`);
        }
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE F: SEO Canonical & Reciprocal Hreflang
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE F: SEO Canonical, Alternates & Hreflang ---");
  for (const slug of BATCH_1_SLUGS) {
    for (const locale of TARGET_LOCALES) {
      const pack = getCalculatorLocalizedContent(slug, locale);
      const meta = generateCalculatorMetadata({
        title: pack?.seo.title || "Title",
        description: pack?.seo.description || "Desc",
        slug,
        category: "general",
        locale,
      });

      // Self-canonical
      assert(
        (meta.alternates?.canonical as string) === `https://calcplatform.org/${locale}/calculators/${slug}`,
        `F1: Self-canonical matches localized path for ${slug} (${locale})`
      );

      // Reciprocal hreflangs: en, es, fr, de, hi, pt, and x-default
      const languages = meta.alternates?.languages as Record<string, string>;
      assert(languages !== undefined, `F2: Alternates languages present for ${slug} (${locale})`);
      if (languages) {
        assert(languages["x-default"] === `https://calcplatform.org/calculators/${slug}`, `F3: x-default is English unprefixed`);
        assert(languages["en"] === `https://calcplatform.org/calculators/${slug}`, `F4: en alternate is unprefixed`);
        assert(languages["es"] === `https://calcplatform.org/es/calculators/${slug}`, `F5: es alternate present`);
        assert(languages["fr"] === `https://calcplatform.org/fr/calculators/${slug}`, `F6: fr alternate present`);
        assert(languages["de"] === `https://calcplatform.org/de/calculators/${slug}`, `F7: de alternate present`);
        assert(languages["hi"] === `https://calcplatform.org/hi/calculators/${slug}`, `F8: hi alternate present`);
        assert(languages["pt"] === `https://calcplatform.org/pt/calculators/${slug}`, `F9: pt alternate present`);
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE G: Mathematical Invariance across all 8 Engines
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE G: Mathematical Invariance across Calculation Engines ---");

  // 1. Percentage
  const pct1 = solvePercentageOf(25, 200);
  assert(pct1.primaryResult === "50", "G1: Percentage engine invariant result (50)");

  // 2. BMI
  const bmi1 = calculateBmi({ age: 25, gender: "male", unitSystem: "metric", weightKg: 70, heightCm: 175 });
  assert(Math.abs(bmi1.bmi - 22.86) < 0.05, "G2: BMI metric invariance (22.86)");

  // 3. Date
  const dateDiff = calculateDateDuration({ startDate: "2026-01-01", endDate: "2026-01-31", includeEndDay: false });
  assert(dateDiff.totalDays === 30, "G3: Date duration invariance (30 days exclusive)");

  // 4. Concrete
  const slab = calculateSlabVolume(10, 10, 4, "feet", "feet", "inches", 1, 0);
  assert(Math.abs(slab.cubicYards - 1.23) < 0.02, "G4: Concrete slab volume invariance (1.23 yd³)");

  // 5. Currency
  const curr1 = convertCurrency(100, "USD", "EUR");
  assert(Math.abs(curr1.toAmount - 92.15) < 0.01, "G5: Currency conversion invariance (100 USD -> 92.15 EUR)");

  // 6. Auto Loan
  const autoLoan = calculateAutoLoanFormula({
    vehiclePrice: 30000,
    downPayment: 5000,
    tradeInValue: 0,
    amountOwedOnTradeIn: 0,
    interestRate: 6.0,
    loanTermMonths: 60,
    salesTaxRate: 0,
    registrationFees: 0,
    dealerFees: 0,
    docFees: 0,
    extendedWarranty: 0,
  });
  assert(Math.abs(autoLoan.monthlyPayment - 483.32) < 0.05, "G6: Auto Loan monthly payment invariance ($483.32)");

  // 7. Ohm's Law
  const ohms = calculateOhmsLawCalculator({
    voltage: 12,
    current: 2,
    resistance: 0,
    power: 0,
    activeInputs: ["voltage", "current"],
  });
  assert(ohms.resistance === 6 && ohms.power === 24, "G7: Ohm's law invariance (R=6Ω, P=24W)");

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE H: Registry Immutability & English Golden Baseline Regression
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE H: Registry Immutability & English Regression ---");
  const baselinePercentageTitle = percentage_calculatorConfig.title;
  const baselineBmiTitle = bmi_calculatorConfig.title;
  const baselineScientificTitle = scientific_calculatorConfig.title;
  const baselineDateTitle = date_calculatorConfig.title;
  const baselineConcreteTitle = concrete_calculatorConfig.title;
  const baselineCurrencyTitle = currency_calculatorConfig.title;
  const baselineAutoLoanTitle = AUTO_LOAN_CONFIG.title;
  const baselineOhmsTitle = ohms_law_calculatorConfig.title;

  // Exercise localized resolution
  getCalculatorOverlay("percentage-calculator", "es");
  getCalculatorLocalizedContent("percentage-calculator", "es");
  getCalculatorOverlay("bmi-calculator", "fr");
  getCalculatorLocalizedContent("bmi-calculator", "fr");
  getCalculatorOverlay("date-calculator", "de");
  getCalculatorLocalizedContent("date-calculator", "de");
  getCalculatorOverlay("concrete-calculator", "hi");
  getCalculatorLocalizedContent("concrete-calculator", "hi");
  getCalculatorOverlay("currency-calculator", "pt");
  getCalculatorLocalizedContent("currency-calculator", "pt");

  // Verify English configs remained completely unmutated
  assert(percentage_calculatorConfig.title === baselinePercentageTitle, "H1: percentage_calculatorConfig title unmutated");
  assert(bmi_calculatorConfig.title === baselineBmiTitle, "H2: bmi_calculatorConfig title unmutated");
  assert(scientific_calculatorConfig.title === baselineScientificTitle, "H3: scientific_calculatorConfig title unmutated");
  assert(date_calculatorConfig.title === baselineDateTitle, "H4: date_calculatorConfig title unmutated");
  assert(concrete_calculatorConfig.title === baselineConcreteTitle, "H5: concrete_calculatorConfig title unmutated");
  assert(currency_calculatorConfig.title === baselineCurrencyTitle, "H6: currency_calculatorConfig title unmutated");
  assert(AUTO_LOAN_CONFIG.title === baselineAutoLoanTitle, "H7: AUTO_LOAN_CONFIG title unmutated");
  assert(ohms_law_calculatorConfig.title === baselineOhmsTitle, "H8: ohms_law_calculatorConfig title unmutated");

  // ───────────────────────────────────────────────────────────────────────────
  // SUITE I: Locale Formatting Behavior
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- SUITE I: Formatter Locale Behavior ---");
  assert(formatCurrency(1234.56, "$", 2, "en-US") === "$1,234.56", "I1: formatCurrency en-US produces '$1,234.56'");
  assert(formatPercent(5.5, 2, "en-US") === "5.50%", "I2: formatPercent en-US produces '5.50%'");
  assert(formatPercent(5.5, 2, "de-DE").includes(","), "I3: formatPercent de-DE uses comma decimal separator");

  console.log("\n===============================================================");
  console.log(`=== BATCH 1 TEST RESULTS: ${passedTests} / ${totalTests} PASSED (Failed: ${failedTests}) ===`);
  console.log("===============================================================");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runBatch1TestSuite();
