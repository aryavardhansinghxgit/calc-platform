async function runAudit() {
  const res = await fetch("http://localhost:3000/calculators/sample-size-calculator");
  const html = await res.text();

  console.log("===============================================================================");
  console.log("SAMPLE SIZE CALCULATOR — PRODUCTION SEO & CONTENT AUDIT");
  console.log("===============================================================================\n");

  console.log("HTTP Status:", res.status);
  console.log("HTML Length:", html.length);

  // 1. Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  console.log("\n1. Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  // 2. Meta description
  const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
  console.log("2. Meta Description:", metaMatch ? metaMatch[1] : "NOT FOUND");

  // 3. H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map(m => m[1].replace(/<[^>]+>/g, "").trim());
  console.log("3. H1 Count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`   H1[${i + 1}]: "${h}"`));

  // 4. Related & Contextual Internal Links
  const sdLinks = (html.match(/\/calculators\/standard-deviation-calculator/g) || []).length;
  const ciLinks = (html.match(/\/calculators\/confidence-interval-calculator/g) || []).length;
  const zLinks = (html.match(/\/calculators\/z-score-calculator/g) || []).length;
  console.log("\n4. Internal Links Audit:");
  console.log("   Standard Deviation Calculator link occurrences:", sdLinks);
  console.log("   Confidence Interval Calculator link occurrences:", ciLinks);
  console.log("   Z-Score Calculator link occurrences:", zLinks);

  // 5. Benchmark table check
  console.log("\n5. Benchmark Table Audit:");
  console.log("   Pop 100: 80, 92, 100 ->", html.includes("80") && html.includes("92") && html.includes("100"));
  console.log("   Pop 500: 218, 341, 486 ->", html.includes("218") && html.includes("341") && html.includes("486"));
  console.log("   Pop 1,000: 278, 517, 944 ->", html.includes("278") && html.includes("517") && html.includes("944"));
  console.log("   Pop 10,000: 370, 965, 6,240 ->", html.includes("370") && html.includes("965") && html.includes("6,240"));
  console.log("   Pop Infinite: 385, 1,068, 16,588 ->", html.includes("385") && html.includes("1,068") && html.includes("16,588"));

  // 6. Educational Planning Diagram
  console.log("\n6. Educational Diagram Audit:");
  console.log("   Contains 'How Sample Size Planning Works':", html.includes("How Sample Size Planning Works"));
  console.log("   Contains 'Recruitment Adjustment':", html.includes("Recruitment Adjustment"));

  // 7. Frequently Asked Questions (Unfolded & Schema)
  console.log("\n7. Frequently Asked Questions Audit:");
  const faqSections = [...html.matchAll(/Frequently Asked Questions/g)].length;
  console.log("   Visible FAQ Section occurrences on page:", faqSections);
  console.log("   Contains FAQ 385 answer:", html.includes("384.15") && html.includes("rounded upward to 385"));
  console.log("   Contains FAQ 482 answer:", html.includes("recruitment target is 482 people"));
  console.log("   Contains Schema.org FAQPage:", html.includes('"@type":"FAQPage"') || html.includes('FAQPage'));

  // 8. Mobile & Dark-Mode Design checks
  console.log("\n8. Layout & Styling Checks:");
  console.log("   Has master toolbar:", html.includes("Copy Summary") && html.includes("Print / Save PDF"));
  console.log("   Has methodology disclaimer:", html.includes("Methodology &amp; Disclaimer") || html.includes("Methodology & Disclaimer"));

  console.log("\n===============================================================================");
}

runAudit().catch(console.error);
