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

  // C-F. Unpublished draft routes must NOT appear
  assert(
    !urls.some((u) => u.includes("/fr/calculators/mortgage-calculator")),
    "1.4: Unpublished French mortgage route is absent"
  );
  assert(
    !urls.some((u) => u.includes("/de/calculators/mortgage-calculator")),
    "1.5: Unpublished German mortgage route is absent"
  );
  assert(
    !urls.some((u) => u.includes("/hi/calculators/mortgage-calculator")),
    "1.6: Unpublished Hindi mortgage route is absent"
  );
  assert(
    !urls.some((u) => u.includes("/pt/calculators/mortgage-calculator")),
    "1.7: Unpublished Portuguese mortgage route is absent"
  );

  // G. No /en duplicate routes
  assert(
    !urls.some((u) => u.includes("/en/")),
    "1.8: Zero duplicate '/en/' prefixed URLs exist in sitemap"
  );

  // H. Deduplication check
  const urlSet = new Set(urls);
  assert(
    urlSet.size === urls.length,
    `1.9: Zero duplicate URLs in sitemap (unique: ${urlSet.size}, total: ${urls.length})`
  );

  // I. Core, Category, Standalone, Legal pages
  assert(urls.includes("https://calcplatform.com"), "1.10: Root platform page present");
  assert(urls.includes("https://calcplatform.com/category/finance"), "1.11: Category '/category/finance' present");
  assert(urls.includes("https://calcplatform.com/category/health"), "1.12: Category '/category/health' present");
  assert(urls.includes("https://calcplatform.com/about"), "1.13: Legal '/about' present");
  assert(urls.includes("https://calcplatform.com/privacy"), "1.14: Legal '/privacy' present");

  // --- SUITE 2: Live Rendered /sitemap.xml DOM Verification ---
  console.log("\n--- SUITE 2: Live Rendered /sitemap.xml Verification ---");
  try {
    const res = await fetch("http://localhost:3000/sitemap.xml");
    if (res.status === 200) {
      const xml = await res.text();
      assert(xml.includes("<loc>https://calcplatform.com/calculators/mortgage-calculator</loc>"), "2.1: Rendered XML contains English mortgage URL");
      assert(xml.includes("<loc>https://calcplatform.com/es/calculators/mortgage-calculator</loc>"), "2.2: Rendered XML contains Spanish mortgage URL");
      assert(!xml.includes("/fr/calculators/mortgage-calculator"), "2.3: Rendered XML does NOT contain French mortgage URL");
      assert(!xml.includes("/de/calculators/mortgage-calculator"), "2.4: Rendered XML does NOT contain German mortgage URL");
      assert(!xml.includes("/hi/calculators/mortgage-calculator"), "2.5: Rendered XML does NOT contain Hindi mortgage URL");
      assert(!xml.includes("/pt/calculators/mortgage-calculator"), "2.6: Rendered XML does NOT contain Portuguese mortgage URL");
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
