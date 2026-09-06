async function verifyBinarySeo() {
  const url = "http://localhost:3000/calculators/binary-calculator";
  console.log("=== AUDITING SEO FOR BINARY CALCULATOR ===");
  console.log("Fetching:", url);

  const res = await fetch(url);
  console.log("HTTP Status:", res.status);
  const html = await res.text();

  // 1. H1 Count & Content
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("\n1. H1 Tag Audit:");
  console.log("  Count:", h1Matches.length);
  h1Matches.forEach((h1, i) => {
    const text = h1.replace(/<[^>]+>/g, "").trim();
    console.log(`  H1 [${i + 1}]: "${text}"`);
  });

  // 2. Title Tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  console.log("\n2. Title Tag Audit:");
  console.log("  Title:", titleMatch ? titleMatch[1] : "MISSING");

  // 3. Meta Description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  console.log("\n3. Meta Description Audit:");
  console.log("  Description:", metaDescMatch ? metaDescMatch[1] : "MISSING");

  // 4. Canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) ||
                         html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  console.log("\n4. Canonical Audit:");
  console.log("  Canonical URL:", canonicalMatch ? canonicalMatch[1] : "MISSING");

  // 5. Educational Content Word Count
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  let wordCount = 0;
  if (articleMatch) {
    const articleText = articleMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    wordCount = articleText.split(" ").filter(Boolean).length;
  }
  console.log("\n5. Educational Content Word Count:");
  console.log("  Word count:", wordCount);

  // 6. Internal Link Count & Anchor Texts
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  const internalLinks = linkMatches.filter(m => m[1].startsWith("/") || m[1].includes("calcplatform.com"));
  console.log("\n6. Internal Links Audit:");
  console.log("  Total Internal Links:", internalLinks.length);
  const anchorTexts = internalLinks.map(m => m[2].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
  console.log("  Sample Anchor Texts:", anchorTexts.slice(0, 10));

  // Check required anchor texts
  const hasHex = anchorTexts.some(a => a.includes("Hex Calculator") || a.includes("Hexadecimal"));
  const hasSubnet = anchorTexts.some(a => a.includes("IP Subnet Calculator"));
  const hasScientific = anchorTexts.some(a => a.includes("Scientific Calculator"));
  console.log("  Contains Hex Calculator link:", hasHex);
  console.log("  Contains IP Subnet Calculator link:", hasSubnet);
  console.log("  Contains Scientific Calculator link:", hasScientific);

  // 7. Duplicate Block Check
  const relatedCalcMatches = (html.match(/RELATED CALCULATORS:/gi) || []).length;
  const faqHeadingMatches = (html.match(/Frequently Asked Questions/gi) || []).length;
  console.log("\n7. Duplicate Block Check:");
  console.log("  'RELATED CALCULATORS:' occurrences:", relatedCalcMatches);
  console.log("  'Frequently Asked Questions' occurrences:", faqHeadingMatches);

  // 8. Raw LaTeX Check
  const hasRawLatex = /\\\([^)]*$/m.test(html) || /\\\[[^\]]*$/m.test(html) || html.includes("\\begin{") || html.includes("\\end{");
  console.log("\n8. Raw Malformed LaTeX Check:");
  console.log("  Has malformed raw LaTeX:", hasRawLatex);

  // 9. Structured Data (JSON-LD)
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  console.log("\n9. Structured Data (JSON-LD) Audit:");
  console.log("  JSON-LD Blocks Count:", jsonLdMatches.length);
  jsonLdMatches.forEach((m, idx) => {
    try {
      const parsed = JSON.parse(m[1]);
      console.log(`  Block [${idx + 1}] Type:`, parsed["@type"] || "Array / Object");
    } catch {
      console.log(`  Block [${idx + 1}] JSON: Parse Error`);
    }
  });

  console.log("\n=== AUDIT COMPLETE ===");
}

verifyBinarySeo();
