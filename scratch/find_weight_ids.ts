import fs from "fs";

const content = fs.readFileSync("src/components/calculator/mass/MassCalculator.tsx", "utf8");
const lines = content.split("\n");
lines.forEach((l, i) => {
  if (l.includes("weight-")) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});
