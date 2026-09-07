import fs from "fs";

const content = fs.readFileSync("src/components/calculator/mass/MassContent.tsx", "utf8");
const h3s = content.match(/<h3[^>]*>(.*?)<\/h3>/gs) || [];
console.log("h3 count:", h3s.length);
h3s.forEach((h, i) => console.log(`  h3 ${i + 1}: ${h.replace(/<[^>]+>/g, "").trim()}`));

const h4s = content.match(/<h4[^>]*>(.*?)<\/h4>/gs) || [];
console.log("h4 count:", h4s.length);
h4s.forEach((h, i) => console.log(`  h4 ${i + 1}: ${h.replace(/<[^>]+>/g, "").trim()}`));
