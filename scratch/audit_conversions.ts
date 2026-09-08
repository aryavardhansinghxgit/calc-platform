import {
  convertUSMPGToL100km,
  convertL100kmToUSMPG,
  convertUSMPGToUKMPG,
  convertUKMPGToUSMPG,
  convertUSMPGTokmL,
  convertkmLToUSMPG
} from "../src/app/calculators/gas-mileage-calculator/calculator";

function testConversions() {
  console.log("--- TESTING CURRENT UNIT CONVERSIONS ---");
  const testValues = [5, 10, 15, 20, 25, 30, 35, 40, 50, 75, 100];

  console.log("\n1. US MPG -> L/100km -> US MPG");
  let usMpgFailures = 0;
  for (const v of testValues) {
    const l100 = convertUSMPGToL100km(v);
    const roundTrip = convertL100kmToUSMPG(l100);
    const diff = Math.abs(v - roundTrip);
    if (diff > 0.01) {
      usMpgFailures++;
      console.log(`  FAIL: ${v} -> ${l100} -> ${roundTrip} (drift: ${diff.toFixed(4)})`);
    } else {
      console.log(`  PASS: ${v} -> ${l100} -> ${roundTrip}`);
    }
  }

  console.log("\n2. US MPG -> km/L -> US MPG");
  let kmLFailures = 0;
  for (const v of testValues) {
    const kmL = convertUSMPGTokmL(v);
    const roundTrip = convertkmLToUSMPG(kmL);
    const diff = Math.abs(v - roundTrip);
    if (diff > 0.01) {
      kmLFailures++;
      console.log(`  FAIL: ${v} -> ${kmL} -> ${roundTrip} (drift: ${diff.toFixed(4)})`);
    } else {
      console.log(`  PASS: ${v} -> ${kmL} -> ${roundTrip}`);
    }
  }

  console.log("\n3. US MPG -> UK Imperial MPG -> US MPG");
  let ukFailures = 0;
  for (const v of testValues) {
    const uk = convertUSMPGToUKMPG(v);
    const roundTrip = convertUKMPGToUSMPG(uk);
    const diff = Math.abs(v - roundTrip);
    if (diff > 0.01) {
      ukFailures++;
      console.log(`  FAIL: ${v} -> ${uk} -> ${roundTrip} (drift: ${diff.toFixed(4)})`);
    } else {
      console.log(`  PASS: ${v} -> ${uk} -> ${roundTrip}`);
    }
  }

  // 5,000 randomized test
  console.log("\n4. Running 5,000 randomized conversions per family...");
  let randMpgDrift = 0;
  let randKmlDrift = 0;
  let randUkDrift = 0;
  for (let i = 0; i < 5000; i++) {
    const val = 5 + Math.random() * 95; // 5 to 100
    // US MPG -> L/100km -> US MPG
    const l100 = convertUSMPGToL100km(val);
    const rtMpg = convertL100kmToUSMPG(l100);
    if (Math.abs(val - rtMpg) > 0.05) randMpgDrift++;

    // km/L
    const kml = convertUSMPGTokmL(val);
    const rtKml = convertkmLToUSMPG(kml);
    if (Math.abs(val - rtKml) > 0.05) randKmlDrift++;

    // UK
    const uk = convertUSMPGToUKMPG(val);
    const rtUk = convertUKMPGToUSMPG(uk);
    if (Math.abs(val - rtUk) > 0.05) randUkDrift++;
  }
  console.log(`  Randomized MPG drift (>0.05): ${randMpgDrift} / 5000`);
  console.log(`  Randomized km/L drift (>0.05): ${randKmlDrift} / 5000`);
  console.log(`  Randomized UK MPG drift (>0.05): ${randUkDrift} / 5000`);
}

testConversions();
