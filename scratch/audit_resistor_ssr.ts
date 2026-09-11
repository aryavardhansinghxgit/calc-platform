async function auditSsr() {
  console.log("Fetching http://localhost:3000/calculators/resistor-calculator ...");
  try {
    const res = await fetch("http://localhost:3000/calculators/resistor-calculator");
    console.log(`HTTP Status: ${res.status}`);
    const html = await res.text();

    // H1 check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log(`H1 count: ${h1Matches.length}`);
    h1Matches.forEach((h, i) => console.log(`  H1 [${i + 1}]: ${h.replace(/<[^>]+>/g, "").trim()}`));

    // Title check
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NONE"}`);

    // Meta description check
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log(`Meta Description: ${metaDescMatch ? metaDescMatch[1].trim() : "NONE"}`);

    // Check pre-rendered content
    const hasArticle = html.includes("The Engineering Guide to Resistors");
    const hasWorkedExamples = html.includes("Worked Engineering Examples");
    const hasColorTable = html.includes("Standard Resistor Color Code Reference");
    const hasFaqs = html.includes("Frequently Asked Questions") || html.includes("What is an electrical resistor");
    const hasFormulaWheel = html.includes("Interactive Formula Wheel");

    console.log(`Pre-rendered Educational Article: ${hasArticle}`);
    console.log(`Pre-rendered Worked Examples: ${hasWorkedExamples}`);
    console.log(`Pre-rendered Color Code Table: ${hasColorTable}`);
    console.log(`Pre-rendered FAQs: ${hasFaqs}`);
    console.log(`Pre-rendered Formula Wheel: ${hasFormulaWheel}`);

    // Check invalid tokens
    const nanMatches = (html.match(/\bNaN\b/g) || []).length;
    const infMatches = (html.match(/\bInfinity\b/g) || []).length;
    const undefMatches = (html.match(/\bundefined\b/g) || []).length;
    const nullMatches = (html.match(/\bnull\b/g) || []).length;

    console.log(`Token occurrences:`);
    console.log(`  NaN: ${nanMatches}`);
    console.log(`  Infinity: ${infMatches}`);
    console.log(`  undefined: ${undefMatches}`);
    console.log(`  null: ${nullMatches}`);

  } catch (err: any) {
    console.error("Fetch failed:", err.message);
  }
}

auditSsr();
