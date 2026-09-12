export {};

async function checkSSR() {
  console.log("Fetching http://localhost:3000/calculators/tire-size-calculator ...");
  const res = await fetch("http://localhost:3000/calculators/tire-size-calculator");
  console.log("HTTP Status:", res.status);
  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200, got ${res.status}`);
  }

  const html = await res.text();

  // 1. H1 Tag
  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  console.log("H1 Content:", h1Matches);
  if (h1Matches.length !== 1) {
    throw new Error(`Expected exactly 1 H1, found ${h1Matches.length}`);
  }

  // 2. Title Tag
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1] : "MISSING");
  if (!titleMatch) throw new Error("Missing <title> tag");
  const decodedTitle = titleMatch[1].replace(/&amp;/g, "&");
  if (!decodedTitle.includes("Tire Size Calculator – Compare Tire Sizes, Diameter, Speedometer & Fitment")) {
    throw new Error(`Title does not match expected: ${decodedTitle}`);
  }

  // 3. Meta Description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "MISSING");
  if (!metaDescMatch) throw new Error("Missing meta description");
  if (!metaDescMatch[1].includes("Compare tire sizes and calculate diameter, sidewall, circumference")) {
    throw new Error(`Meta description does not match expected: ${metaDescMatch[1]}`);
  }

  // 4. Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "MISSING");
  if (!canonicalMatch) throw new Error("Missing canonical link");

  // 5. Educational Article SSR
  const hasArticle = html.includes("Tire Size Calculator: Compare Tire Diameter, Fitment, Speedometer");
  console.log("Educational Article SSR Rendered:", hasArticle);
  if (!hasArticle) throw new Error("Article was not rendered in SSR HTML");

  // 6. FAQ SSR
  const hasFaq = html.includes("What do the numbers in a tire size such as 225/50R17 mean");
  console.log("FAQ SSR Rendered:", hasFaq);
  if (!hasFaq) throw new Error("FAQ was not rendered in SSR HTML");

  // 7. Standards References SSR
  const hasStandards = html.includes("NHTSA — TireWise") && html.includes("ETRTO — Recommendations");
  console.log("Standards References SSR Rendered:", hasStandards);
  if (!hasStandards) throw new Error("Standards were not rendered in SSR HTML");

  // 8. Related calculators count
  const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log("Related Calculators count:", relatedMatches.length);
  // Should be 2: one above and one below
  if (relatedMatches.length !== 2) {
    console.warn(`Warning: Expected 2 related calculator strips, found ${relatedMatches.length}`);
  }

  // 9. Check for illegal tokens in visible HTML
  const badTokens = ["NaN", "Infinity", "undefined", "[object Object]"];
  for (const token of badTokens) {
    // Only check outside of JSON scripts or inside body
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : html;
    // Strip script and style tags
    const cleanBody = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                                 .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
    if (cleanBody.includes(token)) {
      throw new Error(`Found forbidden token '${token}' in visible body HTML`);
    }
  }
  console.log("No illegal tokens (NaN, Infinity, undefined, [object Object]) found in visible HTML.");

  console.log("\nALL SSR / SEO CHECKS PASSED!");
}

checkSSR().catch((err) => {
  console.error("SSR Check Failed:", err);
  process.exit(1);
});
