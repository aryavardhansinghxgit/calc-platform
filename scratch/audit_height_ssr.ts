async function testHeightSSR() {
  console.log("Fetching http://localhost:3000/calculators/height-calculator ...");
  const response = await fetch("http://localhost:3000/calculators/height-calculator");
  console.log("Status Code:", response.status);

  if (response.status !== 200) {
    throw new Error(`Expected HTTP 200, got ${response.status}`);
  }

  const html = await response.text();

  // 1. H1 Check
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((h, i) => {
    console.log(`  H1 [${i + 1}]: "${h.replace(/<[^>]+>/g, "").trim()}"`);
  });

  // 2. Title & Meta
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "NOT FOUND";
  console.log("Title:", title);

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : "NOT FOUND";
  console.log("Meta description:", metaDesc);

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                         html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "NOT FOUND";
  console.log("Canonical:", canonical);

  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1] : "NOT FOUND";
  console.log("OG Title:", ogTitle);

  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  const ogDesc = ogDescMatch ? ogDescMatch[1] : "NOT FOUND";
  console.log("OG Description:", ogDesc);

  // 3. Related blocks
  const relatedMatches = html.match(/RELATED CALCULATORS:/g) || [];
  console.log("Related Calculators count in SSR HTML:", relatedMatches.length);

  // 4. FAQ count in SSR
  const hasQ1 = html.includes("How accurate is a height calculator?");
  const hasAns1 = html.includes("A height calculator can be numerically accurate");
  console.log("FAQ Question 1 in SSR HTML:", hasQ1);
  console.log("FAQ Answer 1 in SSR HTML:", hasAns1);

  // Check JSON-LD
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  let faqSchemaCount = 0;
  while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(jsonMatch[1]);
      if (data["@type"] === "FAQPage") {
        faqSchemaCount = data.mainEntity?.length || 0;
        console.log("FAQPage Schema found with entities:", faqSchemaCount);
      }
    } catch (e) {
      // ignore
    }
  }

  // 5. Medical disclaimer
  const hasDisclaimer = html.includes("Pediatric Growth & Medical Disclaimer") || html.includes("Pediatric Growth &amp; Medical Disclaimer");
  console.log("Pediatric Medical Disclaimer present in SSR:", hasDisclaimer);

  // 6. Section checks
  const hasSec1 = html.includes("Height Calculator: Adult Height Prediction");
  const hasSec30 = html.includes("Formula Reference");
  const hasSec31 = html.includes("Frequently Asked Questions");
  const hasSec32 = html.includes("Important Interpretation Note");
  const hasSec33 = html.includes("Summary");
  const hasSources = html.includes("Sources and Methodology");
  console.log("Section 1 present:", hasSec1);
  console.log("Section 30 present:", hasSec30);
  console.log("Section 31 present:", hasSec31);
  console.log("Section 32 present:", hasSec32);
  console.log("Section 33 present:", hasSec33);
  console.log("Sources present:", hasSources);

  // 7. Strip scripts/styles and check for NaN, Infinity, undefined, null
  const cleanText = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");

  const nanMatches = cleanText.match(/\bNaN\b/g) || [];
  const infMatches = cleanText.match(/\bInfinity\b/g) || [];
  const undefMatches = cleanText.match(/\bundefined\b/g) || [];
  const nullMatches = cleanText.match(/\bnull\b/g) || [];

  console.log("Text validation:", {
    NaN_count: nanMatches.length,
    Infinity_count: infMatches.length,
    undefined_count: undefMatches.length,
    null_count: nullMatches.length,
  });

  const pass =
    h1Matches.length === 1 &&
    response.status === 200 &&
    hasDisclaimer &&
    hasSec1 &&
    hasSec30 &&
    hasSec31 &&
    hasSec32 &&
    hasSec33 &&
    hasSources &&
    relatedMatches.length === 2 &&
    nanMatches.length === 0 &&
    infMatches.length === 0 &&
    undefMatches.length === 0 &&
    nullMatches.length === 0;

  if (pass) {
    console.log(">>> SSR AUDIT: 100% PASS <<<");
  } else {
    console.error(">>> SSR AUDIT: FAIL <<<");
    process.exit(1);
  }
}

testHeightSSR().catch((err) => {
  console.error("SSR test failed:", err);
  process.exit(1);
});
