import { PERIODIC_TABLE_ELEMENTS, ORGANIC_GROUP_ABBREVIATIONS } from "../src/app/calculators/molecular-weight-calculator/periodic-table";

export function autoCorrectFormulaCaseNew(input: string): string {
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

  // Handle common lowercase gases / compounds priority
  // Specifically: co2 -> CO2, no2 -> NO2, so2 -> SO2, so3 -> SO3, so4 -> SO4, etc.
  text = text.replace(/\bco2\b/g, "CO2");
  text = text.replace(/\bco3\b/g, "CO3");
  text = text.replace(/\bh2o\b/g, "H2O");
  text = text.replace(/\bn2o\b/g, "N2O");
  text = text.replace(/\bno2\b/g, "NO2");
  text = text.replace(/\bso2\b/g, "SO2");
  text = text.replace(/\bso3\b/g, "SO3");
  text = text.replace(/\bso4\b/g, "SO4");
  text = text.replace(/\bch4\b/g, "CH4");
  text = text.replace(/\bnh3\b/g, "NH3");

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

    // Check if next 2 characters match a 2-letter element symbol (e.g., 'cl', 'na', 'fe')
    if (i + 1 < text.length) {
      const pair = text.substring(i, i + 2).toLowerCase();

      // Disambiguate 'co' followed by digit or nonmetal -> C + O
      if (pair === "co" && i + 2 < text.length && /\d|[a-z]/.test(text[i + 2])) {
        // e.g. co2 -> CO2, co(oh)2 -> CO(OH)2
        result += "CO";
        i += 2;
        continue;
      }

      if (twoLetterSymbols.includes(pair)) {
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

export function parseChemicalFormulaNew(rawInput: string): {
  elementCounts: Record<string, number>;
  error?: string;
} {
  try {
    if (!rawInput || typeof rawInput !== "string") {
      return { elementCounts: {}, error: "Empty chemical formula." };
    }
    const trimmed = rawInput.trim();
    if (!trimmed) {
      return { elementCounts: {}, error: "Empty chemical formula." };
    }

    // 1. Bracket Balance & Stack Validation
    const bracketStack: string[] = [];
    const openBrackets = ["(", "[", "{"];
    const closeBrackets = [")", "]", "}"];
    const bracketPairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };

    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];
      if (openBrackets.includes(char)) {
        // Check for immediate empty bracket, e.g. '()' or '[]'
        if (i + 1 < trimmed.length && closeBrackets.includes(trimmed[i + 1])) {
          return { elementCounts: {}, error: `Empty bracket group '${char}${trimmed[i + 1]}' is invalid.` };
        }
        bracketStack.push(char);
      } else if (closeBrackets.includes(char)) {
        if (bracketStack.length === 0) {
          return { elementCounts: {}, error: `Unmatched closing bracket '${char}' in formula.` };
        }
        const lastOpen = bracketStack.pop();
        if (lastOpen !== bracketPairs[char]) {
          return { elementCounts: {}, error: `Mismatched brackets '${lastOpen}' and '${char}' in formula.` };
        }
      }
    }

    if (bracketStack.length > 0) {
      return { elementCounts: {}, error: `Unclosed opening bracket '${bracketStack[bracketStack.length - 1]}' in formula.` };
    }

    // 2. Reject negative numbers or symbols like '-'
    if (trimmed.includes("-")) {
      return { elementCounts: {}, error: "Negative subscripts are not permitted." };
    }

    // 3. Autocorrect casing safely
    const corrected = autoCorrectFormulaCaseNew(trimmed);

    // 4. Split Hydrates (e.g. CuSO4*5H2O, CuSO4·5H2O, CuSO4.5H2O)
    // A dot '.' is only a hydrate separator if followed by a hydrate number and formula like 5H2O or H2O
    let mainPart = corrected;
    let hydratePart = "";

    // Match explicit hydrate separator: '*', '·', or '.' followed by optional digits and H2O
    const hydrateRegex = /[\*\·]|\.(?=\d*\(?H2O\)?)/i;
    const splitMatch = corrected.split(hydrateRegex);

    if (splitMatch.length > 2) {
      return { elementCounts: {}, error: "Multiple hydrate separators in chemical formula." };
    }

    mainPart = splitMatch[0].trim();
    if (splitMatch.length === 2) {
      hydratePart = splitMatch[1].trim();
      if (!hydratePart) {
        return { elementCounts: {}, error: "Empty hydrate specification after dot/star separator." };
      }
    }

    // If mainPart contains a dot (which was not a valid hydrate separator), it's an illegal decimal subscript
    if (mainPart.includes(".")) {
      return { elementCounts: {}, error: "Decimal or fractional subscripts (e.g. 2.5) are not permitted." };
    }

    // 5. Parse Main Compound
    const totalCounts: Record<string, number> = {};
    const normalizedMain = mainPart.replace(/\[|\{/g, "(").replace(/\]|\}/g, ")");
    const { counts: mainCounts, error: mainErr } = parseExpressionStrict(normalizedMain);

    if (mainErr) {
      return { elementCounts: {}, error: mainErr };
    }

    for (const [s, c] of Object.entries(mainCounts)) {
      totalCounts[s] = (totalCounts[s] || 0) + c;
    }

    // 6. Parse Hydrate Part if present
    if (hydratePart) {
      let multiplier = 1;
      let hydrateFormula = hydratePart;

      const matchMult = hydratePart.match(/^(\d+)(.*)/);
      if (matchMult) {
        multiplier = parseInt(matchMult[1], 10);
        if (multiplier <= 0) {
          return { elementCounts: {}, error: "Hydrate water count must be greater than zero." };
        }
        hydrateFormula = matchMult[2].trim();
      }

      if (!hydrateFormula) {
        return { elementCounts: {}, error: "Missing chemical formula after hydrate multiplier." };
      }

      const normalizedHydrate = hydrateFormula.replace(/\[|\{/g, "(").replace(/\]|\}/g, ")");
      const { counts: hydCounts, error: hydErr } = parseExpressionStrict(normalizedHydrate);
      if (hydErr) {
        return { elementCounts: {}, error: hydErr };
      }

      for (const [s, c] of Object.entries(hydCounts)) {
        totalCounts[s] = (totalCounts[s] || 0) + c * multiplier;
      }
    }

    // 7. Verify all symbols exist in periodic table
    for (const sym of Object.keys(totalCounts)) {
      if (!PERIODIC_TABLE_ELEMENTS[sym]) {
        return {
          elementCounts: {},
          error: `Unknown element symbol '${sym}' in chemical formula.`,
        };
      }
    }

    if (Object.keys(totalCounts).length === 0) {
      return { elementCounts: {}, error: "No elements found in formula." };
    }

    return { elementCounts: totalCounts };
  } catch (err: any) {
    return { elementCounts: {}, error: err.message || "Invalid chemical formula syntax." };
  }
}

