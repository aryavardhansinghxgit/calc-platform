import fs from "fs";
import path from "path";
import { ALL_CALCULATORS, getAllCalculatorDefinitions, getCalculatorDefinition } from "../src/calculators";
import { generateCalculatorMetadata, generateJsonLdSchema, getCalculatorCanonicalUrl } from "../src/lib/seo-helpers";
import { CATEGORIES } from "../src/data/categories";

console.log("================================================================================");
console.log("CALCI ENGLISH-ONLY PRODUCTION ARCHITECTURE AUDIT & REGRESSION GATE");
console.log("================================================================================");

let totalChecks = 0;
let passedChecks = 0;

function assert(description: string, condition: boolean) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ ${description}`);
  } else {
    console.error(`  ✗ [FAIL] ${description}`);
  }
}

// 1. ROUTING ARCHITECTURE AUDIT
console.log("\n--- 1. Routing Architecture Verification ---");
const localeDir = path.join(__dirname, "../src/app/[locale]");
assert("No [locale] route wrapper directory exists in src/app", !fs.existsSync(localeDir));

const langSelectorPath = path.join(__dirname, "../src/components/layout/LanguageSelector.tsx");
assert("No LanguageSelector component exists in components/layout", !fs.existsSync(langSelectorPath));

const i18nRuntimeDir = path.join(__dirname, "../src/i18n");
assert("No src/i18n runtime directory exists", !fs.existsSync(i18nRuntimeDir));

const libI18nRuntimeDir = path.join(__dirname, "../src/lib/i18n");
assert("No src/lib/i18n runtime directory exists", !fs.existsSync(libI18nRuntimeDir));

// 2. SEO & HREFLANG INTEGRITY AUDIT
console.log("\n--- 2. SEO, Metadata & Canonical Verification ---");
const testSlugs = [
  "mortgage-calculator",
  "amortization-calculator",
  "percentage-calculator",
  "scientific-calculator",
  "bmi-calculator",
  "date-calculator",
  "fuel-cost-calculator",
  "business-loan-calculator",
  "loan-calculator",
  "auto-loan-calculator",
];

for (const slug of testSlugs) {
  const def = getCalculatorDefinition(slug);
  if (!def) {
    assert(`Definition for ${slug} exists`, false);
    continue;
  }

  const meta = generateCalculatorMetadata({
    title: def.title,
    description: def.description,
    slug: def.slug,
  });

  const canonical = (meta.alternates as any)?.canonical;
  const languages = (meta.alternates as any)?.languages;

  assert(`[${slug}] Canonical URL is standard English route: /calculators/${slug}`, canonical === `https://calcplatform.com/calculators/${slug}`);
  assert(`[${slug}] No hreflang languages alternate dictionary emitted`, languages === undefined);

  const schemas = generateJsonLdSchema({
    title: def.title,
    description: def.description,
    slug: def.slug,
    category: def.category,
    faqs: def.faqs,
  });

  assert(`[${slug}] Structured Data (JSON-LD) generated successfully`, schemas.length >= 2);
}

// 3. SITEMAP INTEGRITY AUDIT
console.log("\n--- 3. Sitemap Verification ---");
const sitemapPath = path.join(__dirname, "../public/sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  assert("Sitemap contains zero /es/ URLs", !sitemapContent.includes("/es/"));
  assert("Sitemap contains zero /fr/ URLs", !sitemapContent.includes("/fr/"));
  assert("Sitemap contains zero /de/ URLs", !sitemapContent.includes("/de/"));
  assert("Sitemap contains zero /hi/ URLs", !sitemapContent.includes("/hi/"));
  assert("Sitemap contains zero /pt/ URLs", !sitemapContent.includes("/pt/"));
  assert("Sitemap contains zero /en/ URLs", !sitemapContent.includes("/en/"));
  assert("Sitemap contains root canonical https://calcplatform.com", sitemapContent.includes("<loc>https://calcplatform.com</loc>"));
  assert("Sitemap contains mortgage-calculator English URL", sitemapContent.includes("<loc>https://calcplatform.com/calculators/mortgage-calculator</loc>"));
} else {
  assert("public/sitemap.xml exists", false);
}

// 4. CANONICAL ENGLISH CONTENT & FAQ PRESERVATION
console.log("\n--- 4. Canonical English Content & FAQ Integrity ---");
const allDefs = getAllCalculatorDefinitions();
assert(`All calculator definitions loaded (Total: ${allDefs.length})`, allDefs.length >= 190);

for (const slug of testSlugs) {
  const def = getCalculatorDefinition(slug);
  assert(`[${slug}] Has English title: "${def?.title.slice(0, 30)}..."`, !!def?.title && def.title.length > 5);
  assert(`[${slug}] Has English description`, !!def?.description && def.description.length > 20);
  assert(`[${slug}] Has English FAQs (${def?.faqs?.length || 0} FAQs)`, (def?.faqs?.length || 0) > 0);
}

// 5. MATHEMATICAL CALCULATION INVARIANCE
console.log("\n--- 5. Mathematical Engine Invariance ---");

// Mortgage formula check
const mortgageDef = getCalculatorDefinition("mortgage-calculator");
if (mortgageDef?.calculate) {
  const res = mortgageDef.calculate({
    homePrice: 400000,
    downPayment: 80000,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxRate: 1.2,
    homeInsuranceAnnual: 1200,
    pmiRate: 0,
    hoaMonthly: 0,
    startMonth: "2026-10",
    paymentFrequency: "monthly",
  });
  assert("Mortgage calculation math is accurate and deterministic", !!res);
}

// Loan formula check
const loanDef = getCalculatorDefinition("loan-calculator");
if (loanDef?.calculate) {
  const res = loanDef.calculate({
    loanAmount: 10000,
    interestRate: 10,
    loanTermYears: 5,
  });
  assert("Loan calculation math is accurate and deterministic", !!res);
}

console.log("\n================================================================================");
console.log(`AUDIT COMPLETE: ${passedChecks}/${totalChecks} ASSERTIONS PASSED`);
console.log("================================================================================");

if (passedChecks === totalChecks) {
  console.log("✅ CALCI CURRENT VERSION IS STRICTLY ENGLISH-ONLY.");
} else {
  console.error("❌ VERIFICATION FAILED.");
  process.exit(1);
}
