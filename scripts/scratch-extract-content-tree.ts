import fs from "fs";
import path from "path";

const files = [
  { slug: "home-equity-loan-calculator", file: "src/components/calculator/home-equity/HomeEquityContent.tsx" },
  { slug: "heloc-calculator", file: "src/components/calculator/heloc/HELOCContent.tsx" },
  { slug: "down-payment-calculator", file: "src/components/calculator/down-payment/DownPaymentContent.tsx" },
  { slug: "rent-vs-buy-calculator", file: "src/components/calculator/rent-vs-buy/RentVsBuyContent.tsx" },
  { slug: "va-mortgage-calculator", file: "src/components/calculator/va/VAMortgageContent.tsx" },
];

console.log("=== EXACT ENGLISH CONTENT TREE MANIFEST ===");

for (const { slug, file } of files) {
  const fullPath = path.resolve(process.cwd(), file);
  const content = fs.readFileSync(fullPath, "utf-8");

  // Extract H1
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "None";

  // Extract H2s
  const h2Matches = Array.from(content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map(m => m[1].replace(/<[^>]+>/g, "").trim());

  // Extract H3s
  const h3Matches = Array.from(content.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)).map(m => m[1].replace(/<[^>]+>/g, "").trim());

  // Count tables
  const tableCount = (content.match(/<table/gi) || []).length;

  console.log(`\n==================================================`);
  console.log(`CALCULATOR: ${slug}`);
  console.log(`File: ${file} (${content.length} chars, ${content.split('\n').length} lines)`);
  console.log(`H1: ${h1}`);
  console.log(`H2 Count: ${h2Matches.length}`);
  h2Matches.forEach((h2, i) => console.log(`  H2 [${i + 1}]: ${h2}`));
  if (h3Matches.length > 0) {
    console.log(`H3 Count: ${h3Matches.length}`);
    h3Matches.forEach((h3, i) => console.log(`  H3 [${i + 1}]: ${h3}`));
  }
  console.log(`Table Count: ${tableCount}`);
}
