import { carbohydrate_calculatorMetadata } from "../src/app/calculators/carbohydrate-calculator/metadata";
import { carbohydrate_calculatorFaqs } from "../src/app/calculators/carbohydrate-calculator/faq";
import { carbohydrate_calculatorConfig } from "../src/app/calculators/carbohydrate-calculator/config";
import { generateJsonLdSchema } from "../src/lib/seo-helpers";
import * as fs from "fs";

console.log("==================================================");
console.log("VERIFYING SEO METADATA, DOM STRUCTURE & FAQ SCHEMA");
console.log("==================================================\n");

// 1. Metadata Verification
console.log("1. Checking SEO Metadata...");
const expectedTitle = "Carbohydrate Calculator – Daily Carb Intake, Net Carbs & Carb Goals";
const expectedDesc = "Calculate daily carbohydrate needs for maintenance, weight loss, muscle gain and sports. Compare carb targets, fiber and net carbs, glycemic load, and 7-day carb cycling.";

if (carbohydrate_calculatorMetadata.title !== expectedTitle) {
  throw new Error(`Metadata title mismatch:\nExpected: ${expectedTitle}\nGot: ${carbohydrate_calculatorMetadata.title}`);
}
if (carbohydrate_calculatorMetadata.description !== expectedDesc) {
  throw new Error(`Metadata description mismatch:\nExpected: ${expectedDesc}\nGot: ${carbohydrate_calculatorMetadata.description}`);
}
console.log("   ✓ SEO Title & Meta Description PASS");

// 2. FAQ Count & Schema Parity
console.log("2. Checking FAQ Count & JSON-LD Parity...");
if (carbohydrate_calculatorFaqs.length !== 24) {
  throw new Error(`Expected 24 FAQs, got ${carbohydrate_calculatorFaqs.length}`);
}

const schemas = generateJsonLdSchema({
  title: carbohydrate_calculatorConfig.title,
  description: carbohydrate_calculatorConfig.description,
  slug: carbohydrate_calculatorConfig.slug,
  category: carbohydrate_calculatorConfig.category,
  faqs: carbohydrate_calculatorConfig.faqs,
});

const faqSchema = schemas.find((s: any) => s["@type"] === "FAQPage") as any;
if (!faqSchema || !faqSchema.mainEntity) {
  throw new Error("FAQ schema not found in generated JSON-LD");
}
if (faqSchema.mainEntity.length !== 24) {
  throw new Error(`FAQ Schema count mismatch: expected 24, got ${faqSchema.mainEntity.length}`);
}

for (let i = 0; i < 24; i++) {
  const visibleFaq = carbohydrate_calculatorFaqs[i];
  const schemaItem = faqSchema.mainEntity[i];
  if (schemaItem.name !== visibleFaq.question) {
    throw new Error(`FAQ ${i+1} question mismatch:\nVisible: ${visibleFaq.question}\nSchema: ${schemaItem.name}`);
  }
  if (schemaItem.acceptedAnswer.text !== visibleFaq.answer) {
    throw new Error(`FAQ ${i+1} answer mismatch for "${visibleFaq.question}"`);
  }
}
console.log("   ✓ FAQ Count & Schema 100% Identical Parity PASS (24/24 questions and answers match)");

// 3. Check CarbohydrateContent.tsx for dark cards or syntax issues
console.log("3. Inspecting CarbohydrateContent.tsx for Design Constraints...");
const contentCode = fs.readFileSync("src/components/calculator/carbohydrate/CarbohydrateContent.tsx", "utf-8");

// Verify NO dark cards in the article
if (contentCode.includes("dark:bg-slate-900") || contentCode.includes("dark:bg-zinc-900") || contentCode.includes("bg-black")) {
  throw new Error("Found dark card classes in CarbohydrateContent.tsx");
}

// Verify H1 is NOT used in CarbohydrateContent.tsx (H1 must only be the canonical CalculatorLayout H1)
if (contentCode.includes("<h1")) {
  throw new Error("Found <h1 in CarbohydrateContent.tsx; must only use <h2 to maintain single H1 hierarchy");
}

// Verify all internal links are present
const expectedLinks = [
  "/calculators/tdee-calculator",
  "/calculators/calorie-calculator",
  "/calculators/macro-calculator",
  "/calculators/protein-calculator",
  "/calculators/fat-intake-calculator",
  "/calculators/bmr-calculator",
  "/calculators/body-fat-calculator",
];

for (const link of expectedLinks) {
  if (!contentCode.includes(`href="${link}"`)) {
    throw new Error(`Missing required internal link: ${link}`);
  }
}
console.log("   ✓ Design & Structure PASS: No dark cards, no duplicate H1, all contextual internal links present.");

console.log("\n==================================================");
console.log("ALL SEO, DOM & CONTENT SPECIFICATIONS VERIFIED!");
console.log("==================================================");
