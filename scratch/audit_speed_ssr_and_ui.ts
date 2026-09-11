export {};

async function auditSSR() {
  const res = await fetch("http://localhost:3000/calculators/speed-calculator");
  const html = await res.text();

  console.log("Status:", res.status);
  
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`  H1[${i}]:`, h.replace(/<[^>]+>/g, '').trim()));

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : "None");

  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1].trim() : "None");

  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1].trim() : "None");

  // Check for NaN, Infinity, undefined, null
  const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  const rawTokens = ["NaN", "Infinity", "undefined", "null"];
  for (const token of rawTokens) {
    const regex = new RegExp(`\\b${token}\\b`, "g");
    const matches = visibleText.match(regex);
    console.log(`Token '${token}' occurrences in visible SSR:`, matches ? matches.length : 0);
  }

  const faqMatches = html.match(/Frequently Asked Questions/gi) || [];
  console.log("FAQ section matches in SSR:", faqMatches.length);

  const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log("RELATED CALCULATORS occurrences in SSR:", relatedMatches.length);
}

auditSSR().catch(console.error);
