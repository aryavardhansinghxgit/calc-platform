export {};

async function auditWeightSeo() {
  try {
    const res = await fetch("http://localhost:3000/calculators/weight-calculator");
    console.log("HTTP Status:", res.status);
    if (res.status !== 200) {
      console.error("Non-200 status code!");
      return;
    }

    const html = await res.text();
    console.log("HTML length:", html.length);

    // 1. H1 Count
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    console.log(`H1 count: ${h1Matches.length}`);
    h1Matches.forEach((h, i) => console.log(`  H1[${i}]: ${h}`));

    // 2. Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    console.log("Page Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

    // 3. Meta Description
    const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

    // 4. Canonical
    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
    console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

    // 5. OpenGraph
    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"/i);
    console.log("OG Title:", ogTitleMatch ? ogTitleMatch[1] : "NOT FOUND");

    const ogDescMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i);
    console.log("OG Description:", ogDescMatch ? ogDescMatch[1] : "NOT FOUND");

    // 6. Related Calculators Block Count
    const relatedMatches = html.match(/RELATED CALCULATORS:/g) || [];
    console.log(`RELATED CALCULATORS block count: ${relatedMatches.length}`);

    // 7. FAQ Section Count
    const faqMatches = html.match(/Frequently Asked Questions/g) || [];
    console.log(`Frequently Asked Questions heading count: ${faqMatches.length}`);

    // 8. Individual FAQ questions check (sample 5)
    const q1 = html.includes("What is the formula for calculating mass from density and volume?");
    const q2 = html.includes("What is the difference between mass and weight?");
    const q3 = html.includes("How much does 70 kg weigh on Mars?");
    const q4 = html.includes("Is the kilogram still defined by a physical metal object?");
    console.log("Contains core FAQs:", q1 && q2 && q3 && q4);

    // 9. Check for bad tokens
    const tokens = ["NaN", "Infinity", "[object Object]"];
    tokens.forEach((t) => {
      const count = (html.match(new RegExp(t, "g")) || []).length;
      console.log(`Token '${t}' count: ${count}`);
    });

    // 10. Check JSON-LD
    const jsonLdMatches = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    console.log(`JSON-LD script tags: ${jsonLdMatches.length}`);

    console.log("\nALL SEO CHECKS COMPLETED.");
  } catch (err) {
    console.error("Error running SEO audit:", err);
  }
}

auditWeightSeo();
