async function auditUrlEncoderSeo() {
  const url = "http://localhost:3000/calculators/url-encoder-decoder";
  console.log("Auditing " + url + " ...");

  try {
    const res = await fetch(url);
    console.log("HTTP Status:", res.status);
    const html = await res.text();

    // H1 check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log("H1 count:", h1Matches.length);
    h1Matches.forEach((h, i) => console.log(`  H1 [${i + 1}]:`, h.replace(/<[^>]+>/g, "").trim()));

    // Title check
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log("Title:", titleMatch ? titleMatch[1].trim() : "NONE");

    // Meta description check
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log("Meta Description:", metaDescMatch ? metaDescMatch[1].trim() : "NONE");

    // Canonical check
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log("Canonical:", canonicalMatch ? canonicalMatch[1].trim() : "NONE");

    // Article tag count
    const articleCount = (html.match(/<article[\s>]/gi) || []).length;
    console.log("Article count:", articleCount);

    // FAQ headings
    const faqCount = (html.match(/Frequently Asked Questions/gi) || []).length;
    console.log("FAQ section heading occurrences:", faqCount);

    // Check individual FAQs
    const faq23 = html.includes("23.") && html.includes("What is URL encoding?");
    const faq27 = html.includes("27.") && html.includes("How do I encode a plus sign in a URL?");
    const faq41 = html.includes("41.") && html.includes("Is there one universal maximum URL length?");
    console.log("FAQ Q23 present:", faq23);
    console.log("FAQ Q27 present:", faq27);
    console.log("FAQ Q41 present:", faq41);

    // Related calculators blocks
    const relatedMatches = html.match(/RELATED CALCULATORS:/gi) || [];
    console.log("RELATED CALCULATORS text count:", relatedMatches.length);

    const posFirstRelated = html.indexOf("RELATED CALCULATORS:");
    const posArticle = html.indexOf("<article");
    const posFaq = html.indexOf("Frequently Asked Questions");
    const posTechNotes = html.indexOf("Technical Notes");
    const posStandards = html.indexOf("Standards &amp; References");
    const posSecondRelated = html.indexOf("RELATED CALCULATORS:", posStandards !== -1 ? posStandards : posFaq);

    console.log("Position posFirstRelated:", posFirstRelated);
    console.log("Position posArticle:", posArticle);
    console.log("Position posFaq:", posFaq);
    console.log("Position posTechNotes:", posTechNotes);
    console.log("Position posStandards:", posStandards);
    console.log("Position posSecondRelated:", posSecondRelated);

    const isOrderCorrect =
      posFirstRelated < posArticle &&
      posArticle < posFaq &&
      posFaq < posTechNotes &&
      posTechNotes < posStandards &&
      posStandards < posSecondRelated;
    console.log("Architecture ordering valid (H1 -> Tool -> Rel Above -> Article -> FAQ -> TechNotes -> Standards -> Rel Below):", isOrderCorrect);

    // Contextual link checks
    const base64LinkPresent = html.includes('href="/calculators/base64-calculator"') && html.includes("Base64 Encoder / Decoder");
    const ipSubnetLinkPresent = html.includes('href="/calculators/ip-subnet-calculator"') && html.includes("IP Subnet Calculator");
    console.log("Contextual link to Base64 Encoder / Decoder:", base64LinkPresent);
    console.log("Contextual link to IP Subnet Calculator:", ipSubnetLinkPresent);

    // Invalid tokens check
    const nans = (html.match(/>\s*NaN\s*</g) || []).length;
    const infs = (html.match(/>\s*Infinity\s*</g) || []).length;
    const undefs = (html.match(/>\s*undefined\s*</g) || []).length;
    const nulls = (html.match(/>\s*null\s*</g) || []).length;
    console.log(`Visible invalid tokens: NaN=${nans}, Infinity=${infs}, undefined=${undefs}, null=${nulls}`);

  } catch (err: any) {
    console.error("Audit failed:", err.message);
  }
}

auditUrlEncoderSeo();
