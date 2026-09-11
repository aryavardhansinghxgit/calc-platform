async function auditBandwidthSeo() {
  console.log("================================================================================");
  console.log("FINAL PRODUCTION SEO AUDIT: /calculators/bandwidth-calculator");
  console.log("================================================================================");

  const res = await fetch("http://localhost:3000/calculators/bandwidth-calculator");
  if (!res.ok) {
    throw new Error(`HTTP fetch failed with status ${res.status}`);
  }
  const html = await res.text();
  console.log(`Fetched HTML size: ${html.length.toLocaleString()} bytes\n`);

  // 1. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const actualTitle = titleMatch ? titleMatch[1].trim().replace(/&amp;/g, "&") : "";
  const expectedTitle = "Bandwidth Calculator – Download Time, Mbps, MB/s & Network Capacity";
  const titlePass = actualTitle === expectedTitle;
  console.log(`TITLE: ${titlePass ? "PASS" : "FAIL"}`);
  console.log(`  Actual:   "${actualTitle}"`);
  console.log(`  Expected: "${expectedTitle}"`);

  // 2. Meta Description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const actualMeta = metaMatch ? metaMatch[1].trim() : "";
  const expectedMeta = "Calculate download and upload time, convert Mbps to MB/s, estimate website bandwidth, plan concurrent network demand, and check data-cap usage.";
  const metaPass = actualMeta === expectedMeta;
  console.log(`META: ${metaPass ? "PASS" : "FAIL"}`);
  console.log(`  Actual:   "${actualMeta}"`);
  console.log(`  Expected: "${expectedMeta}"`);

  // 3. H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Text = h1Matches.length === 1 ? h1Matches[0].replace(/<[^>]+>/g, "").trim() : "";
  const h1Pass = h1Matches.length === 1 && h1Text === "Bandwidth Calculator";
  console.log(`H1: ${h1Pass ? "PASS" : "FAIL"} (Count: ${h1Matches.length}, Text: "${h1Text}")`);

  // 4. Canonical
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const actualCanon = canonMatch ? canonMatch[1].trim() : "";
  const expectedCanon = "https://calcplatform.com/calculators/bandwidth-calculator";
  const canonPass = actualCanon === expectedCanon;
  console.log(`CANONICAL: ${canonPass ? "PASS" : "FAIL"} ("${actualCanon}")`);

  // 5. Related Blocks Count (Expected: exactly 2 - ABOVE and BELOW)
  const relatedMatches = html.match(/RELATED CALCULATORS/g) || [];
  const relatedPass = relatedMatches.length === 2;
  console.log(`RELATED BLOCKS: ${relatedPass ? "PASS" : "FAIL"} (Found: ${relatedMatches.length}, Expected: 2)`);

  // 6. Contextual Anchor Links
  const hasIpSubnetAnchor = html.includes('href="/calculators/ip-subnet-calculator"');
  const hasConversionAnchor = html.includes('href="/calculators/conversion-calculator"');
  const anchorPass = hasIpSubnetAnchor && hasConversionAnchor;
  console.log(`CONTEXTUAL ANCHORS: ${anchorPass ? "PASS" : "FAIL"} (IP Subnet: ${hasIpSubnetAnchor}, Conversion: ${hasConversionAnchor})`);

  // 7. Check 23 Article Sections
  const sections = [
    "1. What a Bandwidth Calculator Actually Measures",
    "2. Bits and Bytes: The Most Important Conversion",
    "3. Download Time Formula",
    "4. Why Real Download Time Is Usually Longer",
    "5. What Is Network Bandwidth?",
    "6. Bandwidth, Throughput and Latency Are Different",
    "7. Mbps to MB/s Conversion",
    "8. SI Decimal Units Versus IEC Binary Units",
    "9. Worked Example: 10 GB Over 100 Mbps",
    "10. Website Bandwidth Calculator for Hosting",
    "11. Peak Traffic Matters More Than the Monthly Average Alone",
    "12. How Much Bandwidth Does a Household or Office Need?",
    "13. Concurrent Activity Example",
    "14. What Is Headroom in Bandwidth Planning?",
    "15. What Is the Bandwidth-Delay Product?",
    "16. Why a Fast Internet Connection May Still Feel Slow",
    "17. How Long Does 1 GB Take at 100 Mbps?",
    "18. Monthly Data-Cap Planning",
    "19. Bandwidth Versus Storage Capacity",
    "20. Practical Uses of a Bandwidth Calculator",
    "21. Common Bandwidth Calculation Mistakes",
    "22. How to Use This Bandwidth Calculator",
    "23. Why This Calculator Uses Explicit Assumptions",
  ];

  let sectionsFound = 0;
  sections.forEach((sec) => {
    if (html.includes(sec)) sectionsFound++;
  });
  const articlePass = sectionsFound === sections.length;
  console.log(`ARTICLE SECTIONS: ${articlePass ? "PASS" : "FAIL"} (${sectionsFound}/${sections.length} present)`);

  // 8. Check 20 FAQs
  const faqQuestions = [
    "How do I calculate download time from Mbps?",
    "How many MB/s is 100 Mbps?",
    "How long does a 10 GB file take to download at 100 Mbps?",
    "Why is my real download speed lower than my ISP's advertised speed?",
    "What is the difference between Mbps and MB/s?",
    "What is the difference between GB and GiB?",
    "How much bandwidth does a website need?",
    "How much bandwidth should I allow for peak website traffic?",
    "How much bandwidth does a 4K video stream use?",
    "How do I calculate bandwidth for multiple users?",
    "What is bandwidth headroom?",
    "Does latency affect download speed?",
    "What is the bandwidth-delay product?",
    "How quickly will a 1.2 TB data cap be exhausted at 100 Mbps?",
    "Does 1 Gbps mean I can download at 1 GB/s?",
    "Is bandwidth the same as throughput?",
    "What is the difference between upload and download bandwidth?",
    "Does protocol overhead always equal 10%?",
    "Can a bandwidth calculator predict my exact real download time?",
    "Why do websites need more bandwidth during traffic spikes?",
  ];

  let faqsFound = 0;
  faqQuestions.forEach((q) => {
    if (html.includes(q)) faqsFound++;
  });
  const faqPass = faqsFound === faqQuestions.length;
  console.log(`FAQ QUESTIONS: ${faqPass ? "PASS" : "FAIL"} (${faqsFound}/${faqQuestions.length} present)`);

  // 9. Technical Notes and References
  const hasTechnicalNotes = html.includes("Technical Notes and Limitations");
  const hasReferences = html.includes("IETF RFC 6349") && html.includes("NIST");
  console.log(`TECHNICAL NOTES & REFERENCES: ${hasTechnicalNotes && hasReferences ? "PASS" : "FAIL"}`);

  // 10. Corrupt Tokens in SSR Body
  const cleanBody = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const nanCount = (cleanBody.match(/\bNaN\b/g) || []).length;
  const infCount = (cleanBody.match(/\bInfinity\b/g) || []).length;
  const undefCount = (cleanBody.match(/\bundefined\b/g) || []).length;
  const nullCount = (cleanBody.match(/\bnull\b/g) || []).length;
  const tokensPass = nanCount === 0 && infCount === 0 && undefCount === 0 && nullCount === 0;
  console.log(`CORRUPT TOKENS: ${tokensPass ? "PASS" : "FAIL"} (NaN: ${nanCount}, Inf: ${infCount}, undef: ${undefCount}, null: ${nullCount})`);

  console.log("\n================================================================================");
  if (
    titlePass &&
    metaPass &&
    h1Pass &&
    canonPass &&
    relatedPass &&
    anchorPass &&
    articlePass &&
    faqPass &&
    hasTechnicalNotes &&
    hasReferences &&
    tokensPass
  ) {
    console.log("FINAL SEO RELEASE GATE: 100% PASS");
  } else {
    console.error("FINAL SEO RELEASE GATE: FAILED");
    process.exit(1);
  }
  console.log("================================================================================");
}

auditBandwidthSeo().catch(console.error);
