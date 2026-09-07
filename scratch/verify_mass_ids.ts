import fs from "fs";

const content = fs.readFileSync("src/components/calculator/mass/MassCalculator.tsx", "utf8");

// Find all id="..."
const idRegex = /id=["']([^"']+)["']/g;
let match;
const ids: string[] = [];
while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

// Find all htmlFor="..."
const forRegex = /htmlFor=["']([^"']+)["']/g;
const htmlFors: string[] = [];
while ((match = forRegex.exec(content)) !== null) {
  htmlFors.push(match[1]);
}

console.log("All element IDs found in MassCalculator.tsx:");
console.log(ids);

console.log("\nAll label htmlFor references:");
console.log(htmlFors);

// Check that every htmlFor matches an existing ID
let allForsMatch = true;
htmlFors.forEach((hf) => {
  if (!ids.includes(hf)) {
    console.error(`ERROR: htmlFor "${hf}" does not match any ID!`);
    allForsMatch = false;
  }
});

// Check for duplicate IDs
const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log("\nDuplicate IDs:", duplicates);

console.log(`\nAll htmlFor match an existing ID: ${allForsMatch}`);
console.log(`No duplicate IDs: ${duplicates.length === 0}`);
