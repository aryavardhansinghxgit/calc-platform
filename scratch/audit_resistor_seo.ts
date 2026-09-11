async function auditResistorSeo() {
  console.log("Auditing http://localhost:3000/calculators/resistor-calculator ...");
  try {
    const res = await fetch("http://localhost:3000/calculators/resistor-calculator");
    console.log(`HTTP Status: ${res.status}`);
    const html = await res.text();

    // 1. H1 check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log(`H1 count: ${h1Matches.length}`);
    h1Matches.forEach((h, i) => console.log(`  H1 [${i + 1}]: ${h.replace(/<[^>]+>/g, "").trim()}`));

    // 2. Title & Meta description
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NONE"}`);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log(`Meta Description: ${metaDescMatch ? metaDescMatch[1].trim() : "NONE"}`);

    // 3. Article count
    const articleMatches = html.match(/<article[\s>]/gi) || [];
    console.log(`Article count: ${articleMatches.length}`);

    // 4. FAQ count & visibility
    const faqHeadingMatches = html.match(/Frequently Asked Questions/gi) || [];
    console.log(`FAQ section heading occurrences: ${faqHeadingMatches.length}`);
    const faqQ1 = html.includes("How do I calculate resistor value from color bands?");
    const faqQ15 = html.includes("How do I calculate resistor power?");
    console.log(`FAQ Q1 present: ${faqQ1}`);
    console.log(`FAQ Q15 present: ${faqQ15}`);

    // 5. Related calculators blocks count
    const relatedBlockMatches = html.match(/RELATED CALCULATORS:/gi) || [];
    console.log(`RELATED CALCULATORS text count: ${relatedBlockMatches.length}`);

    // 6. Relative positioning check
    const posFirstRelated = html.indexOf("RELATED CALCULATORS:");
    const posArticle = html.indexOf("<article");
    const posFaq = html.indexOf("Frequently Asked Questions");
    const posTechNotes = html.indexOf("Technical Notes and Limitations");
    const posStandards = html.indexOf("Standards and References");
    const posSecondRelated = html.lastIndexOf("RELATED CALCULATORS:");

    console.log(`Position posFirstRelated: ${posFirstRelated}`);
    console.log(`Position posArticle: ${posArticle}`);
    console.log(`Position posFaq: ${posFaq}`);
    console.log(`Position posTechNotes: ${posTechNotes}`);
    console.log(`Position posStandards: ${posStandards}`);
    console.log(`Position posSecondRelated: ${posSecondRelated}`);

    const orderingValid = (
      posFirstRelated < posArticle &&
      posArticle < posFaq &&
      posFaq < posTechNotes &&
      posTechNotes < posStandards &&
      posStandards < posSecondRelated
    );
    console.log(`Architecture ordering valid: ${orderingValid}`);

    // 7. Contextual anchors check
    const hasOhmsLawContextual = html.includes('href="/calculators/ohms-law-calculator"') && (html.includes("Ohm&apos;s Law Calculator") || html.includes("Ohm&#x27;s Law Calculator") || html.includes("Ohm's Law Calculator"));
    const hasVoltageDropContextual = html.includes('href="/calculators/voltage-drop-calculator"') && html.includes("Voltage Drop Calculator");
    console.log(`Contextual link to Ohm's Law Calculator: ${hasOhmsLawContextual}`);
    console.log(`Contextual link to Voltage Drop Calculator: ${hasVoltageDropContextual}`);

    // 8. Clean text tokens check (excluding scripts/styles)
    const cleanText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
    const nanMatches = cleanText.match(/\bNaN\b/g) || [];
    const infMatches = cleanText.match(/\bInfinity\b/g) || [];
    const undefMatches = cleanText.match(/\bundefined\b/g) || [];
    const nullMatches = cleanText.match(/\bnull\b/g) || [];

    console.log(`Visible invalid tokens: NaN=${nanMatches.length}, Infinity=${infMatches.length}, undefined=${undefMatches.length}, null=${nullMatches.length}`);

  } catch (err: any) {
    console.error("Fetch failed:", err.message);
  }
}

auditResistorSeo();
