import { PasswordGeneratorOutputs } from "./types";

// ==========================================
// 1. Cryptographically Secure RNG Helper (CSPRNG)
// ==========================================
function secureRandomUint32(): number {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0];
  } else {
    // Dynamic node fallback for server/CLI environments
    try {
      const cryptoNode = require("crypto");
      return cryptoNode.randomBytes(4).readUInt32BE(0);
    } catch (e) {
      throw new Error("Cryptographically secure random number generator (CSPRNG) is unavailable in this environment.");
    }
  }
}

// Unbiased character selection using rejection sampling
// Eliminates modulo bias across any pool size N
export function getRandomIndex(poolSize: number): number {
  if (poolSize <= 1) return 0;
  // Largest multiple of poolSize <= 2^32 (0x100000000)
  const maxLimit = Math.floor(0x100000000 / poolSize) * poolSize;
  while (true) {
    const val = secureRandomUint32();
    if (val < maxLimit) {
      return val % poolSize;
    }
  }
}

// Safe formatting for large search spaces to avoid Infinity / NaN
export function formatSearchSpaceFromLog10(log10Value: number): string {
  if (!isFinite(log10Value) || isNaN(log10Value) || log10Value <= 0) {
    return "0";
  }
  if (log10Value < 12) {
    const val = Math.round(Math.pow(10, log10Value));
    return val.toLocaleString();
  }
  const exp = Math.floor(log10Value);
  const mantissa = Math.pow(10, log10Value - exp);
  return `~${mantissa.toFixed(2)}e+${exp}`;
}

// Curated Word List for passphrases (exactly 96 clean nouns and adjectives)
// 96^4 = 84,934,656 combinations; 4 * log2(96) ≈ 26.3 bits entropy
export const WORD_LIST: string[] = [
  "river", "mountain", "sky", "forest", "ocean", "wind", "sun", "moon", "gold", "silver",
  "copper", "iron", "stone", "wood", "fire", "water", "cloud", "rain", "snow", "leaf",
  "flower", "tree", "bird", "fish", "wolf", "bear", "deer", "fox", "eagle", "hawk",
  "lion", "tiger", "cat", "dog", "horse", "sheep", "cow", "goat", "path", "road",
  "bridge", "gate", "door", "window", "house", "roof", "wall", "key", "lock", "book",
  "pen", "lamp", "table", "chair", "bed", "cup", "plate", "fork", "spoon", "knife",
  "bread", "fruit", "apple", "berry", "sweet", "bitter", "cold", "hot", "warm", "cool",
  "bright", "dark", "light", "heavy", "fast", "slow", "high", "low", "deep", "shallow",
  "wide", "narrow", "long", "short", "young", "old", "new", "fresh",
  "clear", "blue", "red", "green", "yellow", "white", "black", "gray"
];

