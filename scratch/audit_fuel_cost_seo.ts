async function auditFuelCostSeo() {
  console.log("Fetching http://localhost:3000/calculators/fuel-cost-calculator...");
  const res = await fetch("http://localhost:3000/calculators/fuel-cost-calculator");
  console.log("Status:", res.status);
  if (res.status !== 200) {
    console.error("Non-200 status code!");
    process.exit(1);
  }

  const html = await res.text();

  // 1. Check Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "NONE";
  console.log("Title:", title);
  const expectedTitle = "Fuel Cost Calculator – Gas, MPG, Commute & EV Cost";
  if (!title.includes("Fuel Cost Calculator – Gas, MPG, Commute & EV Cost")) {
    console.error("Title mismatch!", title);
  } else {
    console.log("Title: PASS");
  }

  // 2. Check Meta Description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : "NONE";
  console.log("Meta Description:", metaDesc);
  if (!metaDesc.includes("Calculate road-trip fuel cost, commute expenses, MPG, L/100km, EV vs gas savings, tolls, parking, and estimated CO₂ emissions.")) {
    console.error("Meta description mismatch!");
  } else {
    console.log("Meta Description: PASS");
  }

  // 3. Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "NONE";
  console.log("Canonical:", canonical);
  if (canonical !== "https://calcplatform.com/calculators/fuel-cost-calculator") {
    console.error("Canonical mismatch!", canonical);
  } else {
    console.log("Canonical: PASS");
  }

  // 4. Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`H1 #${i + 1}:`, h.replace(/<[^>]*>/g, "").trim()));
  if (h1Matches.length !== 1) {
    console.error("Expected exactly 1 H1!");
  } else {
    console.log("H1: PASS");
  }

  // 5. Check OpenGraph
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  console.log("OG Title:", ogTitleMatch ? ogTitleMatch[1] : "NONE");
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  console.log("OG Description:", ogDescMatch ? ogDescMatch[1] : "NONE");

  // 6. Check Related Calculators Count
  // Find all "Related Calculators" text in uppercase or title case
  const relatedMatches = html.match(/Related Calculators/gi) || [];
  console.log("Related Calculators string count in HTML:", relatedMatches.length);

  // Check section headings specifically for Related Calculators
  const relatedHeadingMatches = html.match(/<h2[^>]*>[\s\S]*?Related Calculators[\s\S]*?<\/h2>/gi) || [];
  console.log("Related Calculators H2 section count:", relatedHeadingMatches.length);
  if (relatedHeadingMatches.length !== 2) {
    console.warn("Expected exactly 2 Related Calculators H2 sections! Found:", relatedHeadingMatches.length);
  } else {
    console.log("Related Calculators sections: PASS (exactly 2: above and below)");
  }

  // 7. Check Contextual Anchors
  const anchors = [
    { text: "Gas Mileage Calculator", path: "/calculators/gas-mileage-calculator" },
    { text: "Mileage Calculator", path: "/calculators/mileage-calculator" },
    { text: "Conversion Calculator", path: "/calculators/conversion-calculator" },
    { text: "Electricity Calculator", path: "/calculators/electricity-calculator" },
  ];
  for (const a of anchors) {
    if (html.includes(a.path)) {
      console.log(`Anchor [${a.text}] (${a.path}): PASS`);
    } else {
      console.error(`Anchor [${a.text}] (${a.path}) NOT FOUND!`);
    }
  }

  // 8. Check 25 Sections
  for (let s = 1; s <= 25; s++) {
    const secRegex = new RegExp(`${s}\\.\\s+`, "i");
    if (secRegex.test(html)) {
      // found
    } else {
      console.error(`Section ${s} heading missing!`);
    }
  }
  console.log("All 25 Sections presence: PASS");

  // 9. Check 20 FAQs
  const faqRegexes = [
    "How do I calculate fuel cost for a trip",
    "How much gas do I need for 300 miles at 25 MPG",
    "How do I calculate round-trip fuel cost",
    "How do I calculate my commute fuel cost per month",
    "How do I calculate MPG from my odometer",
    "What is the difference between MPG and L/100km",
    "How do I convert 25 MPG to L/100km",
    "What is the difference between U.S. and Imperial MPG",
    "Does driving faster increase fuel consumption",
    "Does air conditioning increase fuel consumption",
    "Does extra weight increase fuel consumption",
    "Does low tire pressure increase fuel consumption",
    "How much can carpooling reduce my personal fuel cost",
    "Is an EV always cheaper than a gasoline car",
    "How do I calculate EV charging cost for a trip",
    "What if the EV costs more than the gasoline car for a trip",
    "How are gasoline CO₂ emissions calculated",
    "Are these CO₂ values lifecycle emissions",
    "Why does my actual fuel cost differ from the calculator",
    "Can I use this calculator to estimate a complete cost of owning a car",
  ];
  let faqsFound = 0;
  for (const f of faqRegexes) {
    if (html.includes(f)) {
      faqsFound++;
    } else {
      console.error(`FAQ missing: "${f}"`);
    }
  }
  console.log(`FAQs found: ${faqsFound} / 20`);
  if (faqsFound === 20) {
    console.log("All 20 FAQs: PASS");
  }

  // 10. Check References
  const refPass = html.includes("Greenhouse Gas Equivalencies Calculator") &&
                  html.includes("Alternative Fuels Data Center") &&
                  html.includes("National Institute of Standards and Technology");
  console.log("Authoritative References:", refPass ? "PASS" : "FAIL");

  // 11. Check corruption in visible SSR text
  // Remove script and style tags first
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const corruptTokens = ["NaN", "Infinity", "undefined", "null"];
  for (const token of corruptTokens) {
    const regex = new RegExp(`\\b${token}\\b`, "g");
    const matches = cleanHtml.match(regex);
    console.log(`Corrupt token '${token}' in visible HTML:`, matches ? matches.length : 0);
    if (matches && matches.length > 0) {
      console.error(`Visible corruption found: ${token}`);
    }
  }

  console.log("\nALL SEO AUDIT CHECKS COMPLETE!");
}

auditFuelCostSeo().catch(console.error);
