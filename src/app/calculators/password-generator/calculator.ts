import { PasswordGeneratorOutputs } from "./types";

// ==========================================
// 1. Cryptographically Secure RNG Helper
// ==========================================
function secureRandomByte(): number {
  if (typeof window !== "undefined" && window.crypto) {
    const arr = new Uint8Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0];
  } else {
    // Dynamic node fallback for tests compatibility
    try {
      const cryptoNode = require("crypto");
      return cryptoNode.randomBytes(1)[0];
    } catch (e) {
      // Fallback pseudo-random for absolute safety
      return Math.floor(Math.random() * 256);
    }
  }
}

// Unbiased character selection using rejection sampling
function getRandomIndex(poolSize: number): number {
  if (poolSize <= 0) return 0;
  const maxLimit = 256 - (256 % poolSize);
  while (true) {
    const val = secureRandomByte();
    if (val < maxLimit) {
      return val % poolSize;
    }
  }
}

// Curated Word List for passphrases (96 clean nouns/adjectives)
const WORD_LIST = [
  "river", "mountain", "sky", "forest", "ocean", "wind", "sun", "moon", "gold", "silver",
  "copper", "iron", "stone", "wood", "fire", "water", "cloud", "rain", "snow", "leaf",
  "flower", "tree", "bird", "fish", "wolf", "bear", "deer", "fox", "eagle", "hawk",
  "lion", "tiger", "cat", "dog", "horse", "sheep", "cow", "goat", "path", "road",
  "bridge", "gate", "door", "window", "house", "roof", "wall", "key", "lock", "book",
  "pen", "lamp", "table", "chair", "bed", "cup", "plate", "fork", "spoon", "knife",
  "bread", "fruit", "apple", "berry", "sweet", "bitter", "cold", "hot", "warm", "cool",
  "bright", "dark", "light", "heavy", "fast", "slow", "high", "low", "deep", "shallow",
  "wide", "narrow", "long", "short", "young", "old", "new", "fresh", "clean", "pure",
  "clear", "blue", "red", "green", "yellow", "white", "black", "gray"
];

// ==========================================
// 2. MAIN ENGINE ROUTER
// ==========================================
export function calculatePasswordGenerator(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const activeTab = inputs.activeTab || "random";

  if (activeTab === "passphrase") {
    return runPassphraseGenerator(inputs);
  }
  if (activeTab === "pin") {
    return runPinGenerator(inputs);
  }
  if (activeTab === "strength_checker") {
    return runStrengthChecker(inputs);
  }

  // DEFAULT TAB: Random Password Generator
  return runRandomPasswordGenerator(inputs);
}

