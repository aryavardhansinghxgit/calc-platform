async function auditBandwidthSsr() {
  console.log("Fetching http://localhost:3000/calculators/bandwidth-calculator...");
  const res = await fetch("http://localhost:3000/calculators/bandwidth-calculator");
  if (!res.ok) {
    throw new Error(`HTTP status ${res.status}`);
  }
  const html = await res.text();
  console.log(`Received HTML size: ${html.length} bytes`);

  // Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  if (h1Matches.length !== 1) {
    console.error("FAIL: Expected exactly 1 H1, found:", h1Matches);
  } else {
    console.log(`H1 content: ${h1Matches[0].replace(/<[^>]+>/g, "").trim()}`);
  }

  // Check Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NOT FOUND"}`);

  // Check Meta Description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log(`Meta Description: ${metaDescMatch ? metaDescMatch[1] : "NOT FOUND"}`);

  // Check Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NOT FOUND"}`);

  // Check Corrupt Tokens
  const rawBody = html.replace(/<script[\s\S]*?<\/script>/gi, ""); // ignore scripts/json-ld if needed, but let's check visible text
  const nanMatches = (rawBody.match(/\bNaN\b/g) || []).length;
  const infinityMatches = (rawBody.match(/\bInfinity\b/g) || []).length;
  const undefinedMatches = (rawBody.match(/\bundefined\b/g) || []).length;
  const nullMatches = (rawBody.match(/\bnull\b/g) || []).length;

  console.log("Corrupt token counts in SSR Body:", {
    NaN: nanMatches,
    Infinity: infinityMatches,
    undefined: undefinedMatches,
    null: nullMatches,
  });

  // Check 10 Article Sections
  const sections = [
    "1. Introduction",
    "2. Mathematical Concept",
    "3. Formula Section",
    "4. How the Calculation Works",
    "5. Worked Examples",
    "6. Visual Understanding",
    "7. Common Mistakes",
    "8. Practical Applications",
    "9. Related Mathematical Concepts",
    "10. Summary",
  ];
  console.log("\nChecking 10 Article Sections in SSR:");
  sections.forEach((sec) => {
    const present = html.includes(sec);
    console.log(`  ${sec}: ${present ? "PRESENT" : "MISSING"}`);
  });

  // Check FAQs in SSR
  const faqQuestions = [
    "Why is my actual download speed slower than the speed advertised by my ISP?",
    "What is the difference between Megabits per second (Mbps) and Megabytes per second (MB/s)?",
    "How much protocol overhead loss should I factor into transfer calculations?",
    "How much bandwidth does a household or office need for 4K streaming and remote work?",
    "What is the difference between asymmetric and symmetric internet connections?",
    "How do I calculate web server hosting bandwidth requirements for a website?",
    "Why does a 100 Mbps internet connection take longer than 80 seconds to download a 1 GB file?",
    "How does network latency (ping) affect file transfer speeds?",
    "How long does it take to exhaust a 1.2 TB monthly ISP data cap?",
    "What is the difference between SI Base-1000 and IEC Base-1024 data units?",
  ];
  console.log("\nChecking 10 FAQs in SSR:");
  let faqsPresent = 0;
  faqQuestions.forEach((q, idx) => {
    const present = html.includes(q);
    if (present) faqsPresent++;
    console.log(`  FAQ ${idx + 1}: ${present ? "PRESENT" : "MISSING"}`);
  });
  console.log(`Total FAQs Present in SSR: ${faqsPresent}/10`);
}

auditBandwidthSsr().catch(console.error);
