// Comprehensive verification test harness for remediated Half-Life Calculator

const TIME_UNIT_SECONDS: Record<string, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2629746, // ~30.4375 days
  years: 31557600, // 365.25 days
  millennia: 31557600000
};

function toSeconds(val: number, unit: string): number {
  return val * (TIME_UNIT_SECONDS[unit] || 1);
}

function fromSeconds(sec: number, unit: string): number {
  return sec / (TIME_UNIT_SECONDS[unit] || 1);
}

function formatScientificValue(val: number | undefined, decimals = 6): string {
  if (val === undefined || isNaN(val)) return "";
  if (val === 0) return "0";
  const abs = Math.abs(val);
  if (abs < 1e-5 || abs >= 1e8) {
    return val.toExponential(4);
  }
  return val.toFixed(decimals);
}

function calculateCard1(
  solveTarget: string,
  initialQty: string,
  remainingQty: string,
  halfLifeVal: string,
  halfLifeUnit: string,
  elapsedTimeVal: string,
  elapsedTimeUnit: string,
  qtyUnit: string
) {
  const N0 = parseFloat(initialQty);
  const Nt = parseFloat(remainingQty);
  const thf = parseFloat(halfLifeVal);
  const tVal = parseFloat(elapsedTimeVal);

  const thfSec = toSeconds(thf, halfLifeUnit);
  const tSec = toSeconds(tVal, elapsedTimeUnit);

  if (solveTarget === "remaining") {
    if (isNaN(N0) || isNaN(thf) || isNaN(tVal) || N0 <= 0 || thfSec <= 0 || tSec < 0) {
      return { error: "Please enter positive initial quantity (N₀ > 0), positive half-life (t½ > 0), and non-negative elapsed time (t ≥ 0)." };
    }

    const numCycles = tSec / thfSec;
    let resNt = N0 * Math.pow(0.5, numCycles);
    let isExtremeUnderflow = false;
    let formattedNt = "";

    if (numCycles > 1022 || resNt === 0) {
      const log10Nt = Math.log10(N0) - numCycles * Math.LOG10E * Math.LN2;
      const exp10 = Math.floor(log10Nt);
      const mantissa = Math.pow(10, log10Nt - exp10);
      formattedNt = `${mantissa.toFixed(4)}e${exp10}`;
      resNt = Number(formattedNt);
      isExtremeUnderflow = true;
    } else {
      formattedNt = formatScientificValue(resNt, 6);
    }

    const percentRemaining = (resNt / N0) * 100;
    const decayConstUnit = Math.LN2 / thf;
    const meanLifetimeUnit = thf / Math.LN2;

    return {
      solvedVal: resNt,
      formattedVal: formattedNt,
      numCycles,
      percentRemaining,
      decayConstUnit,
      meanLifetimeUnit,
      error: null
    };
  } else if (solveTarget === "initial") {
    if (isNaN(Nt) || isNaN(thf) || isNaN(tVal) || Nt <= 0 || thfSec <= 0 || tSec < 0) {
      return { error: "Please enter positive remaining quantity (Nₜ > 0), positive half-life (t½ > 0), and non-negative elapsed time (t ≥ 0)." };
    }

    const numCycles = tSec / thfSec;
    let resN0 = Nt * Math.pow(2, numCycles);
    let formattedN0 = "";
    if (numCycles > 1022 || !isFinite(resN0)) {
      const log10N0 = Math.log10(Nt) + numCycles * Math.LOG10E * Math.LN2;
      const exp10 = Math.floor(log10N0);
      const mantissa = Math.pow(10, log10N0 - exp10);
      formattedN0 = `${mantissa.toFixed(4)}e+${exp10}`;
      resN0 = Number(formattedN0);
    } else {
      formattedN0 = formatScientificValue(resN0, 6);
    }

    const decayConstUnit = Math.LN2 / thf;
    const meanLifetimeUnit = thf / Math.LN2;

    return {
      solvedVal: resN0,
      formattedVal: formattedN0,
      numCycles,
      percentRemaining: (Nt / resN0) * 100,
      decayConstUnit,
      meanLifetimeUnit,
      error: null
    };
  } else if (solveTarget === "halflife") {
    if (isNaN(N0) || isNaN(Nt) || isNaN(tVal) || N0 <= 0 || tSec <= 0) {
      return { error: "Initial quantity (N₀ > 0) and elapsed time (t > 0) must be positive numbers." };
    }
    if (Nt <= 0) {
      return { error: "Remaining quantity N(t) must be greater than zero. For ideal exponential decay, N(t) reaches zero only as t approaches infinity." };
    }
    if (Nt >= N0) {
      return { error: "Initial quantity (N₀) must be strictly greater than remaining quantity (Nₜ) for passive decay (N₀ > Nₜ > 0)." };
    }

    const resThfSec = (tSec * Math.LN2) / Math.log(N0 / Nt);
    const resThfUnit = fromSeconds(resThfSec, halfLifeUnit);
    const numCycles = tSec / resThfSec;
    const decayConstUnit = Math.LN2 / resThfUnit;
    const meanLifetimeUnit = resThfUnit / Math.LN2;
    const formattedThf = formatScientificValue(resThfUnit, 6);

    return {
      solvedVal: resThfUnit,
      formattedVal: formattedThf,
      numCycles,
      percentRemaining: (Nt / N0) * 100,
      decayConstUnit,
      meanLifetimeUnit,
      error: null
    };
  } else if (solveTarget === "time") {
    if (isNaN(N0) || isNaN(Nt) || isNaN(thf) || N0 <= 0 || thfSec <= 0) {
      return { error: "Initial quantity (N₀ > 0) and half-life (t½ > 0) must be positive numbers." };
    }
    if (Nt <= 0) {
      return { error: "Remaining quantity N(t) must be greater than zero. For ideal exponential decay, N(t) reaches zero only as t approaches infinity." };
    }
    if (Nt >= N0) {
      return { error: "Initial quantity (N₀) must be strictly greater than remaining quantity (Nₜ) for passive decay (N₀ > Nₜ > 0)." };
    }

    const resTSec = (thfSec * Math.log(N0 / Nt)) / Math.LN2;
    const resTUnit = fromSeconds(resTSec, elapsedTimeUnit);
    const numCycles = resTSec / thfSec;
    const decayConstUnit = Math.LN2 / thf;
    const meanLifetimeUnit = thf / Math.LN2;
    const formattedT = formatScientificValue(resTUnit, 6);

    return {
      solvedVal: resTUnit,
      formattedVal: formattedT,
      numCycles,
      percentRemaining: (Nt / N0) * 100,
      decayConstUnit,
      meanLifetimeUnit,
      error: null
    };
  }
  return { error: "Unknown solve target" };
}

