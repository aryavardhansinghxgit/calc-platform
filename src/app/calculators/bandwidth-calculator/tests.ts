import {
  calculateTransferTime,
  calculateBandwidthConversion,
  calculateHostingBandwidth,
  calculateConcurrency,
  calculateDataCap,
  calculateBandwidthCalculator,
} from "./calculator";

export function runBandwidthCalculatorTests() {
  // Test 1: Golden Case 1 (10 GB @ 100 Mbps, 10% overhead, 90% efficiency)
  const g1 = calculateTransferTime(10, "GB", 100, "Mbps", 10, 90);
  if (!g1.success) throw new Error("Golden Case 1 failed to succeed");
  if (Math.abs(g1.effectiveBps - 81000000) > 1e-5) {
    throw new Error(`Golden Case 1 effective rate expected 81000000 bps, got ${g1.effectiveBps}`);
  }
  if (Math.abs(g1.effectiveMBps - 10.125) > 1e-5) {
    throw new Error(`Golden Case 1 effective MB/s expected 10.125, got ${g1.effectiveMBps}`);
  }
  if (Math.abs(g1.theoreticalSecs - 800) > 1e-5) {
    throw new Error(`Golden Case 1 theoretical duration expected 800 s, got ${g1.theoreticalSecs}`);
  }
  const expectedRealistic = 80000000000 / 81000000; // 987.65432...
  if (Math.abs(g1.realisticSecs - expectedRealistic) > 1e-5) {
    throw new Error(`Golden Case 1 realistic duration expected ${expectedRealistic}, got ${g1.realisticSecs}`);
  }
  if (g1.realisticFormatted !== "16m 28s" && g1.realisticFormatted !== "16m 27s") {
    throw new Error(`Golden Case 1 formatted realistic time unexpected: ${g1.realisticFormatted}`);
  }

  // Test 2: Golden Case 2 (Hosting: 1M views, 2.5 MB, 15% bot, 2x surge)
  const g2 = calculateHostingBandwidth(1000000, "month", 2.5, "MB", 2.0, 15);
  if (!g2.success) throw new Error("Golden Case 2 failed to succeed");
  if (Math.abs(g2.totalMonthlyBytes - 2.875e12) > 1e-5) {
    throw new Error(`Golden Case 2 total bytes expected 2.875e12, got ${g2.totalMonthlyBytes}`);
  }
  if (Math.abs(g2.monthlyTransferTb - 2.875) > 1e-5) {
    throw new Error(`Golden Case 2 monthly TB expected 2.875, got ${g2.monthlyTransferTb}`);
  }
  const expectedAvgBps = (2.875e12 * 8) / (30.4375 * 86400); // 8,745,912.235... bps
  if (Math.abs(g2.avgBps - expectedAvgBps) > 1e-4) {
    throw new Error(`Golden Case 2 average bps expected ${expectedAvgBps}, got ${g2.avgBps}`);
  }

  // Test 3: Golden Case 3 (Concurrency: counts * speeds)
  const g3 = calculateConcurrency(
    {
      stream4k: 3,
      voip: 8,
      backups: 2,
      gaming: 5,
    },
    {
      stream4k: 25,
      voip: 3.5,
      backups: 15,
      gaming: 4,
    },
    25
  );
  if (!g3.success) throw new Error("Golden Case 3 failed to succeed");
  // 3*25 + 8*3.5 + 2*15 + 5*4 = 75 + 28 + 30 + 20 = 153 Mbps
  if (Math.abs(g3.rawTotalMbps - 153) > 1e-5) {
    throw new Error(`Golden Case 3 raw expected 153 Mbps, got ${g3.rawTotalMbps}`);
  }
  // 153 * 1.25 = 191.25 Mbps
  if (Math.abs(g3.recommendedTotalMbps - 191.25) > 1e-5) {
    throw new Error(`Golden Case 3 with 25% headroom expected 191.25 Mbps, got ${g3.recommendedTotalMbps}`);
  }
  if (g3.recommendedPlan !== "300 Mbps High Speed Plan") {
    throw new Error(`Golden Case 3 recommended plan expected '300 Mbps High Speed Plan', got ${g3.recommendedPlan}`);
  }

  // Test 4: Data Cap Depletion (1.2 TB @ 100 Mbps)
  const g4 = calculateDataCap(1.2, 100, "Mbps");
  if (!g4.success) throw new Error("Data Cap test failed to succeed");
  // 1.2 * 1e12 * 8 / 1e8 = 96,000 s = 1d 2h 40m
  if (Math.abs(g4.secondsToExhaust - 96000) > 1e-5) {
    throw new Error(`Data Cap seconds expected 96000, got ${g4.secondsToExhaust}`);
  }
  if (g4.formattedExhaustTime !== "1d 2h 40m") {
    throw new Error(`Data Cap formatted expected '1d 2h 40m', got ${g4.formattedExhaustTime}`);
  }

  // Test 5: Validation & Edge Cases
  const zeroSize = calculateTransferTime(0, "GB", 100, "Mbps", 10, 90);
  if (!zeroSize.success || zeroSize.theoreticalSecs !== 0 || zeroSize.realisticSecs !== 0) {
    throw new Error("Zero file size should succeed with 0 duration");
  }

  const zeroSpeed = calculateTransferTime(10, "GB", 0, "Mbps", 10, 90);
  if (zeroSpeed.success) {
    throw new Error("Zero speed must fail validation");
  }

  const negSize = calculateTransferTime(-10, "GB", 100, "Mbps", 10, 90);
  if (negSize.success) {
    throw new Error("Negative file size must fail validation");
  }

  const negSpeed = calculateTransferTime(10, "GB", -100, "Mbps", 10, 90);
  if (negSpeed.success) {
    throw new Error("Negative speed must fail validation");
  }

  const overhead100 = calculateTransferTime(10, "GB", 100, "Mbps", 100, 90);
  if (overhead100.success) {
    throw new Error("Overhead 100% must yield non-success / infinite time");
  }

  // Test 6: Bandwidth Converter Round Trip (Mbps to MB/s to Mbps)
  const conv = calculateBandwidthConversion(100, "Mbps");
  if (!conv.success) throw new Error("Conversion failed");
  if (Math.abs(conv["MB/s"] - 12.5) > 1e-5) {
    throw new Error(`100 Mbps should equal 12.5 MB/s, got ${conv["MB/s"]}`);
  }
  if (Math.abs(conv.Gbps - 0.1) > 1e-5) {
    throw new Error(`100 Mbps should equal 0.1 Gbps, got ${conv.Gbps}`);
  }
  if (Math.abs(conv.gbPerMonth30d - 32400) > 1e-5) {
    throw new Error(`100 Mbps 30d continuous transfer should be 32,400 GB/mo, got ${conv.gbPerMonth30d}`);
  }

  return true;
}
