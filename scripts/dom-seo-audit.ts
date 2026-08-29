async function auditDomAndSeo() {
  const url = "http://localhost:3000/calculators/pace-calculator";
  console.log(`Fetching ${url}...`);
  const resp = await fetch(url);
  const html = await resp.text();

  console.log("\n==================================================");
  console.log("DOM & SEO FORENSIC AUDIT");
  console.log("==================================================");

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  console.log("Page Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  // Meta Description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  console.log("Canonical URL:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  // OpenGraph Tags
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  console.log("OG Title:", ogTitleMatch ? ogTitleMatch[1] : "NOT FOUND");
  console.log("OG Description:", ogDescMatch ? ogDescMatch[1] : "NOT FOUND");

  // H1 Tags
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
  console.log(`H1 Tag Count: ${h1Matches.length}`);
  h1Matches.forEach((h1, idx) => console.log(`  H1 #${idx + 1}: "${h1}"`));

  // H2 Tags
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
  console.log(`H2 Tag Count: ${h2Matches.length}`);
  h2Matches.forEach((h2, idx) => console.log(`  H2 #${idx + 1}: "${h2}"`));

  // H3 Tags
  const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
  console.log(`H3 Tag Count: ${h3Matches.length}`);
  h3Matches.forEach((h3, idx) => console.log(`  H3 #${idx + 1}: "${h3}"`));

  // JSON-LD Schema
  const schemaMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log(`JSON-LD Scripts Found: ${schemaMatches.length}`);
  schemaMatches.forEach((sm, idx) => {
    try {
      const parsed = JSON.parse(sm[1]);
      console.log(`  Schema #${idx + 1} @type:`, parsed["@type"], parsed.name || parsed.headline || "");
      if (parsed["@type"] === "FAQPage") {
        console.log(`    FAQPage entity count: ${parsed.mainEntity?.length}`);
        parsed.mainEntity?.forEach((e: any, i: number) => {
          console.log(`      Q${i+1}: ${e.name}`);
        });
      }
    } catch (err) {
      console.log(`  Schema #${idx + 1} parse error:`, err);
    }
  });

  // Check Duplicate FAQ Headings in HTML
  const faqHeadings = [...html.matchAll(/Frequently Asked Questions/gi)];
  console.log(`Occurrences of 'Frequently Asked Questions': ${faqHeadings.length}`);

  // Check Action Bar Buttons
  const hasSaveBtn = /Save Calculation|Bookmark/i.test(html);
  const hasShareBtn = /Share/i.test(html);
  const hasCopyBtn = /Copy Summary/i.test(html);
  const hasPrintBtn = /Print \/ PDF Report|window\.print/i.test(html);
  const hasCsvBtn = /Export CSV|\.csv/i.test(html);
  console.log("Action Bar Buttons Present in HTML:", {
    Save: hasSaveBtn,
    Share: hasShareBtn,
    Copy: hasCopyBtn,
    Print: hasPrintBtn,
    CSV: hasCsvBtn,
  });

  // Check Inputs and Labels
  const inputs = [...html.matchAll(/<input([^>]*)>/gi)];
  console.log(`Total <input> elements rendered in DOM: ${inputs.length}`);
  const inputIds = inputs.map(i => {
    const idM = i[1].match(/id=["']([^"']*)["']/i);
    return idM ? idM[1] : "(no id)";
  });
  console.log("Input IDs:", inputIds);

  const labels = [...html.matchAll(/<label([^>]*)>([\s\S]*?)<\/label>/gi)];
  console.log(`Total <label> elements: ${labels.length}`);
  labels.forEach(l => {
    const forM = l[1].match(/for=["']([^"']*)["']/i);
    const text = l[2].replace(/<[^>]*>/g, '').trim();
    console.log(`  Label: "${text}", htmlFor: "${forM ? forM[1] : 'NONE'}"`);
  });

  // Check for #pace-print-report
  const hasPrintReportEl = html.includes('id="pace-print-report"');
  console.log(`Print Report Element (#pace-print-report) in DOM: ${hasPrintReportEl}`);
}

auditDomAndSeo().catch(console.error);
