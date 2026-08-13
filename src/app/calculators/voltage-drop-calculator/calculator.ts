import { VoltageDropCalculatorInputs, VoltageDropCalculatorOutputs } from "./types";

interface ConductorData {
  size: string;
  rCuPvc: number;
  rCuSteel: number;
  rCuAlum: number;
  rAlPvc: number;
  rAlSteel: number;
  rAlAlum: number;
  xPvc: number;
  xSteel: number;
  xAlum: number;
  rCuDc: number;
  rAlDc: number;
  diameterIn: number;
  areaKcmil: number;
}

// NEC Chapter 9 Table 9 (AC, 75°C, 60Hz) & Table 8 (DC, 75°C) values per 1000 ft
export const AWG_CONDUCTORS: ConductorData[] = [
  { size: "14", rCuPvc: 3.1, rCuSteel: 3.1, rCuAlum: 3.1, rAlPvc: 5.1, rAlSteel: 5.1, rAlAlum: 5.1, xPvc: 0.058, xSteel: 0.073, xAlum: 0.058, rCuDc: 3.07, rAlDc: 5.06, diameterIn: 0.0641, areaKcmil: 4.11 },
  { size: "12", rCuPvc: 2.0, rCuSteel: 2.0, rCuAlum: 2.0, rAlPvc: 3.2, rAlSteel: 3.2, rAlAlum: 3.2, xPvc: 0.054, xSteel: 0.068, xAlum: 0.054, rCuDc: 1.93, rAlDc: 3.18, diameterIn: 0.0808, areaKcmil: 6.53 },
  { size: "10", rCuPvc: 1.2, rCuSteel: 1.2, rCuAlum: 1.2, rAlPvc: 2.0, rAlSteel: 2.0, rAlAlum: 2.0, xPvc: 0.050, xSteel: 0.063, xAlum: 0.050, rCuDc: 1.21, rAlDc: 2.00, diameterIn: 0.1019, areaKcmil: 10.38 },
  { size: "8", rCuPvc: 0.78, rCuSteel: 0.78, rCuAlum: 0.78, rAlPvc: 1.3, rAlSteel: 1.3, rAlAlum: 1.3, xPvc: 0.052, xSteel: 0.065, xAlum: 0.052, rCuDc: 0.778, rAlDc: 1.28, diameterIn: 0.1285, areaKcmil: 16.51 },
  { size: "6", rCuPvc: 0.49, rCuSteel: 0.49, rCuAlum: 0.49, rAlPvc: 0.81, rAlSteel: 0.81, rAlAlum: 0.81, xPvc: 0.051, xSteel: 0.064, xAlum: 0.051, rCuDc: 0.491, rAlDc: 0.808, diameterIn: 0.1620, areaKcmil: 26.24 },
  { size: "4", rCuPvc: 0.31, rCuSteel: 0.31, rCuAlum: 0.31, rAlPvc: 0.51, rAlSteel: 0.51, rAlAlum: 0.51, xPvc: 0.048, xSteel: 0.060, xAlum: 0.048, rCuDc: 0.308, rAlDc: 0.508, diameterIn: 0.2043, areaKcmil: 41.74 },
  { size: "3", rCuPvc: 0.25, rCuSteel: 0.25, rCuAlum: 0.25, rAlPvc: 0.40, rAlSteel: 0.41, rAlAlum: 0.40, xPvc: 0.047, xSteel: 0.059, xAlum: 0.047, rCuDc: 0.245, rAlDc: 0.403, diameterIn: 0.2294, areaKcmil: 52.62 },
  { size: "2", rCuPvc: 0.19, rCuSteel: 0.20, rCuAlum: 0.19, rAlPvc: 0.32, rAlSteel: 0.32, rAlAlum: 0.32, xPvc: 0.045, xSteel: 0.057, xAlum: 0.045, rCuDc: 0.194, rAlDc: 0.319, diameterIn: 0.2576, areaKcmil: 66.36 },
  { size: "1", rCuPvc: 0.15, rCuSteel: 0.16, rCuAlum: 0.15, rAlPvc: 0.25, rAlSteel: 0.26, rAlAlum: 0.25, xPvc: 0.046, xSteel: 0.057, xAlum: 0.046, rCuDc: 0.154, rAlDc: 0.253, diameterIn: 0.2893, areaKcmil: 83.69 },
  { size: "1/0", rCuPvc: 0.12, rCuSteel: 0.13, rCuAlum: 0.12, rAlPvc: 0.20, rAlSteel: 0.21, rAlAlum: 0.20, xPvc: 0.044, xSteel: 0.055, xAlum: 0.044, rCuDc: 0.122, rAlDc: 0.201, diameterIn: 0.3249, areaKcmil: 105.6 },
  { size: "2/0", rCuPvc: 0.10, rCuSteel: 0.10, rCuAlum: 0.10, rAlPvc: 0.16, rAlSteel: 0.16, rAlAlum: 0.16, xPvc: 0.043, xSteel: 0.054, xAlum: 0.043, rCuDc: 0.0967, rAlDc: 0.159, diameterIn: 0.3648, areaKcmil: 133.1 },
  { size: "3/0", rCuPvc: 0.077, rCuSteel: 0.079, rCuAlum: 0.077, rAlPvc: 0.13, rAlSteel: 0.13, rAlAlum: 0.13, xPvc: 0.042, xSteel: 0.052, xAlum: 0.042, rCuDc: 0.0766, rAlDc: 0.126, diameterIn: 0.4096, areaKcmil: 167.8 },
  { size: "4/0", rCuPvc: 0.062, rCuSteel: 0.063, rCuAlum: 0.062, rAlPvc: 0.10, rAlSteel: 0.10, rAlAlum: 0.10, xPvc: 0.041, xSteel: 0.051, xAlum: 0.041, rCuDc: 0.0608, rAlDc: 0.100, diameterIn: 0.4600, areaKcmil: 211.6 },
  { size: "250", rCuPvc: 0.052, rCuSteel: 0.054, rCuAlum: 0.052, rAlPvc: 0.085, rAlSteel: 0.087, rAlAlum: 0.085, xPvc: 0.041, xSteel: 0.052, xAlum: 0.041, rCuDc: 0.0515, rAlDc: 0.0847, diameterIn: 0.5000, areaKcmil: 250 },
  { size: "300", rCuPvc: 0.044, rCuSteel: 0.045, rCuAlum: 0.044, rAlPvc: 0.071, rAlSteel: 0.073, rAlAlum: 0.071, xPvc: 0.041, xSteel: 0.051, xAlum: 0.041, rCuDc: 0.0429, rAlDc: 0.0707, diameterIn: 0.5480, areaKcmil: 300 },
  { size: "350", rCuPvc: 0.038, rCuSteel: 0.040, rCuAlum: 0.038, rAlPvc: 0.061, rAlSteel: 0.063, rAlAlum: 0.061, xPvc: 0.040, xSteel: 0.050, xAlum: 0.040, rCuDc: 0.0367, rAlDc: 0.0605, diameterIn: 0.5920, areaKcmil: 350 },
  { size: "400", rCuPvc: 0.033, rCuSteel: 0.035, rCuAlum: 0.033, rAlPvc: 0.054, rAlSteel: 0.055, rAlAlum: 0.054, xPvc: 0.040, xSteel: 0.049, xAlum: 0.040, rCuDc: 0.0321, rAlDc: 0.0529, diameterIn: 0.6320, areaKcmil: 400 },
  { size: "500", rCuPvc: 0.027, rCuSteel: 0.029, rCuAlum: 0.027, rAlPvc: 0.043, rAlSteel: 0.045, rAlAlum: 0.043, xPvc: 0.039, xSteel: 0.048, xAlum: 0.039, rCuDc: 0.0258, rAlDc: 0.0424, diameterIn: 0.7070, areaKcmil: 500 },
  { size: "600", rCuPvc: 0.023, rCuSteel: 0.025, rCuAlum: 0.023, rAlPvc: 0.036, rAlSteel: 0.038, rAlAlum: 0.036, xPvc: 0.039, xSteel: 0.048, xAlum: 0.039, rCuDc: 0.0214, rAlDc: 0.0353, diameterIn: 0.7750, areaKcmil: 600 },
  { size: "750", rCuPvc: 0.019, rCuSteel: 0.021, rCuAlum: 0.019, rAlPvc: 0.030, rAlSteel: 0.032, rAlAlum: 0.030, xPvc: 0.038, xSteel: 0.048, xAlum: 0.038, rCuDc: 0.0171, rAlDc: 0.0282, diameterIn: 0.8660, areaKcmil: 750 },
  { size: "1000", rCuPvc: 0.015, rCuSteel: 0.017, rCuAlum: 0.015, rAlPvc: 0.023, rAlSteel: 0.025, rAlAlum: 0.023, xPvc: 0.037, xSteel: 0.046, xAlum: 0.037, rCuDc: 0.0129, rAlDc: 0.0212, diameterIn: 1.0000, areaKcmil: 1000 }
];

