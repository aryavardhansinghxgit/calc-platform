import fs from "fs";

const content = fs.readFileSync("src/components/calculator/mass/MassContent.tsx", "utf8");
const lines = content.split("\n");
console.log("Lines with 'Weight Calculator':");
lines.forEach((l, i) => {
  if (l.includes("Weight Calculator")) {
    console.log(`  Line ${i + 1}: ${l.trim()}`);
  }
});

console.log("\nAll h2 headings in MassContent.tsx:");
const h2s = content.match(/<h2[^>]*>(.*?)<\/h2>/gs) || [];
h2s.forEach((h, i) => {
  console.log(`  ${i + 1}. ${h.replace(/<[^>]+>/g, "").trim()}`);
});
