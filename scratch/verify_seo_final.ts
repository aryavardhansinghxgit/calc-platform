import http from 'http';

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function verify() {
  console.log("Fetching http://localhost:3000/calculators/time-zone-calculator ...");
  const html = await fetchUrl("http://localhost:3000/calculators/time-zone-calculator");

  console.log("=== SEO & RENDER VERIFICATION ===");
  
  // 1. Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log("Title tag:", titleMatch ? titleMatch[1] : "NONE");

  // 2. Meta description
  const metaDescMatch = html.match(/<meta name="description" content="([^"]+)"/);
  console.log("Meta description:", metaDescMatch ? metaDescMatch[1] : "NONE");

  // 3. H1 count
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 tag count: ${h1Matches.length}`);
  h1Matches.forEach((h1, i) => console.log(`  H1[${i}]: ${h1.replace(/<[^>]+>/g, '').trim()}`));

  // 4. H2 headings
  const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  console.log(`H2 tag count: ${h2Matches.length}`);
  h2Matches.forEach((h2, i) => console.log(`  H2[${i}]: ${h2.replace(/<[^>]+>/g, '').trim()}`));

  // 5. Check FAQ Schema
  const schemaMatches = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  let faqSchemaFound = false;
  schemaMatches.forEach((s) => {
    try {
      const raw = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      const json = JSON.parse(raw);
      if (json['@type'] === 'FAQPage') {
        faqSchemaFound = true;
        console.log(`FAQPage Schema detected with ${json.mainEntity?.length || 0} questions.`);
      }
    } catch (e) {}
  });

  // 6. Contextual Links
  const links = [
    "/calculators/time-calculator",
    "/calculators/time-duration-calculator",
    "/calculators/hours-calculator",
    "/calculators/date-calculator",
    "/calculators/day-counter-calculator"
  ];
  console.log("\nChecking Contextual Links inside Content:");
  links.forEach(l => {
    const present = html.includes(l);
    console.log(`  ${l}: ${present ? "FOUND" : "MISSING"}`);
  });

  // 7. Check Related Calculators count
  const relatedCount = (html.match(/RELATED CALCULATORS:/g) || []).length;
  console.log(`\n'RELATED CALCULATORS:' sections count: ${relatedCount}`);

  // 8. Check absence of prohibited terms
  const prohibited = ["Golden Hour", "Islamic Prayer", "shadow length"];
  prohibited.forEach(p => {
    const found = html.includes(p);
    console.log(`  Prohibited phrase "${p}": ${found ? "FOUND (FAIL)" : "CLEAN"}`);
  });

  console.log("\n=== AUDIT COMPLETE ===");
}

verify().catch(console.error);
