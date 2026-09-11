import {
  BandwidthCalculatorOutputs,
  TransferTimeOutputs,
  ConversionOutputs,
  HostingOutputs,
  ConcurrencyOutputs,
  DataCapOutputs,
} from "./types";

// --- UNIT DEFINITIONS ---
// SI Decimal bits (Base-1000)
export const SI_DATA_BITS: Record<string, number> = {
  B: 8,
  KB: 8 * 1e3,
  MB: 8 * 1e6,
  GB: 8 * 1e9,
  TB: 8 * 1e12,
  PB: 8 * 1e15,
};

// IEC Binary bits (Base-1024)
export const IEC_DATA_BITS: Record<string, number> = {
  KiB: 8 * 1024,
  MiB: 8 * Math.pow(1024, 2),
  GiB: 8 * Math.pow(1024, 3),
  TiB: 8 * Math.pow(1024, 4),
};

export const ALL_DATA_BITS: Record<string, number> = {
  ...SI_DATA_BITS,
  ...IEC_DATA_BITS,
};

// Speed units normalized to bits per second (bps)
export const SPEED_TO_BPS: Record<string, number> = {
  bps: 1,
  Kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9,
  Tbps: 1e12,
  "B/s": 8,
  "KB/s": 8 * 1e3,
  "MB/s": 8 * 1e6,
  "GB/s": 8 * 1e9,
  "TB/s": 8 * 1e12,
  "KiB/s": 8 * 1024,
  "MiB/s": 8 * Math.pow(1024, 2),
  "GiB/s": 8 * Math.pow(1024, 3),
};

export const SECONDS_IN_MONTH_AVG = 30.4375 * 86400; // 2,629,800 s
export const SECONDS_IN_MONTH_30D = 30 * 86400; // 2,592,000 s

