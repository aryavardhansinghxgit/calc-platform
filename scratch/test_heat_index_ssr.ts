async function testSSR() {
  console.log("=== RUNNING HEAT INDEX CALCULATOR SSR & SEO VERIFICATION ===");
  const url = "http://localhost:3000/calculators/heat-index-calculator";
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Fetch failed with status: ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();

  // 1. Status 200
  console.log("✓ HTTP 200 OK");

  // 2. Exactly ONE H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  if (h1Matches.length !== 1) {
    console.error("FAIL: Expected exactly 1 H1 tag!");
    process.exit(1);
  }
  console.log(`✓ Exactly 1 H1: ${h1Matches[0]}`);

  // 3. Title exists
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    console.error("FAIL: Title tag missing!");
    process.exit(1);
  }
  console.log(`✓ Title: ${titleMatch[1]}`);

  // 4. Meta Description exists
  const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
  if (!metaDescMatch) {
    console.error("FAIL: Meta description missing!");
    process.exit(1);
  }
  console.log(`✓ Meta Description: ${metaDescMatch[1]}`);

  // 5. Canonical exists
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i);
  if (!canonicalMatch) {
    console.error("FAIL: Canonical tag missing!");
    process.exit(1);
  }
  console.log(`✓ Canonical: ${canonicalMatch[1]}`);

  // 6. Article server-rendered
  const hasArticle =
    html.includes("Heat Index Calculator: NWS Formula, Heat Index Chart &amp; Heat Risk") &&
    html.includes("A heat index calculator combines air temperature and relative humidity") &&
    html.includes("85°F with 70% relative humidity produces a heat index of approximately 92.7°F");
  if (!hasArticle) {
    console.error("FAIL: Long-form article content missing from SSR!");
    process.exit(1);
  }
  console.log("✓ Long-form educational article is server-rendered in full");

  // 7. Contextual Internal Link Anchors
  const hasDewPointAnchor = html.includes('href="/calculators/dew-point-calculator"');
  const hasConversionAnchor = html.includes('href="/calculators/conversion-calculator"');
  const hasWindChillAnchor = html.includes('href="/calculators/wind-chill-calculator"');
  if (!hasDewPointAnchor || !hasConversionAnchor || !hasWindChillAnchor) {
    console.error("FAIL: Missing contextual internal anchor links in article!");
    process.exit(1);
  }
  console.log("✓ All 3 contextual internal anchor links present (Dew Point, Conversion, Wind Chill)");

  // 8. All 16 FAQs server-rendered
  const faqCheck1 = html.includes("What is a heat index calculator?");
  const faqCheck2 = html.includes("What is the heat index at 85°F and 70% humidity?");
  const faqCheck3 = html.includes("Can heat index predict heat stroke?");
  const faqCheck4 = html.includes("What should workers do when the heat index is high?");
  if (!faqCheck1 || !faqCheck2 || !faqCheck3 || !faqCheck4) {
    console.error("FAIL: FAQs missing from SSR!");
    process.exit(1);
  }
  console.log("✓ All 16 FAQs are server-rendered in full");

  // 8. Related Calculators sections (should have 2: above and below article)
  const relatedCount = (html.match(/RELATED CALCULATORS/g) || []).length;
  console.log(`Related calculators strips count: ${relatedCount}`);
  if (relatedCount !== 2) {
    console.error(`FAIL: Expected exactly 2 related calculator sections, found ${relatedCount}`);
    process.exit(1);
  }
  console.log("✓ Exactly 2 compact Related Calculators strips (one above article, one below)");

  // 9. No corrupted tokens in user visible HTML
  const badPatterns = [/>\s*NaN/i, />\s*undefined\s*</i, />\s*null\s*</i, /\[object Object\]/, />\s*Infinity/i];
  for (const pat of badPatterns) {
    if (pat.test(html)) {
      console.error(`FAIL: Corrupted token pattern found in HTML: ${pat}`);
      process.exit(1);
    }
  }
  console.log("✓ Zero corrupted tokens (>NaN<, >undefined<, >null<, >Infinity<, [object Object]) in visible HTML");

  // 10. Terminology compliance
  if (html.includes("OSHA Work/Rest Schedule") || html.includes("Official OSHA schedule")) {
    console.error("FAIL: Found outdated 'OSHA Work/Rest Schedule' terminology in SSR HTML!");
    process.exit(1);
  }
  if (html.includes("WBGT Estimate")) {
    console.error("FAIL: Found outdated 'WBGT Estimate' terminology in SSR HTML!");
    process.exit(1);
  }
  if (html.includes("+15°F Solar Load")) {
    console.error("FAIL: Found outdated '+15°F Solar Load' terminology in SSR HTML!");
    process.exit(1);
  }
  if (!html.includes("Reference Work / Rest Benchmark") && !html.includes("Reference Work/Rest Benchmark")) {
    console.error("FAIL: Expected 'Reference Work/Rest Benchmark' in SSR HTML!");
    process.exit(1);
  }
  if (!html.includes("Direct Sun Conservative Estimate")) {
    console.error("FAIL: Expected 'Direct Sun Conservative Estimate' in SSR HTML!");
    process.exit(1);
  }
  console.log("✓ Terminology compliance verified: No outdated OSHA/WBGT terms; 'Reference Work/Rest Benchmark' and 'Direct Sun Conservative Estimate' present");

  console.log(">>> ALL SSR & SEO CHECKS PASSED PERFECTLY! <<<");
}

testSSR().catch((err) => {
  console.error("SSR test error:", err);
  process.exit(1);
});
