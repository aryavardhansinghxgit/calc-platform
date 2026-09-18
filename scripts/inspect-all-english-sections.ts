import fs from "fs";

const files = {
  "home-equity-loan-calculator": "src/components/calculator/home-equity/HomeEquityContent.tsx",
  "heloc-calculator": "src/components/calculator/heloc/HELOCContent.tsx",
  "down-payment-calculator": "src/components/calculator/down-payment/DownPaymentContent.tsx",
  "rent-vs-buy-calculator": "src/components/calculator/rent-vs-buy/RentVsBuyContent.tsx",
  "va-mortgage-calculator": "src/components/calculator/va/VAMortgageContent.tsx",
};

for (const [slug, filePath] of Object.entries(files)) {
  const content = fs.readFileSync(filePath, "utf-8");
  const sections = content.split(/<section[^>]*>/).slice(1);
  console.log(`\n==============================================`);
  console.log(`SLUG: ${slug} (Total Sections: ${sections.length})`);
  console.log(`==============================================`);
  sections.forEach((s, idx) => {
    const h = s.match(/<h[23][^>]*>(.*?)<\/h[23]>/);
    const heading = h ? h[1].replace(/<[^>]+>/g, "").trim() : "No Heading (Notice/Box)";
    const pCount = (s.match(/<p/g) || []).length;
    const liCount = (s.match(/<li/g) || []).length;
    const divCount = (s.match(/<div/g) || []).length;
    const tableCount = (s.match(/<table/g) || []).length;
    console.log(`  Section ${idx + 1}: [${heading}] -> p:${pCount}, li:${liCount}, div:${divCount}, table:${tableCount}`);
  });
}
