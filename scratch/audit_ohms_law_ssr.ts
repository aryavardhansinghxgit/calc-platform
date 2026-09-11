export {};

async function auditSSR() {
  const url = "http://localhost:3000/calculators/ohms-law-calculator";
  console.log(`Fetching ${url}...`);

  const resp = await fetch(url);
  console.log(`HTTP Status: ${resp.status}`);
  if (resp.status !== 200) {
    throw new Error(`Expected HTTP 200, got ${resp.status}`);
  }

  const html = await resp.text();

  // 1. H1 count
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((h, idx) => console.log(`  H1 [${idx + 1}]: ${h.replace(/<[^>]+>/g, "").trim()}`));

  // 2. Title & Meta
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? titleMatch[1].trim() : "NONE";
  console.log(`Page Title: "${titleText}"`);

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const metaText = metaDescMatch ? metaDescMatch[1] : "NONE";
  console.log(`Meta Description: "${metaText}"`);

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonicalText = canonicalMatch ? canonicalMatch[1] : "NONE";
  console.log(`Canonical Link: "${canonicalText}"`);

  // 3. Educational Content and FAQs
  const hasSection1 = html.includes("What Is Ohm&#x27;s Law?") || html.includes("What Is Ohm's Law?");
  const hasSection28 = html.includes("Engineering Disclaimer");
  const hasReferences = html.includes("OpenStax") && html.includes("NIST");
  const hasFAQ = html.includes("Frequently Asked Questions");
  console.log(`Educational content Section 1 present: ${hasSection1}`);
  console.log(`Educational content Section 28 present: ${hasSection28}`);
  console.log(`References present: ${hasReferences}`);
  console.log(`FAQ present: ${hasFAQ}`);

  // 4. Contextual internal links inside article
  const hasVoltageDropLink = html.includes('href="/calculators/voltage-drop-calculator"');
  const hasResistorLink = html.includes('href="/calculators/resistor-calculator"');
  const hasConversionLink = html.includes('href="/calculators/conversion-calculator"');
  console.log(`Contextual link to Voltage Drop Calculator: ${hasVoltageDropLink}`);
  console.log(`Contextual link to Resistor Calculator: ${hasResistorLink}`);
  console.log(`Contextual link to Conversion Calculator: ${hasConversionLink}`);

  // 5. Check for illegal tokens in visible body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyText = bodyMatch ? bodyMatch[1] : html;

  // Strip scripts and styles to avoid matching JS variable names
  const cleanBody = bodyText
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  const nanMatches = cleanBody.match(/\bNaN\b/g) || [];
  const infMatches = cleanBody.match(/\bInfinity\b/g) || [];
  const undefinedMatches = cleanBody.match(/>\s*undefined\s*</g) || [];
  const nullMatches = cleanBody.match(/>\s*null\s*</g) || [];

  console.log(`Visible NaN occurrences: ${nanMatches.length}`);
  console.log(`Visible Infinity occurrences: ${infMatches.length}`);
  console.log(`Visible undefined occurrences: ${undefinedMatches.length}`);
  console.log(`Visible null occurrences: ${nullMatches.length}`);

  // 6. Related Calculators sections count
  const relatedMatches = html.match(/Related Calculators/gi) || [];
  console.log(`"Related Calculators" headings count: ${relatedMatches.length}`);

  // 7. Duplicate FAQ sections count
  const faqHeadingMatches = html.match(/Frequently Asked Questions/gi) || [];
  console.log(`"Frequently Asked Questions" headings count: ${faqHeadingMatches.length}`);

  // 8. Check for raw LaTeX leakage
  const rawLatexDollar = cleanBody.match(/\$[A-Za-z0-9\^_\\]+\$/g) || [];
  console.log(`Raw LaTeX single dollar signs: ${rawLatexDollar.length}`);

  console.log("SSR AUDIT COMPLETE");
}

auditSSR().catch(err => {
  console.error("SSR Audit Failed:", err);
  process.exit(1);
});
