// Test Card 2 base conversion with 256 when bitWidth is 8
const sourceBase = 10;
const targetBase = 2;
const baseInput = "256";
const bitWidth = 8;

const raw = baseInput.trim();
const decVal = BigInt(raw);
const mask = (1n << BigInt(bitWidth)) - 1n;
const uVal = decVal < 0n ? (decVal + (1n << BigInt(bitWidth))) & mask : decVal & mask;

const binResult = uVal.toString(2).padStart(bitWidth, "0").replace(/(.{4})/g, "$1 ").trim();
const targetResult = uVal.toString(targetBase).toUpperCase();

console.log("Card 2 test for 256 with bitWidth=8:");
console.log("decVal:", decVal.toString());
console.log("uVal after masking:", uVal.toString());
console.log("binResult:", binResult);
console.log("targetResult:", targetResult);

export {};
