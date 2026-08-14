import { PERIODIC_TABLE_ELEMENTS, ORGANIC_GROUP_ABBREVIATIONS } from "./periodic-table";

/**
 * Smart Auto-Casing Intelligence
 * Converts 'c6h12o6' => 'C6H12O6', 'nacl' => 'NaCl', 'h2so4' => 'H2SO4'
 */
export function autoCorrectFormulaCase(input: string): string {
  if (!input || typeof input !== "string") return "";
  let text = input.trim();

  // Replace organic group shorthands first
  for (const [abbr, expansion] of Object.entries(ORGANIC_GROUP_ABBREVIATIONS)) {
    const reg = new RegExp(`\\b${abbr}\\b`, "g");
    text = text.replace(reg, `(${expansion})`);
  }

  // If already contains uppercase letters, return normalized
  if (/[A-Z]/.test(text)) {
    return text;
  }

  // Match 2-letter element symbols first (e.g., 'cl', 'na', 'fe', 'cu', 'mg', 'ca')
  // Sort element symbols by length descending (2 chars first, then 1 char)
  const twoLetterSymbols = Object.keys(PERIODIC_TABLE_ELEMENTS)
    .filter((s) => s.length === 2)
    .map((s) => s.toLowerCase());

  let result = "";
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    // Numbers, brackets, dots pass through
    if (/\d|[\(\)\[\]\{\}\*\.\·\+]/.test(char)) {
      result += char;
      i++;
      continue;
    }

    // Check if next 2 characters match a 2-letter element symbol (e.g., 'cl')
    if (i + 1 < text.length) {
      const pair = text.substring(i, i + 2).toLowerCase();
      if (twoLetterSymbols.includes(pair)) {
        // Find exact element symbol with proper casing
        const match = Object.keys(PERIODIC_TABLE_ELEMENTS).find((s) => s.toLowerCase() === pair);
        if (match) {
          result += match;
          i += 2;
          continue;
        }
      }
    }

    // Otherwise upper-case single letter
    result += char.toUpperCase();
    i++;
  }

  return result;
}

/**
 * Recursive Chemical Formula Parser
 * Returns a map of Element Symbol -> Total Atom Count
 */
export function parseChemicalFormula(rawInput: string): {
  elementCounts: Record<string, number>;
  error?: string;
} {
  try {
    const corrected = autoCorrectFormulaCase(rawInput);
    if (!corrected) {
      return { elementCounts: {}, error: "Empty chemical formula." };
    }

    // Split Hydrates (e.g. CuSO4*5H2O, KAl(SO4)2.12H2O)
    // Separators: '*', '·', or '.' followed by a number or H2O
    const hydrateParts = corrected.split(/[\*\·]|(?<=\w)\.(?=\d|\(?H2O\)?)/i);

    const totalCounts: Record<string, number> = {};

    for (let partIndex = 0; partIndex < hydrateParts.length; partIndex++) {
      let part = hydrateParts[partIndex].trim();
      if (!part) continue;

      let multiplier = 1;

      // Check if part starts with a hydrate multiplier (e.g. '5H2O' or '12H2O')
      if (partIndex > 0) {
        const matchMult = part.match(/^(\d+)(.*)/);
        if (matchMult) {
          multiplier = parseInt(matchMult[1], 10);
          part = matchMult[2].trim();
        }
      }

      // Replace brackets with standard parentheses
      const normalizedPart = part.replace(/\[|\{/g, "(").replace(/\]|\}/g, ")");

      // Parse nested parentheses recursively
      const subCounts = parseFormulaExpression(normalizedPart);

      // Add to total
      for (const [sym, count] of Object.entries(subCounts)) {
        totalCounts[sym] = (totalCounts[sym] || 0) + count * multiplier;
      }
    }

    // Verify all symbols exist in periodic table
    for (const sym of Object.keys(totalCounts)) {
      if (!PERIODIC_TABLE_ELEMENTS[sym]) {
        return {
          elementCounts: {},
          error: `Unknown element symbol '${sym}' in chemical formula.`,
        };
      }
    }

    return { elementCounts: totalCounts };
  } catch (err: any) {
    return { elementCounts: {}, error: err.message || "Invalid chemical formula syntax." };
  }
}

/**
 * Helper to recursively parse a single formula expression with parentheses
 */
function parseFormulaExpression(expr: string): Record<string, number> {
  const counts: Record<string, number> = {};
  let i = 0;

  function parseGroup(): Record<string, number> {
    const groupCounts: Record<string, number> = {};

    while (i < expr.length) {
      const char = expr[i];

      if (char === "(") {
        i++;
        const inner = parseGroup();
        // Check for subscript number after closing parenthesis ')'
        let mult = 1;
        const numMatch = expr.substring(i).match(/^(\d+)/);
        if (numMatch) {
          mult = parseInt(numMatch[1], 10);
          i += numMatch[1].length;
        }
        for (const [s, c] of Object.entries(inner)) {
          groupCounts[s] = (groupCounts[s] || 0) + c * mult;
        }
      } else if (char === ")") {
        i++;
        return groupCounts;
      } else if (/[A-Z]/.test(char)) {
        // Element symbol match (1 or 2 chars, e.g., 'C', 'Fe', 'Na', 'Cl')
        let sym = char;
        if (i + 1 < expr.length && /[a-z]/.test(expr[i + 1])) {
          sym += expr[i + 1];
          i += 2;
        } else {
          i++;
        }

        // Subscript number after element symbol
        let count = 1;
        const numMatch = expr.substring(i).match(/^(\d+)/);
        if (numMatch) {
          count = parseInt(numMatch[1], 10);
          i += numMatch[1].length;
        }

        groupCounts[sym] = (groupCounts[sym] || 0) + count;
      } else {
        // Ignore unrecognized characters or move ahead
        i++;
      }
    }

    return groupCounts;
  }

  return parseGroup();
}
