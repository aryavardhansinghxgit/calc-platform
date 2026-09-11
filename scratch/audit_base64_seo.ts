async function auditBase64Seo() {
  const url = "http://localhost:3000/calculators/base64-calculator";
  console.log("Auditing http://localhost:3000/calculators/base64-calculator ...");

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

    // FAQ questions check
    const faq1Present = html.includes("19. What is Base64 used for?");
    const faq15Present = html.includes("33. Does changing one Base64 character change the decoded data?");
    console.log("FAQ Q19 present:", faq1Present);
    console.log("FAQ Q33 present:", faq15Present);

    // Related calculators blocks
    const relatedMatches = html.match(/RELATED CALCULATORS:/gi) || [];
    console.log("RELATED CALCULATORS text count:", relatedMatches.length);

    // Ordering check:
    const posFirstRelated = html.indexOf("RELATED CALCULATORS:");
    const posArticle = html.indexOf("<article");
    const posFaq = html.indexOf("Frequently Asked Questions");
    const posTechNotes = html.indexOf("Technical Notes and Limitations");
    const posStandards = html.indexOf("Standards and Technical References");
    const posSecondRelated = html.indexOf("RELATED CALCULATORS:", posStandards);

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
    console.log("Architecture ordering valid:", isOrderCorrect);

    // Contextual link check
    const contextualLinkPresent = html.includes('href="/calculators/url-encoder-decoder"');
    console.log("Contextual link to URL Encoder / Decoder:", contextualLinkPresent);

    // Wording check
    const forbiddenPhrasePresent = html.includes("guarantees that data remains intact");
    console.log("Forbidden integrity wording in SSR:", forbiddenPhrasePresent);

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

auditBase64Seo();
