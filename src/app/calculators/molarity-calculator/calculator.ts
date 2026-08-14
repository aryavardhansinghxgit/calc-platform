import {
  MolarityCalculatorOutputs,
  MolarityMode,
  SolveVariable,
  DilutionResult,
  MassPercentResult,
  PPMResult,
} from "./types";
import { HYDRATE_WATER_MOLAR_MASS } from "./compounds";

/**
 * Format numbers with smart scientific notation when extremely small/large
 */
export function formatScientificNumber(val: number, decimals: number = 4): string {
  if (val === 0) return "0";
  const absVal = Math.abs(val);
  if (absVal < 0.0001 || absVal >= 100000) {
    return val.toExponential(decimals);
  }
  return val.toFixed(decimals);
}

/**
 * Solve Mass / Molarity / Volume / Molar Mass
 */
export function solveMolarityMass(
  variable: SolveVariable,
  massGrams: number,
  molarityM: number,
  volumeLiters: number,
  molarMass: number,
  hydrateWaters: number = 0
): { solvedValue: number; totalMolarMass: number; protocol: string[] } {
  const effectiveMW = Math.max(0.001, molarMass + hydrateWaters * HYDRATE_WATER_MOLAR_MASS);

  let solvedValue = 0;
  const protocol: string[] = [];

  switch (variable) {
    case "molarity": {
      // M = m / (MW * V)
      const v = Math.max(0.000001, volumeLiters);
      solvedValue = massGrams / (effectiveMW * v);
      protocol.push(`1. Weigh exactly ${formatScientificNumber(massGrams, 3)} g of solute.`);
      protocol.push(
        `2. Dissolve solute in ~${formatScientificNumber(v * 0.8 * 1000, 1)} mL of deionized water in a volumetric flask.`
      );
      protocol.push(`3. Mix thoroughly until solute is completely dissolved.`);
      protocol.push(
        `4. Add deionized water up to the ${formatScientificNumber(
          v * 1000,
          1
        )} mL meniscus line to achieve ${formatScientificNumber(solvedValue, 4)} M concentration.`
      );
      break;
    }
    case "mass": {
      // m = M * MW * V
      solvedValue = molarityM * effectiveMW * volumeLiters;
      protocol.push(`1. Weigh exactly ${formatScientificNumber(solvedValue, 3)} g of solute.`);
      protocol.push(
        `2. Dissolve solute in ~${formatScientificNumber(volumeLiters * 0.8 * 1000, 1)} mL of deionized water.`
      );
      protocol.push(`3. Mix thoroughly until solute is completely dissolved.`);
      protocol.push(
        `4. Bring final solution volume up to ${formatScientificNumber(
          volumeLiters * 1000,
          1
        )} mL in a volumetric flask.`
      );
      break;
    }
    case "volume": {
      // V = m / (M * MW)
      const m = Math.max(0.000001, molarityM);
      solvedValue = massGrams / (m * effectiveMW);
      protocol.push(
        `1. Dissolve ${formatScientificNumber(massGrams, 3)} g of solute to achieve a ${formatScientificNumber(
          molarityM,
          4
        )} M concentration.`
      );
      protocol.push(
        `2. Bring the total solution volume up to exactly ${formatScientificNumber(
          solvedValue * 1000,
          1
        )} mL (${formatScientificNumber(solvedValue, 3)} L).`
      );
      break;
    }
    case "molar_mass": {
      // MW = m / (M * V)
      const denom = Math.max(0.000001, molarityM * volumeLiters);
      solvedValue = massGrams / denom;
      protocol.push(
        `Determined effective solute formula weight: ${formatScientificNumber(solvedValue, 3)} g/mol.`
      );
      break;
    }
  }

  return { solvedValue, totalMolarMass: effectiveMW, protocol };
}

/**
 * Solve Stock Dilution (C1V1 = C2V2)
 */
export function solveStockDilution(
  c1: number,
  v1: number,
  c2: number,
  v2: number,
  solveTarget: "v1" | "c1" | "v2" | "c2"
): DilutionResult {
  let resC1 = c1;
  let resV1 = v1;
  let resC2 = c2;
  let resV2 = v2;

  if (solveTarget === "v1") {
    resV1 = c1 > 0 ? (c2 * v2) / c1 : 0;
  } else if (solveTarget === "c1") {
    resC1 = v1 > 0 ? (c2 * v2) / v1 : 0;
  } else if (solveTarget === "v2") {
    resV2 = c2 > 0 ? (c1 * v1) / c2 : 0;
  } else if (solveTarget === "c2") {
    resC2 = v2 > 0 ? (c1 * v1) / v2 : 0;
  }

  const solventVolumeNeeded = Math.max(0, resV2 - resV1);

  const pipetteProtocol =
    `Pipette exactly ${formatScientificNumber(resV1, 2)} mL of stock solution (${formatScientificNumber(
      resC1,
      2
    )} M), and dilute with ${formatScientificNumber(
      solventVolumeNeeded,
      2
    )} mL of solvent to reach a final volume of ${formatScientificNumber(resV2, 2)} mL (${formatScientificNumber(
      resC2,
      2
    )} M).`;

  return {
    c1: resC1,
    v1: resV1,
    c2: resC2,
    v2: resV2,
    solventVolumeNeeded,
    pipetteProtocol,
  };
}

/**
 * Solve Mass % & Density to Molarity & Normality
 */
