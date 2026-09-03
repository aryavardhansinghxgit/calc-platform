import fs from "fs";

async function main() {
  const url = "http://localhost:3000/calculators/pregnancy-weight-gain-calculator";
  console.log("Fetching live page from:", url);
  const res = await fetch(url);
  const html = await res.text();

  console.log("=== 1. STATUS & BASICS ===");
  console.log("HTTP Status:", res.status);
  console.log("HTML length:", html.length);

  console.log("\n=== 2. TITLE & META ===");
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log("Page Title:", titleMatch ? titleMatch[1] : "NOT FOUND");

  const metaDescMatch = html.match(/<meta name="description" content="([^"]+)"/);
  console.log("Meta Description:", metaDescMatch ? metaDescMatch[1] : "NOT FOUND");

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  console.log("Canonical:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

  console.log("\n=== 3. HEADINGS ===");
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log("H1 count:", h1Matches.length);
  h1Matches.forEach((h1) => console.log("  H1 text:", h1.replace(/<[^>]+>/g, "").trim()));

  const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  console.log("H2 count:", h2Matches.length);
  h2Matches.forEach((h2, idx) => console.log(`  H2 [${idx + 1}]:`, h2.replace(/<[^>]+>/g, "").trim()));

  console.log("\n=== 4. FAQS ===");
  const faqSchemaMatches = html.match(/"@type":"FAQPage"/g) || [];
  console.log("FAQPage schema count:", faqSchemaMatches.length);
  const questionsPresent = [
    "How much weight should I gain during pregnancy?",
    "How does a pregnancy weight gain calculator work?",
    "How is pregnancy weight gain calculated from BMI?",
    "How much weight should I gain in the first trimester?",
    "How much weight should I gain in the second trimester?",
    "How much weight should I gain in the third trimester?",
    "How much weight should I gain if I am pregnant with twins?",
    "Is pregnancy weight gain different if I was overweight before pregnancy?",
    "Is pregnancy weight gain different if I had obesity before pregnancy?",
    "What if I am gaining weight faster than the calculator recommends?",
    "What if I am not gaining enough weight during pregnancy?",
    "Is it normal to lose weight during early pregnancy?",
    "Does the calculator predict my baby's weight?",
    "How accurate is a pregnancy weight gain calculator?",
    "Should I follow the calculator or my doctor's recommendation?",
  ];
  const allQuestionsFound = questionsPresent.every((q) => html.includes(q));
  console.log("All 15 FAQ questions present in DOM:", allQuestionsFound);
  console.log("Total FAQ questions rendered:", questionsPresent.filter((q) => html.includes(q)).length);

  console.log("\n=== 5. INTERNAL LINKS ===");
  const internalLinks = [
    "/calculators/bmi-calculator",
    "/calculators/pregnancy-calculator",
    "/calculators/calorie-calculator",
    "/calculators/conception-calculator",
    "/calculators/ovulation-calculator",
  ];
  internalLinks.forEach((link) => {
    const found = html.includes(`href="${link}"`);
    console.log(`  ${link}:`, found ? "PRESENT" : "MISSING");
  });

  console.log("\n=== 6. RELATED CALCULATORS CARDS ===");
  const relatedMatches = html.match(/Related Calculators/gi) || [];
  console.log("Related Calculators heading count:", relatedMatches.length);

  console.log("\n=== 7. CLINICAL REFERENCES & DISCLAIMER ===");
  console.log("Clinical References heading present:", html.includes("Clinical References &amp; Guidelines") || html.includes("Clinical References & Guidelines"));
  console.log("CDC link present:", html.includes("CDC — Weight Gain During Pregnancy"));
  console.log("ACOG Committee Opinion link present:", html.includes("ACOG — How Much Weight Should I Gain During Pregnancy?"));
  console.log("National Academies link present:", html.includes("National Academies — Weight Gain During Pregnancy"));
  console.log("ACOG Healthy Eating link present:", html.includes("ACOG — Healthy Eating During Pregnancy"));
  console.log("ACOG Exercise link present:", html.includes("ACOG — Exercise During Pregnancy"));
  console.log("Medical Disclaimer present:", html.includes("Medical Disclaimer"));

  console.log("\n=== 8. DIAGRAM ACCESSIBILITY ===");
  console.log("Diagram alt text present:", html.includes('aria-label="Diagram showing how pre-pregnancy BMI and pregnancy type determine pregnancy weight-gain reference ranges."'));

  console.log("\n=== 9. DARK CARDS IN CONTENT CHECK ===");
  const hasDarkArticleBg = html.includes("bg-black") || html.includes("bg-zinc-950") || html.includes("bg-gray-900");
  console.log("Dark background classes in article:", hasDarkArticleBg);
}

main().catch(console.error);

export {};
