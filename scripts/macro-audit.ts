import http from "http";

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });
}

async function runAudit() {
  console.log("Fetching http://localhost:3000/calculators/macro-calculator...\n");
  const html = await fetchUrl("http://localhost:3000/calculators/macro-calculator");

  console.log("==================================================");
  console.log("DOM & SEO FORENSIC AUDIT — MACRO CALCULATOR");
  console.log("==================================================");

  // 1. H1 Count
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 Tag Count: ${h1Matches.length}`);
  h1Matches.forEach((h, i) => {
    const text = h.replace(/<[^>]+>/g, "").trim();
    console.log(`  H1 #${i + 1}: "${text}"`);
  });

  // 2. H2 Count
  const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  console.log(`\nH2 Tag Count: ${h2Matches.length}`);
  h2Matches.forEach((h, i) => {
    const text = h.replace(/<[^>]+>/g, "").trim();
    console.log(`  H2 #${i + 1}: "${text}"`);
  });

  // 3. Schema FAQ vs DOM FAQ
  const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log(`\nJSON-LD Scripts Found: ${jsonLdMatches.length}`);
  let schemaFaqCount = 0;
  jsonLdMatches.forEach((m, idx) => {
    try {
      const content = m.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
      const parsed = JSON.parse(content);
      console.log(`  Schema #${idx + 1} @type: ${parsed["@type"]}`);
      if (parsed["@type"] === "FAQPage") {
        schemaFaqCount = parsed.mainEntity?.length || 0;
        console.log(`    FAQPage entity count: ${schemaFaqCount}`);
        if (parsed.mainEntity && parsed.mainEntity.length > 0) {
          console.log(`      Q1: ${parsed.mainEntity[0].name}`);
          console.log(`      Q2: ${parsed.mainEntity[1]?.name}`);
          console.log(`      Q3: ${parsed.mainEntity[2]?.name}`);
          console.log(`      Q4: ${parsed.mainEntity[3]?.name}`);
          console.log(`      Q5: ${parsed.mainEntity[4]?.name}`);
        }
      }
    } catch (e) {
      console.log(`  Schema #${idx + 1}: parse error`);
    }
  });

  // 4. Occurrences of 'Frequently Asked Questions'
  const faqHeadingOccurrences = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log(`\nOccurrences of 'Frequently Asked Questions': ${faqHeadingOccurrences}`);

  // 5. Action Bar buttons
  const hasPdfBtn = html.includes("Generate PDF Report") || html.includes("PDF Report") || html.includes("Print");
  const hasCsvBtn = html.includes("CSV") || html.includes("Export CSV");
  const hasCopyBtn = html.includes("Copy") || html.includes("Copy Summary");
  const hasShareBtn = html.includes("Share") || html.includes("Share URL");
  const hasSaveBtn = html.includes("Save Scenario") || html.includes("Bookmark");
  console.log(`\nAction Bar Buttons Present in HTML:`, {
    PDF: hasPdfBtn,
    CSV: hasCsvBtn,
    Copy: hasCopyBtn,
    Share: hasShareBtn,
    Save: hasSaveBtn,
  });

  // 6. Form inputs and labels accessibility
  const inputMatches = html.match(/<input[^>]*>/gi) || [];
  console.log(`\nTotal <input> elements rendered in DOM: ${inputMatches.length}`);
  inputMatches.forEach((inp) => {
    const idMatch = inp.match(/id="([^"]+)"/i);
    const nameMatch = inp.match(/name="([^"]+)"/i);
    const typeMatch = inp.match(/type="([^"]+)"/i);
    console.log(`  Input ID: "${idMatch ? idMatch[1] : "(no id)"}", name: "${nameMatch ? nameMatch[1] : ""}", type: "${typeMatch ? typeMatch[1] : "text"}"`);
  });

  const labelMatches = html.match(/<label[^>]*>([\s\S]*?)<\/label>/gi) || [];
  console.log(`\nTotal <label> elements: ${labelMatches.length}`);
  labelMatches.forEach((lbl) => {
    const forMatch = lbl.match(/for="([^"]+)"/i);
    const text = lbl.replace(/<[^>]+>/g, "").trim();
    console.log(`  Label: "${text}", htmlFor: "${forMatch ? forMatch[1] : "(no for)"}"`);
  });
}

runAudit().catch(console.error);
