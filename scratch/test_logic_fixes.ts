import {
  formatScientificApprox,
  modBigInt,
  modPowBigInt,
  validateBigIntInput,
  millerRabinTest,
  permutationsBigInt,
  combinationsBigInt
} from "../src/app/calculators/big-number-calculator/big-number-logic";

console.log("=== Testing Logic Fixes ===");

// 1. Scientific approximation with negative
console.log("Sci pos:", formatScientificApprox("98765432109876543210"));
console.log("Sci neg:", formatScientificApprox("-98765432109876543210"));
console.log("Sci zero:", formatScientificApprox("0"));

// 2. Canonical modulo
console.log("-13 mod 5:", modBigInt("-13", "5"), "Exp: 2");
console.log("13 mod 5:", modBigInt("13", "5"), "Exp: 3");
console.log("(-2)^3 mod 5:", modPowBigInt("-2", "3", "5"), "Exp: 2");

// 3. Validation
console.log("Valid 123:", validateBigIntInput("123").isValid);
console.log("Valid -123:", validateBigIntInput("-123").isValid);
console.log("Invalid abc:", validateBigIntInput("abc").error);
console.log("Invalid 12.5:", validateBigIntInput("12.5").error);

// 4. Miller Rabin
console.log("Prime 2:", millerRabinTest("2").isPrime);
console.log("Prime 3:", millerRabinTest("3").isPrime);
console.log("Composite 4:", millerRabinTest("4").isPrime);
console.log("Prime 17:", millerRabinTest("17").isPrime);
console.log("Composite 18:", millerRabinTest("18").isPrime);
console.log("Prime 997:", millerRabinTest("997").isPrime);
console.log("Prime 1000000007:", millerRabinTest("1000000007").isPrime);
console.log("Composite 1000000008:", millerRabinTest("1000000008").isPrime);
console.log("Composite 3127 (53*59):", millerRabinTest("3127").isPrime);

// 5. Combinatorics
console.log("5P2:", permutationsBigInt(5, 2), "Exp: 20");
console.log("5C2:", combinationsBigInt(5, 2), "Exp: 10");
console.log("100C50 len:", combinationsBigInt(100, 50).length);
