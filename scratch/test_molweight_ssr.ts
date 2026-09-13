export {};
async function testSSR() {
  try {
    const res = await fetch("http://localhost:3000/calculators/molecular-weight-calculator");
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);

    // Check H1
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log("H1 matches:", h1Matches);

    // Check Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1] : "None");

    // Check Meta Description
    const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    console.log("Meta description:", metaDescMatch ? metaDescMatch[1] : "None");

    // Check Canonical
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "None");

    // Check for corrupt tokens
    const corruptTokens = ["NaN", "Infinity", "undefined", "null", "[object Object]"];
    for (const token of corruptTokens) {
      const count = (html.match(new RegExp(`\\b${token}\\b`, "g")) || []).length;
      console.log(`Corrupt token '${token}': ${count} occurrences`);
    }

    // Check related calculators
    const relatedMatches = html.match(/RELATED CALCULATORS:[\s\S]*?<\/div>/gi);
    console.log("Related calculator sections count:", relatedMatches ? relatedMatches.length : 0);
    
    // Check if self-link exists
    const selfLinkMatch = html.includes('/calculators/molecular-weight-calculator"') || html.includes('molecular-weight-calculator</a>');
    console.log("Self-link present in HTML:", selfLinkMatch);
  } catch (err: any) {
    console.error("SSR test error:", err);
  }
}

testSSR();
