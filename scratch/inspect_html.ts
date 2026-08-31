import fs from "fs";
import path from "path";

const htmlPath = path.resolve(process.cwd(), ".next/server/app/calculators/pregnancy-conception-calculator.html");
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, "utf-8");

  console.log("=== HTML INSPECTION ===");
  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  console.log("Title:          ", titleMatch ? titleMatch[1] : "NOT FOUND");

  // Meta description
  const metaMatch = html.match(/<meta name="description" content="(.*?)"/);
  console.log("Meta Description:", metaMatch ? metaMatch[1] : "NOT FOUND");

  // H1
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  console.log("H1:             ", h1Match ? h1Match[1] : "NOT FOUND");

  // FAQ Headings count
  const faqHeadingCount = (html.match(/Frequently Asked Questions/g) || []).length;
  console.log("FAQ Headings:   ", faqHeadingCount);

  // Check JSON-LD
  const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  console.log("JSON-LD Blocks: ", jsonLdMatches.length);
  for (const block of jsonLdMatches) {
    const jsonStr = block.replace(/<\/?script[^>]*>/g, "");
    try {
      const parsed = JSON.parse(jsonStr);
      console.log("JSON-LD @type:  ", parsed["@type"]);
      if (parsed["@type"] === "FAQPage") {
        console.log("FAQPage Questions Count:", parsed.mainEntity ? parsed.mainEntity.length : 0);
      }
    } catch (e) {}
  }
} else {
  console.log("HTML file not found on disk");
}
