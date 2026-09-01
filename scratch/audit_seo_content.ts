import { readFileSync } from "fs";

async function audit() {
  const fileContent = readFileSync("src/components/calculator/period/PeriodContent.tsx", "utf-8");

  // Check 1: dark cards
  const darkMatches = fileContent.match(/dark:[a-zA-Z0-9_\-\/]+/g) || [];
  console.log("Dark classes in PeriodContent:", darkMatches.length, darkMatches);

  // Check 2: internal links
  const links = [
    "/calculators/ovulation-calculator",
    "/calculators/pregnancy-conception-calculator",
    "/calculators/due-date-calculator",
  ];
  for (const l of links) {
    const hasLink = fileContent.includes(`href="${l}"`);
    console.log(`Link ${l} present:`, hasLink);
  }

  // Check 3: External authoritative citations
  const extCitations = [
    "https://www.acog.org",
    "https://www.asrm.org",
    "https://www.nhs.uk/conditions/missed-or-late-periods/",
  ];
  for (const c of extCitations) {
    const hasC = fileContent.includes(c);
    console.log(`Citation ${c} present:`, hasC);
  }

  // Check 4: SSR HTML check
  const res = await fetch("http://localhost:3000/calculators/period-calculator");
  const html = await res.text();

  // Title tag
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log("Page Title:", titleMatch ? titleMatch[1] : "None");

  // Meta description
  const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "None");

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log("H1 count:", h1Match?.length, h1Match);

  // FAQ Schema
  const schemaMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  console.log("JSON-LD scripts found:", schemaMatches.length);
  let faqSchemaFound = false;
  let faqCountInSchema = 0;
  for (const s of schemaMatches) {
    const jsonText = s.replace(/<script[^>]*>/, "").replace(/<\/script>/, "");
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed["@type"] === "FAQPage") {
        faqSchemaFound = true;
        faqCountInSchema = parsed.mainEntity?.length || 0;
      }
    } catch (e) {}
  }
  console.log("FAQ schema found:", faqSchemaFound, "FAQ items in schema:", faqCountInSchema);
}

audit();
