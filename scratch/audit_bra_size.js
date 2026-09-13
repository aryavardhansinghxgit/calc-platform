const fs = require('fs');

// Import or re-implement calculator logic for precise testing
const US_CUPS = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J", "K", "L", "M"];
const UK_CUPS = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J"];
const EU_CUPS = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

const AU_BAND_MAP = {
  28: 6, 30: 8, 32: 10, 34: 12, 36: 14, 38: 16, 40: 18, 42: 20, 44: 22, 46: 24,
};

const EU_BAND_MAP = {
  28: 60, 30: 65, 32: 70, 34: 75, 36: 80, 38: 85, 40: 90, 42: 95, 44: 100, 46: 105,
};

function calculateBraSize(underbust, bust, unit = "in", region = "US", shape = "even") {
  const underbustInches = unit === "cm" ? underbust / 2.54 : underbust;
  const bustInches = unit === "cm" ? bust / 2.54 : bust;

  let roundedUnderbust = Math.round(underbustInches);
  let bandSizeInches = roundedUnderbust % 2 === 0 ? roundedUnderbust : roundedUnderbust + 1;
  if (bandSizeInches < 28) bandSizeInches = 28;
  if (bandSizeInches > 52) bandSizeInches = 52;

  let diffInches = bustInches - underbustInches;
  if (diffInches < 0) diffInches = 0;

  let shapeOffset = 0;
  let shapeAdvice = "Standard even distribution. Most bra styles will fit comfortably.";

  if (shape === "shallow") {
    shapeOffset = -0.5;
    shapeAdvice = "Shallow breasts spread tissue over a wider area. Balconette and demi cups fit best to prevent gaping.";
  } else if (shape === "projected") {
    shapeOffset = 0.5;
    shapeAdvice = "Projected breasts require deeper cups. Unlined, multi-seam bras offer optimal room and shape.";
  } else if (shape === "asymmetrical") {
    shapeOffset = 0.5;
    shapeAdvice = "Fit the bra to your larger breast for comfort. Use removable cookies or adjust straps to balance the smaller side.";
  } else if (shape === "bell") {
    shapeAdvice = "Bell shapes are fuller at the bottom. T-shirt bras, balconettes, and plunge styles prevent top cup gaping.";
  } else if (shape === "teardrop") {
    shapeAdvice = "Teardrop shapes are versatile. Plunge, demi, and balconette bras provide natural lift and cleavage.";
  }

  const adjustedDiff = Math.max(0, diffInches + shapeOffset);
  const cupIndex = Math.min(Math.round(adjustedDiff), US_CUPS.length - 1);

  const cupUS = US_CUPS[cupIndex] || "D";
  const cupUK = UK_CUPS[cupIndex] || "D";
  const cupEU = EU_CUPS[cupIndex] || "D";

  const euBand = EU_BAND_MAP[bandSizeInches] || (bandSizeInches - 30) * 5 + 65;
  const frBand = euBand + 15;
  const auBand = AU_BAND_MAP[bandSizeInches] || bandSizeInches - 22;

  const multiSystem = {
    us: `${bandSizeInches}${cupUS}`,
    uk: `${bandSizeInches}${cupUK}`,
    eu: `${euBand}${cupEU}`,
    fr: `${frBand}${cupEU}`,
    au: `${auBand}${cupUK}`,
    in: `${bandSizeInches}${cupUK}`,
    bandSizeInches,
    cupLetterUS: cupUS,
    cupLetterUK: cupUK,
    cupLetterEU: cupEU,
  };

  let primarySize = multiSystem.us;
  if (region === "UK") primarySize = multiSystem.uk;
  else if (region === "EU") primarySize = multiSystem.eu;
  else if (region === "FR") primarySize = multiSystem.fr;
  else if (region === "AU") primarySize = multiSystem.au;
  else if (region === "IN") primarySize = multiSystem.in;

  const sisterSizes = [];
  if (bandSizeInches > 28 && cupIndex < US_CUPS.length - 1) {
    const sBand = bandSizeInches - 2;
    const sCupUS = US_CUPS[cupIndex + 1];
    const sCupUK = UK_CUPS[cupIndex + 1];
    const sCupEU = EU_CUPS[cupIndex + 1];
    const sEuBand = EU_BAND_MAP[sBand] || (sBand - 30) * 5 + 65;

    let sizeStr = `${sBand}${sCupUS}`;
    if (region === "UK" || region === "IN") sizeStr = `${sBand}${sCupUK}`;
    if (region === "EU") sizeStr = `${sEuBand}${sCupEU}`;

    sisterSizes.push({
      size: sizeStr,
      bandAdjustment: "2 inches tighter band",
      cupAdjustment: "1 cup size larger",
      fitGuidance: "Ideal if your current band rides up your back or feels loose, but the cup volume feels correct.",
    });
  }

  if (bandSizeInches < 50 && cupIndex > 0) {
    const sBand = bandSizeInches + 2;
    const sCupUS = US_CUPS[cupIndex - 1];
    const sCupUK = UK_CUPS[cupIndex - 1];
    const sCupEU = EU_CUPS[cupIndex - 1];
    const sEuBand = EU_BAND_MAP[sBand] || (sBand - 30) * 5 + 65;

    let sizeStr = `${sBand}${sCupUS}`;
    if (region === "UK" || region === "IN") sizeStr = `${sBand}${sCupUK}`;
    if (region === "EU") sizeStr = `${sEuBand}${sCupEU}`;

    sisterSizes.push({
      size: sizeStr,
      bandAdjustment: "2 inches looser band",
      cupAdjustment: "1 cup size smaller",
      fitGuidance: "Ideal if your current band digs uncomfortably into your ribcage, but cup coverage is comfortable.",
    });
  }

  return {
    primarySize,
    bandSizeInches,
    underbustInches: parseFloat(underbustInches.toFixed(1)),
    bustInches: parseFloat(bustInches.toFixed(1)),
    diffInches: parseFloat(diffInches.toFixed(1)),
    multiSystem,
    sisterSizes,
  };
}

