export {};

async function auditSEO() {
  const url = "http://localhost:3000/calculators/ip-subnet-calculator";
  console.log(`Auditing SEO on ${url}...`);

  const res = await fetch(url);
  const status = res.status;
  const html = await res.text();

  console.log(`HTTP Status: ${status}`);
  if (status !== 200) throw new Error(`HTTP status is ${status}`);

  // 1. H1 Check
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  const h1Text = (h1Matches.length > 0 && h1Matches[0]) ? h1Matches[0].replace(/<[^>]+>/g, "").trim() : "";
  console.log(`H1 text: "${h1Text}"`);

  // 2. Title Check
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, "&").trim() : "NOT FOUND";
  console.log(`Title: "${title}"`);

  // 3. Meta Description
  const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) ||
                        html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1] : "NOT FOUND";
  console.log(`Meta Description: "${metaDesc}"`);

  // 4. Canonical
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : "NOT FOUND";
  console.log(`Canonical URL: "${canonical}"`);

  // 5. Related Calculators Blocks (Expected exactly 2: ABOVE and BELOW)
  const relatedMatches = html.match(/RELATED CALCULATORS/gi) || [];
  console.log(`Related Calculators blocks count: ${relatedMatches.length}`);

  // 6. Educational Article Check
  const hasArticle = html.includes("1. Introduction to IP Subnetting") &&
                     html.includes("2. What Is an IP Address?") &&
                     html.includes("22. Engineering Perspective: Calculation Versus Deployment");
  console.log(`Article complete (Sections 1-22): ${hasArticle}`);

  // 7. Technical Disclaimer & References Check
  const hasDisclaimer = html.includes("23. Technical Disclaimer");
  const hasReferences = html.includes("Technical References") &&
                        html.includes("RFC 1918") &&
                        html.includes("RFC 3021") &&
                        html.includes("RFC 4291") &&
                        html.includes("RFC 4632") &&
                        html.includes("RFC 5952");
  console.log(`Technical Disclaimer present: ${hasDisclaimer}`);
  console.log(`Technical References present: ${hasReferences}`);

  // 8. FAQ Section & Unfolded Answers Check
  const faqHeadingMatches = html.match(/Frequently Asked Questions/gi) || [];
  console.log(`FAQ section count: ${faqHeadingMatches.length}`);
  const hasFaqQ1 = html.includes("What is an IP subnet?");
  const hasFaqA1 = html.includes("An IP subnet is a logical subdivision of an IP network");
  const hasFaqQ16 = html.includes("What is route summarization?");
  const hasFaqA16 = html.includes("Route summarization (CIDR aggregation or supernetting) combines multiple contiguous");
  console.log(`FAQ Q1 present: ${hasFaqQ1}, A1 present: ${hasFaqA1}`);
  console.log(`FAQ Q16 present: ${hasFaqQ16}, A16 present: ${hasFaqA16}`);

  // 9. Contextual Internal Anchors Check
  const hasBandwidthAnchor = html.includes('href="/calculators/bandwidth-calculator"') && html.includes("Bandwidth Calculator");
  const hasConversionAnchor = html.includes('href="/calculators/conversion-calculator"') && html.includes("Conversion Calculator");
  const hasVoltageDropAnchor = html.includes('href="/calculators/voltage-drop-calculator"') && html.includes("Voltage Drop Calculator");
  console.log(`Contextual Anchor (Bandwidth): ${hasBandwidthAnchor}`);
  console.log(`Contextual Anchor (Conversion): ${hasConversionAnchor}`);
  console.log(`Contextual Anchor (Voltage Drop): ${hasVoltageDropAnchor}`);

  // 10. Clean Tokens Check
  const cleanText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  const nanMatches = cleanText.match(/\bNaN\b/g) || [];
  const infMatches = cleanText.match(/\bInfinity\b/g) || [];
  const undefMatches = cleanText.match(/\bundefined\b/g) || [];
  const nullMatches = cleanText.match(/\bnull\b/g) || [];

  console.log(`Visible NaN: ${nanMatches.length}`);
  console.log(`Visible Infinity: ${infMatches.length}`);
  console.log(`Visible undefined: ${undefMatches.length}`);
  console.log(`Visible null: ${nullMatches.length}`);

  // Assertions summary
  console.log("\n================ SEO AUDIT SUMMARY ================");
  console.log(`HTTP 200:                       ${status === 200 ? "PASS" : "FAIL"}`);
  console.log(`H1 === 1 ("IP Subnet Calculator"): ${h1Matches.length === 1 && h1Text === "IP Subnet Calculator" ? "PASS" : "FAIL"}`);
  console.log(`Title clean & accurate:         ${title === "IP Subnet Calculator – IPv4, IPv6, CIDR, Hosts & Subnetting" ? "PASS" : "FAIL"}`);
  console.log(`Meta Description accurate:      ${metaDesc === "Calculate IPv4 and IPv6 subnets, CIDR masks, network and broadcast addresses, usable hosts, subnet splits, host capacity, and route summaries." ? "PASS" : "FAIL"}`);
  console.log(`Canonical URL accurate:         ${canonical === "https://calcplatform.com/calculators/ip-subnet-calculator" ? "PASS" : "FAIL"}`);
  console.log(`Related Blocks === 2:           ${relatedMatches.length === 2 ? "PASS" : "FAIL"}`);
  console.log(`FAQ Section === 1:              ${faqHeadingMatches.length === 1 ? "PASS" : "FAIL"}`);
  console.log(`Article (22 sections):          ${hasArticle ? "PASS" : "FAIL"}`);
  console.log(`Disclaimer & References:        ${hasDisclaimer && hasReferences ? "PASS" : "FAIL"}`);
  console.log(`FAQs unfolded with answers:     ${hasFaqQ1 && hasFaqA1 && hasFaqQ16 && hasFaqA16 ? "PASS" : "FAIL"}`);
  console.log(`Contextual Anchors:             ${hasBandwidthAnchor && hasConversionAnchor && hasVoltageDropAnchor ? "PASS" : "FAIL"}`);
  console.log(`Clean Tokens (0 illegal):       ${nanMatches.length + infMatches.length + undefMatches.length + nullMatches.length === 0 ? "PASS" : "FAIL"}`);
  console.log("====================================================");
}

auditSEO().catch(console.error);
