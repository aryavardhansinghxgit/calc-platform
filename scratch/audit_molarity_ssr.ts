import http from "http";

async function fetchPage(url: string): Promise<{ status: number; html: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, html: data }));
    }).on("error", reject);
  });
}

async function audit() {
  console.log("Fetching http://localhost:3000/calculators/molarity-calculator...");
  const { status, html } = await fetchPage("http://localhost:3000/calculators/molarity-calculator");
  console.log(`HTTP Status: ${status}`);

  // 1. H1 audit
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((h, i) => console.log(`  H1 [${i}]: ${h.replace(/<[^>]+>/g, "").trim()}`));

  // 2. Title audit
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NONE"}`);

  // 3. Meta description
  const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  console.log(`Meta description: ${metaDesc ? metaDesc[1] : "NONE"}`);

  // 4. Canonical
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  console.log(`Canonical: ${canonical ? canonical[1] : "NONE"}`);

  // 5. Corrupted tokens check
  const badTokens = ["NaN", "undefined", "[object Object]"];
  badTokens.forEach(t => {
    const count = (html.match(new RegExp(t, "g")) || []).length;
    console.log(`Occurrence of '${t}': ${count}`);
  });

  // 6. Check article headings and content
  console.log("Checking article headings:");
  const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  h2Matches.forEach((h, i) => console.log(`  H2 [${i}]: ${h.replace(/<[^>]+>/g, "").trim()}`));

  // 7. Check FAQs in raw SSR HTML
  console.log("Checking FAQs in SSR HTML:");
  const faqMatches = html.match(/What is molarity|How do you calculate|What is the dilution formula/gi) || [];
  console.log(`FAQ SSR text matches found: ${faqMatches.length}`);

  // 8. Related calculators block count
  const relBlock = (html.match(/RELATED CALCULATORS:/gi) || []).length;
  console.log(`Related calculators blocks in SSR: ${relBlock}`);

  // 9. Check if molarity links to itself in related calculators
  const selfLink = html.includes('href="/calculators/molarity-calculator"') &&
                   html.includes('Molarity Calculator &amp; Dilution Solver');
  console.log(`Page links to itself in related calculators: ${selfLink}`);
}

audit().catch(console.error);
