async function auditGolfLive() {
  const url = "http://localhost:3000/calculators/golf-handicap-calculator";
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

  // Check Related Calculators count
  const relMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log('Occurrences of "RELATED CALCULATORS":', relMatches.length);
  const gpaMatch = html.match(/gpa-calculator/gi) || [];
  console.log('Occurrences of "gpa-calculator":', gpaMatch.length);

  // Check self-link
  const selfLinks = html.match(/href=["']\/calculators\/golf-handicap-calculator["']/gi) || [];
  console.log("Self links to /calculators/golf-handicap-calculator:", selfLinks.length);

  // Check "Official WHS" / "Official" claims
  const officialClaims = html.match(/Official WHS/gi) || [];
  console.log('Occurrences of "Official WHS":', officialClaims.length);

  // Check contextual links inside prose
  const proseLinks = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (proseLinks) {
    const linksInsideProse = proseLinks[1].match(/<a\s+[^>]*href=/gi) || [];
    console.log("Links inside article prose:", linksInsideProse.length);
  } else {
    console.log("Article element not found!");
  }

  // Check if JSON-LD schemas exist
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log("JSON-LD scripts count:", jsonLdMatches.length);
}

auditGolfLive().catch(console.error);
