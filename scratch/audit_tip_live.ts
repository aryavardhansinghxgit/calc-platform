async function auditLive() {
  const url = "http://localhost:3000/calculators/tip-calculator";
  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  console.log("Status:", res.status);
  const html = await res.text();

  // Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`  H1 [${i}]:`, h.replace(/<[^>]+>/g, "").trim()));

  // Check Title & Meta
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : "NONE");

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NONE");

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NONE");

  // Check Bad Tokens
  const badTokens = ["NaN", "Infinity", "undefined", "null", "[object Object]"];
  for (const token of badTokens) {
    const regex = new RegExp(`(?<![a-zA-Z0-9_])${token.replace(/\[/g, "\\[").replace(/\]/g, "\\]")}(?![a-zA-Z0-9_])`, "g");
    const matches = html.match(regex) || [];
    console.log(`Token "${token}": ${matches.length} occurrences`);
  }

  // Check FAQ count
  const faqHeadingMatches = html.match(/Frequently Asked Questions/gi) || [];
  console.log('Occurrences of "Frequently Asked Questions":', faqHeadingMatches.length);

  // Check FAQ question
  const sampleQ = "Should I calculate the tip before or after tax?";
  const qMatches = html.match(new RegExp(sampleQ, "g")) || [];
  console.log(`Occurrences of question "${sampleQ}":`, qMatches.length);

  // Check Contextual Anchor Links inside Prose
  const anchorSalesTax = html.match(/href=["']\/calculators\/sales-tax-calculator["'][^>]*>Sales Tax Calculator<\/a>/gi) || [];
  console.log("Contextual anchor 'Sales Tax Calculator':", anchorSalesTax.length);

  const anchorPercentage = html.match(/href=["']\/calculators\/percentage-calculator["'][^>]*>Percentage Calculator<\/a>/gi) || [];
  console.log("Contextual anchor 'Percentage Calculator':", anchorPercentage.length);

  const anchorDiscount = html.match(/href=["']\/calculators\/discount-calculator["'][^>]*>Discount Calculator<\/a>/gi) || [];
  console.log("Contextual anchor 'Discount Calculator':", anchorDiscount.length);

  // Check Related Calculators count
  const relMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log('Occurrences of "RELATED CALCULATORS":', relMatches.length);
  const relSectionMatches = html.match(/Related Everyday &amp; Financial Calculators/gi) || [];
  console.log('Occurrences of "Related Everyday & Financial Calculators":', relSectionMatches.length);

  // Check self-link
  const selfLinks = html.match(/href=["']\/calculators\/tip-calculator["']/gi) || [];
  console.log("Self links to /calculators/tip-calculator:", selfLinks.length);

  // Check Sources section
  const sourcesMatch = html.match(/Sources and Further Reading/gi) || [];
  console.log('Occurrences of "Sources and Further Reading":', sourcesMatch.length);

  // Check if JSON-LD schemas exist
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log("JSON-LD scripts count:", jsonLdMatches.length);
}

auditLive().catch(console.error);
