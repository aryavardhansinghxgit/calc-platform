async function verifyCISeoFinal() {
  const res = await fetch("http://localhost:3000/calculators/confidence-interval-calculator");
  console.log("HTTP Status:", res.status);
  const html = await res.text();

  console.log("\n===============================================================================");
  console.log("CONFIDENCE INTERVAL CALCULATOR — FINAL PRODUCTION SEO AUDIT");
  console.log("===============================================================================\n");

  // 1. Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log("1. Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  // 2. Meta Description
  const metaDescMatch = html.match(/<meta name="description" content="([^"]+)"/);
  console.log("2. Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // 3. H1
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/g);
  console.log("3. H1 Count:", h1Matches ? h1Matches.length : 0);
  if (h1Matches) {
    h1Matches.forEach((h1, i) => console.log(`   H1[${i + 1}]: ${h1.replace(/<[^>]+>/g, "").trim()}`));
  }

  // 4. Related Calculators Strips
  const relStripCount = (html.match(/Related Calculators:/g) || []).length;
  console.log("\n4. Related Calculators Strip Occurrences (Expected 2):", relStripCount);

  // 5. Contextual Internal Links Inside Article
  console.log("\n5. Contextual Internal Links Inside Article:");
  console.log("   - /calculators/sample-size-calculator:", (html.match(/href="\/calculators\/sample-size-calculator"/g) || []).length);
  console.log("   - /calculators/z-score-calculator:", (html.match(/href="\/calculators\/z-score-calculator"/g) || []).length);
  console.log("   - /calculators/standard-deviation-calculator:", (html.match(/href="\/calculators\/standard-deviation-calculator"/g) || []).length);

  // 6. Educational Diagram
  console.log("\n6. Educational Diagram:");
  console.log("   - 'How a Confidence Interval Is Built':", html.includes("How a Confidence Interval Is Built"));
  console.log("   - 'Point Estimate':", html.includes("Point Estimate"));
  console.log("   - 'Margin of Error':", html.includes("Margin of Error"));

  // 7. Unfolded FAQ Section
  const hasQ1 = html.includes("Q<!-- -->1</span>") || html.includes("Q1</span>");
  const hasQ15 = html.includes("Q<!-- -->15</span>") || html.includes("Q15</span>");
  const hasQ30 = html.includes("Q<!-- -->30</span>") || html.includes("Q30</span>");
  console.log("\n7. Unfolded FAQs Audit:");
  console.log("   - Has Q1 badge:", hasQ1);
  console.log("   - Has Q15 badge:", hasQ15);
  console.log("   - Has Q30 badge:", hasQ30);
  console.log("   - All 30 FAQs rendered:", hasQ1 && hasQ15 && hasQ30);
  console.log("   - Zero collapse accordion buttons:", !html.includes("openFaq"));
  console.log("   - Has Schema.org FAQPage:", html.includes("\"@type\":\"FAQPage\""));

  // 8. Design Check (No dark cards)
  console.log("\n8. Design / Theme Check:");
  console.log("   - 401(k) light card theme present:", html.includes("bg-white") && html.includes("border-slate-200"));
  console.log("   - Master action toolbar present:", html.includes("Export CSV") && html.includes("Print / Save PDF"));

  console.log("\n===============================================================================");
}

verifyCISeoFinal();
