import http from "http";

async function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function runAudit() {
  console.log("=== MASS CALCULATOR SSR & SEO AUDIT ===");
  const html = await fetchPage("http://localhost:3000/calculators/mass-calculator");
  console.log(`Page fetched successfully. HTML size: ${html.length} bytes.`);

  // Clean HTML: remove HTML comments
  const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, "");

  // 1. H1 check
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`\nH1 Count: ${h1Matches.length} (Expected: 1)`);
  h1Matches.forEach((h1, i) => {
    const text = h1.replace(/<[^>]*>/g, "").trim();
    console.log(`  H1[${i}]: "${text}"`);
  });

  // 2. Title & Meta Description
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log(`\nPage Title: "${titleMatch ? titleMatch[1].trim() : "NOT FOUND"}"`);

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log(`Meta Description: "${metaDescMatch ? metaDescMatch[1].trim() : "NOT FOUND"}"`);

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log(`Canonical URL: "${canonicalMatch ? canonicalMatch[1].trim() : "NOT FOUND"}"`);

  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  console.log(`OG Title: "${ogTitleMatch ? ogTitleMatch[1].trim() : "NOT FOUND"}"`);

  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  console.log(`OG Description: "${ogDescMatch ? ogDescMatch[1].trim() : "NOT FOUND"}"`);

  // 3. Related Calculators blocks
  const relatedNavMatches = cleanHtml.match(/RELATED CALCULATORS:/g) || [];
  console.log(`\nRelated Calculator Blocks Count: ${relatedNavMatches.length} (Expected: 2)`);

  // 4. Check 21 Sections
  console.log(`\nChecking 21 Educational Sections:`);
  let sectionsFound = 0;
  for (let i = 1; i <= 21; i++) {
    const pattern = new RegExp(`${i}\\.\\s+`, "i");
    const found = pattern.test(cleanHtml);
    if (found) sectionsFound++;
    else console.log(`  MISSING Section ${i}`);
  }
  console.log(`Found ${sectionsFound}/21 sections.`);

  // 5. Check FAQ items
  console.log(`\nChecking 20 FAQ Items in SSR:`);
  let faqsFound = 0;
  for (let i = 1; i <= 20; i++) {
    const pattern = new RegExp(`Q${i}\\.`, "i");
    const found = pattern.test(cleanHtml);
    if (found) faqsFound++;
    else console.log(`  MISSING FAQ Q${i}`);
  }
  console.log(`Found ${faqsFound}/20 FAQs in SSR HTML.`);

  // Also check if answers are rendered (unfolded)
  const sampleAnswers = [
    "Mass is calculated from density and volume using: m = ρV",
    "Multiply density by volume after ensuring that the units are compatible",
    "Mass measures the amount of matter and is measured in kilograms in SI",
    "Multiply kilograms by approximately: 2.2046226218 lb/kg",
    "One avoirdupois pound contains: 16 avoirdupois ounces",
    "A metric tonne is 1,000 kg. A US short ton is 2,000 lb",
    "6.62607015 × 10⁻³⁴ J·s",
  ];
  let answersFound = 0;
  sampleAnswers.forEach(ans => {
    if (html.includes(ans)) answersFound++;
    else console.log(`  MISSING answer snippet: "${ans.slice(0, 30)}..."`);
  });
  console.log(`Sample FAQ answers present in SSR: ${answersFound}/${sampleAnswers.length}`);

  // 6. Check JSON-LD schema
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log(`\nJSON-LD Schemas: ${jsonLdMatches.length}`);
  let faqSchemaCount = 0;
  jsonLdMatches.forEach((script) => {
    const content = script.replace(/<[^>]*>/g, "");
    try {
      const parsed = JSON.parse(content);
      if (parsed["@type"] === "FAQPage") {
        faqSchemaCount = parsed.mainEntity?.length || 0;
        console.log(`  FAQPage Schema found with ${faqSchemaCount} entities.`);
      }
    } catch (e) {}
  });

  // 7. Check Contextual internal links
  const hasConversionLink = html.includes('href="/calculators/conversion-calculator"');
  const hasScientificNotationLink = html.includes('href="/calculators/scientific-notation-calculator"');
  console.log(`\nContextual Links:`);
  console.log(`  Conversion Calculator link present: ${hasConversionLink}`);
  console.log(`  Scientific Notation link present: ${hasScientificNotationLink}`);

  // 8. Check forbidden patterns
  console.log(`\nForbidden String Inspection:`);
  const forbidden = ["NaN", "Infinity", "undefined", "null"];
  forbidden.forEach((term) => {
    const bodyOnly = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
    const regex = new RegExp(`\\b${term}\\b`, "g");
    const matches = bodyOnly.match(regex) || [];
    console.log(`  Visible occurrences of "${term}": ${matches.length}`);
  });

  // 9. Check keywords
  console.log(`\nKeyword Coverage:`);
  const keywords = [
    "mass calculator",
    "mass from density",
    "density and volume",
    "mass converter",
    "kg to lb",
    "lb to kg",
    "mass vs weight",
    "weight on Mars",
    "weight on Moon",
    "weight on Jupiter",
    "metric tonne",
    "short ton",
    "long ton",
    "density calculator"
  ];
  keywords.forEach((kw) => {
    const regex = new RegExp(kw, "gi");
    const matches = html.match(regex) || [];
    console.log(`  "${kw}": ${matches.length} occurrences`);
  });

  console.log("\n=== AUDIT COMPLETE ===");
}

runAudit().catch(console.error);
