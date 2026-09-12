import http from "http";

async function fetchHtml(url: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, body: data }));
      res.on("error", reject);
    });
  });
}

async function runAudit() {
  console.log("=== RUNNING HORSEPOWER CALCULATOR SSR & DOM AUDIT ===");

  const { status, body } = await fetchHtml("http://localhost:3000/calculators/horsepower-calculator");
  console.log(`HTTP Status: ${status}`);

  if (status !== 200) {
    console.error(`FAILED: Expected HTTP 200, got ${status}`);
    process.exit(1);
  }

  // 1. H1 Tag Audit
  const h1Matches = body.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  console.log(`H1 Tag count: ${h1Matches.length}`);
  if (h1Matches.length !== 1) {
    console.error(`FAILED: Expected exactly 1 H1, found ${h1Matches.length}`);
  } else {
    console.log(`H1 Content: ${h1Matches[0]}`);
  }

  // 2. Title and Description
  const titleMatch = body.match(/<title[^>]*>(.*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1] : "NONE"}`);

  const descMatch = body.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  console.log(`Description: ${descMatch ? descMatch[1] : "NONE"}`);

  const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`);

  // 3. Related Calculators Strips
  const relatedMatches = body.match(/RELATED CALCULATORS:/gi) || [];
  console.log(`Related Calculator Sections: ${relatedMatches.length} (Expected 2: one above, one below)`);
  if (relatedMatches.length !== 2) {
    console.warn(`WARNING: Found ${relatedMatches.length} related calculators sections, expected 2.`);
  }

  // 4. SSR Article & FAQs
  const hasHistory = body.includes("The Complete Guide to Horsepower, Torque, RPM, BHP, WHP and Performance Estimation");
  console.log(`SSR Educational Article: ${hasHistory ? "RENDERED" : "MISSING"}`);

  const hasFaq = body.includes("Frequently Asked Questions");
  console.log(`SSR FAQ: ${hasFaq ? "RENDERED" : "MISSING"}`);

  // 5. Check for unwanted artifacts (NaN, Infinity, undefined, null)
  const hasNaN = body.includes(">NaN<") || body.includes(" NaN ");
  const hasInfinity = body.includes(">Infinity<") || body.includes(" Infinity ");
  const hasUndefined = body.includes(">undefined<") || body.includes(" undefined ");
  const hasNull = body.includes(">null<");

  console.log(`Visible NaN: ${hasNaN ? "FAIL" : "PASS (0 found)"}`);
  console.log(`Visible Infinity: ${hasInfinity ? "FAIL" : "PASS (0 found)"}`);
  console.log(`Visible undefined: ${hasUndefined ? "FAIL" : "PASS (0 found)"}`);
  console.log(`Visible null: ${hasNull ? "FAIL" : "PASS (0 found)"}`);

  // 6. Check unique input IDs and labels
  const expectedInputIds = [
    "hp-torque-input",
    "hp-rpm-input",
    "hp-copy-btn",
    "hp-spec-btn",
    "hp-print-btn",
  ];

  for (const id of expectedInputIds) {
    const hasId = body.includes(`id="${id}"`);
    console.log(`Element #${id}: ${hasId ? "PRESENT" : "MISSING"}`);
  }

  console.log("\nAudit Complete!");
}

runAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