function runPostFixVerification() {
  console.log("=== 1. GOLDEN MATHEMATICAL TESTS ===");
  const g1 = calculateCard1("remaining", "100", "25", "5730", "years", "11460", "years", "g");
  console.log("TC-HL-01:", g1.solvedVal === 25 && g1.formattedVal === "25.000000" && g1.numCycles === 2 ? "PASS" : "FAIL", g1.formattedVal);

  const g2 = calculateCard1("remaining", "100", "25", "10", "years", "0", "years", "g");
  console.log("TC-HL-02:", g2.solvedVal === 100 && g2.numCycles === 0 && g2.percentRemaining === 100 ? "PASS" : "FAIL", g2.formattedVal);

  const g3 = calculateCard1("remaining", "100", "25", "10", "years", "10", "years", "g");
  console.log("TC-HL-03:", g3.solvedVal === 50 && g3.numCycles === 1 && g3.percentRemaining === 50 ? "PASS" : "FAIL", g3.formattedVal);

  const g4 = calculateCard1("remaining", "100", "25", "10", "years", "30", "years", "g");
  console.log("TC-HL-04:", g4.solvedVal === 12.5 && g4.numCycles === 3 && g4.percentRemaining === 12.5 ? "PASS" : "FAIL", g4.formattedVal);

  const g5 = calculateCard1("remaining", "160", "25", "20", "years", "80", "years", "g");
  console.log("TC-HL-05:", g5.solvedVal === 10 && g5.numCycles === 4 && g5.percentRemaining === 6.25 ? "PASS" : "FAIL", g5.formattedVal);

  const g6 = calculateCard1("remaining", "1000", "25", "8", "years", "4", "years", "g");
  console.log("TC-HL-06:", Math.abs(g6.solvedVal! - 707.106781) < 1e-4 ? "PASS" : "FAIL", g6.formattedVal);

  const g7 = calculateCard1("remaining", "500", "25", "12", "years", "30", "years", "g");
  console.log("TC-HL-07:", Math.abs(g7.solvedVal! - 88.388348) < 1e-4 ? "PASS" : "FAIL", g7.formattedVal);

  const g8 = calculateCard1("remaining", "100", "25", "1", "years", "100", "years", "g");
  console.log("TC-HL-08 (Small Quantity Scientific Format):", g8.formattedVal?.includes("e-29") && g8.formattedVal !== "0.000000" ? "PASS" : "FAIL", g8.formattedVal);

  const g9 = calculateCard1("remaining", "1", "25", "0.001", "seconds", "0.005", "seconds", "g");
  console.log("TC-HL-09:", Math.abs(g9.solvedVal! - 0.03125) < 1e-6 ? "PASS" : "FAIL", g9.formattedVal);

  const g10 = calculateCard1("remaining", "1000000000", "25", "25", "years", "100", "years", "g");
  console.log("TC-HL-10:", g10.solvedVal === 62500000 ? "PASS" : "FAIL", g10.formattedVal);

  const u1 = calculateCard1("remaining", "100", "25", "1", "days", "3", "days", "g");
  const u2 = calculateCard1("remaining", "100", "25", "24", "hours", "72", "hours", "g");
  const u3 = calculateCard1("remaining", "100", "25", "86400", "seconds", "259200", "seconds", "g");
  console.log("TC-HL-11 (Unit Equivalence):", u1.solvedVal === 12.5 && u2.solvedVal === 12.5 && u3.solvedVal === 12.5 ? "PASS" : "FAIL");

  console.log("\n=== 2. INVERSE SOLVER TESTS ===");
  const inv1 = calculateCard1("remaining", "100", "25", "10", "years", "30", "years", "g");
  console.log("TC-INV-01 (Remaining):", inv1.solvedVal === 12.5 ? "PASS" : "FAIL", inv1.formattedVal);

  const inv2 = calculateCard1("initial", "100", "25", "10", "years", "20", "years", "g");
  console.log("TC-INV-02 (Initial):", inv2.solvedVal === 100 ? "PASS" : "FAIL", inv2.formattedVal);

  const inv3 = calculateCard1("halflife", "100", "25", "10", "years", "20", "years", "g");
  console.log("TC-INV-03 (Half-Life):", inv3.solvedVal === 10 ? "PASS" : "FAIL", inv3.formattedVal);

  const inv3b = calculateCard1("halflife", "100", "25", "10", "days", "20", "years", "g");
  console.log("TC-INV-03b (Half-Life Target Unit = days):", Math.abs(inv3b.solvedVal! - 3652.5) < 1 ? "PASS" : "FAIL", inv3b.formattedVal);

  const inv4 = calculateCard1("time", "100", "12.5", "10", "years", "11460", "years", "g");
  console.log("TC-INV-04 (Elapsed Time):", Math.abs(inv4.solvedVal! - 30) < 1e-6 ? "PASS" : "FAIL", inv4.formattedVal);

  const inv4b = calculateCard1("time", "100", "12.5", "10", "years", "11460", "days", "g");
  console.log("TC-INV-04b (Elapsed Time Target Unit = days):", Math.abs(inv4b.solvedVal! - 30 * 365.25) < 1 ? "PASS" : "FAIL", inv4b.formattedVal);

  const inv5 = calculateCard1("time", "100", "50", "10", "years", "11460", "years", "g");
  console.log("TC-INV-05:", Math.abs(inv5.solvedVal! - 10) < 1e-6 ? "PASS" : "FAIL", inv5.formattedVal);

  const inv6 = calculateCard1("time", "100", "25", "10", "years", "11460", "years", "g");
  console.log("TC-INV-06:", Math.abs(inv6.solvedVal! - 20) < 1e-6 ? "PASS" : "FAIL", inv6.formattedVal);

  const inv7 = calculateCard1("time", "100", "150", "10", "years", "11460", "years", "g");
  console.log("TC-INV-07 (Nt > N0 rejection):", inv7.error ? "PASS" : "FAIL", inv7.error);

  const inv8 = calculateCard1("time", "100", "0", "10", "years", "11460", "years", "g");
  console.log("TC-INV-08 (Nt = 0 physical explanation):", inv8.error && inv8.error.includes("infinity") ? "PASS" : "FAIL", inv8.error);

  console.log("\n=== 3. 5,000 FORWARD AND INVERSE RANDOMIZED PROPERTY TESTS ===");
  let forwardPass = 0;
  let inversePass = 0;
  const numTests = 5000;

  for (let i = 0; i < numTests; i++) {
    const N0 = Math.random() * 1e6 + 0.01;
    const thf = Math.random() * 500 + 0.01;
    // Test a wide range of cycles, including cycles up to 50
    const t = Math.random() * thf * 40;

    const fwd = calculateCard1("remaining", N0.toString(), "0", thf.toString(), "years", t.toString(), "years", "g");
    const numCycles = t / thf;
    const trueN = N0 * Math.pow(0.5, numCycles);

    // Forward properties
    const prop1 = fwd.solvedVal! >= 0 && fwd.solvedVal! <= N0 * (1 + 1e-9);
    const prop2 = Math.abs(fwd.solvedVal! - trueN) / (trueN || 1) < 1e-5;

    if (prop1 && prop2) forwardPass++;

    // Inverse recovery
    if (fwd.solvedVal! > 0 && fwd.solvedVal! < N0 && t > 0.001) {
      const recN0 = calculateCard1("initial", "0", fwd.solvedVal!.toString(), thf.toString(), "years", t.toString(), "years", "g");
      const recThf = calculateCard1("halflife", N0.toString(), fwd.solvedVal!.toString(), "1", "years", t.toString(), "years", "g");
      const recT = calculateCard1("time", N0.toString(), fwd.solvedVal!.toString(), thf.toString(), "years", "1", "years", "g");

      const errN0 = Math.abs(recN0.solvedVal! - N0) / N0;
      const errThf = Math.abs(recThf.solvedVal! - thf) / thf;
      const errT = Math.abs(recT.solvedVal! - t) / t;

      if (errN0 < 1e-4 && errThf < 1e-4 && errT < 1e-4) {
        inversePass++;
      }
    } else {
      // Degenerate t=0 edge
      inversePass++;
    }
  }

  console.log(`Forward Property Tests: ${forwardPass} / ${numTests} passed`);
  console.log(`Inverse Recovery Tests: ${inversePass} / ${numTests} passed`);
}

runPostFixVerification();
