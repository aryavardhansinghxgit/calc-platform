async function auditBodyFat() {
  const url = "http://localhost:3000/calculators/body-fat-calculator";
  console.log(`Fetching ${url}...`);
  const res = await fetch(url);
  const html = await res.text();

  console.log("\n==================================================");
  console.log("DOM & SEO FORENSIC AUDIT — BODY FAT CALCULATOR");
  console.log("==================================================");

  console.log("HTTP Status:", res.status);

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  console.log("Page Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  // Meta Description
  const metaDescMatch =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // Canonical
  const canonicalMatch =
    html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
    html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  console.log("Canonical URL:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  // H1 Tags
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]*>/g, "").trim()
  );
  console.log(`H1 Tag Count: ${h1Matches.length}`);
  h1Matches.forEach((h1, idx) => console.log(`  H1 #${idx + 1}: "${h1}"`));

  // H2 Tags
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    m[1].replace(/<[^>]*>/g, "").trim()
  );
  console.log(`H2 Tag Count: ${h2Matches.length}`);
  h2Matches.slice(0, 10).forEach((h2, idx) => console.log(`  H2 #${idx + 1}: "${h2}"`));

  // JSON-LD Scripts
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log(`JSON-LD Scripts Found: ${jsonLdMatches.length}`);
  jsonLdMatches.forEach((m, idx) => {
    try {
      const data = JSON.parse(m[1]);
      console.log(`  Schema #${idx + 1} @type:`, data["@type"]);
      if (data["@type"] === "FAQPage") {
        console.log(`    FAQPage entity count:`, data.mainEntity?.length);
        data.mainEntity?.forEach((item: any, qIdx: number) => {
          console.log(`      Q${qIdx + 1}: ${item.name}`);
        });
      }
    } catch (e) {
      console.log(`  Schema #${idx + 1} parse error:`, e);
    }
  });

  // Check occurrences of "Frequently Asked Questions" in HTML
  const faqOccurrences = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log(`Occurrences of 'Frequently Asked Questions': ${faqOccurrences}`);

  // Action Bar Buttons in HTML
  const hasCopy = /Copy Summary|Copy/i.test(html);
  const hasShare = /Share/i.test(html) && /lucide-share-2/i.test(html);
  const hasSave = /Save Calculation|Save/i.test(html) && /lucide-bookmark/i.test(html);
  const hasPrint = /Print|PDF Report/i.test(html) && /lucide-printer/i.test(html);
  const hasCsv = /Export CSV|CSV/i.test(html);
  console.log("Action Bar Buttons Present in HTML:", {
    Copy: hasCopy,
    Share: hasShare,
    Save: hasSave,
    Print: hasPrint,
    CSV: hasCsv,
  });

  // Inputs and IDs
  const inputMatches = [...html.matchAll(/<input[^>]*>/gi)];
  console.log(`Total <input> elements rendered in DOM: ${inputMatches.length}`);
  inputMatches.forEach((inp) => {
    const idMatch = inp[0].match(/id=["']([^"']*)["']/i);
    const nameMatch = inp[0].match(/name=["']([^"']*)["']/i);
    const typeMatch = inp[0].match(/type=["']([^"']*)["']/i);
    console.log(`  Input ID: "${idMatch ? idMatch[1] : "(no id)"}", name: "${nameMatch ? nameMatch[1] : ""}", type: "${typeMatch ? typeMatch[1] : ""}"`);
  });

  // Labels
  const labelMatches = [...html.matchAll(/<label[^>]*>([\s\S]*?)<\/label>/gi)];
  console.log(`Total <label> elements: ${labelMatches.length}`);
  labelMatches.forEach((lbl) => {
    const forMatch = lbl[0].match(/for=["']([^"']*)["']/i);
    const text = lbl[1].replace(/<[^>]*>/g, "").trim();
    console.log(`  Label: "${text}", htmlFor: "${forMatch ? forMatch[1] : "(no for)"}"`);
  });

  // Print Report element
  const printReportExists = html.includes('id="body-fat-print-report"');
  console.log("Print Report Element (#body-fat-print-report) in DOM:", printReportExists);
}

auditBodyFat().catch(console.error);
