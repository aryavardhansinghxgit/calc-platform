export {};
async function auditSSR() {
  const url = "http://localhost:3000/calculators/right-triangle-calculator";
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    console.log(`Status: ${res.status}`);
    const html = await res.text();

    // Check <h1> count
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log(`H1 count: ${h1Matches ? h1Matches.length : 0}`);
    if (h1Matches) {
      h1Matches.forEach((m, idx) => console.log(`H1 [${idx + 1}]: ${m.replace(/<[^>]+>/g, '').trim()}`));
    }

    // Title & Meta
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`Title: ${titleMatch ? titleMatch[1].trim() : 'NONE'}`);

    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    console.log(`Description: ${descMatch ? descMatch[1].trim() : 'NONE'}`);

    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1].trim() : 'NONE'}`);

    // Check for raw LaTeX or unescaped fragments
    const hasObjectObject = html.includes("[object Object]");
    console.log(`Contains [object Object]: ${hasObjectObject}`);

    const hasNaN = html.includes("NaN");
    console.log(`Contains NaN: ${hasNaN}`);

    // Check for FAQ sections or duplicate blocks
    const faqMatches = html.match(/Frequently Asked Questions/gi);
    console.log(`FAQ matches count: ${faqMatches ? faqMatches.length : 0}`);

    const relatedMatches = html.match(/RELATED CALCULATORS:/gi);
    console.log(`RELATED CALCULATORS matches count: ${relatedMatches ? relatedMatches.length : 0}`);

    // Check Related Concepts section links
    const hasRelatedConcepts = html.includes("Related Mathematical Concepts");
    console.log(`Has Related Mathematical Concepts: ${hasRelatedConcepts}`);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

auditSSR();
