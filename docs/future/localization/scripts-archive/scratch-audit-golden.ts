import { home_equityConfig } from "../src/app/calculators/home-equity-loan-calculator/config";
import { helocConfig } from "../src/app/calculators/heloc-calculator/config";
import { downPaymentConfig } from "../src/app/calculators/down-payment-calculator/config";
import { rentVsBuyConfig } from "../src/app/calculators/rent-vs-buy-calculator/config";
import { va_mortgageConfig } from "../src/app/calculators/va-mortgage-calculator/config";

const configs = [
  { key: "home-equity-loan-calculator", config: home_equityConfig },
  { key: "heloc-calculator", config: helocConfig },
  { key: "down-payment-calculator", config: downPaymentConfig },
  { key: "rent-vs-buy-calculator", config: rentVsBuyConfig },
  { key: "va-mortgage-calculator", config: va_mortgageConfig },
];

console.log("=== ENGLISH GOLDEN MANIFEST AUDIT ===");

for (const { key, config: cfg } of configs) {
  console.log(`\n==================================================`);
  console.log(`CALCULATOR: ${cfg.slug} (${cfg.id})`);
  console.log(`Title: ${cfg.title}`);
  console.log(`Category: ${cfg.category} / ${cfg.subcategory}`);
  console.log(`Inputs Count: ${cfg.inputs?.length || 0}`);
  console.log(`Outputs Count: ${cfg.outputs?.length || 0}`);
  console.log(`FAQs Count: ${cfg.faqs?.length || 0}`);
  console.log(`CustomComponent: ${cfg.CustomComponent?.name || "None"}`);
  console.log(`ContentComponent: ${cfg.ContentComponent?.name || "None"}`);
  if (cfg.faqs) {
    console.log(`All FAQs (${cfg.faqs.length}):`);
    cfg.faqs.forEach((f, i) => console.log(`  ${i + 1}. ${f.question}`));
  }
}
