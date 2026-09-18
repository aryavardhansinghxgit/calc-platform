import fs from "fs";
import path from "path";

// Generator for authentic 1-to-1 localized resources for Finance Batch 1
console.log("Starting authentic generator for Finance Batch 1...");

// Helper to write files
function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

export { writeFile };
