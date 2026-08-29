async function auditTdee() {
  const url = "http://localhost:3000/calculators/tdee-calculator";
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    const html = await res.text();

    console.log("\n==================================================");
    console.log("DOM & SEO FORENSIC AUDIT — TDEE CALCULATOR");
    console.log("==================================================");
    console.log(`HTTP Status: ${res.status}`);

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    console.log(`Page Title: ${titleMatch ? titleMatch[1] : "N/A"}`);

    const metaMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    console.log(`Meta Description: ${metaMatch ? metaMatch[1] : "N/A"}`);

    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
    console.log(`Canonical URL: ${canonicalMatch ? canonicalMatch[1] : "N/A"}`);

    // H1 tags
    const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi));
    console.log(`H1 Tag Count: ${h1Matches.length}`);
    h1Matches.forEach((m, idx) => {
      console.log(`  H1 #${idx + 1}: "${m[1].replace(/<[^>]+>/g, "").trim()}"`);
    });

    // H2 tags
    const h2Matches = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi));
    console.log(`H2 Tag Count: ${h2Matches.length}`);
    h2Matches.slice(0, 15).forEach((m, idx) => {
      console.log(`  H2 #${idx + 1}: "${m[1].replace(/<[^>]+>/g, "").trim()}"`);
    });

    // JSON-LD
    const jsonLdMatches = Array.from(html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi));
    console.log(`JSON-LD Scripts Found: ${jsonLdMatches.length}`);
    jsonLdMatches.forEach((m, idx) => {
      try {
        const parsed = JSON.parse(m[1]);
        const type = parsed["@type"] || (parsed["@graph"] ? "Graph" : "Unknown");
        console.log(`  Schema #${idx + 1} @type: ${type}`);
        if (type === "FAQPage" && Array.isArray(parsed.mainEntity)) {
          console.log(`    FAQPage entity count: ${parsed.mainEntity.length}`);
          parsed.mainEntity.slice(0, 5).forEach((faq: any, fIdx: number) => {
            console.log(`      Q${fIdx + 1}: ${faq.name}`);
          });
        }
      } catch (e) {
        console.log(`  Schema #${idx + 1}: Parse error`);
      }
    });

    // Count 'Frequently Asked Questions'
    const faqCount = (html.match(/Frequently Asked Questions/gi) || []).length;
    console.log(`Occurrences of 'Frequently Asked Questions': ${faqCount}`);

    // Check Buttons
    const hasPdf = /Generate PDF Report|Print/i.test(html);
    const hasCsv = /CSV/i.test(html);
    const hasCopy = /Copy/i.test(html);
    const hasShare = /Share/i.test(html);
    console.log(`Action Bar Buttons Present in HTML:`, { PDF: hasPdf, CSV: hasCsv, Copy: hasCopy, Share: hasShare });

    // Check inputs
    const inputMatches = Array.from(html.matchAll(/<input([^>]*)>/gi));
    console.log(`Total <input> elements rendered in DOM: ${inputMatches.length}`);
    inputMatches.forEach((m) => {
      const attrs = m[1];
      const idMatch = attrs.match(/id="([^"]*)"/);
      const nameMatch = attrs.match(/name="([^"]*)"/);
      const typeMatch = attrs.match(/type="([^"]*)"/);
      console.log(`  Input ID: "${idMatch ? idMatch[1] : "(no id)"}", name: "${nameMatch ? nameMatch[1] : ""}", type: "${typeMatch ? typeMatch[1] : "text"}"`);
    });

    // Check labels
    const labelMatches = Array.from(html.matchAll(/<label([^>]*)>([\s\S]*?)<\/label>/gi));
    console.log(`Total <label> elements: ${labelMatches.length}`);
    labelMatches.forEach((m) => {
      const forMatch = m[1].match(/for="([^"]*)"/);
      const text = m[2].replace(/<[^>]+>/g, "").trim();
      console.log(`  Label: "${text}", htmlFor: "${forMatch ? forMatch[1] : "(no for)"}"`);
    });

    // Related calculators
    const relCount = (html.match(/href="\/calculators\/[^"]*"/g) || []).length;
    console.log(`Related calculator links count: ${relCount}`);

  } catch (e) {
    console.error("Audit error:", e);
  }
}

auditTdee();