export function solveMassPercent(
  massPercent: number,
  densityGperML: number,
  molarMass: number,
  valence: number = 1
): MassPercentResult {
  const mw = Math.max(0.001, molarMass);
  const molarityM = (massPercent * densityGperML * 10) / mw;
  const normalityN = molarityM * Math.max(1, valence);

  return {
    molarityM: parseFloat(molarityM.toFixed(4)),
    normalityN: parseFloat(normalityN.toFixed(4)),
    molesPerLiter: parseFloat(molarityM.toFixed(4)),
  };
}

/**
 * Solve PPM / PPB to Molarity & Molality
 */
export function solvePPMToMolarity(
  ppm: number,
  molarMass: number,
  densityGperML: number = 1.0
): PPMResult {
  const mw = Math.max(0.001, molarMass);
  // 1 PPM = 1 mg/L = 0.001 g/L
  const gramsPerLiter = ppm / 1000;
  const molarityM = gramsPerLiter / mw;
  // Molality m = moles / kg solvent
  const solventKgPerLiter = (densityGperML * 1000 - gramsPerLiter) / 1000;
  const molalityM = solventKgPerLiter > 0 ? (gramsPerLiter / mw) / solventKgPerLiter : molarityM;

  return {
    ppm,
    molarityM: parseFloat(molarityM.toFixed(6)),
    molalityM: parseFloat(molalityM.toFixed(6)),
  };
}

/**
 * Main Molarity Synthesizer
 */
export function calculateMolarityCalculator(inputs: Record<string, any>): MolarityCalculatorOutputs {
  const mode: MolarityMode = (inputs.mode as MolarityMode) || "mass_solver";

  // Stock Dilution Mode
  if (mode === "dilution") {
    const c1 = Number(inputs.c1 || 10);
    const v1 = Number(inputs.v1 || 10);
    const c2 = Number(inputs.c2 || 1);
    const v2 = Number(inputs.v2 || 100);
    const target = (inputs.solveTarget as "v1" | "c1" | "v2" | "c2") || "v1";

    const dilRes = solveStockDilution(c1, v1, c2, v2, target);

    return {
      mode,
      dilutionResult: dilRes,
      benchProtocol: [
        "LABORATORY STOCK DILUTION PROTOCOL (C1V1 = C2V2):",
        `1. Measure exactly ${formatScientificNumber(dilRes.v1, 2)} mL of concentrated stock solution (${formatScientificNumber(
          dilRes.c1,
          2
        )} M).`,
        `2. Transfer into a ${formatScientificNumber(dilRes.v2, 2)} mL volumetric flask.`,
        `3. Add ${formatScientificNumber(dilRes.solventVolumeNeeded, 2)} mL of solvent (deionized water).`,
        `4. Invert 10 times to mix thoroughly.`,
      ],
    };
  }

  // Mass Percent & Density Mode
  if (mode === "mass_percent") {
    const p = Number(inputs.massPercent || 37);
    const d = Number(inputs.densityGperML || 1.19);
    const mw = Number(inputs.molarMass || 36.46);
    const v = Number(inputs.valence || 1);

    const mpRes = solveMassPercent(p, d, mw, v);

    return {
      mode,
      massPercentResult: mpRes,
      benchProtocol: [
        "STOCK BOTTLE REAGENT SPECIFICATIONS:",
        `• Mass Percentage: ${p}%`,
        `• Reagent Density: ${d} g/mL`,
        `• Molar Mass: ${mw} g/mol`,
        `• Calculated Molarity: ${mpRes.molarityM} mol/L (M)`,
        `• Calculated Normality: ${mpRes.normalityN} equiv/L (N)`,
      ],
    };
  }

  // PPM / PPB Converter Mode
  if (mode === "ppm_converter") {
    const ppm = Number(inputs.ppm || 500);
    const mw = Number(inputs.molarMass || 58.44);
    const d = Number(inputs.densityGperML || 1.0);

    const ppmRes = solvePPMToMolarity(ppm, mw, d);

    return {
      mode,
      ppmResult: ppmRes,
      benchProtocol: [
        "PARTS PER MILLION (PPM) CONVERSION PROTOCOL:",
        `• Concentration: ${ppm} ppm (${ppm} mg/L)`,
        `• Solute Molar Mass: ${mw} g/mol`,
        `• Calculated Molarity: ${formatScientificNumber(ppmRes.molarityM, 6)} M`,
        `• Calculated Molality: ${formatScientificNumber(ppmRes.molalityM, 6)} mol/kg`,
      ],
    };
  }

  // Default: Mass & Molarity 4-Variable Solver Mode
  const varToSolve: SolveVariable = (inputs.solveVariable as SolveVariable) || "molarity";
  const massGrams = Number(inputs.massGrams || 58.44);
  const molarityM = Number(inputs.molarityM || 1.0);
  const volumeLiters = Number(inputs.volumeLiters || 1.0);
  const molarMass = Number(inputs.molarMass || 58.44);
  const hydrateWaters = Number(inputs.hydrateWaters || 0);

  const { solvedValue, totalMolarMass, protocol } = solveMolarityMass(
    varToSolve,
    massGrams,
    molarityM,
    volumeLiters,
    molarMass,
    hydrateWaters
  );

  return {
    mode,
    solvedVariable: varToSolve,
    solvedValue: parseFloat(solvedValue.toFixed(4)),
    formattedSolvedValue: formatScientificNumber(solvedValue, 4),
    molarityM: varToSolve === "molarity" ? solvedValue : molarityM,
    massGrams: varToSolve === "mass" ? solvedValue : massGrams,
    volumeLiters: varToSolve === "volume" ? solvedValue : volumeLiters,
    molarMass: totalMolarMass,
    benchProtocol: protocol,
  };
}
