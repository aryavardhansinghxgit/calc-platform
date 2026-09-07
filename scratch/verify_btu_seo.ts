export {};

async function verifySeo() {
  const url = "http://localhost:3000/calculators/btu-calculator";
  console.log(`Fetching ${url} ...`);
  const res = await fetch(url);
  console.log("HTTP Status:", res.status);
  const html = await res.text();

  // 1. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : null);

  // 2. Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  console.log("Meta Description:", descMatch ? descMatch[1] : null);

  // 3. H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log("H1 Count:", h1Matches.length, "H1 values:", h1Matches);

  // 4. Section headings count
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log("H2 Count:", h2Matches.length);
  console.log("H2 sample:", h2Matches.slice(0, 5));

  // 5. Related calculators blocks count
  const relBlocks = [...html.matchAll(/Related Calculators:/gi)];
  console.log("'Related Calculators:' occurrences:", relBlocks.length);

  // 6. FAQs count
  const qMatches = [...html.matchAll(/Q(?:<!--.*?-->)*\d+(?:<!--.*?-->)*\./g)];
  console.log("FAQ questions rendered in DOM (Q1..QN):", qMatches.length);

  // 7. Check absence of unwanted generic fallback
  const genericFaqH3 = html.includes("<h3") && html.includes("Frequently Asked Questions</h3>");
  console.log("Generic fallback H3 FAQ leak:", genericFaqH3);

  // 8. JSON-LD schemas
  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log("JSON-LD schemas count:", schemas.length);
  for (let i = 0; i < schemas.length; i++) {
    const json = JSON.parse(schemas[i][1]);
    console.log(`Schema #${i + 1}: @type = ${json["@type"]}`);
  }
}

verifySeo().catch(console.error);
