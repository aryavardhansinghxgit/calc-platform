export {};

async function checkSsr() {
  const url = "http://localhost:3000/calculators/tile-calculator";
  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  console.log("Status:", res.status);
  const html = await res.text();

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : "NOT FOUND");

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  console.log("Description:", descMatch ? descMatch[1] : "NOT FOUND");

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  console.log("H1 Count:", h1s.length, h1s);

  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  console.log("H2 Count:", h2s.length, h2s);

  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  console.log("H3 Count:", h3s.length, h3s);

  const relBlocks = [...html.matchAll(/RELATED CALCULATORS:/gi)];
  console.log("Related Calculators count:", relBlocks.length);

  const faqH3 = html.includes("Frequently Asked Questions");
  console.log("Contains 'Frequently Asked Questions':", faqH3);

  // Check for NaN or undefined in HTML
  console.log("Contains 'NaN':", html.includes("NaN"));
  console.log("Contains 'undefined':", html.includes("undefined"));
}

checkSsr().catch(console.error);
