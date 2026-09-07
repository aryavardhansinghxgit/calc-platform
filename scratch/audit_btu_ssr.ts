export {};
async function auditSSR() {
  console.log("Fetching http://localhost:3000/calculators/btu-calculator ...");
  const res = await fetch("http://localhost:3000/calculators/btu-calculator");
  console.log("HTTP Status:", res.status);
  const html = await res.text();

  // 1. H1 audit
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log("H1 count:", h1Matches.length, "H1 values:", h1Matches);

  // 2. Title & Meta
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);

  console.log("Title:", titleMatch ? titleMatch[1].trim() : null);
  console.log("Meta Description:", descMatch ? descMatch[1] : null);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : null);

  // 3. Educational Content presence in SSR HTML
  const hasThermoSection = html.includes("What Is a BTU? Thermodynamic Definition");
  const hasFormulasSection = html.includes("Mathematical Heat Load Formulas");
  const hasWorkedExamples = html.includes("Step-by-Step Worked Engineering Calculations");
  console.log("Has Thermodynamic Definition in SSR HTML:", hasThermoSection);
  console.log("Has Mathematical Heat Load Formulas in SSR HTML:", hasFormulasSection);
  console.log("Has Worked Examples in SSR HTML:", hasWorkedExamples);

  // 4. FAQ presence
  const hasFaqH3 = html.includes("Frequently Asked Questions");
  const faqQuestions = html.includes("How many BTUs equal 1 Ton");
  console.log("Contains 'Frequently Asked Questions':", hasFaqH3);
  console.log("Contains 'How many BTUs equal 1 Ton':", faqQuestions);

  // 5. Related Calculators
  const relatedCalcMatches = [...html.matchAll(/href=["'](\/calculators\/[^"']+)["']/g)].map(m => m[1]);
  console.log("Related calculator links count:", relatedCalcMatches.length, "Distinct:", [...new Set(relatedCalcMatches)]);

  // 6. Check for JSON-LD schema
  const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log("JSON-LD script tags count:", jsonLdMatches.length);
  for (let i = 0; i < jsonLdMatches.length; i++) {
    try {
      const parsed = JSON.parse(jsonLdMatches[i][1]);
      console.log(`Schema #${i + 1} @type:`, parsed["@type"]);
    } catch (e: any) {
      console.error(`Schema #${i + 1} invalid JSON:`, e.message);
    }
  }

  // 7. Check for NaN or Infinity in HTML
  console.log("Contains 'NaN':", html.includes("NaN"));
  console.log("Contains 'Infinity':", html.includes("Infinity"));
}

auditSSR().catch(console.error);
