// Peter J. Acklam's inverse normal CDF
function acklamInverseNormalCDF(p: number): number {
  if (p <= 0 || p >= 1) return NaN;
  if (p === 0.5) return 0.0;

  const a = [
    -3.969683028665376e1,
    2.209460984245205e2,
    -2.759285104469687e2,
    1.38357751867269e2,
    -3.066479806614716e1,
    2.506628277459239e0
  ];
  const b = [
    -5.447609879822406e1,
    1.615858368580409e2,
    -1.556989798598866e2,
    6.680131188771972e1,
    -1.328068155288572e1
  ];
  const c = [
    -7.784894002430293e-3,
    -3.223964580411365e-1,
    -2.400758277161838e0,
    -2.549732539343734e0,
    4.374664141464968e0,
    2.938163982698783e0
  ];
  const d = [
    7.784695709041462e-3,
    3.224671290700398e-1,
    2.445134137142996e0,
    3.754408661907416e0
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number, r: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
}

function getZ(confPct: number): number {
  if (Math.abs(confPct - 99) < 0.01) return 2.575829;
  if (Math.abs(confPct - 95) < 0.01) return 1.959964;
  if (Math.abs(confPct - 90) < 0.01) return 1.644854;
  const alpha = (100 - confPct) / 100;
  return Math.abs(acklamInverseNormalCDF(alpha / 2));
}

function getZPower(pwrPct: number): number {
  if (Math.abs(pwrPct - 80) < 0.01) return 0.841621;
  if (Math.abs(pwrPct - 90) < 0.01) return 1.281552;
  if (Math.abs(pwrPct - 95) < 0.01) return 1.644854;
  if (Math.abs(pwrPct - 99) < 0.01) return 2.326348;
  return Math.abs(acklamInverseNormalCDF(pwrPct / 100));
}

// Test G1: 95% Conf, MOE 5%, infinite
const z95 = getZ(95);
const n0_g1 = (z95 * z95 * 0.25) / (0.05 * 0.05);
console.log("G1 n0:", n0_g1, "ceil:", Math.ceil(n0_g1));

// Test G2: 95% Conf, MOE 5%, N = 1000
const n_fpc_g2 = n0_g1 / (1 + (n0_g1 - 1) / 1000);
console.log("G2 FPC(n0):", n_fpc_g2, "ceil:", Math.ceil(n_fpc_g2));

// Test G3: 99% Conf, MOE 11%, infinite
const z99 = getZ(99);
const n0_g3 = (z99 * z99 * 0.25) / (0.11 * 0.11);
console.log("G3 n0:", n0_g3, "ceil:", Math.ceil(n0_g3));

// Test G4: 385 completed, 80% response
const invites_g4 = 385 / 0.80;
console.log("G4 invites:", invites_g4, "ceil:", Math.ceil(invites_g4));

// Test G5: n = 400, 95% conf -> MOE
const moe_g5 = z95 * Math.sqrt(0.25 / 400);
console.log("G5 MOE:", (moe_g5 * 100).toFixed(2));

// Test G6: n = 400, 90% conf -> MOE
const z90 = getZ(90);
const moe_g6 = z90 * Math.sqrt(0.25 / 400);
console.log("G6 MOE:", (moe_g6 * 100).toFixed(2));

// Test G7: A/B 3% vs 3.5%, 80% power
const zBeta80 = getZPower(80);
const rawN_ab80 = (Math.pow(z95 + zBeta80, 2) * (0.03 * 0.97 + 0.035 * 0.965)) / Math.pow(0.005, 2);
console.log("G7 A/B 80%:", rawN_ab80, "ceil:", Math.ceil(rawN_ab80));

// Test G8: A/B 3.1% vs 3.9%, 90% power
const zBeta90 = getZPower(90);
const rawN_ab90 = (Math.pow(z95 + zBeta90, 2) * (0.031 * 0.969 + 0.039 * 0.961)) / Math.pow(0.008, 2);
console.log("G8 A/B 90%:", rawN_ab90, "ceil:", Math.ceil(rawN_ab90));

// Benchmark Matrix verification:
const populations = [100, 500, 1000, 10000, 100000];
console.log("\nBenchmark Matrix Verification:");
for (const pop of populations) {
  // 95% ±5%
  const n_95_5 = Math.ceil(n0_g1 / (1 + (n0_g1 - 1) / pop));
  // 95% ±3%
  const n0_95_3 = (z95 * z95 * 0.25) / (0.03 * 0.03);
  const n_95_3 = Math.ceil(n0_95_3 / (1 + (n0_95_3 - 1) / pop));
  // 99% ±1%
  const n0_99_1 = (z99 * z99 * 0.25) / (0.01 * 0.01);
  const n_99_1 = Math.ceil(n0_99_1 / (1 + (n0_99_1 - 1) / pop));
  console.log(`N=${pop}: 95%±5% -> ${n_95_5} | 95%±3% -> ${n_95_3} | 99%±1% -> ${n_99_1}`);
}