// Deduplicate string characters while maintaining order
function deduplicate(str: string): string {
  const seen = new Set<string>();
  let result = "";
  for (const c of str) {
    if (!seen.has(c)) {
      seen.add(c);
      result += c;
    }
  }
  return result;
}

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
  // Length validation: do not silently clamp invalid lengths
  if (inputs.length === undefined || inputs.length === null || inputs.length === "") {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Password length is required." };
  }

  const rawLen = Number(inputs.length);
  if (isNaN(rawLen) || !Number.isInteger(rawLen)) {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Password length must be a valid whole number." };
  }
  if (rawLen <= 0) {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Password length must be greater than 0." };
  }
  if (rawLen > 128) {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Password length cannot exceed 128 characters." };
  }

  const len = rawLen;
  const incLower = inputs.includeLowercase !== undefined ? !!inputs.includeLowercase : true;
  const incUpper = inputs.includeUppercase !== undefined ? !!inputs.includeUppercase : true;
  const incNumbers = inputs.includeNumbers !== undefined ? !!inputs.includeNumbers : true;
  const incSymbols = inputs.includeSymbols !== undefined ? !!inputs.includeSymbols : true;

  const customSymbols = inputs.customSymbols !== undefined ? String(inputs.customSymbols) : "!@#$%^&*()_+-=[]{};:,.<>?";
  const excludeAmbiguous = !!inputs.excludeAmbiguous;
  const excludeBrackets = !!inputs.excludeBrackets;
  const customExclusions = inputs.customExclusions ? String(inputs.customExclusions) : "";
  const noRepeat = !!inputs.noRepeat;
  const requireAll = !!inputs.requireAllCategories;

  // Build character pools
  let lowerPool = "abcdefghijklmnopqrstuvwxyz";
  let upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numPool = "0123456789";
  let symPool = customSymbols;

  // Filter pools based on exclusions
  const filterExclusions = (str: string) => {
    let res = str;
    if (excludeAmbiguous) {
      // Exclude visually ambiguous characters: i, l, 1, L, o, 0, O, I
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
    return deduplicate(res);
  };

  lowerPool = filterExclusions(lowerPool);
  upperPool = filterExclusions(upperPool);
  numPool = filterExclusions(numPool);
  symPool = filterExclusions(symPool);

  // Check if any selected category was emptied by exclusions
  const selectedCategories: { name: string; pool: string }[] = [];
  if (incLower) {
    if (lowerPool.length === 0) {
      return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: 'Selected category "Lowercase" has no available characters after exclusions.' };
    }
    selectedCategories.push({ name: "Lowercase", pool: lowerPool });
  }
  if (incUpper) {
    if (upperPool.length === 0) {
      return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: 'Selected category "Uppercase" has no available characters after exclusions.' };
    }
    selectedCategories.push({ name: "Uppercase", pool: upperPool });
  }
  if (incNumbers) {
    if (numPool.length === 0) {
      return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: 'Selected category "Numbers" has no available characters after exclusions.' };
    }
    selectedCategories.push({ name: "Numbers", pool: numPool });
  }
  if (incSymbols) {
    if (symPool.length === 0) {
      return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: 'Selected category "Symbols" has no available characters after exclusions.' };
    }
    selectedCategories.push({ name: "Symbols", pool: symPool });
  }

  if (selectedCategories.length === 0) {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Please select at least one character category with available characters." };
  }

  // Combined pool
  const pool = deduplicate(selectedCategories.map(c => c.pool).join(""));
  const poolSize = pool.length;

  if (poolSize === 0) {
    return { poolSize: 0, entropyBits: 0, combinationsCountString: "0", strengthCategory: "Very Weak", error: "Effective character pool is empty after applying exclusions." };
  }

  // Constraint validation: No-repeat requires len <= poolSize
  if (noRepeat && len > poolSize) {
    return {
      poolSize,
      entropyBits: 0,
      combinationsCountString: "0",
      strengthCategory: "Very Weak",
      error: `Cannot generate unique password of length ${len} with a character pool size of only ${poolSize}.`
    };
  }

  // Constraint validation: Mandatory categories require len >= selectedCategories.length
  if (requireAll && len < selectedCategories.length) {
    return {
      poolSize,
      entropyBits: 0,
      combinationsCountString: "0",
      strengthCategory: "Very Weak",
      error: `Password length (${len}) must be at least ${selectedCategories.length} to require at least one character from each selected category.`
    };
  }

  // ==========================================
  // Entropy & Search Space Mathematics
  // ==========================================
  let entropy: number;
  let log10Combinations: number;

  if (noRepeat) {
    // Sampling without replacement:
    // Search space S = N * (N - 1) * ... * (N - L + 1) = N! / (N - L)!
    // Entropy H = log2(S) = sum_{i=0}^{L-1} log2(N - i)
    let sumLog2 = 0;
    let sumLog10 = 0;
    for (let i = 0; i < len; i++) {
      const remainingInPool = poolSize - i;
      sumLog2 += Math.log2(remainingInPool);
      sumLog10 += Math.log10(remainingInPool);
    }
    entropy = Math.round(sumLog2);
    log10Combinations = sumLog10;
  } else {
    // Sampling with replacement:
    // Theoretical search space S = N^L
    // Entropy H = L * log2(N)
    entropy = Math.round(len * Math.log2(poolSize));
    log10Combinations = len * Math.log10(poolSize);
  }

  const combStr = formatSearchSpaceFromLog10(log10Combinations);

  // Evaluate strength rating based on entropy bits
  let strength: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong" = "Very Weak";
  if (entropy >= 100) strength = "Very Strong";
  else if (entropy >= 80) strength = "Strong";
  else if (entropy >= 60) strength = "Fair";
  else if (entropy >= 40) strength = "Weak";

  // ==========================================
  // Cryptographically Secure Password Generation
  // ==========================================
  let pwd = "";

  if (noRepeat) {
    // Fisher-Yates partial shuffle of character pool
    const poolChars = pool.split("");
    
    if (requireAll) {
      // Pick 1 unique character from each category
      const chosenChars: string[] = [];
      const usedCharSet = new Set<string>();

      for (const cat of selectedCategories) {
        // Find available characters in this category not yet used
        const avail = cat.pool.split("").filter(c => !usedCharSet.has(c));
        const idx = getRandomIndex(avail.length);
        const char = avail[idx];
        chosenChars.push(char);
        usedCharSet.add(char);
      }

      // Fill remaining (len - selectedCategories.length) from remaining pool
      const remainingPool = poolChars.filter(c => !usedCharSet.has(c));
      for (let i = 0; i < len - selectedCategories.length; i++) {
        const j = i + getRandomIndex(remainingPool.length - i);
        const temp = remainingPool[i];
        remainingPool[i] = remainingPool[j];
        remainingPool[j] = temp;
        chosenChars.push(remainingPool[i]);
      }

      // Securely shuffle the chosen characters
      for (let i = chosenChars.length - 1; i > 0; i--) {
        const j = getRandomIndex(i + 1);
        const temp = chosenChars[i];
        chosenChars[i] = chosenChars[j];
        chosenChars[j] = temp;
      }
      pwd = chosenChars.join("");
    } else {
      // Standard Fisher-Yates partial shuffle
      for (let i = 0; i < len; i++) {
        const j = i + getRandomIndex(poolChars.length - i);
        const temp = poolChars[i];
        poolChars[i] = poolChars[j];
        poolChars[j] = temp;
      }
      pwd = poolChars.slice(0, len).join("");
    }
  } else {
    // Sampling with replacement
    if (requireAll) {
      // Rejection sampling loop to guarantee all selected categories are represented
      let attempts = 0;
      const maxAttempts = 5000;

      while (attempts < maxAttempts) {
        const chars: string[] = [];
        // First allocate 1 from each category to guarantee presence
        for (const cat of selectedCategories) {
          chars.push(cat.pool[getRandomIndex(cat.pool.length)]);
        }
        // Fill remaining
        for (let i = selectedCategories.length; i < len; i++) {
          chars.push(pool[getRandomIndex(poolSize)]);
        }
        // Securely shuffle
        for (let i = chars.length - 1; i > 0; i--) {
          const j = getRandomIndex(i + 1);
          const temp = chars[i];
          chars[i] = chars[j];
          chars[j] = temp;
        }
        pwd = chars.join("");

        // Verify all selected categories are present
        const allPresent = selectedCategories.every(cat => {
          const catSet = new Set(cat.pool.split(""));
          return pwd.split("").some(c => catSet.has(c));
        });
        if (allPresent) break;
        attempts++;
      }
    } else {
      // Standard independent uniform draws
      const chars: string[] = [];
      for (let i = 0; i < len; i++) {
        chars.push(pool[getRandomIndex(poolSize)]);
      }
      pwd = chars.join("");
    }
  }

  const steps = `Random Password Sizing Steps:\n` +
    `1. Length: ${len} characters\n` +
    `2. Character pool size: ${poolSize} possible characters\n` +
    `3. Mode: ${noRepeat ? "No repeated characters (without replacement)" : "With replacement"}\n` +
    `4. Entropy: ${entropy} bits\n` +
    `5. Search space: ${combStr} combinations`;

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
  const rawCount = inputs.wordCount !== undefined ? Number(inputs.wordCount) : 4;
  if (isNaN(rawCount) || !Number.isInteger(rawCount) || rawCount < 2 || rawCount > 16) {
    return {
      poolSize: WORD_LIST.length,
      entropyBits: 0,
      combinationsCountString: "0",
      strengthCategory: "Very Weak",
      error: "Passphrase word count must be between 2 and 16."
    };
  }

  const wordCount = rawCount;
  const sep = inputs.separator !== undefined ? String(inputs.separator) : "-";
  const capitalize = !!inputs.capitalize;
  const incNum = !!inputs.passphraseIncludeNumber;
  const incSym = !!inputs.passphraseIncludeSymbol;

  // Independent uniform selection from WORD_LIST
  const chosenWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const idx = getRandomIndex(WORD_LIST.length);
    let word = WORD_LIST[idx];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    chosenWords.push(word);
  }

  let phrase = chosenWords.join(sep);

  // Append optional random number / symbol
  const symbols = "!@#$%^&*";
  if (incNum) {
    phrase += sep + getRandomIndex(10).toString();
  }
  if (incSym) {
    phrase += sep + symbols[getRandomIndex(symbols.length)];
  }

  // Passphrase Entropy:
  // Base entropy = wordCount * log2(WORD_LIST.length)
  // Additional entropy if random number appended: + log2(10) ≈ +3.32 bits
  // Additional entropy if random symbol appended: + log2(8) = +3.00 bits
  let totalEntropyBits = wordCount * Math.log2(WORD_LIST.length);
  let totalLog10Combinations = wordCount * Math.log10(WORD_LIST.length);

  if (incNum) {
    totalEntropyBits += Math.log2(10);
    totalLog10Combinations += Math.log10(10);
  }
  if (incSym) {
    totalEntropyBits += Math.log2(symbols.length);
    totalLog10Combinations += Math.log10(symbols.length);
  }

  const entropy = Math.round(totalEntropyBits);
  const combStr = formatSearchSpaceFromLog10(totalLog10Combinations);

  let strength: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong" = "Very Weak";
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
    calculationSteps: `Passphrase Generation Steps:\n1. Words: ${wordCount} (Word-pool size = ${WORD_LIST.length})\n2. Phrase entropy: ${entropy} bits\n3. Combinations: ${combStr}`
  };
}

