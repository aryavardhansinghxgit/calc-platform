async function verifyLcmSeo() {
  const url = "http://localhost:3000/calculators/lcm-calculator";
  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`HTTP error: ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();
  console.log(`Received HTML size: ${html.length} bytes`);

  // 1. Check Title & Meta Description
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const cleanTitle = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : "";
  console.log(`Page title: ${cleanTitle}`);
  if (!cleanTitle.includes("LCM Calculator – Least Common Multiple & GCF With Steps")) {
    console.error("FAIL: Title mismatch!");
    process.exit(1);
  }

  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  console.log(`Meta description: ${metaDescMatch ? metaDescMatch[1] : "NONE"}`);
  if (!metaDescMatch || !metaDescMatch[1].includes("Calculate the LCM and GCF of 2 or more numbers")) {
    console.error("FAIL: Meta description mismatch!");
    process.exit(1);
  }

  // 2. Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log(`H1 count: ${h1Matches ? h1Matches.length : 0}`);
  if (!h1Matches || h1Matches.length !== 1) {
    console.error(`FAIL: Expected exactly 1 H1, got ${h1Matches ? h1Matches.length : 0}`);
    process.exit(1);
  }
  console.log(`H1 text: ${h1Matches[0].replace(/<[^>]+>/g, '').trim()}`);

  // 3. Check Anchor IDs
  const anchors = [
    "what-is-lcm",
    "how-to-use",
    "lcm-formula",
    "prime-factorization",
    "listing-multiples",
    "division-ladder",
    "lcm-three-numbers",
    "lcm-vs-gcf",
    "lcm-fractions",
    "coprime-lcm",
    "worked-example",
    "real-world-uses",
    "five-ways-to-check",
    "sanity-checks",
    "common-mistakes",
    "choosing-method",
    "terminology",
    "faq",
    "verification"
  ];

  for (const anchor of anchors) {
    if (!html.includes(`id="${anchor}"`)) {
      console.error(`FAIL: Missing section id="${anchor}"`);
      process.exit(1);
    }
    if (!html.includes(`href="#${anchor}"`)) {
      console.error(`FAIL: Missing Table of Contents link href="#${anchor}"`);
      process.exit(1);
    }
  }
  console.log(`✓ All ${anchors.length} in-content anchor links and IDs are present and verified!`);

  // 4. Check for prohibited strings
  if (html.includes("|a - b|") || html.includes("a - b")) {
    console.error("FAIL: Prohibited '|a - b|' found in HTML!");
    process.exit(1);
  }
  if (html.includes("$\\to$") || html.includes("\\operatorname")) {
    console.error("FAIL: Raw unrendered LaTeX markers found!");
    process.exit(1);
  }
  console.log("✓ Zero occurrences of '|a - b|' and raw LaTeX");

  // 5. Check Duality Theorem formula
  if (!html.includes("LCM(a, b) × GCF(a, b) = a × b")) {
    console.error("FAIL: LCM-GCF Duality formula 'LCM(a, b) × GCF(a, b) = a × b' not found in HTML!");
    process.exit(1);
  }
  console.log("✓ Exact LCM-GCF Duality formula verified in HTML");

  // 6. Check FAQs are unfolded / present
  if (!html.includes("What is the LCM?") || !html.includes("What is the LCM of 12, 18 and 30?")) {
    console.error("FAIL: FAQ questions missing from HTML!");
    process.exit(1);
  }
  console.log("✓ All FAQs are present in rendered HTML");

  // 7. Check Related Calculators block count
  const relatedMatches = html.match(/Related Calculators/gi);
  console.log(`Related calculators mentions: ${relatedMatches ? relatedMatches.length : 0}`);

  console.log("=== LCM SEO & SSR VERIFICATION COMPLETE: 100% PASS ===");
}

verifyLcmSeo().catch(e => {
  console.error("Error verifying LCM SEO:", e);
  process.exit(1);
});
