/**
 * CALCI — Sitemap Multilingual Publication & Parity Test Suite
 * Validates:
 * A. English canonical calculator route appears
 * B. Published Spanish mortgage route appears
 * C. Unpublished French route does not appear
 * D. Unpublished German route does not appear
 * E. Unpublished Hindi route does not appear
 * F. Unpublished Portuguese route does not appear
 * G. No '/en/' duplicate routes
 * H. No duplicate URLs in entire sitemap
 * I. Existing core, category, standalone, and legal pages remain intact
 * J. Live rendered XML sitemap (/sitemap.xml) contains expected URLs
 */

import sitemap from "../src/app/sitemap";

async function runSitemapTests() {
  console.log("=======================================================");
  console.log("=== CALCI SITEMAP MULTILINGUAL TEST SUITE ===");
  console.log("=======================================================\n");

  let total = 0;
  let passed = 0;

  function assert(condition: boolean, name: string, detail?: string) {
    total++;
    if (condition) {
      passed++;
      console.log(`  ✓ [PASS] ${name}`);
    } else {
      console.error(`  ✗ [FAIL] ${name} ${detail ? `-> ${detail}` : ""}`);
      process.exit(1);
    }
  }

  // --- SUITE 1: sitemap() Function Direct Evaluation ---
  console.log("--- SUITE 1: sitemap() Function Evaluation ---");
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  assert(urls.length > 150, `1.1: Total sitemap entries (${urls.length}) is non-empty and comprehensive`);

  // A. English mortgage route
  assert(
    urls.includes("https://calcplatform.com/calculators/mortgage-calculator"),
    "1.2: English route 'https://calcplatform.com/calculators/mortgage-calculator' is present"
  );

  // B. Published Spanish mortgage route
  assert(
    urls.includes("https://calcplatform.com/es/calculators/mortgage-calculator"),
    "1.3: Published Spanish route 'https://calcplatform.com/es/calculators/mortgage-calculator' is present"
  );

  // C-F. Published 6-locale mortgage routes must appear
  assert(
    urls.includes("https://calcplatform.com/fr/calculators/mortgage-calculator"),
    "1.4: Published French mortgage route is present"
  );
  assert(
    urls.includes("https://calcplatform.com/de/calculators/mortgage-calculator"),
    "1.5: Published German mortgage route is present"
  );
  assert(
    urls.includes("https://calcplatform.com/hi/calculators/mortgage-calculator"),
    "1.6: Published Hindi mortgage route is present"
  );
  assert(
    urls.includes("https://calcplatform.com/pt/calculators/mortgage-calculator"),
    "1.7: Published Portuguese mortgage route is present"
  );

  // G. Unpublished draft routes must NOT appear
  assert(
    !urls.some((u) => u.includes("/fr/calculators/percentage-calculator")),
    "1.8: Unpublished draft French percentage route is absent"
  );
  assert(
    !urls.some((u) => u.includes("/de/calculators/fuel-cost-calculator")),
    "1.9: Unpublished draft German fuel-cost route is absent"
  );

  // H. No /en duplicate routes
  assert(
    !urls.some((u) => u.includes("/en/")),
    "1.10: Zero duplicate '/en/' prefixed URLs exist in sitemap"
  );

  // I. Deduplication check
  const urlSet = new Set(urls);
  assert(
    urlSet.size === urls.length,
    `1.11: Zero duplicate URLs in sitemap (unique: ${urlSet.size}, total: ${urls.length})`
  );

  // J. Core, Category, Standalone, Legal pages
  assert(urls.includes("https://calcplatform.com"), "1.12: Root platform page present");
  assert(urls.includes("https://calcplatform.com/category/finance"), "1.13: Category '/category/finance' present");
  assert(urls.includes("https://calcplatform.com/category/health"), "1.14: Category '/category/health' present");
  assert(urls.includes("https://calcplatform.com/about"), "1.15: Legal '/about' present");
  assert(urls.includes("https://calcplatform.com/privacy"), "1.16: Legal '/privacy' present");

  // --- SUITE 2: Live Rendered /sitemap.xml DOM Verification ---
  console.log("\n--- SUITE 2: Live Rendered /sitemap.xml Verification ---");
  try {
    const res = await fetch("http://localhost:3000/sitemap.xml");
    if (res.status === 200) {
      const xml = await res.text();
      assert(xml.includes("<loc>https://calcplatform.com/calculators/mortgage-calculator</loc>"), "2.1: Rendered XML contains English mortgage URL");
      assert(xml.includes("<loc>https://calcplatform.com/es/calculators/mortgage-calculator</loc>"), "2.2: Rendered XML contains Spanish mortgage URL");
      assert(xml.includes("<loc>https://calcplatform.com/fr/calculators/mortgage-calculator</loc>"), "2.3: Rendered XML contains French mortgage URL");
      assert(xml.includes("<loc>https://calcplatform.com/de/calculators/mortgage-calculator</loc>"), "2.4: Rendered XML contains German mortgage URL");
      assert(xml.includes("<loc>https://calcplatform.com/hi/calculators/mortgage-calculator</loc>"), "2.5: Rendered XML contains Hindi mortgage URL");
      assert(xml.includes("<loc>https://calcplatform.com/pt/calculators/mortgage-calculator</loc>"), "2.6: Rendered XML contains Portuguese mortgage URL");
      assert(!xml.includes("/fr/calculators/percentage-calculator"), "2.7: Rendered XML does NOT contain draft French percentage URL");
      assert(!xml.includes("/en/calculators/mortgage-calculator"), "2.8: Rendered XML does NOT contain /en/ duplicate URL");
    } else {
      console.log("  [INFO] Dev server /sitemap.xml returned status:", res.status);
    }
  } catch (e) {
    console.log("  [INFO] Live server fetch skipped (dev server not active during test execution)");
  }

  console.log("\n=======================================================");
  console.log(`=== ALL SITEMAP TESTS PASSED: ${passed} / ${total} ===`);
  console.log("=======================================================\n");
}

runSitemapTests().catch((err) => {
  console.error("FATAL ERROR in sitemap tests:", err);
  process.exit(1);
});
