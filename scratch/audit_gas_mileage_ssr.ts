import http from "http";

function fetchPage(url: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, body: data }));
      res.on("error", (err) => reject(err));
    });
  });
}

async function auditSSR() {
  console.log("Fetching http://localhost:3000/calculators/gas-mileage-calculator ...");
  const { status, body } = await fetchPage("http://localhost:3000/calculators/gas-mileage-calculator");
  console.log(`HTTP Status: ${status}`);

  if (status !== 200) {
    console.error(`ERROR: Expected HTTP 200, got ${status}`);
    process.exit(1);
  }

  // 1. H1 count
  const h1Matches = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 Count: ${h1Matches.length}`);
  h1Matches.forEach((h, i) => console.log(`  H1[${i}]: ${h.replace(/<[^>]+>/g, "").trim()}`));

  // 2. Title
  const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1] : "NONE"}`);

  // 3. Meta description
  const metaDescMatch = body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log(`Meta Description: ${metaDescMatch ? metaDescMatch[1] : "NONE"}`);

  // 4. Canonical
  const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`);

  // 5. Corrupt tokens in SSR body
  const rawTokens = ["NaN", "Infinity", "undefined", "null"];
  for (const token of rawTokens) {
    // Look for occurrences outside of script tags or styles
    const regex = new RegExp(`>([^<]*?\\b${token}\\b[^<]*?)<`, "g");
    const matches = [...body.matchAll(regex)];
    console.log(`Visible corrupt token '${token}': ${matches.length} matches`);
    if (matches.length > 0) {
      matches.slice(0, 5).forEach((m) => console.log(`  Context: ${m[0]}`));
    }
  }

  // 6. Terminology check: "US Imperial"
  const usImperialMatches = [...body.matchAll(/US Imperial/gi)];
  console.log(`Incorrect 'US Imperial' matches: ${usImperialMatches.length}`);

  // 7. Check aerodynamic terminology: "exponential"
  const exponentialMatches = [...body.matchAll(/exponential/gi)];
  console.log(`'exponential' occurrences in SSR: ${exponentialMatches.length}`);
  if (exponentialMatches.length > 0) {
    exponentialMatches.forEach((m) => {
      const idx = m.index ?? 0;
      console.log(`  Context: ${body.substring(Math.max(0, idx - 40), Math.min(body.length, idx + 60))}`);
    });
  }

  // 8. Related calculator sections
  const relatedMatches = [...body.matchAll(/Related Transportation|RELATED CALCULATORS/gi)];
  console.log(`Related sections matched: ${relatedMatches.length}`);

  // 9. Check FAQ
  const faqMatches = [...body.matchAll(/Frequently Asked Questions/gi)];
  console.log(`FAQ section matched: ${faqMatches.length}`);

  console.log("=== SSR AUDIT COMPLETE ===");
}

auditSSR().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
