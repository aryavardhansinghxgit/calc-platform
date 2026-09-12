export {};

async function checkSSR() {
  const url = "http://localhost:3000/calculators/base64-calculator";
  console.log("Checking SSR at:", url);
  try {
    const res = await fetch(url);
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);

    // Check H1
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log("H1 Count:", h1Matches.length);
    h1Matches.forEach((h, i) => console.log(`  H1 [${i + 1}]:`, h.replace(/<[^>]+>/g, "").trim()));

    // Check Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1].trim() : "NONE");

    // Check Meta Description
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log("Meta Description:", metaDesc ? metaDesc[1] : "NONE");

    // Check Canonical
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log("Canonical:", canonical ? canonical[1] : "NONE");

    // Check Article
    const articleCount = (html.match(/<article[\s>]/gi) || []).length;
    console.log("Article tag count:", articleCount);

    // Check FAQ count / headings
    const faqCount = (html.match(/Frequently Asked Questions/gi) || []).length;
    console.log("FAQ section headings:", faqCount);

    // Check Related calculators count
    const relatedCount = (html.match(/RELATED CALCULATORS/gi) || []).length;
    console.log("RELATED CALCULATORS occurrences:", relatedCount);

    // Check invalid tokens
    const nans = (html.match(/>\s*NaN\s*</g) || []).length;
    const infs = (html.match(/>\s*Infinity\s*</g) || []).length;
    const undefs = (html.match(/>\s*undefined\s*</g) || []).length;
    const nulls = (html.match(/>\s*null\s*</g) || []).length;
    console.log(`Visible invalid tokens: NaN=${nans}, Infinity=${infs}, undefined=${undefs}, null=${nulls}`);

  } catch (err) {
    console.error("SSR fetch failed:", err);
  }
}

checkSSR();
