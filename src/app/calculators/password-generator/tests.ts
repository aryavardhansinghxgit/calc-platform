import { calculatePasswordGenerator } from "./calculator";

export function runPasswordGeneratorTests() {
  // Test Case 1: Default inputs
  const defaultInputs = {
    length: 16
  };
  const res1 = calculatePasswordGenerator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");
  if (!res1.generatedPassword || res1.generatedPassword.length !== 16) {
    throw new Error(`Default password length error: expected 16, got ${res1.generatedPassword?.length}`);
  }

  // Test Case 2: Zero or negative inputs boundaries
  const zeroInputs = {
    length: 0
  };
  const res2 = calculatePasswordGenerator(zeroInputs);
  // minimum length clamps to 4
  if (!res2.generatedPassword || res2.generatedPassword.length !== 4) {
    throw new Error(`Zero boundary failure: expected clamped length 4, got ${res2.generatedPassword?.length}`);
  }

  // Test Case 3: Exclude Ambiguous characters
  const res3 = calculatePasswordGenerator({
    length: 100, // high length to test probability
    excludeAmbiguous: true
  });
  const ambiguousPattern = /[il1Lo0OI]/;
  if (res3.generatedPassword && ambiguousPattern.test(res3.generatedPassword)) {
    throw new Error("Ambiguous character exclusion failed: found forbidden visual character.");
  }

  // Test Case 4: No Repeated Characters
  const res4 = calculatePasswordGenerator({
    length: 10,
    noRepeat: true,
    includeLowercase: true,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false
  });
  if (res4.generatedPassword) {
    const chars = res4.generatedPassword.split("");
    const unique = new Set(chars);
    if (chars.length !== unique.size) {
      throw new Error("No Repeated Characters constraint failed: duplicate character found.");
    }
  }

  // Test Case 5: Passphrase generation tab
  const res5 = calculatePasswordGenerator({
    activeTab: "passphrase",
    wordCount: 5,
    separator: "_"
  });
  if (!res5.generatedPassword || res5.generatedPassword.split("_").length !== 5) {
    throw new Error(`Passphrase generator failed: expected 5 words separated by '_', got ${res5.generatedPassword}`);
  }

  // Test Case 6: PIN tab
  const res6 = calculatePasswordGenerator({
    activeTab: "pin",
    pinLength: 8
  });
  if (!res6.generatedPassword || res6.generatedPassword.length !== 8 || !/^[0-9]+$/.test(res6.generatedPassword)) {
    throw new Error(`PIN generator failed: expected 8-digit numerical code, got ${res6.generatedPassword}`);
  }

  // Test Case 7: Local Strength Checker Warnings
  const res7 = calculatePasswordGenerator({
    activeTab: "strength_checker",
    checkPassword: "password123"
  });
  if (!res7.warnings || res7.warnings.length === 0) {
    throw new Error("Strength Checker pattern warning failed: expected common sequence warnings.");
  }

  // Test Case 8: Error bounds when everything excluded
  const res8 = calculatePasswordGenerator({
    length: 10,
    includeLowercase: false,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false
  });
  if (!res8.error) {
    throw new Error("Empty categories validator error failed: expected category error validation banner.");
  }

  return true;
}

export default runPasswordGeneratorTests;
