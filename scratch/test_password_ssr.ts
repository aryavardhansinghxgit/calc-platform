async function testPasswordSSR() {
  console.log("=== TESTING PASSWORD GENERATOR SSR & METADATA ===");
  const res = await fetch("http://localhost:3000/calculators/password-generator");
  console.log("HTTP Status:", res.status);
  if (res.status !== 200) {
    console.error("FAIL: Expected HTTP 200");
    process.exit(1);
  }

  const html = await res.text();

  // 1. H1 count
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h, i) => console.log(`H1 #${i + 1}:`, h.replace(/<[^>]+>/g, "").trim()));

  // 2. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : "NOT FOUND");

  // 3. Meta Description
  const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  // 4. Canonical
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  // 5. Related calculators blocks count
  const relatedMatches = html.match(/RELATED CALCULATORS:/g) || [];
  console.log("Related Calculators count:", relatedMatches.length);

  // 6. Educational Content presence
  console.log("Contains 'The Complete Guide to Password Generation':", html.includes("The Complete Guide to Password Generation"));
  console.log("Contains 'Standards & Authoritative References':", html.includes("Standards &amp; Authoritative References") || html.includes("Standards & Authoritative References"));

  // 7. FAQ presence
  console.log("Contains 'What is a password generator?':", html.includes("What is a password generator?"));
  console.log("Contains 'What is CSPRNG?':", html.includes("What is CSPRNG?"));
  console.log("Contains 'What is modulo bias?':", html.includes("What is modulo bias?"));

  // 8. Contextual links presence
  console.log("Contains link to /calculators/ip-subnet-calculator:", html.includes("/calculators/ip-subnet-calculator"));
  console.log("Contains link to /calculators/binary-calculator:", html.includes("/calculators/binary-calculator"));

  // 9. Structured Data JSON-LD
  console.log("Contains application/ld+json:", html.includes('type="application/ld+json"'));
}

testPasswordSSR().catch(e => {
  console.error(e);
  process.exit(1);
});
