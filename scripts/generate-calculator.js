/**
 * Developer Experience CLI Generator Script.
 * Usage: npm run generate:calculator -- --slug="auto-loan" --category="Finance" --title="Auto Loan Calculator"
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

function getArg(name, defaultValue) {
  const match = args.find((arg) => arg.startsWith(`--${name}=`));
  return match ? match.split("=")[1].replace(/["']/g, "") : defaultValue;
}

const slug = getArg("slug", "example-calculator");
const category = getArg("category", "Finance");
const title = getArg("title", "Example Calculator");
const id = slug.replace(/-calculator$/, "").replace(/-/g, "_");

const targetDir = path.join(__dirname, "..", "src", "modules", slug);

if (fs.existsSync(targetDir)) {
  console.error(`Error: Module folder already exists at ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

// 1. types.ts
const typesContent = `export interface ${title.replace(/\s+/g, "")}Input {
  amount: number;
}

export interface ${title.replace(/\s+/g, "")}Output {
  result: number;
}
`;

// 2. formula.ts
const formulaContent = `import { ${title.replace(/\s+/g, "")}Input, ${title.replace(/\s+/g, "")}Output } from "./types";

export function calculate${title.replace(/\s+/g, "")}(inputs: ${title.replace(/\s+/g, "")}Input): ${title.replace(/\s+/g, "")}Output {
  return {
    result: inputs.amount || 0,
  };
}
`;

// 3. config.ts
const configContent = `import { CalculatorPlugin } from "@/lib/calculator-engine/plugin";
import { calculate${title.replace(/\s+/g, "")} } from "./formula";

export const ${title.replace(/\s+/g, "")}Plugin: CalculatorPlugin = {
  metadata: {
    id: "${id}",
    title: "${title}",
    slug: "${slug}",
    category: "${category}",
    description: "${title} description.",
  },
  inputs: [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      defaultValue: 100,
    },
  ],
  outputs: [
    {
      name: "result",
      label: "Result",
      format: "number",
      highlight: true,
    },
  ],
  formula: (inputs) => calculate${title.replace(/\s+/g, "")}(inputs as any),
};

export default ${title.replace(/\s+/g, "")}Plugin;
`;

fs.writeFileSync(path.join(targetDir, "types.ts"), typesContent);
fs.writeFileSync(path.join(targetDir, "formula.ts"), formulaContent);
fs.writeFileSync(path.join(targetDir, "config.ts"), configContent);

console.log(`Successfully generated new calculator module at src/modules/${slug}/!`);
