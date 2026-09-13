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
  } else if (shape === "projected" || shape === "asymmetrical") {
    shapeOffset = 0.5;
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

  return {
    primarySize,
    bandSizeInches,
    underbustInches: parseFloat(underbustInches.toFixed(1)),
    bustInches: parseFloat(bustInches.toFixed(1)),
    diffInches: parseFloat(diffInches.toFixed(1)),
    multiSystem,
  };
}

const testEdgeInputs = [
  [0, 0], [-10, -5], [30, 20], [NaN, NaN], [100, 150], [10, 12]
];

for (const [u, b] of testEdgeInputs) {
  const r = calculateBraSize(u, b, "in", "US");
  console.log(`Input (${u}, ${b}):`, {
    primary: r.primarySize,
    band: r.bandSizeInches,
    under: r.underbustInches,
    bust: r.bustInches,
    diff: r.diffInches,
    us: r.multiSystem.us
  });
}
