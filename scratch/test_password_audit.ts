import { calculatePasswordGenerator } from "../src/app/calculators/password-generator/calculator";

console.log("=== RUNNING PRELIMINARY PASSWORD CALCULATOR AUDIT ===");

// Test 1: Default 16 char
const r1 = calculatePasswordGenerator({ activeTab: "random", length: 16 });
console.log("Default 16:", {
  pwd: r1.generatedPassword,
  len: r1.generatedPassword?.length,
  entropy: r1.entropyBits,
  space: r1.combinationsCountString,
  pool: r1.poolSize,
  strength: r1.strengthCategory
});

// Test 2: Lowercase only length 12
const r2 = calculatePasswordGenerator({
  activeTab: "random",
  length: 12,
  includeLowercase: true,
  includeUppercase: false,
  includeNumbers: false,
  includeSymbols: false
});
console.log("Lowercase 12:", {
  pwd: r2.generatedPassword,
  len: r2.generatedPassword?.length,
  entropy: r2.entropyBits,
  space: r2.combinationsCountString,
  pool: r2.poolSize
});

// Test 3: PIN 6 digits
const r3 = calculatePasswordGenerator({ activeTab: "pin", pinLength: 6 });
console.log("PIN 6:", {
  pwd: r3.generatedPassword,
  len: r3.generatedPassword?.length,
  entropy: r3.entropyBits,
  space: r3.combinationsCountString
});

// Test 4: Passphrase 4 words
const r4 = calculatePasswordGenerator({ activeTab: "passphrase", wordCount: 4, separator: "-" });
console.log("Passphrase 4:", {
  pwd: r4.generatedPassword,
  entropy: r4.entropyBits,
  space: r4.combinationsCountString
});
