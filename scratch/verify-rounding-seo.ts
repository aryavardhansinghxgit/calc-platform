async function verify() {
  const res = await fetch("http://localhost:3000/calculators/rounding-calculator");
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
  let faqSchemaFound = false;
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      if (parsed["@type"] === "FAQPage") {
        faqSchemaFound = true;
        console.log("FAQ SCHEMA ENTITIES COUNT:", parsed.mainEntity?.length);
      }
    } catch (e) {
      // ignore
    }
  }
  console.log("FAQ SCHEMA FOUND:", faqSchemaFound);

  // Check for duplicate FAQ headings
  const faqHeadingMatches = Array.from(html.matchAll(/Frequently Asked Questions/gi));
  console.log("FAQ HEADING COUNT:", faqHeadingMatches.length);

  // Related Calculators occurrences
  const relMatches = Array.from(html.matchAll(/RELATED CALCULATORS/gi));
  console.log("RELATED CALCULATORS SECTION COUNT:", relMatches.length);

  // In-body links
  console.log("IN-BODY SCI-NOTATION LINK:", html.includes("/calculators/scientific-notation-calculator"));
  console.log("IN-BODY FRACTION LINK:", html.includes("/calculators/fraction-calculator"));
  console.log("IN-BODY PERCENTAGE LINK:", html.includes("/calculators/percentage-calculator"));

  // Check dark/black card classes in content
  const darkMatches = html.match(/\bbg-(black|zinc-950|slate-950)\b/g);
  console.log("BLACK/DARK CARD CLASSES:", darkMatches || "NONE (CLEAN)");

  // Specific FAQs verified
  console.log("FAQ 1 PRESENT:", html.includes("What is a rounding calculator?"));
  console.log("FAQ 16 PRESENT:", html.includes("Is 0.009995 the same as 0.01?"));
}

verify().catch(console.error);
