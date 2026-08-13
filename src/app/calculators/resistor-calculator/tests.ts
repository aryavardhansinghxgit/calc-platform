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
  // 10 * 100 = 1000 Ω (1 kΩ)
  if (res1.resistanceOhms !== 1000) {
    throw new Error(`4-band calculation error: expected 1000, got ${res1.resistanceOhms}`);
  }

  // Test Case 2: Standard 5-Band Resistor (Color Name Inputs)
  const res2 = calculateResistorCalculator({
    activeTab: "color",
    bandCount: 5,
    band1: "red",      // 2
    band2: "red",      // 2
    band3: "black",    // 0
    multiplier: "gold", // 0.1
    tolerance: "brown"  // 1%
  });
  // 220 * 0.1 = 22 Ω (±1%)
  if (res2.resistanceOhms !== 22 || res2.tolerancePct !== 1) {
    throw new Error(`5-band calculation error: expected 22 Ω ±1%, got ${res2.resistanceOhms} Ω ±${res2.tolerancePct}%`);
  }

  // Test Case 3: Series Resistor calculation
  const res3 = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: "100, 2.2k, 1M",
    parallelMode: false,
    supplyVoltage: 10
  });
  // 100 + 2200 + 1000000 = 1002300 Ω
  if (res3.resistanceOhms !== 1002300) {
    throw new Error(`Series equivalent resistance mismatch: expected 1002300, got ${res3.resistanceOhms}`);
  }

  // Test Case 4: Parallel Resistor calculation
  const res4 = calculateResistorCalculator({
    activeTab: "series_parallel",
    resistorValuesString: "100, 100",
    parallelMode: true
  });
  // 100 || 100 = 50 Ω
  if (res4.resistanceOhms !== 50) {
    throw new Error(`Parallel equivalent resistance mismatch: expected 50, got ${res4.resistanceOhms}`);
  }

  // Test Case 5: SMD Code Decoding
  const smd3 = calculateResistorCalculator({ activeTab: "smd", smdCode: "103" }); // 10 kΩ
  const smd4 = calculateResistorCalculator({ activeTab: "smd", smdCode: "1002" }); // 10 kΩ
  const smdEia = calculateResistorCalculator({ activeTab: "smd", smdCode: "01A" }); // 100 Ω
  const smdDec = calculateResistorCalculator({ activeTab: "smd", smdCode: "4R7" }); // 4.7 Ω

  if (smd3.resistanceOhms !== 10000) throw new Error(`SMD 3-digit error: expected 10000, got ${smd3.resistanceOhms}`);
  if (smd4.resistanceOhms !== 10000) throw new Error(`SMD 4-digit error: expected 10000, got ${smd4.resistanceOhms}`);
  if (smdEia.resistanceOhms !== 100) throw new Error(`SMD EIA-96 error: expected 100, got ${smdEia.resistanceOhms}`);
  if (smdDec.resistanceOhms !== 4.7) throw new Error(`SMD R-decimal error: expected 4.7, got ${smdDec.resistanceOhms}`);

  // Test Case 6: Conductor Resistance at 50°C
  const resConductor = calculateResistorCalculator({
    activeTab: "conductor",
    conductorLength: 10,
    conductorLengthUnit: "m",
    conductorSizeInputType: "area",
    conductorArea: 1.5,
    conductorAreaUnit: "mm²", // 1.5e-6 m²
    conductorMaterial: "copper", // rho = 1.72e-8, alpha = 0.00393
    conductorTemp: 50 // 30°C rise above 20°C
  });
  // R20 = 1.72e-8 * 10 / 1.5e-6 = 0.11467 Ω
  // R50 = 0.11467 * (1 + 0.00393 * 30) = 0.11467 * 1.1179 = 0.12819 Ω
  if (Math.abs(resConductor.resistanceOhms - 0.12819) > 0.005) {
    throw new Error(`Conductor resistance calculation error: expected ~0.128, got ${resConductor.resistanceOhms}`);
  }

  // Test Case 7: Boundary Handlers
  const resZero = calculateResistorCalculator({
    activeTab: "color",
    band1: "0",
    band2: "0",
    multiplier: "0" // black (1)
  });
  if (resZero.resistanceOhms !== 0) {
    throw new Error(`Boundary zero test should return 0, got ${resZero.resistanceOhms}`);
  }

  return true;
}

export default runResistorCalculatorTests;
