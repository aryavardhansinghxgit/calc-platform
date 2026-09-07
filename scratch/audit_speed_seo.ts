async function auditSpeedSeo() {
  console.log("==================================================");
  console.log("AUDITING SPEED CALCULATOR SEO & SSR OUTPUT");
  console.log("==================================================");

  const res = await fetch("http://localhost:3000/calculators/speed-calculator");
  console.log("HTTP Status:", res.status);
  const html = await res.text();

  // 1. H1 Count & Content
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`  H1[${i}]: ${h.replace(/<[^>]+>/g, '').trim()}`));

  // 2. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : "None");

  // 3. Meta Description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1].trim() : "None");

  // 4. Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1].trim() : "None");

  // 5. OpenGraph
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']/i);
  console.log("OG Title:", ogTitleMatch ? ogTitleMatch[1].trim() : "None");

  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  console.log("OG Description:", ogDescMatch ? ogDescMatch[1].trim() : "None");

  // 6. H2 Count
  const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  console.log("H2 Count:", h2Matches.length);

  // 7. Related Calculator Blocks
  const relatedBlocks = html.match(/RELATED CALCULATORS:/g) || [];
  console.log("RELATED CALCULATORS block occurrences:", relatedBlocks.length);

  // 8. FAQ Items
  const faqSectionMatches = html.match(/Frequently Asked Questions/g) || [];
  console.log("FAQ Section Header occurrences:", faqSectionMatches.length);

  // Count FAQ questions in SSR
  const faqQuestions = [
    "How do I calculate speed from distance and time?",
    "How do I calculate distance from speed and time?",
    "How do I calculate travel time?",
    "What is the difference between speed and velocity?",
    "How do I convert mph to km/h?",
    "How do I convert mph to m/s?",
    "How do I convert km/h to m/s?",
    "What is the difference between speed and pace?",
    "How do I calculate running pace?",
    "What is average speed for multiple trips or segments?",
    "Is average trip speed the same as harmonic mean?",
    "What is a good way to calculate 5K pace?"
  ];

  let faqsFound = 0;
  for (const q of faqQuestions) {
    if (html.includes(q)) {
      faqsFound++;
    } else {
      console.warn("Missing FAQ in SSR:", q);
    }
  }
  console.log(`FAQs Verified in SSR: ${faqsFound} / ${faqQuestions.length}`);

  // 9. Contextual Anchors
  const hasConversionLink = html.includes('href="/calculators/conversion-calculator"');
  const hasSciNotationLink = html.includes('href="/calculators/scientific-notation-calculator"');
  console.log("Has Conversion Calculator link:", hasConversionLink);
  console.log("Has Scientific Notation link:", hasSciNotationLink);

  // 10. Raw Tokens Check
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  for (const tok of ["NaN", "Infinity", "undefined", "null"]) {
    const reg = new RegExp(`\\b${tok}\\b`, "g");
    const m = visible.match(reg);
    console.log(`Raw token '${tok}' in visible text:`, m ? m.length : 0);
  }

  // 11. Schema Check
  const schemas = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  console.log("JSON-LD Schemas present:", schemas.length);

  console.log("==================================================");
}

auditSpeedSeo().catch(console.error);