// ==========================================
// TAB 3: Secure PIN Generator
// ==========================================
function runPinGenerator(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const rawLen = inputs.pinLength !== undefined ? Number(inputs.pinLength) : 6;
  if (isNaN(rawLen) || !Number.isInteger(rawLen) || rawLen < 1 || rawLen > 32) {
    return {
      poolSize: 10,
      entropyBits: 0,
      combinationsCountString: "0",
      strengthCategory: "Very Weak",
      error: "PIN length must be a whole number between 1 and 32."
    };
  }

  const len = rawLen;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += getRandomIndex(10).toString();
  }

  // PIN Entropy = L * log2(10) (approx 3.32 bits per digit)
  const entropy = Math.round(len * Math.log2(10));
  const log10Combinations = len * Math.log10(10); // exactly len
  const combStr = formatSearchSpaceFromLog10(log10Combinations);

  let strength: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong" = "Very Weak";
  if (len >= 16) strength = "Very Strong";
  else if (len >= 12) strength = "Strong";
  else if (len >= 8) strength = "Fair";
  else if (len >= 6) strength = "Weak";

  return {
    generatedPassword: pwd,
    entropyBits: entropy,
    combinationsCountString: combStr,
    poolSize: 10,
    strengthCategory: strength,
    calculationSteps: `PIN Generation:\n- Digits: ${len}\n- Search space: 10^${len} = ${combStr} combinations\n- Entropy: ${entropy} bits`
  };
}

