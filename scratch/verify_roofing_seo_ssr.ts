import fs from "fs";
import path from "path";

const htmlPath = path.resolve(".next/server/app/calculators/roofing-calculator.html");
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, "utf8");
  console.log("HTML file exists! Length:", html.length);

  // H1
  const h1s = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  console.log("H1 count:", h1s.length, h1s);

  // Title
  const title = html.match(/<title[^>]*>(.*?)<\/title>/i);
  console.log("Title:", title ? title[1] : "NONE");

  // Meta description
  const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log("Description:", desc ? desc[1] : "NONE");

  // Canonical
  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log("Canonical:", canonical ? canonical[1] : "NONE");

  // FAQ check
  const hasFaq = html.includes("Frequently Asked Questions");
  console.log("Has FAQ in HTML:", hasFaq);

  // Related Calculators check
  const relatedMatches = html.match(/Related Calculators/gi) || [];
  console.log("Related Calculators count:", relatedMatches.length);

  // Check for raw LaTeX in rendered HTML (strip script tags)
  const renderedHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  const latexMatches = renderedHtml.match(/.{0,40}(\\frac|\\times|\\sqrt|\$[a-zA-Z0-9]).{0,40}/g) || [];
  console.log("Rendered LaTeX matches count:", latexMatches.length);
  latexMatches.forEach((m, idx) => console.log(`  Match #${idx+1}: ${m}`));

  // Internal Links to square-footage and concrete
  const sqftCount = (html.match(/\/calculators\/square-footage-calculator/g) || []).length;
  const concreteCount = (html.match(/\/calculators\/concrete-calculator/g) || []).length;
  console.log("Square Footage Calculator link count:", sqftCount);
  console.log("Concrete Calculator link count:", concreteCount);

  // Headings check
  const h2s = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
  console.log("H2 count:", h2s.length);
  h2s.forEach((h, i) => console.log(`  H2 #${i+1}: ${h.replace(/<[^>]+>/g, "").trim()}`));
} else {
  console.log("HTML file not found at:", htmlPath);
}
