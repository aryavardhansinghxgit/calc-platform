async function checkGpaSsr() {
  const url = "http://localhost:3000/calculators/gpa-calculator";
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    console.log(`HTTP Status: ${res.status}`);
    if (!res.ok) {
      console.error(`Fetch failed with status ${res.status}`);
      return;
    }
    const html = await res.text();

    // 1. H1 count and text
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    console.log(`H1 count: ${h1Matches.length}`);
    h1Matches.forEach((m, idx) => console.log(`  H1 [${idx + 1}]: ${m[1].trim()}`));

    // 2. Title and Meta Description
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NOT FOUND"}`);

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log(`Meta Description: ${descMatch ? descMatch[1] : "NOT FOUND"}`);

    // 3. Canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NOT FOUND"}`);

    // 4. Related Calculators blocks
    const relatedMatches = [...html.matchAll(/RELATED CALCULATORS:/gi)];
    console.log(`Related Calculators blocks count: ${relatedMatches.length}`);

    // 5. Check unwanted strings
    const nanCount = (html.match(/\bNaN\b/g) || []).length;
    const infCount = (html.match(/\bInfinity\b/g) || []).length;
    const undefCount = (html.match(/\bundefined\b/g) || []).length;
    const nullCount = (html.match(/\bnull\b/g) || []).length;
    const objCount = (html.match(/\[object Object\]/g) || []).length;
    console.log(`NaN count: ${nanCount}`);
    console.log(`Infinity count: ${infCount}`);
    console.log(`undefined count: ${undefCount}`);
    console.log(`null count: ${nullCount}`);
    console.log(`[object Object] count: ${objCount}`);

    // 6. Educational Content and FAQs
    const articlePresent = html.includes("GPA Calculator: Calculate Semester") || html.includes("1. What Is GPA?");
    const faqCount = (html.match(/Frequently Asked Questions/gi) || []).length;
    const refPresent = html.includes("Standards &amp; Authoritative References") || html.includes("Standards & Authoritative References");
    const disclaimerPresent = html.includes("Important GPA Disclaimer");
    const quickRefPresent = html.includes("GPA Calculation Quick Reference");
    console.log(`Article Present: ${articlePresent}`);
    console.log(`FAQ Count: ${faqCount}`);
    console.log(`References Present: ${refPresent}`);
    console.log(`Disclaimer Present: ${disclaimerPresent}`);
    console.log(`Quick Reference Present: ${quickRefPresent}`);
  } catch (err) {
    console.error("Error fetching GPA calculator SSR:", err);
  }
}

checkGpaSsr();
