export {};

async function checkSSR() {
  const url = "http://localhost:3000/calculators/voltage-drop-calculator";
  const res = await fetch(url);
  const status = res.status;
  const html = await res.text();

  console.log("HTTP Status:", status);

  // Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 Count:", h1Matches.length);
  h1Matches.forEach((h1, i) => console.log(`H1 [${i}]:`, h1.replace(/<[^>]+>/g, '').trim()));

  // Check Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log("Title:", titleMatch ? titleMatch[1].trim() : "NOT FOUND");

  // Check Meta Description
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log("Meta Description:", metaMatch ? metaMatch[1].trim() : "NOT FOUND");

  // Check Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1].trim() : "NOT FOUND");

  // Count NaN, Infinity, undefined, null in visible text (excluding script tags)
  const bodyWithoutScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const nanCount = (bodyWithoutScripts.match(/>[^<]*\bNaN\b[^<]*</gi) || []).length;
  const infCount = (bodyWithoutScripts.match(/>[^<]*\bInfinity\b[^<]*</gi) || []).length;
  const undefCount = (bodyWithoutScripts.match(/>[^<]*\bundefined\b[^<]*</gi) || []).length;
  const nullCount = (bodyWithoutScripts.match(/>[^<]*\bnull\b[^<]*</gi) || []).length;

  console.log("Visible NaN Count:", nanCount);
  console.log("Visible Infinity Count:", infCount);
  console.log("Visible undefined Count:", undefCount);
  console.log("Visible null Count:", nullCount);

  // Related calculators blocks
  const relatedMatches = html.match(/Related Calculators/gi) || [];
  console.log("Related Calculators matches:", relatedMatches.length);

  // FAQs in SSR
  const faqMatches = html.match(/Frequently Asked Questions/gi) || [];
  console.log("FAQ header matches:", faqMatches.length);
}

checkSSR();