// IEC 60228 class 2 metric conductors (values per 1000 ft at 75°C)
// Originally maximum DC resistance in Ohms/km at 20°C, corrected to 75°C and converted to /1000 ft
export const METRIC_CONDUCTORS: ConductorData[] = [
  { size: "1.5", rCuPvc: 4.48, rCuSteel: 4.48, rCuAlum: 4.48, rAlPvc: 6.74, rAlSteel: 6.74, rAlAlum: 6.74, xPvc: 0.058, xSteel: 0.073, xAlum: 0.058, rCuDc: 4.48, rAlDc: 6.74, diameterIn: 0.0543, areaKcmil: 2.96 },
  { size: "2.5", rCuPvc: 2.75, rCuSteel: 2.75, rCuAlum: 2.75, rAlPvc: 4.51, rAlSteel: 4.51, rAlAlum: 4.51, xPvc: 0.054, xSteel: 0.068, xAlum: 0.054, rCuDc: 2.75, rAlDc: 4.51, diameterIn: 0.0701, areaKcmil: 4.93 },
  { size: "4", rCuPvc: 1.71, rCuSteel: 1.71, rCuAlum: 1.71, rAlPvc: 2.76, rAlSteel: 2.76, rAlAlum: 2.76, xPvc: 0.050, xSteel: 0.063, xAlum: 0.050, rCuDc: 1.71, rAlDc: 2.76, diameterIn: 0.0886, areaKcmil: 7.89 },
  { size: "6", rCuPvc: 1.14, rCuSteel: 1.14, rCuAlum: 1.14, rAlPvc: 1.72, rAlSteel: 1.72, rAlAlum: 1.72, xPvc: 0.052, xSteel: 0.065, xAlum: 0.052, rCuDc: 1.14, rAlDc: 1.72, diameterIn: 0.1087, areaKcmil: 11.84 },
  { size: "10", rCuPvc: 0.68, rCuSteel: 0.68, rCuAlum: 0.68, rAlPvc: 1.15, rAlSteel: 1.15, rAlAlum: 1.15, xPvc: 0.051, xSteel: 0.064, xAlum: 0.051, rCuDc: 0.68, rAlDc: 1.15, diameterIn: 0.1402, areaKcmil: 19.74 },
  { size: "16", rCuPvc: 0.43, rCuSteel: 0.43, rCuAlum: 0.43, rAlPvc: 0.71, rAlSteel: 0.71, rAlAlum: 0.71, xPvc: 0.050, xSteel: 0.062, xAlum: 0.050, rCuDc: 0.43, rAlDc: 0.71, diameterIn: 0.1772, areaKcmil: 31.58 },
  { size: "25", rCuPvc: 0.27, rCuSteel: 0.27, rCuAlum: 0.27, rAlPvc: 0.448, rAlSteel: 0.448, rAlAlum: 0.448, xPvc: 0.047, xSteel: 0.059, xAlum: 0.047, rCuDc: 0.27, rAlDc: 0.448, diameterIn: 0.2213, areaKcmil: 49.34 },
  { size: "35", rCuPvc: 0.194, rCuSteel: 0.194, rCuAlum: 0.194, rAlPvc: 0.323, rAlSteel: 0.323, rAlAlum: 0.323, xPvc: 0.045, xSteel: 0.057, xAlum: 0.045, rCuDc: 0.194, rAlDc: 0.323, diameterIn: 0.2618, areaKcmil: 69.07 },
  { size: "50", rCuPvc: 0.143, rCuSteel: 0.143, rCuAlum: 0.143, rAlPvc: 0.239, rAlSteel: 0.239, rAlAlum: 0.239, xPvc: 0.044, xSteel: 0.055, xAlum: 0.044, rCuDc: 0.143, rAlDc: 0.239, diameterIn: 0.3150, areaKcmil: 98.69 },
  { size: "70", rCuPvc: 0.099, rCuSteel: 0.099, rCuAlum: 0.099, rAlPvc: 0.165, rAlSteel: 0.165, rAlAlum: 0.165, xPvc: 0.043, xSteel: 0.054, xAlum: 0.043, rCuDc: 0.099, rAlDc: 0.165, diameterIn: 0.3740, areaKcmil: 138.2 },
  { size: "95", rCuPvc: 0.0715, rCuSteel: 0.0715, rCuAlum: 0.0715, rAlPvc: 0.119, rAlSteel: 0.119, rAlAlum: 0.119, xPvc: 0.042, xSteel: 0.052, xAlum: 0.042, rCuDc: 0.0715, rAlDc: 0.119, diameterIn: 0.4409, areaKcmil: 187.5 },
  { size: "120", rCuPvc: 0.0567, rCuSteel: 0.0567, rCuAlum: 0.0567, rAlPvc: 0.0942, rAlSteel: 0.0942, rAlAlum: 0.0942, xPvc: 0.041, xSteel: 0.051, xAlum: 0.041, rCuDc: 0.0567, rAlDc: 0.0942, diameterIn: 0.4961, areaKcmil: 236.8 },
  { size: "150", rCuPvc: 0.046, rCuSteel: 0.046, rCuAlum: 0.046, rAlPvc: 0.0768, rAlSteel: 0.0768, rAlAlum: 0.0768, xPvc: 0.041, xSteel: 0.051, xAlum: 0.041, rCuDc: 0.046, rAlDc: 0.0768, diameterIn: 0.5512, areaKcmil: 296.1 },
  { size: "185", rCuPvc: 0.0366, rCuSteel: 0.0366, rCuAlum: 0.0366, rAlPvc: 0.0628, rAlSteel: 0.0628, rAlAlum: 0.0628, xPvc: 0.040, xSteel: 0.050, xAlum: 0.040, rCuDc: 0.0366, rAlDc: 0.0628, diameterIn: 0.6181, areaKcmil: 365.1 },
  { size: "240", rCuPvc: 0.0279, rCuSteel: 0.0279, rCuAlum: 0.0279, rAlPvc: 0.0466, rAlSteel: 0.0466, rAlAlum: 0.0466, xPvc: 0.039, xSteel: 0.048, xAlum: 0.039, rCuDc: 0.0279, rAlDc: 0.0466, diameterIn: 0.7047, areaKcmil: 473.7 },
  { size: "300", rCuPvc: 0.0223, rCuSteel: 0.0223, rCuAlum: 0.0223, rAlPvc: 0.0372, rAlSteel: 0.0372, rAlAlum: 0.0372, xPvc: 0.039, xSteel: 0.048, xAlum: 0.039, rCuDc: 0.0223, rAlDc: 0.0372, diameterIn: 0.7874, areaKcmil: 592.1 }
];

