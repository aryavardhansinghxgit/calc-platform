// 5,000+ Randomized property testing for Binary Calculator

type Operation = "+" | "-" | "*" | "/" | "%" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>";
type BitWidth = 8 | 16 | 32 | 64;
type RepMode = "unsigned" | "twos";

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureExamples: string[] = [];

// Independent Oracle
function oracle(aBig: bigint, bBig: bigint, op: Operation, width: BitWidth, mode: RepMode, shift: number) {
  const mask = (1n << BigInt(width)) - 1n;
  const msbMask = 1n << BigInt(width - 1);

  // Parse signed if in twos mode
  let aVal = aBig;
  let bVal = bBig;
  if (mode === "twos") {
    if ((aBig & msbMask) !== 0n) aVal = (aBig & mask) - (1n << BigInt(width));
    if ((bBig & msbMask) !== 0n) bVal = (bBig & mask) - (1n << BigInt(width));
  }

  let res = 0n;
  let rem: bigint | null = null;
  let isOverflow = false;

  switch (op) {
    case "+": {
      const raw = aVal + bVal;
      res = raw & mask;
      if (mode === "unsigned") {
        isOverflow = aVal + bVal > mask;
      } else {
        // Signed overflow occurs when two numbers of same sign yield result of opposite sign
        const resSigned = ((res & msbMask) !== 0n) ? res - (1n << BigInt(width)) : res;
        isOverflow = (aVal > 0n && bVal > 0n && resSigned <= 0n) || (aVal < 0n && bVal < 0n && resSigned >= 0n);
      }
      break;
    }
    case "-": {
      const raw = aVal - bVal;
      res = raw & mask;
      if (mode === "unsigned") {
        isOverflow = aVal < bVal;
      } else {
        const resSigned = ((res & msbMask) !== 0n) ? res - (1n << BigInt(width)) : res;
        isOverflow = (aVal > 0n && bVal < 0n && resSigned <= 0n) || (aVal < 0n && bVal > 0n && resSigned >= 0n);
      }
      break;
    }
    case "*": {
      const raw = aVal * bVal;
      res = raw & mask;
      break;
    }
    case "/": {
      if (bVal === 0n) return null;
      res = (aVal / bVal) & mask;
      rem = (aVal % bVal) & mask;
      break;
    }
    case "%": {
      if (bVal === 0n) return null;
      res = (aVal % bVal) & mask;
      break;
    }
    case "AND":
      res = (aVal & bVal) & mask;
      break;
    case "OR":
      res = (aVal | bVal) & mask;
      break;
    case "XOR":
      res = (aVal ^ bVal) & mask;
      break;
    case "NOT":
      res = (~aVal) & mask;
      break;
    case "<<":
      res = (aVal << BigInt(shift)) & mask;
      break;
    case ">>":
      res = (aVal >> BigInt(shift)) & mask;
      break;
  }

  // Signed decimal interpretation
  let decStr = res.toString();
  if (mode === "twos") {
    if ((res & msbMask) !== 0n) {
      decStr = (res - (1n << BigInt(width))).toString();
    } else {
      decStr = res.toString();
    }
  }

  const binStr = res.toString(2).padStart(width, "0");
  return { res, binStr, decStr, isOverflow, rem };
}

// Existing component simulator
function componentSim(cleanA: string, cleanB: string, op: Operation, width: BitWidth, mode: RepMode, shift: number) {
  const mask = (1n << BigInt(width)) - 1n;
  const msbMask = 1n << BigInt(width - 1);

  const uA = BigInt(`0b${cleanA}`);
  const uB = BigInt(`0b${cleanB}`);

  let aVal = uA;
  let bVal = uB;
  if (mode === "twos") {
    if ((uA & msbMask) !== 0n) aVal = (uA & mask) - (1n << BigInt(width));
    if ((uB & msbMask) !== 0n) bVal = (uB & mask) - (1n << BigInt(width));
  }

  let resVal = 0n;
  if (op === "+") resVal = (aVal + bVal) & mask;
  else if (op === "-") resVal = (aVal - bVal) & mask;
  else if (op === "*") resVal = (aVal * bVal) & mask;
  else if (op === "/") {
    if (bVal === 0n) return null;
    resVal = aVal / bVal;
  }
  else if (op === "AND") resVal = aVal & bVal;
  else if (op === "OR") resVal = aVal | bVal;
  else if (op === "XOR") resVal = aVal ^ bVal;
  else if (op === "NOT") resVal = (~aVal) & mask;
  else if (op === "<<") resVal = (aVal << BigInt(shift)) & mask;
  else if (op === ">>") resVal = (aVal >> BigInt(shift)) & mask;
  else return null; // '%' is not in component!

  // In current component: formatMultiBase(resVal, width)
  const uVal = resVal < 0n ? (resVal + (1n << BigInt(width))) & mask : resVal & mask;
  const binRaw = uVal.toString(2).padStart(width, "0");
  const decStr = resVal.toString(); // <--- Bug in current component!

  return { binRaw, decStr };
}

console.log("=== RUNNING 5,000+ RANDOMIZED PROPERTY ASSERTIONS ===");

const widths: BitWidth[] = [8, 16, 32, 64];
const ops: Operation[] = ["+", "-", "*", "/", "AND", "OR", "XOR", "NOT", "<<", ">>"];

for (let i = 0; i < 5000; i++) {
  const width = widths[i % widths.length];
  const op = ops[i % ops.length];
  const mode: RepMode = i % 2 === 0 ? "unsigned" : "twos";
  const shift = (i % 7) + 1;

  // Generate random BigInts within width
  const maxVal = (1n << BigInt(width)) - 1n;
  // Use crypto random or pseudo-random
  const randA = BigInt(Math.floor(Math.random() * 1000000)) % (maxVal + 1n);
  let randB = BigInt(Math.floor(Math.random() * 1000000)) % (maxVal + 1n);
  if (op === "/" && randB === 0n) randB = 1n;

  const binA = randA.toString(2).padStart(width, "0");
  const binB = randB.toString(2).padStart(width, "0");

  const exp = oracle(randA, randB, op, width, mode, shift);
  const act = componentSim(binA, binB, op, width, mode, shift);

  totalAssertions++;
  if (!exp || !act) {
    if (!exp && !act) {
      passedAssertions++;
    } else {
      failedAssertions++;
      if (failureExamples.length < 5) {
        failureExamples.push(`[${op}] width=${width} mode=${mode}: exp=${JSON.stringify(exp)}, act=${JSON.stringify(act)}`);
      }
    }
    continue;
  }

  // Compare binary representation and decimal representation
  const binMatch = exp.binStr === act.binRaw;
  const decMatch = exp.decStr === act.decStr;

  if (binMatch && decMatch) {
    passedAssertions++;
  } else {
    failedAssertions++;
    if (failureExamples.length < 10) {
      failureExamples.push(`[${op}] width=${width} mode=${mode} A=${binA} B=${binB}: expDec=${exp.decStr} actDec=${act.decStr} binMatch=${binMatch}`);
    }
  }
}

console.log(`TOTAL ASSERTIONS: ${totalAssertions}`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log(`SAMPLE FAILURES:`);
failureExamples.forEach((f, idx) => console.log(`  ${idx + 1}. ${f}`));

export {};
