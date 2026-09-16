async function checkLiveRoute() {
  console.log("=== CHECKING LIVE ROUTE SSR HTML ===");
  try {
    const res = await fetch("http://localhost:3000/calculators/time-zone-calculator");
    console.log("HTTP Status:", res.status);
    const html = await res.text();

    // 1. Check H1 count and text
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    console.log("H1 count:", h1Matches.length);
    h1Matches.forEach((m, idx) => {
      console.log(`H1 #${idx + 1}:`, m[1].replace(/<[^>]+>/g, "").trim());
    });

    // 2. Check H2 count and text
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
    console.log("H2 count:", h2Matches.length);
    h2Matches.forEach((m, idx) => {
      console.log(`H2 #${idx + 1}:`, m[1].replace(/<[^>]+>/g, "").trim());
    });

    // 3. Check JSON-LD schemas
    const schemaMatches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    console.log("JSON-LD schemas found:", schemaMatches.length);
    let faqSchemaCount = 0;
    for (const sm of schemaMatches) {
      try {
        const parsed = JSON.parse(sm[1]);
        if (parsed["@type"] === "FAQPage") {
          faqSchemaCount = parsed.mainEntity?.length || 0;
          console.log("FAQPage Schema Entity count:", faqSchemaCount);
        }
      } catch (e) {}
    }

    // 4. Check for generic boilerplate leakage
    const hasCentimeters = html.includes("centimeters vs inches");
    const hasFinancial = html.includes("financial values");
    const hasDoublePrecision = html.includes("Double-precision floating-point");
    console.log("Generic fallback leakage:", { hasCentimeters, hasFinancial, hasDoublePrecision });

  } catch (err) {
    console.error("Fetch error:", err);
  }
}

checkLiveRoute();
