async function audit() {
  const res = await fetch("http://localhost:3000/calculators/big-number-calculator");
  const html = await res.text();
  console.log("STATUS:", res.status);

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log("TITLE:", titleMatch ? titleMatch[1] : "NONE");

  // Meta Description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  console.log("META DESC:", metaDescMatch ? metaDescMatch[1] : "NONE");

  // H1 tags
  const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi));
  console.log("H1 COUNT:", h1Matches.length);
  h1Matches.forEach((m, i) => console.log(`H1 [${i}]:`, m[1].replace(/<[^>]+>/g, "").trim()));

  // Check Schema.org JSON-LD scripts
  const jsonLdMatches = Array.from(html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi));
  console.log("JSON-LD SCRIPTS COUNT:", jsonLdMatches.length);
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      console.log("SCHEMA TYPE:", parsed["@type"]);
    } catch (e) {}
  }

  // Related Calculators occurrences
  const relMatches = Array.from(html.matchAll(/RELATED CALCULATORS/gi));
  console.log("RELATED CALCULATORS SECTION COUNT:", relMatches.length);

  // Check fallback formula section
  const formulaMatches = Array.from(html.matchAll(/Formula &amp; Calculation Method/gi));
  console.log("FALLBACK FORMULA SECTION COUNT:", formulaMatches.length);

  // Check FAQs occurrences
  const faqHeadingMatches = Array.from(html.matchAll(/Frequently Asked Questions/gi));
  console.log("FAQ HEADING COUNT:", faqHeadingMatches.length);

  // Check dark/black card classes in content
  const darkMatches = html.match(/\bbg-(black|zinc-950|slate-950)\b/g);
  console.log("BLACK/DARK CARDS:", darkMatches ? darkMatches.length : 0);

  // Check if content terms exist in SSR
  console.log("HAS 'Arbitrary-Precision BigInt Arithmetic':", html.includes("Arbitrary-Precision BigInt Arithmetic"));
  console.log("HAS 'Modular Exponentiation':", html.includes("Modular Exponentiation"));
  console.log("HAS 'Legendre':", html.includes("Legendre"));
  console.log("HAS 'Googology':", html.includes("Googology"));
}

audit().catch(console.error);
