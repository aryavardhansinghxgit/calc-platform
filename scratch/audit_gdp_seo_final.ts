async function checkGdpSeo() {
  const res = await fetch("http://localhost:3000/calculators/gdp-calculator");
  const html = await res.text();

  console.log("====================================================");
  console.log("=== GDP CALCULATOR SSR SEO VERIFICATION ===");
  console.log("====================================================");
  console.log("HTTP Status:", res.status);

  // 1. Title & Meta description
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  console.log("Page Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // 2. Canonical URL
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  console.log("Canonical URL:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  // 3. H1
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  console.log("H1:", h1Match ? h1Match[1].trim() : "NOT FOUND");

  // 4. Related Calculators blocks count
  const relatedCount = (html.match(/RELATED CALCULATORS:/gi) || []).length;
  console.log("Related Calculator Blocks Count:", relatedCount, "(Expected: 2)");

  // 5. Contextual Internal Anchor Links in article
  const hasInflationLink = html.includes('href="/calculators/inflation-calculator"');
  const hasCagrLink = html.includes('href="/calculators/cagr-calculator"');
  const hasCurrencyLink = html.includes('href="/calculators/currency-calculator"');
  console.log("Contextual Anchor - Inflation:", hasInflationLink);
  console.log("Contextual Anchor - CAGR:", hasCagrLink);
  console.log("Contextual Anchor - Currency:", hasCurrencyLink);

  // 6. FAQs Count in Content
  const questions = [
    "What is GDP?",
    "What is the formula for GDP?",
    "Why are imports subtracted from GDP?",
    "What is net exports?",
    "What are the three approaches to GDP?",
    "What is GVA?",
    "What is the difference between nominal GDP and real GDP?",
    "How is real GDP calculated from the GDP deflator?",
    "What is GDP growth?",
    "What is CAGR for GDP?",
    "What is GDP per capita?",
    "Is GDP per capita the same as income per person?",
    "What is the difference between GDP and GNI?",
    "What is PPP GDP?",
    "Does two consecutive quarters of falling GDP officially mean the United States is in recession?",
    "Does the income tier in this calculator represent an official World Bank classification?",
    "What are the current World Bank income thresholds?",
    "Can GDP increase while people's living standards do not improve?",
  ];
  const foundQuestions = questions.filter((q) => html.includes(q));
  console.log("Unfolded FAQ Questions Count:", foundQuestions.length, "(Expected: 18)");

  // 7. No self links in body
  const bodyAnchorSelfLinks = html.match(/<a[^>]*href="[^"]*\/calculators\/gdp-calculator"[^>]*>/gi) || [];
  console.log("Body Self Links Count:", bodyAnchorSelfLinks.length, "(Expected: 0)");

  // 8. References present
  const hasReferences = html.includes("Scientific and Economic References");
  console.log("Scientific and Economic References Section:", hasReferences);

  // 9. Clean tokens
  const hasBadTokens = html.includes("NaN") || html.includes("Infinity") || html.includes("[object Object]");
  console.log("Bad Tokens (NaN, Infinity, [object Object]):", hasBadTokens ? "FOUND" : "CLEAN");
  console.log("====================================================");
}

checkGdpSeo();
