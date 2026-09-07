export {};
async function testSsr() {
  try {
    const res = await fetch("http://localhost:3000/calculators/weight-calculator");
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);
    
    // Check H1
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi);
    console.log("H1 elements found:", h1Matches);

    // Check Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1] : "NONE");

    // Check Meta Description
    const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    console.log("Meta description:", metaDescMatch ? metaDescMatch[1] : "NONE");

    // Check Canonical
    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
    console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NONE");

    // Check for raw tokens
    for (const token of ["NaN", "Infinity", "undefined", "[object Object]"]) {
      const idx = html.indexOf(token);
      if (idx !== -1) {
        console.error(`Found raw token ${token} at index ${idx}: ${html.slice(idx - 30, idx + 30)}`);
      } else {
        console.log(`Token ${token}: NOT FOUND (CLEAN)`);
      }
    }

    // Check Educational Content in SSR
    const hasPhysicalDefs = html.includes("Physical Definitions: Mass versus Weight");
    console.log("Contains Physical Definitions in SSR:", hasPhysicalDefs);

    const hasBipm = html.includes("2019 BIPM Redefinition of the Kilogram");
    console.log("Contains 2019 BIPM in SSR:", hasBipm);

    const hasWorkedExample = html.includes("Step-by-Step Worked Conversion Example");
    console.log("Contains Worked Example in SSR:", hasWorkedExample);

    const hasFaq = html.includes("Frequently Asked Questions");
    console.log("Contains FAQ in SSR:", hasFaq);

  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testSsr();