// ==========================================
// TAB 4: Strength Checker (Local Analyzer)
// ==========================================
function runStrengthChecker(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const pwd = inputs.checkPassword ? String(inputs.checkPassword) : "";
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

  const log10Combinations = len * Math.log10(pool || 1);
  const entropy = Math.round(len * Math.log2(pool || 1));
  const combStr = formatSearchSpaceFromLog10(log10Combinations);

  // Character group counts
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
  const commonPatterns = ["123456", "password", "qwerty", "asdfgh", "zxcvbn", "111111", "aaaaaa", "123123", "abcdef", "654321"];
  for (const pat of commonPatterns) {
    if (lowercasePwd.includes(pat)) {
      warnings.push(`Contains common sequence or pattern: "${pat}"`);
    }
  }

  // Obvious substitutions
  if (lowercasePwd.includes("p@ss")) warnings.push("Uses common character substitution (e.g. @ for a).");

  // Determine final strength rating: penalize short passwords and pattern warnings
  let score = 0;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (len >= 16) score++;
  if (pool >= 50) score++;
  if (pool >= 70) score++;
  if (warnings.length > 0) score = Math.max(0, score - warnings.length);

  let strength: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong" = "Very Weak";
  if (score >= 4 && len >= 12) strength = "Very Strong";
  else if (score === 3 && len >= 10) strength = "Strong";
  else if (score >= 2 && len >= 8) strength = "Fair";
  else if (score >= 1 && len >= 6) strength = "Weak";

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
    calculationSteps: `Local Password Analysis:\n- Length: ${len} | Pool size: ${pool}\n- Estimated entropy: ~${entropy} bits\n- Detected warnings: ${warnings.length}`
  };
}
