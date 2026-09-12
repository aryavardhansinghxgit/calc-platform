export {};

async function testSSR() {
  console.log("Testing SSR for /calculators/grade-calculator...");
  try {
    const res = await fetch("http://localhost:3000/calculators/grade-calculator");
    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }
    const html = await res.text();

    // 1. H1 check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log(`H1 count: ${h1Matches.length}`);
    if (h1Matches.length !== 1) {
      throw new Error(`Expected exactly 1 H1, found ${h1Matches.length}`);
    }
    console.log(`H1 content: ${h1Matches[0]}`);
    if (!h1Matches[0].includes("Grade Calculator")) {
      throw new Error("H1 does not contain 'Grade Calculator'");
    }

    // 2. Title & Meta & Canonical
    if (!html.includes("<title>Grade Calculator")) {
      throw new Error("Title does not match expected");
    }
    if (!html.includes('rel="canonical"') && !html.includes('href="/calculators/grade-calculator"')) {
      throw new Error("Canonical URL missing");
    }

    // 3. Educational article SSR
    if (!html.includes("1. What Is a Grade Calculator?")) {
      throw new Error("Educational article section 1 not found in SSR HTML");
    }
    if (!html.includes("Authoritative References &amp; Methodology") && !html.includes("Authoritative References & Methodology")) {
      throw new Error("Authoritative References not found in SSR HTML");
    }

    // 4. FAQ SSR
    if (!html.includes("Frequently Asked Questions")) {
      throw new Error("FAQ heading not found in SSR HTML");
    }
    if (!html.includes("How do I calculate my current grade?")) {
      throw new Error("FAQ questions not found in SSR HTML");
    }

    // 5. Related calculators check
    const relatedCount = (html.match(/RELATED CALCULATORS:/g) || []).length;
    console.log(`Related calculators strips count: ${relatedCount}`);
    if (relatedCount !== 2) {
      throw new Error(`Expected exactly 2 related calculators strips, found ${relatedCount}`);
    }

    // 6. No corrupted tokens
    const corruptions = ["NaN%", "Infinity", "undefined", "[object Object]"];
    for (const c of corruptions) {
      if (html.includes(`>${c}<`) || html.includes(`"${c}"`)) {
        throw new Error(`Found corrupted token '${c}' in HTML!`);
      }
    }

    console.log("✓ SSR Verification 100% Passed!");
  } catch (err: any) {
    console.error("SSR test failed:", err.message);
    process.exit(1);
  }
}

testSSR();
