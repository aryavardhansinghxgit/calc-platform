async function auditPage() {
  const url = "http://localhost:3000/calculators/engine-horsepower-calculator";
  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  console.log(`Status: ${res.status}`);
  if (res.status !== 200) {
    console.error(`Page returned status ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();

  // 1. H1 test
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((h1, i) => console.log(`  H1 #${i + 1}: ${h1.replace(/<[^>]+>/g, "").trim()}`));

  // 2. Title & Meta & Canonical
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NONE"}`);

  const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  console.log(`Meta description: ${metaDescMatch ? metaDescMatch[1] : "NONE"}`);

  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`);

  // 3. Article SSR
  const hasArticle = html.includes("Engine Horsepower Calculator: Torque, RPM, 1/4-Mile, Trap Speed, 0–60 and Boost");
  console.log(`Article SSR rendered: ${hasArticle}`);

  // 4. FAQ count (Ensure exactly ONE FAQ heading and all questions present)
  const faqHeadingCount = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log(`FAQ headings count: ${faqHeadingCount} (expected: 1)`);
  const hasFirstFaq = html.includes("What is the formula for horsepower from torque and RPM?");
  const hasLastFaq = html.includes("Can I calculate horsepower without a dynamometer?");
  console.log(`First and last FAQs present: first=${hasFirstFaq}, last=${hasLastFaq}`);

  // 5. Contextual inline links (anchors inside text)
  const hasTireAnchor = html.includes('href="/calculators/tire-size-calculator"');
  const hasGasMileageAnchor = html.includes('href="/calculators/gas-mileage-calculator"');
  const hasOhmsLawAnchor = html.includes('href="/calculators/ohms-law-calculator"');
  console.log(`Contextual anchors: tire=${hasTireAnchor}, gasMileage=${hasGasMileageAnchor}, ohmsLaw=${hasOhmsLawAnchor}`);

  // 6. Related calculators above and below (Ensure exactly TWO related-calculator blocks)
  const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log(`Related calculators sections found: ${relatedMatches.length} (expected: 2)`);

  // 7. Bad tokens in visible text
  const visibleHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  const nanCount = (visibleHtml.match(/>[^<]*\bNaN\b[^<]*</g) || []).length;
  const infCount = (visibleHtml.match(/>[^<]*\bInfinity\b[^<]*</g) || []).length;
  const undefCount = (visibleHtml.match(/>[^<]*\bundefined\b[^<]*</g) || []).length;
  console.log(`Visible NaN: ${nanCount}, Infinity: ${infCount}, undefined: ${undefCount}`);

  // 8. References section
  const hasReferences = html.includes("SAE J1349_202511") && html.includes("Special Publication 811");
  console.log(`References section present: ${hasReferences}`);

  if (
    res.status === 200 &&
    h1Matches.length === 1 &&
    hasArticle &&
    faqHeadingCount === 1 &&
    hasFirstFaq &&
    hasLastFaq &&
    hasTireAnchor &&
    hasGasMileageAnchor &&
    hasOhmsLawAnchor &&
    relatedMatches.length === 2 &&
    nanCount === 0 &&
    infCount === 0 &&
    undefCount === 0 &&
    hasReferences
  ) {
    console.log("\n>>> ALL PRODUCTION SEO & ARCHITECTURE CHECKS PASSED 100%! <<<");
  } else {
    console.error("\n>>> PRODUCTION SEO CHECKS FAILED! <<<");
    process.exit(1);
  }
}

auditPage().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
