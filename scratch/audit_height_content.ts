import fs from "fs";

const content = fs.readFileSync("src/components/calculator/height/HeightContent.tsx", "utf8");

// Background classes
const regex = /className=["']([^"']+)["']/g;
let match;
const bgs = new Set<string>();
while ((match = regex.exec(content)) !== null) {
  const classes = match[1].split(/\s+/);
  for (const c of classes) {
    if (c.includes("bg-")) bgs.add(c);
  }
}
console.log("Background classes found:", Array.from(bgs));

// Headings
const h2s = content.match(/<h2[^>]*>(.*?)<\/h2>/gs) || [];
console.log("Total h2s:", h2s.length);
h2s.forEach((h, i) => console.log(`  ${i + 1}. ${h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').trim()}`));

const h2Tags = content.match(/<h2[^>]*>/g) || [];
console.log("Unique h2 tags:", Array.from(new Set(h2Tags)));

// Related blocks
const relCount = (content.match(/RELATED CALCULATORS:/g) || []).length;
console.log("RELATED CALCULATORS block count:", relCount);

// Links
const convLinks = (content.match(/\/calculators\/conversion-calculator/g) || []).length;
const weightLinks = (content.match(/\/calculators\/weight-calculator/g) || []).length;
console.log("Conversion calculator links:", convLinks);
console.log("Weight calculator links:", weightLinks);

