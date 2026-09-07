import fs from "fs";

let content = fs.readFileSync("src/components/calculator/height/HeightContent.tsx", "utf8");
content = content.replaceAll("text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400", "text-xl font-bold text-blue-600 dark:text-blue-400");
fs.writeFileSync("src/components/calculator/height/HeightContent.tsx", content, "utf8");
console.log("Successfully normalized h2 headings.");
