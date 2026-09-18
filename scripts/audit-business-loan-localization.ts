import { LOCALIZED_CONTENT_REGISTRY, getCalculatorLocalizedContent } from "../src/i18n/content";
import { getCalculatorOverlay } from "../src/i18n/overlays";
import { isLocalePublished, getPublishedLocalesForCalculator } from "../src/i18n/publishing";
import { BUSINESS_LOAN_CALCULATOR } from "../src/calculators/finance/business-loan";
import { businessLoanFaqs } from "../src/calculators/finance/business-loan/faq";

console.log("=== BUSINESS LOAN CALCULATOR LOCALIZATION AUDIT ===");

const locales = ["es", "fr", "de", "hi", "pt"] as const;
const slug = "business-loan-calculator";

console.log(`Canonical English FAQs count: ${businessLoanFaqs.length}`);
console.log(`Published locales:`, getPublishedLocalesForCalculator(slug));

let passed = true;

for (const loc of locales) {
  const published = isLocalePublished(loc, slug);
  const overlay = getCalculatorOverlay(slug, loc);
  const content = getCalculatorLocalizedContent(slug, loc);

  console.log(`\n--- Locale: [${loc}] ---`);
  console.log(`  Published: ${published}`);
  console.log(`  Overlay Title: ${overlay?.title ? "✓ " + overlay.title.slice(0, 40) + "..." : "✗ Missing"}`);
  console.log(`  Overlay Inputs: ${Object.keys(overlay?.inputs || {}).length}/5 inputs defined`);
  console.log(`  Overlay Outputs: ${Object.keys(overlay?.outputs || {}).length}/4 outputs defined`);
  console.log(`  Content Component: ${content?.ContentComponent ? "✓ Present" : "✗ Missing"}`);
  console.log(`  SEO Title: ${content?.seo?.title ? "✓ " + content.seo.title.slice(0, 40) + "..." : "✗ Missing"}`);
  console.log(`  SEO Description: ${content?.seo?.description ? "✓ Present" : "✗ Missing"}`);
  console.log(`  FAQ Count: ${content?.faqs?.length || 0} / ${businessLoanFaqs.length}`);

  if (!published || !overlay || !content?.ContentComponent || content.faqs.length !== businessLoanFaqs.length) {
    passed = false;
    console.error(`  [FAIL] Locale ${loc} failed verification requirements!`);
  } else {
    console.log(`  [PASS] Locale ${loc} fully verified.`);
  }
}

if (passed) {
  console.log("\n✅ ALL 5 LOCALES FOR BUSINESS LOAN CALCULATOR VERIFIED AND PASSING.");
} else {
  console.error("\n❌ VERIFICATION FAILED.");
  process.exit(1);
}