function parseExpressionStrict(expr: string): { counts: Record<string, number>; error?: string } {
  const counts: Record<string, number> = {};
  let i = 0;

  function parseGroup(): { groupCounts: Record<string, number>; error?: string } {
    const groupCounts: Record<string, number> = {};

    while (i < expr.length) {
      const char = expr[i];

      if (char === "(") {
        i++;
        const inner = parseGroup();
        if (inner.error) return { groupCounts: {}, error: inner.error };

        // Subscript after closing parenthesis
        let mult = 1;
        if (i < expr.length && /\d/.test(expr[i])) {
          const numMatch = expr.substring(i).match(/^(\d+)/);
          if (numMatch) {
            mult = parseInt(numMatch[1], 10);
            if (mult <= 0) {
              return { groupCounts: {}, error: "Subscripts must be positive integers greater than zero." };
            }
            i += numMatch[1].length;
          }
        }

        for (const [s, c] of Object.entries(inner.groupCounts)) {
          groupCounts[s] = (groupCounts[s] || 0) + c * mult;
        }
      } else if (char === ")") {
        i++;
        return { groupCounts };
      } else if (/[A-Z]/.test(char)) {
        let sym = char;
        if (i + 1 < expr.length && /[a-z]/.test(expr[i + 1])) {
          sym += expr[i + 1];
          i += 2;
        } else {
          i++;
        }

        // Subscript after element
        let count = 1;
        if (i < expr.length && /\d/.test(expr[i])) {
          const numMatch = expr.substring(i).match(/^(\d+)/);
          if (numMatch) {
            count = parseInt(numMatch[1], 10);
            if (count <= 0) {
              return { groupCounts: {}, error: `Subscript for element '${sym}' must be greater than zero.` };
            }
            i += numMatch[1].length;
          }
        }

        if (!PERIODIC_TABLE_ELEMENTS[sym]) {
          return { groupCounts: {}, error: `Unknown element symbol '${sym}' in chemical formula.` };
        }

        groupCounts[sym] = (groupCounts[sym] || 0) + count;
      } else {
        // Unrecognized character
        return { groupCounts: {}, error: `Invalid character '${char}' in chemical formula.` };
      }
    }

    return { groupCounts };
  }

  const result = parseGroup();
  if (result.error) return { counts: {}, error: result.error };
  if (i < expr.length) {
    return { counts: {}, error: `Unexpected character '${expr[i]}' in formula.` };
  }

  return { counts: result.groupCounts };
}

// Test cases
console.log("--- Testing autoCorrectFormulaCaseNew ---");
console.log("co2 ->", autoCorrectFormulaCaseNew("co2"));
console.log("CO2 ->", autoCorrectFormulaCaseNew("CO2"));
console.log("Co ->", autoCorrectFormulaCaseNew("Co"));
console.log("c6h12o6 ->", autoCorrectFormulaCaseNew("c6h12o6"));

console.log("\n--- Testing Invalid Cases ---");
const invalidCases = [
  "H2O)",
  "(H2O",
  "C6H12O6)",
  "C6H12O6(",
  "C0H2",
  "H-2O",
  "ABC",
  "C6H12O6xyz",
  "C(OH",
  "Fe((SO4)3",
  "H2.5O",
  "C0",
  "H0",
  "C-1",
  "O-2",
  "Xx",
  "Q",
  "Zz",
  "()",
  "CuSO4..5H2O"
];

for (const c of invalidCases) {
  const res = parseChemicalFormulaNew(c);
  console.log(`Input: '${c}' -> Error: ${res.error ? "PASS (" + res.error + ")" : "FAIL (silently accepted: " + JSON.stringify(res.elementCounts) + ")"}`);
}

console.log("\n--- Testing Valid Cases ---");
const validCases = [
  "H2O",
  "CO2",
  "co2",
  "NaCl",
  "Ca(OH)2",
  "Al2(SO4)3",
  "(NH4)2SO4",
  "K4[Fe(CN)6]",
  "CuSO4*5H2O",
  "CuSO4·5H2O",
  "CuSO4.5H2O",
  "ThO2",
  "RaCl2"
];

for (const c of validCases) {
  const res = parseChemicalFormulaNew(c);
  console.log(`Input: '${c}' -> Result: ${res.error ? "FAIL (" + res.error + ")" : "PASS (" + JSON.stringify(res.elementCounts) + ")"}`);
}