// 1. Golden Baseline Test (30 in / 34 in)
const b1 = calculateBraSize(30, 34, "in", "US", "even");
console.log("=== B1 GOLDEN BASELINE ===");
console.log("Primary:", b1.primarySize, "Expected: 30D");
console.log("Band:", b1.bandSizeInches, "Expected: 30");
console.log("Diff:", b1.diffInches, "Expected: 4");
console.log("MultiSystem:", b1.multiSystem);
console.log("Sister sizes:", b1.sisterSizes);

// 2. Same Cup Difference Tests (28/32, 30/34, 32/36, 34/38, 36/40)
console.log("\n=== SAME CUP DIFFERENCE TESTS ===");
[
  [28, 32],
  [30, 34],
  [32, 36],
  [34, 38],
  [36, 40],
].forEach(([u, b]) => {
  const r = calculateBraSize(u, b, "in", "US", "even");
  console.log(`${u}/${b} => Size: ${r.primarySize}, Band: ${r.bandSizeInches}, Diff: ${r.diffInches}`);
});

// 3. Metric Baseline (30 in = 76.2 cm, 34 in = 86.36 cm)
console.log("\n=== METRIC BASELINE TESTS ===");
const m1 = calculateBraSize(76.2, 86.36, "cm", "US", "even");
console.log("76.2cm / 86.36cm (US) =>", m1.primarySize, "Band:", m1.bandSizeInches, "Diff:", m1.diffInches);
const m1_eu = calculateBraSize(76.2, 86.36, "cm", "EU", "even");
console.log("76.2cm / 86.36cm (EU) =>", m1_eu.primarySize, "Band:", m1_eu.multiSystem.eu);

// 4. Regional conversions for multiple sizes
console.log("\n=== REGIONAL CONVERSIONS ===");
const testSizes = [
  [30, 32], // 30B
  [30, 33], // 30C
  [30, 34], // 30D
  [30, 35], // 30DD
  [32, 35], // 32C
  [32, 36], // 32D
  [34, 36], // 34B
  [34, 37], // 34C
  [34, 38], // 34D
  [36, 39], // 36C
  [36, 40], // 36D
  [38, 42], // 38D
];
testSizes.forEach(([u, b]) => {
  const r = calculateBraSize(u, b, "in", "US", "even");
  console.log(`US ${r.primarySize} => UK: ${r.multiSystem.uk}, IN: ${r.multiSystem.in}, EU: ${r.multiSystem.eu}, FR: ${r.multiSystem.fr}, AU: ${r.multiSystem.au}`);
});

// 5. Cup Boundary tests
console.log("\n=== CUP BOUNDARIES ===");
for (let diff = 0; diff <= 13.5; diff += 0.5) {
  const r = calculateBraSize(30, 30 + diff, "in", "US", "even");
  console.log(`Diff ${diff.toFixed(1)}" => Cup US: ${r.multiSystem.cupLetterUS}, UK: ${r.multiSystem.cupLetterUK}, EU: ${r.multiSystem.cupLetterEU}`);
}
