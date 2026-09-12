async function testMileageSSR() {
  console.log("=== SSR / SEO BASELINE AUDIT ===");
  try {
    const res = await fetch("http://localhost:3000/calculators/mileage-calculator");
    console.log("HTTP Status:", res.status);
    if (res.status !== 200) {
      console.error("FAIL: Non-200 HTTP status");
      process.exit(1);
    }

    const html = await res.text();
    console.log("HTML Byte Length:", html.length);

    // 1. H1 Check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log("H1 Count:", h1Matches ? h1Matches.length : 0);
    if (h1Matches && h1Matches.length === 1) {
      console.log("H1 Content:", h1Matches[0].replace(/<[^>]+>/g, "").trim());
    } else {
      console.error("FAIL: H1 count is not 1. Matches:", h1Matches);
      process.exit(1);
    }

    // 2. Title & Meta
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1].trim() : "NONE");

    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NONE");

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NONE");

    // 3. Article Content Check
    const hasSection1 = html.includes("1. What Does Vehicle Mileage Mean?");
    const hasAeroCorrected = html.includes("proportional to the cube of velocity") || html.includes("v&sup3;") || html.includes("scales with the cube of velocity") || html.includes("proportional to: v³") || html.includes("proportional to: P ∝ v³") || html.includes("P = F × v");
    console.log("Has Section 1 (What Does Vehicle Mileage Mean?):", hasSection1);
    console.log("Has Aerodynamic Drag (v³ power):", hasAeroCorrected);

    // 4. FAQ Check
    const hasFaq = html.includes("How do I calculate my car&#x27;s mileage?") || html.includes("How do I calculate my car's mileage?");
    console.log("Has FAQ rendered:", hasFaq);

    // 5. Corrupted Output Check
    const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
    const hasNaN = /\bNaN\b/.test(visibleText);
    const hasInfinity = /\bInfinity\b/.test(visibleText);
    const hasUndefined = /\bundefined\b/.test(visibleText);
    const hasNull = /\bnull\b/.test(visibleText);

    console.log("Corrupted values check:");
    console.log("  NaN present:", hasNaN);
    console.log("  Infinity present:", hasInfinity);
    console.log("  undefined present:", hasUndefined);
    console.log("  null present:", hasNull);

    // 6. Related Calculators Check
    const relatedMatches = html.match(/RELATED CALCULATORS/gi);
    console.log("Related calculator blocks count:", relatedMatches ? relatedMatches.length : 0);

    // 7. Internal contextual links check
    const hasGasMileageLink = html.includes('href="/calculators/gas-mileage-calculator"');
    const hasFuelCostLink = html.includes('href="/calculators/fuel-cost-calculator"');
    const hasHorsepowerLink = html.includes('href="/calculators/horsepower-calculator"');
    console.log("Contextual Links inside content:");
    console.log("  Gas Mileage Calculator link:", hasGasMileageLink);
    console.log("  Fuel Cost Calculator link:", hasFuelCostLink);
    console.log("  Horsepower Calculator link:", hasHorsepowerLink);

    if (
      h1Matches.length === 1 &&
      hasSection1 &&
      hasFaq &&
      !hasNaN &&
      !hasInfinity &&
      !hasUndefined &&
      !hasNull &&
      relatedMatches &&
      relatedMatches.length === 2 &&
      hasGasMileageLink &&
      hasFuelCostLink &&
      hasHorsepowerLink
    ) {
      console.log("\nALL SSR / SEO CHECKS PASSED PERFECTLY!");
    } else {
      console.error("\nONE OR MORE SSR CHECKS FAILED");
      process.exit(1);
    }
  } catch (err) {
    console.error("SSR test error:", err);
    process.exit(1);
  }
}

testMileageSSR();
