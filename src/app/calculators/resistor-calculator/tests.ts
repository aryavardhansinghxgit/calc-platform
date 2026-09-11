import { calculateResistorCalculator } from "./calculator";

export function runResistorCalculatorTests() {
  // Test Case 1: Standard 4-Band Resistor (Backward Compatible Inputs)
  const defaultInputs = {
    activeTab: "color",
    band1: "1",       // brown
    band2: "0",       // black
    multiplier: "100" // red
  };
  const res1 = calculateResistorCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");
  if (res1.resistanceOhms !== 1000) {
    throw new Error(`4-band calculation error: expected 1000, got ${res1.resistanceOhms}`);
  }

  // Reference Case A (5-band as specified in prompt calculation steps: Band1=3, Band2=3, Band3=0, Mult=x100, Tol=±1%)
  // Orange-Orange-Black-Red-Brown -> 330 * 100 = 33,000 Ω = 33 kΩ ±1% (32,670 to 33,330 Ω)
  const caseA_5band = calculateResistorCalculator({
    activeTab: "color",
    bandCount: 5,
    band1: "orange",
    band2: "orange",
    band3: "black",
    multiplier: "red",
    tolerance: "brown"
  });
  if (caseA_5band.resistanceOhms !== 33000 || caseA_5band.tolerancePct !== 1 || caseA_5band.minOhms !== 32670 || caseA_5band.maxOhms !== 33330) {
    throw new Error(`Reference Case A (5-band 33k) failed: got ${caseA_5band.resistanceOhms} Ω ±${caseA_5band.tolerancePct}%`);
  }

  // Reference Case A (4-band literal colors Orange-Orange-Red-Brown):
  // 33 * 100 = 3,300 Ω = 3.3 kΩ ±1% (3,267 to 3,333 Ω)
  const caseA_4band = calculateResistorCalculator({
    activeTab: "color",
    bandCount: 4,
    band1: "orange",
    band2: "orange",
    multiplier: "red",
    tolerance: "brown"
  });
  if (caseA_4band.resistanceOhms !== 3300 || caseA_4band.tolerancePct !== 1 || caseA_4band.minOhms !== 3267 || caseA_4band.maxOhms !== 3333) {
    throw new Error(`Reference Case A (4-band literal 3.3k) failed: got ${caseA_4band.resistanceOhms} Ω ±${caseA_4band.tolerancePct}%`);
  }

  // PDF Page 1 Visual: Brown-Brown-Red-Gold -> 1.1 kΩ ±5% (1045 to 1155 Ω)
  const casePdfPage1 = calculateResistorCalculator({
    activeTab: "color",
    bandCount: 4,
    band1: "brown",
    band2: "brown",
    multiplier: "red",
    tolerance: "gold"
  });
  if (casePdfPage1.resistanceOhms !== 1100 || casePdfPage1.tolerancePct !== 5 || casePdfPage1.minOhms !== 1045 || casePdfPage1.maxOhms !== 1155) {
    throw new Error(`PDF Page 1 reference failed: got ${casePdfPage1.resistanceOhms} Ω`);
  }

  // Reference Case G (PDF 5-band worked example): Orange-Blue-Black-Red-Brown -> 36 kΩ ±1% (35640 to 36360 Ω)
  const caseG = calculateResistorCalculator({
    activeTab: "color",
    bandCount: 5,
    band1: "orange",
    band2: "blue",
    band3: "black",
    multiplier: "red",
    tolerance: "brown"
  });
  if (caseG.resistanceOhms !== 36000 || caseG.tolerancePct !== 1 || caseG.minOhms !== 35640 || caseG.maxOhms !== 36360) {
    throw new Error(`Reference Case G failed: got ${caseG.resistanceOhms} Ω`);
  }

  // Reference Case B: Series Network 100, 220, 470 -> 790 Ω (min 750.5, max 829.5)
  const caseB = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: "100, 220, 470",
    parallelMode: false,
    supplyVoltage: 12
  });
  if (caseB.resistanceOhms !== 790 || caseB.minOhms !== 750.5 || caseB.maxOhms !== 829.5) {
    throw new Error(`Reference Case B failed: nominal ${caseB.resistanceOhms}, min ${caseB.minOhms}, max ${caseB.maxOhms}`);
  }

  // Reference Case C: Parallel Network 100, 220, 470 at 12V -> ~59.98 Ω (min 56.98, max 62.98)
  const caseC = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: "100, 220, 470",
    parallelMode: true,
    supplyVoltage: 12
  });
  if (Math.abs(caseC.resistanceOhms - 59.9768) > 0.05) {
    throw new Error(`Reference Case C failed: expected ~59.98 Ω, got ${caseC.resistanceOhms}`);
  }
  if (!caseC.minOhms || Math.abs(caseC.minOhms - 56.98) > 0.1 || !caseC.maxOhms || Math.abs(caseC.maxOhms - 62.98) > 0.1) {
    throw new Error(`Reference Case C tolerance bounds failed: min ${caseC.minOhms}, max ${caseC.maxOhms}`);
  }

  // Reference Case D: Conductor Copper 100m, 1mm diameter at 20°C -> ~2.19 Ω
  const caseD = calculateResistorCalculator({
    activeTab: "conductor",
    conductorLength: 100,
    conductorLengthUnit: "m",
    conductorSizeInputType: "diameter",
    conductorDiameter: 1,
    conductorDiameterUnit: "mm",
    conductorMaterial: "copper",
    conductorTemp: 20
  });
  if (Math.abs(caseD.resistanceOhms - 2.1899) > 0.02) {
    throw new Error(`Reference Case D failed: expected ~2.19 Ω, got ${caseD.resistanceOhms}`);
  }

  // Reference Case E: SMD Decoders
  const smd103 = calculateResistorCalculator({ activeTab: "smd", smdCode: "103" });
  const smd472 = calculateResistorCalculator({ activeTab: "smd", smdCode: "472" });
  const smd1002 = calculateResistorCalculator({ activeTab: "smd", smdCode: "1002" });
  const smd4R7 = calculateResistorCalculator({ activeTab: "smd", smdCode: "4R7" });
  const smd01A = calculateResistorCalculator({ activeTab: "smd", smdCode: "01A" });
  const smd0R = calculateResistorCalculator({ activeTab: "smd", smdCode: "0R" });

  if (smd103.resistanceOhms !== 10000) throw new Error(`SMD 103 failed: got ${smd103.resistanceOhms}`);
  if (smd472.resistanceOhms !== 4700) throw new Error(`SMD 472 failed: got ${smd472.resistanceOhms}`);
  if (smd1002.resistanceOhms !== 10000) throw new Error(`SMD 1002 failed: got ${smd1002.resistanceOhms}`);
  if (smd4R7.resistanceOhms !== 4.7) throw new Error(`SMD 4R7 failed: got ${smd4R7.resistanceOhms}`);
  if (smd01A.resistanceOhms !== 100) throw new Error(`SMD 01A failed: got ${smd01A.resistanceOhms}`);
  if (smd0R.resistanceOhms !== 0) throw new Error(`SMD 0R failed: got ${smd0R.resistanceOhms}`);

  // Reference Case F (E-Series & Anomaly B fix): Target 1.5 kΩ with E24 -> 1500 Ω ±5% (1425 to 1575 Ω)
  const caseF = calculateResistorCalculator({
    activeTab: "finder",
    finderTargetResistance: 1.5,
    finderTargetUnit: "kΩ",
    finderESeries: "E24"
  });
  if (caseF.resistanceOhms !== 1500) throw new Error(`E24 target 1.5k failed: expected 1500, got ${caseF.resistanceOhms}`);
  if (caseF.tolerancePct !== 5) throw new Error(`Anomaly B regression: expected tolerance rate 5%, got ${caseF.tolerancePct}%`);
  if (caseF.minOhms !== 1425 || caseF.maxOhms !== 1575) {
    throw new Error(`E24 bounds mismatch: min ${caseF.minOhms}, max ${caseF.maxOhms}`);
  }

  // Parallel Zero-ohm Short Circuit Handling
  const parallelShort = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: "100, 0, 220",
    parallelMode: true
  });
  if (parallelShort.resistanceOhms !== 0) {
    throw new Error(`Parallel zero-ohm branch failed: expected 0, got ${parallelShort.resistanceOhms}`);
  }

  // Conductor AWG Test
  const condAwg = calculateResistorCalculator({
    activeTab: "conductor",
    conductorLength: 10,
    conductorLengthUnit: "m",
    conductorSizeInputType: "awg",
    conductorAwg: "14",
    conductorMaterial: "copper",
    conductorTemp: 20
  });
  // AWG 14 diameter ~1.628 mm, Area ~2.08e-6 m2, R ~ 0.0827 Ω
  if (Math.abs(condAwg.resistanceOhms - 0.0827) > 0.01) {
    throw new Error(`AWG 14 calculation failed: expected ~0.0827 Ω, got ${condAwg.resistanceOhms}`);
  }

  // Boundary handler: 0 Ω color code
  const resZero = calculateResistorCalculator({
    activeTab: "color",
    band1: "0",
    band2: "0",
    multiplier: "1" // black (1)
  });
  if (resZero.resistanceOhms !== 0) {
    throw new Error(`Boundary zero test should return 0, got ${resZero.resistanceOhms}`);
  }

  return true;
}

export default runResistorCalculatorTests;