export function formatTransferSeconds(totalSecs: number): string {
  if (!isFinite(totalSecs) || isNaN(totalSecs)) return "Invalid duration";
  if (totalSecs < 0) return "0 seconds";
  if (totalSecs === 0) return "0 seconds";
  if (totalSecs < 1) return "< 1 second";

  const total = Math.round(totalSecs);
  const days = Math.floor(total / (3600 * 24));
  const hours = Math.floor((total % (3600 * 24)) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
}

export function calculateTransferTime(
  fileSize: number,
  fileSizeUnit: string = "GB",
  speed: number,
  speedUnit: string = "Mbps",
  overheadPercent: number = 10,
  ispEfficiency: number = 90
): TransferTimeOutputs {
  if (fileSize < 0) {
    return {
      success: false,
      error: "File size cannot be negative",
      totalBits: 0,
      totalBytes: 0,
      nominalBps: 0,
      effectiveBps: 0,
      effectiveMBps: 0,
      theoreticalSecs: 0,
      theoreticalFormatted: "0 seconds",
      realisticSecs: 0,
      realisticFormatted: "0 seconds",
    };
  }

  if (speed < 0) {
    return {
      success: false,
      error: "Connection speed cannot be negative",
      totalBits: 0,
      totalBytes: 0,
      nominalBps: 0,
      effectiveBps: 0,
      effectiveMBps: 0,
      theoreticalSecs: 0,
      theoreticalFormatted: "0 seconds",
      realisticSecs: 0,
      realisticFormatted: "0 seconds",
    };
  }

  if (overheadPercent < 0 || overheadPercent > 100) {
    return {
      success: false,
      error: "Protocol overhead loss must be between 0% and 100%",
      totalBits: 0,
      totalBytes: 0,
      nominalBps: 0,
      effectiveBps: 0,
      effectiveMBps: 0,
      theoreticalSecs: 0,
      theoreticalFormatted: "0 seconds",
      realisticSecs: 0,
      realisticFormatted: "0 seconds",
    };
  }

  if (ispEfficiency < 0 || ispEfficiency > 100) {
    return {
      success: false,
      error: "ISP efficiency must be between 0% and 100%",
      totalBits: 0,
      totalBytes: 0,
      nominalBps: 0,
      effectiveBps: 0,
      effectiveMBps: 0,
      theoreticalSecs: 0,
      theoreticalFormatted: "0 seconds",
      realisticSecs: 0,
      realisticFormatted: "0 seconds",
    };
  }

  const unitMultiplier = ALL_DATA_BITS[fileSizeUnit] ?? SI_DATA_BITS.GB;
  const totalBits = fileSize * unitMultiplier;
  const totalBytes = totalBits / 8;

  const speedMultiplier = SPEED_TO_BPS[speedUnit] ?? SPEED_TO_BPS.Mbps;
  const nominalBps = speed * speedMultiplier;

  if (fileSize === 0) {
    return {
      success: true,
      totalBits: 0,
      totalBytes: 0,
      nominalBps,
      effectiveBps: nominalBps * (1 - overheadPercent / 100) * (ispEfficiency / 100),
      effectiveMBps: (nominalBps * (1 - overheadPercent / 100) * (ispEfficiency / 100)) / (8 * 1e6),
      theoreticalSecs: 0,
      theoreticalFormatted: "0 seconds",
      realisticSecs: 0,
      realisticFormatted: "0 seconds",
    };
  }

  if (nominalBps <= 0) {
    return {
      success: false,
      error: "Connection speed must be greater than 0 for file transfer",
      totalBits,
      totalBytes,
      nominalBps: 0,
      effectiveBps: 0,
      effectiveMBps: 0,
      theoreticalSecs: 0,
      theoreticalFormatted: "Infinite",
      realisticSecs: 0,
      realisticFormatted: "Infinite",
    };
  }

  const theoreticalSecs = totalBits / nominalBps;
  const effectiveBps = nominalBps * (1 - overheadPercent / 100) * (ispEfficiency / 100);

  if (effectiveBps <= 0) {
    return {
      success: false,
      error: "Effective throughput is 0 (due to 100% overhead or 0% ISP efficiency)",
      totalBits,
      totalBytes,
      nominalBps,
      effectiveBps: 0,
      effectiveMBps: 0,
      theoreticalSecs,
      theoreticalFormatted: formatTransferSeconds(theoreticalSecs),
      realisticSecs: Infinity,
      realisticFormatted: "Infinite (no throughput)",
    };
  }

  const realisticSecs = totalBits / effectiveBps;
  const effectiveMBps = effectiveBps / (8 * 1e6); // SI MB/s

  return {
    success: true,
    totalBits,
    totalBytes,
    nominalBps,
    effectiveBps,
    effectiveMBps,
    theoreticalSecs,
    theoreticalFormatted: formatTransferSeconds(theoreticalSecs),
    realisticSecs,
    realisticFormatted: formatTransferSeconds(realisticSecs),
  };
}

export function calculateBandwidthConversion(
  val: number,
  fromUnit: string = "Mbps"
): ConversionOutputs {
  if (val < 0) {
    return {
      success: false,
      error: "Bitrate/transfer value cannot be negative",
      inputVal: val,
      inputUnit: fromUnit,
      bps: 0,
      Kbps: 0,
      Mbps: 0,
      Gbps: 0,
      Tbps: 0,
      "B/s": 0,
      "KB/s": 0,
      "MB/s": 0,
      "GB/s": 0,
      "TB/s": 0,
      "KiB/s": 0,
      "MiB/s": 0,
      "GiB/s": 0,
      gbPerMonth30d: 0,
      tbPerMonth30d: 0,
      gbPerMonthAvg: 0,
    };
  }

  const mult = SPEED_TO_BPS[fromUnit] ?? SPEED_TO_BPS.Mbps;
  const bps = val * mult;

  const bPerSec = bps;
  const BPerSec = bps / 8;

  // Monthly 30-day continuous transfer: bits * 86400 * 30 / (8 * 1e9)
  const bytesPerSec = BPerSec;
  const gbPerMonth30d = (bytesPerSec * SECONDS_IN_MONTH_30D) / 1e9;
  const tbPerMonth30d = gbPerMonth30d / 1e3;
  const gbPerMonthAvg = (bytesPerSec * SECONDS_IN_MONTH_AVG) / 1e9;

  return {
    success: true,
    inputVal: val,
    inputUnit: fromUnit,
    bps: bPerSec,
    Kbps: bPerSec / 1e3,
    Mbps: bPerSec / 1e6,
    Gbps: bPerSec / 1e9,
    Tbps: bPerSec / 1e12,
    "B/s": BPerSec,
    "KB/s": BPerSec / 1e3,
    "MB/s": BPerSec / 1e6,
    "GB/s": BPerSec / 1e9,
    "TB/s": BPerSec / 1e12,
    "KiB/s": BPerSec / 1024,
    "MiB/s": BPerSec / Math.pow(1024, 2),
    "GiB/s": BPerSec / Math.pow(1024, 3),
    gbPerMonth30d,
    tbPerMonth30d,
    gbPerMonthAvg,
  };
}

export function calculateHostingBandwidth(
  pageViews: number,
  period: "month" | "day" | "hour" = "month",
  avgPageSize: number = 2.5,
  pageSizeUnit: string = "MB",
  redundancyFactor: number = 2.0,
  botOverheadPercent: number = 15
): HostingOutputs {
  if (pageViews < 0 || avgPageSize < 0 || redundancyFactor < 0 || botOverheadPercent < 0) {
    return {
      success: false,
      error: "Inputs cannot be negative",
      monthlyViews: 0,
      pageSizeBytes: 0,
      baseMonthlyBytes: 0,
      totalMonthlyBytes: 0,
      monthlyTransferGb: 0,
      monthlyTransferTb: 0,
      avgBps: 0,
      avgMbps: 0,
      peakMbps: 0,
      recommendedPort: "None",
    };
  }

  let monthlyViews = pageViews;
  if (period === "day") monthlyViews = pageViews * 30.4375;
  if (period === "hour") monthlyViews = pageViews * 24 * 30.4375;

  const unitBytes =
    pageSizeUnit === "GB"
      ? 1e9
      : pageSizeUnit === "KB"
      ? 1e3
      : pageSizeUnit === "GiB"
      ? Math.pow(1024, 3)
      : pageSizeUnit === "KiB"
      ? 1024
      : pageSizeUnit === "MiB"
      ? Math.pow(1024, 2)
      : 1e6;

  const pageSizeBytes = avgPageSize * unitBytes;
  const baseMonthlyBytes = monthlyViews * pageSizeBytes;
  const totalMonthlyBytes = baseMonthlyBytes * (1 + botOverheadPercent / 100);

  const monthlyTransferGb = totalMonthlyBytes / 1e9;
  const monthlyTransferTb = monthlyTransferGb / 1e3;

  const avgBps = (totalMonthlyBytes * 8) / SECONDS_IN_MONTH_AVG;
  const avgMbps = avgBps / 1e6;
  const peakMbps = avgMbps * redundancyFactor;

  let recommendedPort = "100 Mbps Shared Port";
  if (peakMbps > 1000) recommendedPort = "10 Gbps Dedicated Fiber Port";
  else if (peakMbps > 500) recommendedPort = "1 Gbps Unmetered Dedicated Port";
  else if (peakMbps > 100) recommendedPort = "1 Gbps Shared Port";
  else if (peakMbps > 50) recommendedPort = "500 Mbps Shared Port";

  return {
    success: true,
    monthlyViews: Math.round(monthlyViews),
    pageSizeBytes,
    baseMonthlyBytes,
    totalMonthlyBytes,
    monthlyTransferGb,
    monthlyTransferTb,
    avgBps,
    avgMbps,
    peakMbps,
    recommendedPort,
  };
}

export function calculateConcurrency(
  items: Record<string, number>,
  speeds: Record<string, number> = {
    stream4k: 25,
    stream1080p: 5,
    voip: 3.5,
    gaming: 4,
    backups: 15,
    remoteDesktop: 8,
    smartHome: 2,
  },
  headroomPercent: number = 20
): ConcurrencyOutputs {
  for (const [k, count] of Object.entries(items)) {
    if (count < 0) {
      return {
        success: false,
        error: `Device count for ${k} cannot be negative`,
        rawTotalMbps: 0,
        recommendedTotalMbps: 0,
        recommendedTotalGbps: 0,
        headroomMbps: 0,
        recommendedPlan: "None",
      };
    }
  }

  if (headroomPercent < 0) {
    return {
      success: false,
      error: "Headroom cushion cannot be negative",
      rawTotalMbps: 0,
      recommendedTotalMbps: 0,
      recommendedTotalGbps: 0,
      headroomMbps: 0,
      recommendedPlan: "None",
    };
  }

  let rawTotalMbps = 0;
  for (const [k, count] of Object.entries(items)) {
    const spd = speeds[k] ?? 0;
    if (spd < 0) {
      return {
        success: false,
        error: `Bitrate for ${k} cannot be negative`,
        rawTotalMbps: 0,
        recommendedTotalMbps: 0,
        recommendedTotalGbps: 0,
        headroomMbps: 0,
        recommendedPlan: "None",
      };
    }
    rawTotalMbps += count * spd;
  }

  const recommendedTotalMbps = rawTotalMbps * (1 + headroomPercent / 100);
  const recommendedTotalGbps = recommendedTotalMbps / 1000;
  const headroomMbps = recommendedTotalMbps - rawTotalMbps;

  let recommendedPlan = "100 Mbps Plan";
  if (recommendedTotalMbps > 2000) recommendedPlan = "2.5 Gbps / Multi-Gig Fiber Plan";
  else if (recommendedTotalMbps > 1000) recommendedPlan = "2 Gbps Fiber Plan";
  else if (recommendedTotalMbps > 500) recommendedPlan = "1 Gigabit Fiber Plan (1000 Mbps)";
  else if (recommendedTotalMbps > 300) recommendedPlan = "500 Mbps Ultra Fast Plan";
  else if (recommendedTotalMbps > 100) recommendedPlan = "300 Mbps High Speed Plan";

  return {
    success: true,
    rawTotalMbps,
    recommendedTotalMbps,
    recommendedTotalGbps,
    headroomMbps,
    recommendedPlan,
  };
}

export function calculateDataCap(
  capTb: number,
  speed: number,
  speedUnit: string = "Mbps"
): DataCapOutputs {
  if (capTb < 0 || speed < 0) {
    return {
      success: false,
      error: "Cap and speed cannot be negative",
      secondsToExhaust: 0,
      formattedExhaustTime: "Invalid",
      dailyAllowanceGb: 0,
    };
  }

  const capBits = capTb * 1e12 * 8; // SI Decimal standard
  const speedMultiplier = SPEED_TO_BPS[speedUnit] ?? SPEED_TO_BPS.Mbps;
  const nominalBps = speed * speedMultiplier;

  if (nominalBps <= 0) {
    return {
      success: false,
      error: "Speed must be greater than 0",
      secondsToExhaust: Infinity,
      formattedExhaustTime: "Never (no download activity)",
      dailyAllowanceGb: (capTb * 1000) / 30.4375,
    };
  }

  const secondsToExhaust = capBits / nominalBps;
  const dailyAllowanceGb = (capTb * 1000) / 30.4375;

  return {
    success: true,
    secondsToExhaust,
    formattedExhaustTime: formatTransferSeconds(secondsToExhaust),
    dailyAllowanceGb,
  };
}

export function calculateBandwidthCalculator(inputs: Record<string, any>): BandwidthCalculatorOutputs {
  const fileSize = Number(inputs.fileSizeMb ?? inputs.fileSize ?? 1000);
  const sizeUnit = String(inputs.fileSizeUnit ?? (inputs.fileSizeMb ? "MB" : "GB"));
  const speed = Number(inputs.speedMbps ?? inputs.speed ?? 100);
  const spdUnit = String(inputs.speedUnit ?? "Mbps");
  const overhead = Number(inputs.overheadPercent ?? 10);
  const efficiency = Number(inputs.ispEfficiency ?? 90);

  const transfer = calculateTransferTime(fileSize, sizeUnit, speed, spdUnit, overhead, efficiency);

  return {
    downloadTimeSecs: Math.round(transfer.realisticSecs),
    formattedTime: transfer.realisticFormatted,
    theoreticalTimeSecs: Math.round(transfer.theoreticalSecs),
    theoreticalFormatted: transfer.theoreticalFormatted,
    effectiveRateMBps: transfer.effectiveMBps,
    transfer,
  };
}
