// Testing component logic as extracted from HexCalculator.tsx

type HexOperator = "+" | "-" | "*" | "/" | "MOD" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>" | ">>>";
type BitWidth = 8 | 16 | 32 | 64;

function runComponentLogicAudit() {
  console.log("=== RUNNING DIRECT COMPONENT LOGIC AUDIT ===");

  // Bug 1: Card 2 bitWidth coupling
  // In HexCalculator.tsx:
  // const mask = (1n << BigInt(bitWidth)) - 1n;
  // const uVal = decVal < 0n ? (decVal + (1n << BigInt(bitWidth))) & mask : decVal & mask;
  function card2Convert(baseInput: string, sourceBase: number, targetBase: number, bitWidthFromCard1: BitWidth) {
    const raw = baseInput.trim();
    let decVal = 0n;
    if (sourceBase === 10) {
      decVal = BigInt(raw);
    } else if (sourceBase === 16) {
      const cleanH = raw.replace(/^0x/i, "");
      decVal = BigInt(`0x${cleanH}`);
    }
    const mask = (1n << BigInt(bitWidthFromCard1)) - 1n;
    const uVal = decVal < 0n ? (decVal + (1n << BigInt(bitWidthFromCard1))) & mask : decVal & mask;
    const targetResult = uVal.toString(targetBase).toUpperCase();
    return { decVal, uVal, targetResult };
  }

  // Test Card 2 with 8-bit bitWidth in Card 1, and input "256" decimal to Hex:
  const card2Test1 = card2Convert("256", 10, 16, 8);
  console.log("Card 2 Test (Decimal 256 -> Hex with 8-bit Card 1):", {
    input: "256",
    actualHex: card2Test1.targetResult,
    expectedHex: "100",
    defect: card2Test1.targetResult !== "100"
  });

  // Test Card 2 with 8-bit bitWidth in Card 1, and input "FFFFFFFF" (32-bit max) to Dec:
  const card2Test2 = card2Convert("FFFFFFFF", 16, 10, 8);
  console.log("Card 2 Test (FFFFFFFF hex -> Dec with 8-bit Card 1):", {
    input: "FFFFFFFF",
    actualDec: card2Test2.targetResult,
    expectedDec: "4294967295",
    defect: card2Test2.targetResult !== "4294967295"
  });

  // Bug 2: Operator ">>>"
  function calculateOp(operator: HexOperator, aBig: bigint, bBig: bigint, bitWidth: BitWidth) {
    const mask = (1n << BigInt(bitWidth)) - 1n;
    let resBig = 0n;
    if (operator === "+") resBig = (aBig + bBig) & mask;
    else if (operator === "-") resBig = (aBig - bBig) & mask;
    else if (operator === "*") resBig = (aBig * bBig) & mask;
    else if (operator === "/") resBig = bBig !== 0n ? aBig / bBig : 0n;
    else if (operator === "MOD") resBig = bBig !== 0n ? aBig % bBig : 0n;
    else if (operator === "AND") resBig = aBig & bBig;
    else if (operator === "OR") resBig = aBig | bBig;
    else if (operator === "XOR") resBig = aBig ^ bBig;
    else if (operator === "NOT") resBig = (~aBig) & mask;
    else if (operator === "<<") resBig = (aBig << (bBig > 64n ? 64n : bBig)) & mask;
    else if (operator === ">>") resBig = (aBig >> (bBig > 64n ? 64n : bBig)) & mask;
    // Note: >>> is completely missing from HexCalculator.tsx!
    return resBig;
  }

  const shiftRes = calculateOp(">>>", 0x80n, 1n, 8);
  console.log("Operator '>>>' test in HexCalculator:", {
    input: "0x80 >>> 1",
    actual: shiftRes.toString(16),
    expected: "40",
    defect: shiftRes === 0n
  });

  // Check Input Validation in HexCalculator:
  // cleanHex = (val: string) => val.replace(/^0x/i, "").replace(/\s+/g, "").toUpperCase();
  // isHexValid = (val: string) => /^[0-9A-Fa-f.]*$/.test(cleanHex(val));
  const isHexValid = (val: string) => /^[0-9A-Fa-f.]*$/.test(val.replace(/^0x/i, "").replace(/\s+/g, ""));
  console.log("Input validation checks:");
  console.log("0xGG valid?", isHexValid("0xGG")); // false
  console.log("12G4 valid?", isHexValid("12G4")); // false
  console.log("XYZ valid?", isHexValid("XYZ")); // false
  console.log("0xFF valid?", isHexValid("0xFF")); // true
}

runComponentLogicAudit();