export function calculateVoltageDropCalculator(inputs: Record<string, any>): VoltageDropCalculatorOutputs {
  // 1. Inputs Parsing & Sensible Defaults
  const v = Math.max(0.1, inputs.voltage !== undefined ? Number(inputs.voltage) : 120);
  const i = Math.max(0, inputs.currentAmps !== undefined ? Number(inputs.currentAmps) : 15);
  const rawDist = inputs.distance !== undefined ? inputs.distance : (inputs.distanceFt !== undefined ? inputs.distanceFt : 100);
  const distanceInput = Math.max(0, Number(rawDist) || 0);
  const distUnit = inputs.distanceUnit === "m" ? "m" : "ft";
  const phase = inputs.phase || "ac_single"; // dc, ac_single, ac_three
  const mode = inputs.mode || "nec"; // nec, estimated, custom
  const mat = inputs.wireMaterial || "copper"; // copper, aluminum
  const size = String(inputs.wireSize || inputs.wireGauge || "12");
  const condType = inputs.wireType || "awg"; // awg, metric
  const conduit = inputs.conduitMaterial || "pvc"; // pvc, steel, aluminum
  const pf = Math.max(0, Math.min(1, inputs.powerFactor !== undefined ? Number(inputs.powerFactor) : 0.85));
  const condPerPhase = Math.max(1, Math.round(Number(inputs.conductorsPerPhase) || 1));

  // Convert distance to feet internally for lookup calculations
  const distanceFt = distUnit === "m" ? distanceInput / 0.3048 : distanceInput;

  let rPer1000Ft = 0;
  let xPer1000Ft = 0;
  let zPer1000Ft = 0;

  // 2. Lookup parameters based on calculation mode
  if (mode === "custom") {
    // Custom resistance and reactance inputs
    const rawR = Number(inputs.customResistance) || 0;
    const rawX = Number(inputs.customReactance) || 0;
    const rUnit = inputs.customResistanceUnit || "ft"; // ft = /1000ft, m = /km
    const xUnit = inputs.customReactanceUnit || "ft";

    rPer1000Ft = rUnit === "m" ? rawR * 0.3048 : rawR;
    xPer1000Ft = xUnit === "m" ? rawX * 0.3048 : rawX;
  } else {
    // Look up in lists
    const conductorList = condType === "metric" ? METRIC_CONDUCTORS : AWG_CONDUCTORS;
    const entry = conductorList.find(c => c.size === size) || conductorList[1]; // fallback to 12 AWG

    if (phase === "dc" || mode === "estimated") {
      // DC circuits and basic estimated mode use DC resistance (Table 8) and ignore reactance (X = 0)
      rPer1000Ft = mat === "aluminum" ? entry.rAlDc : entry.rCuDc;
      xPer1000Ft = 0;
    } else {
      // NEC mode: AC resistance and reactance (Table 9)
      if (mat === "aluminum") {
        rPer1000Ft = conduit === "steel" ? entry.rAlSteel : (conduit === "aluminum" ? entry.rAlAlum : entry.rAlPvc);
      } else {
        rPer1000Ft = conduit === "steel" ? entry.rCuSteel : (conduit === "aluminum" ? entry.rCuAlum : entry.rCuPvc);
      }
      xPer1000Ft = conduit === "steel" ? entry.xSteel : (conduit === "aluminum" ? entry.xAlum : entry.xPvc);
    }
  }

  // 3. Compute Effective Impedance (Z) per 1000 ft
  if (phase === "dc") {
    // DC: Z = R
    zPer1000Ft = rPer1000Ft;
  } else {
    // AC: Z = R * cos(theta) + X * sin(theta)
    const sinTheta = Math.sqrt(1 - pf * pf);
    zPer1000Ft = rPer1000Ft * pf + xPer1000Ft * sinTheta;
  }

  // Parallel conductors reduce impedance proportionally
  const effectiveZ = zPer1000Ft / condPerPhase;
  const effectiveR = rPer1000Ft / condPerPhase;
  const effectiveX = xPer1000Ft / condPerPhase;

  // 4. Calculate Voltage Drop (V_drop)
  let factor = 2; // Default for DC and AC Single-Phase
  let phaseName = "Single Phase AC";
  if (phase === "dc") {
    factor = 2;
    phaseName = "Direct Current (DC)";
  } else if (phase === "ac_three") {
    factor = Math.sqrt(3);
    phaseName = "Three Phase AC";
  }

  // V_drop = factor * I * L * Z_effective / 1000
  const vDrop = (factor * i * distanceFt * effectiveZ) / 1000;
  const pct = v.valueOf() > 0 ? (vDrop / v) * 100 : 0;
  const vLoad = Math.max(0, v - vDrop);

  // 5. Generate Formula Step breakdown text
  let breakdown = "";
  if (phase === "dc") {
    breakdown = `Voltage Drop (Vd) = (2 × L × I × R) / 1000\n` +
      `  = (2 × ${distanceFt.toFixed(1)} ft × ${i} A × (${rPer1000Ft} Ω/1000ft / ${condPerPhase} parallel)) / 1000\n` +
      `  = (2 × ${distanceFt.toFixed(1)} × ${i} × ${effectiveR.toFixed(5)}) / 1000\n` +
      `  = ${vDrop.toFixed(4)} V`;
  } else {
    const sinTheta = Math.sqrt(1 - pf * pf);
    const fStr = phase === "ac_three" ? "√3" : "2";
    breakdown = `Z_effective = R_ac × PF + X_ac × sin(arccos(PF))\n` +
      `  = (${rPer1000Ft} × ${pf}) + (${xPer1000Ft} × ${sinTheta.toFixed(4)})\n` +
      `  = ${zPer1000Ft.toFixed(5)} Ω/1000ft\n\n` +
      `Impedance per Conductor Run (Z_run) = Z_effective / N\n` +
      `  = ${zPer1000Ft.toFixed(5)} / ${condPerPhase} = ${effectiveZ.toFixed(5)} Ω/1000ft\n\n` +
      `Voltage Drop (Vd) = (${fStr} × I × L × Z_run) / 1000\n` +
      `  = (${fStr} × ${i} A × ${distanceFt.toFixed(1)} ft × ${effectiveZ.toFixed(5)} Ω/1000ft) / 1000\n` +
      `  = ${vDrop.toFixed(4)} V`;
  }

  return {
    voltageDrop: parseFloat(vDrop.toFixed(3)),
    voltageDropPct: parseFloat(pct.toFixed(2)),
    endVoltage: parseFloat(vLoad.toFixed(2)),
    startingVoltage: v,
    current: i,
    distance: distanceInput,
    distanceUnit: distUnit,
    pf,
    phase: phaseName,
    wireSize: condType === "metric" ? `${size} mm²` : `${size} AWG`,
    wireMaterial: mat.charAt(0).toUpperCase() + mat.slice(1),
    conductors: condPerPhase,
    r: parseFloat(effectiveR.toFixed(5)),
    x: parseFloat(effectiveX.toFixed(5)),
    z: parseFloat(effectiveZ.toFixed(5)),
    formulaBreakdown: breakdown
  };
}

export default calculateVoltageDropCalculator;