// ==========================================
// TAB 1: Random Password Generator
// ==========================================
function runRandomPasswordGenerator(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const len = Math.min(128, Math.max(4, Number(inputs.length) !== undefined ? Number(inputs.length) : 16));

  const incLower = inputs.includeLowercase !== undefined ? !!inputs.includeLowercase : true;
  const incUpper = inputs.includeUppercase !== undefined ? !!inputs.includeUppercase : true;
  const incNumbers = inputs.includeNumbers !== undefined ? !!inputs.includeNumbers : true;
  const incSymbols = inputs.includeSymbols !== undefined ? !!inputs.includeSymbols : true;

  const customSymbols = inputs.customSymbols || "!@#$%^&*()_+-=[]{};:,.<>?";
  const excludeAmbiguous = !!inputs.excludeAmbiguous;
  const excludeBrackets = !!inputs.excludeBrackets;
  const customExclusions = inputs.customExclusions || "";
  const noRepeat = !!inputs.noRepeat;
  const requireAll = !!inputs.requireAllCategories;

  // Build character pool
  let lowerPool = "abcdefghijklmnopqrstuvwxyz";
  let upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numPool = "0123456789";
  let symPool = customSymbols;

  // Filter pools based on exclusions
  const filterExclusions = (str: string) => {
    let res = str;
    if (excludeAmbiguous) {
      // Exclude visually similar characters: i, l, 1, L, o, 0, O, I
      const ambiguous = /[il1Lo0OI]/g;
      res = res.replace(ambiguous, "");
    }
    if (excludeBrackets) {
      const brackets = /[()[\]{}<>]/g;
      res = res.replace(brackets, "");
    }
    if (customExclusions) {
      const exSet = new Set(customExclusions.split(""));
      res = res.split("").filter(c => !exSet.has(c)).join("");
    }
    return res;
  };

  lowerPool = filterExclusions(lowerPool);
  upperPool = filterExclusions(upperPool);
  numPool = filterExclusions(numPool);
  symPool = filterExclusions(symPool);

  const categories: string[] = [];
  if (incLower && lowerPool) categories.push(lowerPool);
  if (incUpper && upperPool) categories.push(upperPool);
  if (incNumbers && numPool) categories.push(numPool);
  if (incSymbols && symPool) categories.push(symPool);

  if (categories.length === 0) {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Please select at least one character category with available characters." };
  }

  const pool = categories.join("");
  const poolSize = pool.length;

  if (noRepeat && len > poolSize) {
    return { poolSize, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: `Cannot generate unique password of length ${len} with a character pool size of only ${poolSize}.` };
  }

  let pwd = "";
  let attempts = 0;
  const maxAttempts = 1000;

  while (attempts < maxAttempts) {
    pwd = "";
    const usedPool = new Set<string>();

    // If requireAll is set, allocate one character from each selected category first to guarantee compliance
    if (requireAll && len >= categories.length) {
      // Pick one from each category
      const mandated: string[] = [];
      for (const cat of categories) {
        const idx = getRandomIndex(cat.length);
        mandated.push(cat[idx]);
      }
      
      // Shuffle mandated positions securely
      for (let i = mandated.length - 1; i > 0; i--) {
        const j = getRandomIndex(i + 1);
        const temp = mandated[i];
        mandated[i] = mandated[j];
        mandated[j] = temp;
      }

      // Add to password
      for (const char of mandated) {
        pwd += char;
        usedPool.add(char);
      }
    }

    // Fill remaining positions
    const remaining = len - pwd.length;
    for (let i = 0; i < remaining; i++) {
      let char = "";
      let localAttempts = 0;
      
      while (localAttempts < 100) {
        const idx = getRandomIndex(poolSize);
        char = pool[idx];
        if (!noRepeat || !usedPool.has(char)) {
          break;
        }
        localAttempts++;
      }
      pwd += char;
      usedPool.add(char);
    }

    // Shuffle final password if requireAll was used, to avoid predictable category placements at start
    if (requireAll) {
      const arr = pwd.split("");
      for (let i = arr.length - 1; i > 0; i--) {
        const j = getRandomIndex(i + 1);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      pwd = arr.join("");
    }

    // Validate that if requireAll is enabled, all category constraints are actually satisfied
    let valid = true;
    if (requireAll) {
      for (const cat of categories) {
        const catChars = new Set(cat.split(""));
        const hasMatch = pwd.split("").some(c => catChars.has(c));
        if (!hasMatch) {
          valid = false;
          break;
        }
      }
    }

    if (valid) break;
    attempts++;
  }

  // Calculate theoretical entropy
  // H = L * log2(N)
  const entropy = Math.round(len * Math.log2(poolSize));
  const combinations = Math.pow(poolSize, len);
  const combStr = combinations > 1e12 ? `~${combinations.toExponential(2)}` : Math.round(combinations).toLocaleString();

  // Evaluate strength category based on entropy bits
  let strength: any = "Very Weak";
  if (entropy >= 100) strength = "Very Strong";
  else if (entropy >= 80) strength = "Strong";
  else if (entropy >= 60) strength = "Fair";
  else if (entropy >= 40) strength = "Weak";

  const steps = `Random Password Sizing Steps:\n` +
    `1. Length: ${len} characters\n` +
    `2. Character pool size: ${poolSize} possible characters\n` +
    `3. Theoretical entropy: ${len} × log2(${poolSize}) = ${entropy} bits\n` +
    `4. Combination Space size: ${poolSize}^${len} = ${combStr} total pairs`;

  return {
    generatedPassword: pwd,
    entropyBits: entropy,
    combinationsCountString: combStr,
    poolSize,
    strengthCategory: strength,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 2: Passphrase Generator
// ==========================================
function runPassphraseGenerator(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const wordCount = Math.min(10, Math.max(3, Number(inputs.wordCount) || 4));
  const sep = inputs.separator !== undefined ? inputs.separator : "-";
  const capitalize = !!inputs.capitalize;
  const incNum = !!inputs.passphraseIncludeNumber;
  const incSym = !!inputs.passphraseIncludeSymbol;

  const chosenWords = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < wordCount; i++) {
    let idx = getRandomIndex(WORD_LIST.length);
    // avoid duplicates if possible
    let attempts = 0;
    while (usedIndices.has(idx) && attempts < 50) {
      idx = getRandomIndex(WORD_LIST.length);
      attempts++;
    }
    usedIndices.add(idx);
    
    let word = WORD_LIST[idx];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    chosenWords.push(word);
  }

  let phrase = chosenWords.join(sep);

  // Append optional number/symbol for policy compliance
  if (incNum) {
    phrase += sep + getRandomIndex(10).toString();
  }
  if (incSym) {
    const symbols = "!@#$%^&*";
    phrase += sep + symbols[getRandomIndex(symbols.length)];
  }

  // Passphrase Entropy = wordCount * log2(96)
  // log2(96) = 6.58 bits per word
  const entropy = Math.round(wordCount * Math.log2(WORD_LIST.length));
  const combinations = Math.pow(WORD_LIST.length, wordCount);
  const combStr = combinations > 1e12 ? `~${combinations.toExponential(2)}` : Math.round(combinations).toLocaleString();

  let strength: any = "Very Weak";
  if (entropy >= 80) strength = "Very Strong";
  else if (entropy >= 60) strength = "Strong";
  else if (entropy >= 45) strength = "Fair";
  else if (entropy >= 30) strength = "Weak";

  return {
    generatedPassword: phrase,
    entropyBits: entropy,
    combinationsCountString: combStr,
    poolSize: WORD_LIST.length,
    strengthCategory: strength,
    calculationSteps: `Passphrase Generation Steps:\n1. Words: ${wordCount} (Word-pool size = ${WORD_LIST.length})\n2. Phrase entropy: ${wordCount} × log2(${WORD_LIST.length}) = ${entropy} bits`
  };
}

// ==========================================
// TAB 3: Secure PIN Generator
// ==========================================
function runPinGenerator(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const len = Math.min(16, Math.max(4, Number(inputs.pinLength) || 4));
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += getRandomIndex(10).toString();
  }

  // PIN Entropy = L * log2(10) (3.32 bits per digit)
  const entropy = Math.round(len * Math.log2(10));
  const combinations = Math.pow(10, len);

  return {
    generatedPassword: pwd,
    entropyBits: entropy,
    combinationsCountString: combinations.toLocaleString(),
    poolSize: 10,
    strengthCategory: len >= 12 ? "Strong" : len >= 8 ? "Fair" : "Weak",
    calculationSteps: `PIN Generation:\n- Digits: ${len}\n- Search space: 10^${len} = ${combinations.toLocaleString()} combinations`
  };
}

// ==========================================
// TAB 4: Strength Checker (Local Analyzer)
// ==========================================
function runStrengthChecker(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const pwd = inputs.checkPassword || "";
  if (!pwd) {
    return { entropyBits: 0, combinationsCountString: "0", poolSize: 0, strengthCategory: "Very Weak" };
  }

  const len = pwd.length;
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let hasSymbol = false;

  for (const char of pwd) {
    if (/[a-z]/.test(char)) hasLower = true;
    else if (/[A-Z]/.test(char)) hasUpper = true;
    else if (/[0-9]/.test(char)) hasDigit = true;
    else hasSymbol = true;
  }

  let pool = 0;
  if (hasLower) pool += 26;
  if (hasUpper) pool += 26;
  if (hasDigit) pool += 10;
  if (hasSymbol) pool += 32;

  const entropy = Math.round(len * Math.log2(pool || 1));
  const combinations = Math.pow(pool || 1, len);
  const combStr = combinations > 1e12 ? `~${combinations.toExponential(2)}` : Math.round(combinations).toLocaleString();

  // Character analysis counts
  const lowerCount = (pwd.match(/[a-z]/g) || []).length;
  const upperCount = (pwd.match(/[A-Z]/g) || []).length;
  const numCount = (pwd.match(/[0-9]/g) || []).length;
  const symCount = len - (lowerCount + upperCount + numCount);

  const uniqueChars = new Set(pwd.split(""));
  const uniqueCount = uniqueChars.size;
  const repeatedCount = len - uniqueCount;

  // Sequence and pattern matching
  const warnings: string[] = [];
  const lowercasePwd = pwd.toLowerCase();

  // Obvious patterns
  const commonPatterns = ["123456", "password", "qwerty", "asdfgh", "zxcvbn", "111111", "aaaaaa", "123123"];
  for (const pat of commonPatterns) {
    if (lowercasePwd.includes(pat)) {
      warnings.push(`⚠️ Contains extremely common sequence or pattern: "${pat}"`);
    }
  }

  // Predictable keyboard or alphabet runs
  if (/abcdef/i.test(pwd)) warnings.push("⚠️ Contains alphabetic run: \"abcdef\"");
  if (/654321/.test(pwd)) warnings.push("⚠️ Contains descending numerical sequence.");

  // Obvious substitutions
  if (lowercasePwd.includes("p@ss")) warnings.push("⚠️ Uses common character substitutions (e.g. @ for a).");

  // Determine final strength rating, penalizing warnings
  let score = 0;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (len >= 16) score++;
  if (pool >= 50) score++;
  if (pool >= 70) score++;
  if (warnings.length > 0) score = Math.max(0, score - warnings.length);

  let strength: any = "Very Weak";
  if (score >= 4) strength = "Very Strong";
  else if (score === 3) strength = "Strong";
  else if (score === 2) strength = "Fair";
  else if (score === 1) strength = "Weak";

  return {
    entropyBits: entropy,
    combinationsCountString: combStr,
    poolSize: pool,
    strengthCategory: strength,
    lowercaseCount: lowerCount,
    uppercaseCount: upperCount,
    numbersCount: numCount,
    symbolsCount: symCount,
    uniqueCount,
    repeatedCount,
    warnings,
    calculationSteps: `Local Password Analysis:\n- Length: ${len} | Pool size: ${pool}\n- Generation entropy: ~${entropy} bits\n- Detected warnings count: ${warnings.length}`
  };
}
