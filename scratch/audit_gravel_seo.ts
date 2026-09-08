// now do seo of the calci with this content but the positioning formate should be like 401(k) calculator  no black(dark) card in content no repited content proper positioning and design of related calci only one side section each side before and after content, body and faq(unfolded), don’t confuse with anchor text it also should present inside content
async function checkGravelSsr() {
  const url = "http://localhost:3000/calculators/gravel-calculator";
  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  console.log(`HTTP Status: ${res.status}`);
  if (!res.ok) {
    console.error(`Fetch failed with status ${res.status}`);
    return;
  }
  const html = await res.text();

  // 1. H1 count and text
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  console.log(`H1 count: ${h1Matches.length}`);
  h1Matches.forEach((m, idx) => console.log(`  H1 [${idx + 1}]: ${m[1].trim()}`));

  // 2. Title and Meta Description
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NOT FOUND"}`);

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log(`Meta Description: ${descMatch ? descMatch[1] : "NOT FOUND"}`);

  // 3. Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NOT FOUND"}`);

  // 4. Related Calculators blocks
  const relatedMatches = [...html.matchAll(/RELATED CALCULATORS:/gi)];
  console.log(`Related Calculators blocks count: ${relatedMatches.length}`);

  // 5. Internal contextual links
  const sqftLink = html.includes("/calculators/square-footage-calculator");
  const concreteLink = html.includes("/calculators/concrete-calculator");
  console.log(`Internal link to Square Footage Calculator: ${sqftLink}`);
  console.log(`Internal link to Concrete Calculator: ${concreteLink}`);

  // 6. FAQ count
  const faqCount = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log(`FAQ section matches: ${faqCount}`);
  const qMatches = (html.match(/Q(?:<!-- -->)?\d+/g) || []);
  console.log(`Visible Q1..Q12 items: ${qMatches.length}`);

  // 7. Check for raw LaTeX leakage
  const latexDollar = (html.match(/\$\$[\s\S]*?\$\$/g) || []).length;
  const latexInline = (html.match(/\\\([\s\S]*?\\\)/g) || []).length;
  console.log(`Raw LaTeX leakage ($$...$$): ${latexDollar}`);
  console.log(`Raw LaTeX leakage (\\(...\\)): ${latexInline}`);

  // 8. Check for NaN / Infinity / undefined in visible text
  // Stripping tags and script/style tags for visible text check
  const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
  const nanMatch = (visibleText.match(/\bNaN\b/g) || []).length;
  const infMatch = (visibleText.match(/\bInfinity\b/g) || []).length;
  const undefMatch = (visibleText.match(/\bundefined\b/g) || []).length;
  console.log(`Visible text NaN count: ${nanMatch}`);
  console.log(`Visible text Infinity count: ${infMatch}`);
  console.log(`Visible text undefined count: ${undefMatch}`);

  // 9. Educational content sections check
  console.log(`Contains Section 1: ${html.includes("1. Gravel Calculator: Cubic Yards, Tons, Bags &amp; Cost") || html.includes("1. Gravel Calculator: Cubic Yards, Tons, Bags & Cost")}`);
  console.log(`Contains Section 23: ${html.includes("23. Gravel Calculator Limitations and Engineering Disclaimer")}`);
}

checkGravelSsr().catch(console.error);
